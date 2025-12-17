import type { WeatherResponse } from '../api/types';

export type OutdoorSuggestion = {
  time: string; // ISO
  score: number;
  explanation: string;
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Simple scoring model for "best outdoor hour today":
// - target temp 18C (Finnish mild outdoor comfort)
// - penalize rain probability, precipitation, and wind
export function bestOutdoorHourToday(w: WeatherResponse): OutdoorSuggestion | null {
  const now = new Date(w.current.time);
  const day = now.toISOString().slice(0, 10);

  const times = w.hourly.time;
  const t = w.hourly.temperature_2m;
  const pProb = w.hourly.precipitation_probability;
  const p = w.hourly.precipitation;
  const wind = w.hourly.wind_speed_10m;

  let best: OutdoorSuggestion | null = null;

  for (let i = 0; i < times.length; i++) {
    if (!times[i].startsWith(day)) continue;

    const temp = t[i];
    const prob = pProb[i] ?? 0;
    const prec = p[i] ?? 0;
    const ws = wind[i] ?? 0;

    const tempScore = 1 - clamp(Math.abs(temp - 18) / 18, 0, 1); // 0..1
    const rainPenalty = clamp(prob / 100, 0, 1) * 0.7 + clamp(prec / 3, 0, 1) * 0.3; // 0..1
    const windPenalty = clamp(ws / 12, 0, 1);

    const score = (tempScore * 1.0) - (rainPenalty * 1.2) - (windPenalty * 0.5);

    if (!best || score > best.score) {
      best = {
        time: times[i],
        score,
        explanation: `Lämpötila ${temp.toFixed(0)}°C, sateen todennäköisyys ${prob}%, sade ${prec.toFixed(1)} mm, tuuli ${ws.toFixed(1)} m/s`,
      };
    }
  }

  return best;
}

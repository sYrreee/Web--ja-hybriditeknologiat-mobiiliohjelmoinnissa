// Open-Meteo WMO weather code mapping (condensed)
export function weatherCodeToText(code: number): string {
  if (code === 0) return 'Selkeää';
  if (code === 1 || code === 2) return 'Enimmäkseen selkeää';
  if (code === 3) return 'Pilvistä';
  if (code === 45 || code === 48) return 'Sumua';
  if (code >= 51 && code <= 57) return 'Tihkusadetta';
  if (code >= 61 && code <= 67) return 'Sadetta';
  if (code >= 71 && code <= 77) return 'Lumisummaa / lunta';
  if (code >= 80 && code <= 82) return 'Kuuroja';
  if (code >= 85 && code <= 86) return 'Lumikuuroja';
  if (code === 95) return 'Ukkosta';
  if (code === 96 || code === 99) return 'Ukkosta ja rakeita';
  return 'Vaihtelevasti';
}

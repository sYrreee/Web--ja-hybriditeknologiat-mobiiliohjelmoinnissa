import React, { useMemo, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { searchPlace } from '../api/nominatim';
import { getWeather } from '../api/openMeteo';
import type { FavoritePlace, GeoResult, WeatherResponse } from '../api/types';
import { weatherCodeToText } from '../utils/weatherCode';
import { bestOutdoorHourToday } from '../utils/outdoor';
import { upsertFavorite } from '../utils/storage';

function stableId(lat: number, lon: number): string {
  return `${lat.toFixed(5)}:${lon.toFixed(5)}`;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [selected, setSelected] = useState<{ name: string; lat: number; lon: number } | null>(null);

  const [loadingGeo, setLoadingGeo] = useState<boolean>(false);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const outdoor = useMemo(() => (weather ? bestOutdoorHourToday(weather) : null), [weather]);

  const onSearch = async (): Promise<void> => {
    try {
      setError(null);
      setLoadingGeo(true);
      setGeoResults([]);
      setSelected(null);
      setWeather(null);

      const res = await searchPlace(query);
      setGeoResults(res);
      if (res.length === 0) setToast('Ei hakutuloksia. Kokeile tarkempaa hakua.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tuntematon virhe');
    } finally {
      setLoadingGeo(false);
    }
  };

  const onSelect = async (r: GeoResult): Promise<void> => {
    const lat = Number(r.lat);
    const lon = Number(r.lon);
    const name = r.display_name;

    setSelected({ name, lat, lon });
    setGeoResults([]);

    try {
      setError(null);
      setLoadingWeather(true);
      const w = await getWeather(lat, lon);
      setWeather(w);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tuntematon virhe');
    } finally {
      setLoadingWeather(false);
    }
  };

  const addToFavorites = (): void => {
    if (!selected) return;
    const fav: FavoritePlace = {
      id: stableId(selected.lat, selected.lon),
      name: selected.name,
      lat: selected.lat,
      lon: selected.lon,
    };
    upsertFavorite(fav);
    setToast('Lisätty suosikkeihin');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sää & Suosikit</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Hae sijainti</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Paikka (esim. Helsinki, Tampere)</IonLabel>
              <IonInput
                value={query}
                placeholder="Kirjoita paikan nimi…"
                onIonInput={(e) => setQuery(e.detail.value ?? '')}
              />
            </IonItem>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <IonButton onClick={onSearch} disabled={loadingGeo || query.trim().length === 0}>
                Hae
              </IonButton>
              {loadingGeo && <IonSpinner name="dots" />}
            </div>

            {geoResults.length > 0 && (
              <IonList style={{ marginTop: 12 }}>
                {geoResults.map((r) => (
                  <IonItem key={`${r.lat}-${r.lon}`} button onClick={() => onSelect(r)}>
                    <IonLabel>
                      <strong>{r.display_name}</strong>
                      <div>
                        {Number(r.lat).toFixed(4)}, {Number(r.lon).toFixed(4)}
                      </div>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>

        {loadingWeather && (
          <IonCard>
            <IonCardContent>
              <IonSpinner name="crescent" /> Haetaan säätä…
            </IonCardContent>
          </IonCard>
        )}

        {error && (
          <IonCard>
            <IonCardContent>
              <IonText color="danger"><strong>Virhe:</strong> {error}</IonText>
            </IonCardContent>
          </IonCard>
        )}

        {selected && weather && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Nykytila</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
                </IonText>
                <p><strong>Aika:</strong> {new Date(weather.current.time).toLocaleString()}</p>
                <p><strong>Lämpötila:</strong> {weather.current.temperature_2m.toFixed(1)} °C (tuntuu kuin {weather.current.apparent_temperature.toFixed(1)} °C)</p>
                <p><strong>Sade:</strong> {weather.current.precipitation.toFixed(1)} mm</p>
                <p><strong>Tuuli:</strong> {weather.current.wind_speed_10m.toFixed(1)} m/s</p>
                <p><strong>Sää:</strong> {weatherCodeToText(weather.current.weather_code)}</p>

                <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                  <IonButton onClick={addToFavorites}>Lisää suosikkeihin</IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            {outdoor && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Paras ulkoiluaika tänään</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p><strong>Ehdotus:</strong> {new Date(outdoor.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p>{outdoor.explanation}</p>
                  <p style={{ opacity: 0.7, marginBottom: 0 }}>
                    (Laskettu yksinkertaisella pisteytyksellä: miellyttävä lämpö + pieni sade- ja tuuliriski.)
                  </p>
                </IonCardContent>
              </IonCard>
            )}

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>7 päivän ennuste</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {weather.daily.time.map((d, i) => (
                    <IonItem key={d}>
                      <IonLabel>
                        <strong>{new Date(d).toLocaleDateString()}</strong>
                        <div>{weatherCodeToText(weather.daily.weather_code[i])}</div>
                        <div>
                          Max {weather.daily.temperature_2m_max[i].toFixed(0)}°C / Min {weather.daily.temperature_2m_min[i].toFixed(0)}°C
                        </div>
                        <div>Sateen todennäköisyys max: {weather.daily.precipitation_probability_max[i]}%</div>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        )}

        <IonToast
          isOpen={toast !== null}
          message={toast ?? ''}
          duration={2000}
          onDidDismiss={() => setToast(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;

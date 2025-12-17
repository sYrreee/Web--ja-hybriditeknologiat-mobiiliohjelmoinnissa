import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
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
import type { FavoritePlace, WeatherResponse } from '../api/types';
import { getWeather } from '../api/openMeteo';
import { loadFavorites, removeFavorite } from '../utils/storage';
import { weatherCodeToText } from '../utils/weatherCode';

type FavWithWeather = FavoritePlace & { weather?: WeatherResponse; loading?: boolean; error?: string };

const Favorites: React.FC = () => {
  const [items, setItems] = useState<FavWithWeather[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const refresh = (): void => {
    const favs = loadFavorites();
    setItems(favs.map(f => ({ ...f })));
  };

  useEffect(() => {
    refresh();
  }, []);

  const loadOne = async (id: string): Promise<void> => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, loading: true, error: undefined } : it)));
    const target = items.find(i => i.id === id);
    if (!target) return;

    try {
      const w = await getWeather(target.lat, target.lon);
      setItems(prev => prev.map(it => (it.id === id ? { ...it, weather: w, loading: false } : it)));
    } catch (e) {
      setItems(prev =>
        prev.map(it =>
          it.id === id
            ? { ...it, loading: false, error: e instanceof Error ? e.message : 'Tuntematon virhe' }
            : it
        )
      );
    }
  };

  const remove = (id: string): void => {
    const next = removeFavorite(id);
    setItems(next.map(f => ({ ...f })));
    setToast('Poistettu suosikeista');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Suosikit</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {items.length === 0 ? (
          <IonCard>
            <IonCardContent>
              <IonText>Ei suosikkeja vielä. Lisää sijainti Koti-välilehdeltä.</IonText>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonList>
            {items.map((f) => (
              <IonCard key={f.id}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: '1.05rem' }}>{f.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <IonButton onClick={() => loadOne(f.id)} disabled={!!f.loading}>
                      Päivitä sää
                    </IonButton>
                    <IonButton color="medium" onClick={() => remove(f.id)}>
                      Poista
                    </IonButton>
                    {f.loading && <IonSpinner name="dots" />}
                  </div>

                  {f.error && (
                    <p style={{ marginTop: 12 }}>
                      <IonText color="danger"><strong>Virhe:</strong> {f.error}</IonText>
                    </p>
                  )}

                  {f.weather && (
                    <div style={{ marginTop: 12 }}>
                      <p style={{ marginTop: 0 }}>
                        <strong>Nykytila:</strong> {f.weather.current.temperature_2m.toFixed(1)}°C, {weatherCodeToText(f.weather.current.weather_code)}
                      </p>
                      <p style={{ marginTop: 0, opacity: 0.8 }}>
                        Päivitetty: {new Date(f.weather.current.time).toLocaleString()}
                      </p>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
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

export default Favorites;

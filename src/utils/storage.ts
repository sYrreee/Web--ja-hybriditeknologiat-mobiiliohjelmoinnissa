import type { FavoritePlace } from '../api/types';

const KEY = 'favorite_places_v1';

export function loadFavorites(): FavoritePlace[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoritePlace[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavorites(items: FavoritePlace[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function upsertFavorite(place: FavoritePlace): FavoritePlace[] {
  const items = loadFavorites();
  const idx = items.findIndex(p => p.id === place.id);
  const next = idx >= 0 ? items.map(p => (p.id === place.id ? place : p)) : [place, ...items];
  saveFavorites(next);
  return next;
}

export function removeFavorite(id: string): FavoritePlace[] {
  const items = loadFavorites().filter(p => p.id !== id);
  saveFavorites(items);
  return items;
}

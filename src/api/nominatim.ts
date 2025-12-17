import type { GeoResult } from './types';

export async function searchPlace(query: string): Promise<GeoResult[]> {
  const q = query.trim();
  if (!q) return [];

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '5');
  url.searchParams.set('q', q);

  // Nominatim usage policy recommends a valid User-Agent / Referer; browsers limit UA,
  // so we provide a descriptive header where allowed.
  const res = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Geokoodaus epäonnistui (${res.status})`);
  }

  return (await res.json()) as GeoResult[];
}

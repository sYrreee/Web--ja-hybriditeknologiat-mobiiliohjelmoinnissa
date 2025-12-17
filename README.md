# Viikko 7 – API-datan haku (Ionic React + TypeScript)

## Idea
Sääsovellus, jossa käyttäjä voi:
- hakea paikkakunnan nimen perusteella koordinaatit (OpenStreetMap Nominatim)
- hakea nykytilan ja 7 päivän ennusteen (Open‑Meteo)
- tallentaa suosikkipaikat laitteelle (LocalStorage)
- käyttää pientä logiikkaa: **”Paras ulkoiluaika tänään”** (etsii päivän tunnin, jossa lämpötila on lähellä 18°C ja sateen todennäköisyys pieni)

Tämä täyttää vaatimuksen “enemmän logiikkaa kuin pelkkä datan listaus”.

## Käytetyt API:t (ilmaiset, ei maksua / ei korttivaatimusta)
- Geokoodaus: **Nominatim (OpenStreetMap)** – JSON
- Säädata: **Open‑Meteo** – JSON

**API-avainta ei tarvita** (ei avainta eikä salattavaa).

## Teknologia
- Ionic React
- Capacitor (valmis ajettavaksi Android/iOS:lle)
- TypeScript (kaikki lähdekoodi TS/TSX)

## Asennus ja ajo (web)
```bash
npm install
npm run dev
```

## Ajo laitteelle / emulaattoriin (Capacitor)
```bash
npm run build
npx cap add android   # tai ios
npx cap sync
npx cap open android
```

## Projektirakenne (oleelliset)
- `src/api/` – API-kutsut ja tyypit
- `src/pages/` – näkymät (Home, Favorites)
- `src/utils/` – logiikka (paras ulkoiluaika), pienet apurit

## Git-ohje palautusta varten
1. Luo **uusi julkinen** repo (vain tämä projekti).
2. Lisää projekti repoon.
3. Varmista, että viimeisin koodi on pushattu.
4. Palauta Moodleen repolinkki tekstinä.

## API-avaimet
Ei käytössä.

---
Tehty: 2025-12-17

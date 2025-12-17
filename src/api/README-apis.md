# API-dokumentaatio (lyhyesti)

## Nominatim (OpenStreetMap)
- Endpoint: `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=<hakutermi>`
- Palauttaa listan, jossa mm. `display_name`, `lat`, `lon`.

## Open-Meteo
- Endpoint: `https://api.open-meteo.com/v1/forecast?...`
- Käytetään `current`, `hourly`, `daily` -kenttiä.
- Ei API-avainta.

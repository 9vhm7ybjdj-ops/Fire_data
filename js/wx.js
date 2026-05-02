/* ===========================================================
   WX TILE DATA FETCHER — SUNSHINE COAST REGION
=========================================================== */

const stations = [
  { name: "Nambour", lat: -26.63, lon: 152.96 },
  { name: "Beerburrum", lat: -26.95, lon: 152.95 },
  { name: "Tewantin", lat: -26.39, lon: 153.03 },
  { name: "Sunshine Coast Airport", lat: -26.60, lon: 153.09 }
];

/* ===========================================================
   FETCH + RENDER WX DATA
=========================================================== */

async function loadWX() {
  const grid = document.getElementById("wx-grid");
  if (!grid) return;

  grid.innerHTML = ""; // Clear old tiles

  for (const s of stations) {
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,precipitation`;

      const r = await fetch(url);
      const d = await r.json();
      const c = d.current;

      const tile = document.createElement("div");
      tile.className = "wx-tile";

      tile.innerHTML = `
        <strong>${s.name}</strong><br>
        Temp: ${c.temperature_2m}°C<br>
        RH: ${c.relative_humidity_2m}%<br>
        Wind: ${c.wind_speed_10m} km/h<br>
        Gust: ${c.wind_gusts_10m} km/h<br>
        Rain: ${c.precipitation} mm
      `;

      grid.appendChild(tile);

    } catch (err) {
      console.error("WX fetch failed for", s.name, err);

      const tile = document.createElement("div");
      tile.className = "wx-tile";
      tile.innerHTML = `
        <strong>${s.name}</strong><br>
        <span style="color:#f33">No data</span>
      `;
      grid.appendChild(tile);
    }
  }
}

/* ===========================================================
   TRIGGER WX LOAD WHEN MFD IS READY
=========================================================== */

document.addEventListener("mfd-ready", loadWX);

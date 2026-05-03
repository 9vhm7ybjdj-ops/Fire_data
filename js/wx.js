/* ============================================================
   WX.JS — Open‑Meteo Live Weather Tiles
   4 Stations (Nambour, Beerburrum, Tewantin, Sunshine Coast Apt)
============================================================ */

/* ------------------------------------------------------------
   Station Definitions
------------------------------------------------------------ */
const wxStations = [
  {
    id: "nambour",
    name: "Nambour",
    lat: -26.626,
    lon: 152.959
  },
  {
    id: "beerburrum",
    name: "Beerburrum",
    lat: -26.953,
    lon: 152.959
  },
  {
    id: "tewantin",
    name: "Tewantin",
    lat: -26.391,
    lon: 153.037
  },
  {
    id: "apt",
    name: "Sunshine Coast Apt",
    lat: -26.603,
    lon: 153.091
  }
];

/* ------------------------------------------------------------
   Fetch Weather for One Station
------------------------------------------------------------ */
async function fetchStationWX(station) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}` +
    `&longitude=${station.lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_gusts_10m`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const c = data.current;

    return {
      temp: Math.round(c.temperature_2m),
      rh: Math.round(c.relative_humidity_2m),
      wind: Math.round(c.wind_speed_10m),
      gust: Math.round(c.wind_gusts_10m)
    };
  } catch (err) {
    console.error("WX fetch error:", station.name, err);
    return null;
  }
}

/* ------------------------------------------------------------
   Update Tile DOM
------------------------------------------------------------ */
function updateTile(stationId, wx) {
  if (!wx) return;

  document.getElementById(`${stationId}-temp`).textContent = `${wx.temp}°C`;
  document.getElementById(`${stationId}-wind`).textContent = `${wx.wind} km/h`;
  document.getElementById(`${stationId}-gust`).textContent = `${wx.gust} km/h`;
  document.getElementById(`${stationId}-rh`).textContent = `${wx.rh}%`;
}

/* ------------------------------------------------------------
   Update Timestamp
------------------------------------------------------------ */
function updateWXTimestamp() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("wx-last-update").textContent = `Last update: ${hh}:${mm}`;
}

/* ------------------------------------------------------------
   Fetch All Stations
------------------------------------------------------------ */
async function refreshWX() {
  for (const st of wxStations) {
    const wx = await fetchStationWX(st);
    updateTile(st.id, wx);
  }
  updateWXTimestamp();
}

/* ------------------------------------------------------------
   Auto‑Refresh Every 5 Minutes
------------------------------------------------------------ */
setInterval(refreshWX, 5 * 60 * 1000);

/* ------------------------------------------------------------
   Initial Load
------------------------------------------------------------ */
document.addEventListener("mfd-ready", () => {
  refreshWX();
});

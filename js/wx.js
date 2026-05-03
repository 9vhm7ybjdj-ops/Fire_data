/* ============================================================
   WX.JS — LIVE LOCAL WEATHER (Nambour, Beerburrum, Tewantin, Apt)
   Uses Open-Meteo API
============================================================ */

/* ------------------------------------------------------------
   Station Coordinates
------------------------------------------------------------ */
const WX_STATIONS = {
  nambour:      { lat: -26.626, lon: 152.959 },
  beerburrum:   { lat: -26.953, lon: 152.959 },
  tewantin:     { lat: -26.391, lon: 153.037 },
  apt:          { lat: -26.603, lon: 153.091 } // Sunshine Coast Airport
};

/* ------------------------------------------------------------
   Fetch Template
------------------------------------------------------------ */
function buildUrl(lat, lon) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,dew_point_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_gusts_10m,wind_direction_10m`;
}

/* ------------------------------------------------------------
   Update Tile Helper
------------------------------------------------------------ */
function updateTile(prefix, data) {
  document.getElementById(`${prefix}-temp`).textContent = `${data.temp}°C`;
  document.getElementById(`${prefix}-dew`).textContent  = `${data.dew}°C`;
  document.getElementById(`${prefix}-wind`).textContent = `${data.windDir}° @ ${data.wind} km/h`;
  document.getElementById(`${prefix}-gust`).textContent = `${data.gust} km/h`;
  document.getElementById(`${prefix}-rh`).textContent   = `${data.rh}%`;
  document.getElementById(`${prefix}-rain`).textContent = `${data.rain} mm`;
}

/* ------------------------------------------------------------
   Parse API Response
------------------------------------------------------------ */
function parseWx(json) {
  const c = json.current;

  return {
    temp:     Math.round(c.temperature_2m),
    dew:      Math.round(c.dew_point_2m),
    rh:       Math.round(c.relative_humidity_2m),
    rain:     c.precipitation ?? 0,
    wind:     Math.round(c.wind_speed_10m),
    gust:     Math.round(c.wind_gusts_10m),
    windDir:  Math.round(c.wind_direction_10m)
  };
}

/* ------------------------------------------------------------
   Fetch All Stations
------------------------------------------------------------ */
async function fetchWx() {
  try {
    const results = await Promise.all([
      fetch(buildUrl(WX_STATIONS.nambour.lat, WX_STATIONS.nambour.lon)).then(r => r.json()),
      fetch(buildUrl(WX_STATIONS.beerburrum.lat, WX_STATIONS.beerburrum.lon)).then(r => r.json()),
      fetch(buildUrl(WX_STATIONS.tewantin.lat, WX_STATIONS.tewantin.lon)).then(r => r.json()),
      fetch(buildUrl(WX_STATIONS.apt.lat, WX_STATIONS.apt.lon)).then(r => r.json())
    ]);

    const [nambour, beerburrum, tewantin, apt] = results.map(parseWx);

    updateTile("nambour", nambour);
    updateTile("beerburrum", beerburrum);
    updateTile("tewantin", tewantin);
    updateTile("apt", apt);

    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");

    document.getElementById("wx-last-update").textContent = `Last update: ${hh}:${mm}`;
    document.getElementById("wx-global-obs-time").textContent = `Obs: ${hh}:${mm}`;

  } catch (err) {
    console.error("WX fetch failed:", err);
  }
}

/* ------------------------------------------------------------
   Trigger Fetch After MFD Ready
------------------------------------------------------------ */
document.addEventListener("mfd-ready", () => {
  fetchWx();
  setInterval(fetchWx, 60_000); // refresh every minute
});
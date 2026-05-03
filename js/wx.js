/* ===========================================================
   WX.JS — 7-field tiles + global OBS TIME (WX page only)
   Assumes BOM-style observation payload with obs_time_local
=========================================================== */

const WX_STATIONS = {
  nambour: { id: "IDQ60901/94578" },
  beerburrum: { id: "IDQ60901/94572" },
  tewantin: { id: "IDQ60901/94568" },
  apt: { id: "IDQ60901/95572" }
};

let wxLatestObsTime = null;

/* -----------------------------------------------------------
   Entry
----------------------------------------------------------- */
function loadWX() {
  Object.keys(WX_STATIONS).forEach((key) => {
    fetchStationObs(key, WX_STATIONS[key].id);
  });
}

/* -----------------------------------------------------------
   Fetch one station
----------------------------------------------------------- */
function fetchStationObs(key, bomId) {
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(`https://api.bom.gov.au/v1/stations/${bomId}/observations`);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.data || !data.data[0]) return;
      decodeStationObs(key, data.data[0]);
    })
    .catch((err) => console.error("WX fetch error:", err));
}

/* -----------------------------------------------------------
   Decode one station
----------------------------------------------------------- */
function decodeStationObs(key, d) {
  const temp = d.air_temp ?? "--";
  const dew = d.dewpt ?? computeDewFromTempRh(d.air_temp, d.rel_hum);
  const wind = d.wind_spd_kmh != null ? `${d.wind_spd_kmh} km/h` : "--";
  const gust = d.gust_kmh != null ? `${d.gust_kmh} km/h` : "--";
  const rh = d.rel_hum ?? "--";
  const rain = d.rain_trace ?? "--";

  const obsTime = d.obs_time_local || d.local_date_time_full || null;

  updateWxTile(key, { temp, dew, wind, gust, rh, rain });
  updateWxGlobalObsTime(obsTime);
}

/* -----------------------------------------------------------
   Simple dew point estimate if not provided
----------------------------------------------------------- */
function computeDewFromTempRh(temp, rh) {
  if (temp == null || rh == null) return "--";
  const t = Number(temp);
  const h = Number(rh);
  if (isNaN(t) || isNaN(h) || h <= 0) return "--";
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * t) / (b + t)) + Math.log(h / 100);
  const dew = (b * alpha) / (a - alpha);
  return `${dew.toFixed(1)}°C`;
}

/* -----------------------------------------------------------
   Update tile DOM
----------------------------------------------------------- */
function updateWxTile(key, data) {
  const fields = ["temp", "dew", "wind", "gust", "rh", "rain"];
  fields.forEach((f) => {
    const el = document.getElementById(`${key}-${f}`);
    if (el) el.textContent = data[f];
  });
}

/* -----------------------------------------------------------
   Global OBS TIME (latest across all stations)
----------------------------------------------------------- */
function updateWxGlobalObsTime(t) {
  if (!t) return;

  const ts = new Date(t);
  if (!(ts instanceof Date) || isNaN(ts.getTime())) return;

  if (!wxLatestObsTime || ts > wxLatestObsTime) {
    wxLatestObsTime = ts;

    const formatted = ts.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const el = document.getElementById("wx-global-obs-time");
    if (el) el.textContent = `Obs: ${formatted}`;

    const lastUpdate = document.getElementById("wx-last-update");
    if (lastUpdate) lastUpdate.textContent = `Last update: ${formatted}`;
  }
}

/* -----------------------------------------------------------
   Init + refresh
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", loadWX);
setInterval(loadWX, 5 * 60 * 1000);

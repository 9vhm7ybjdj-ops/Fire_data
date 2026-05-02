/* ===========================================================
   AIRFIELD WX — DECODED METAR FOR SUNSHINE COAST (YBSU)
   Source: NOAA ADDS (no key required)
=========================================================== */

const METAR_URL =
  "https://aviationweather.gov/api/data/metar?ids=YBSU&format=json";

/* ===========================================================
   FETCH + PROCESS METAR
=========================================================== */

function loadAirfieldWX() {
  fetch(METAR_URL, { cache: "no-store" })
    .then(res => res.json())
    .then(data => {
      if (!data || !data.length) throw new Error("No METAR");
      const metar = data[0];
      renderDecodedMETAR(metar);
    })
    .catch(err => {
      console.error("METAR fetch failed:", err);
      renderNoData();
    });
}

/* ===========================================================
   FORMAT OBS TIME (LOCAL)
=========================================================== */

function formatObsTime(isoString) {
  if (!isoString) return "OBS TIME: N/A";

  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "OBS TIME: N/A";

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");

  return `OBS TIME: ${hh}${mm}L`;
}

/* ===========================================================
   DECODE METAR FIELDS
=========================================================== */

function decodeMETAR(m) {
  return {
    station: m.station_id || "YBSU",
    obsTime: formatObsTime(m.observation_time),
    wind: m.wind_dir_degrees && m.wind_speed_kt
      ? `${m.wind_dir_degrees}°/${m.wind_speed_kt}kt`
      : "N/A",
    visibility: m.visibility_statute_mi
      ? `${m.visibility_statute_mi} SM`
      : "N/A",
    temp: m.temp_c !== null ? `${m.temp_c}°C` : "N/A",
    dewpoint: m.dewpoint_c !== null ? `${m.dewpoint_c}°C` : "N/A",
    qnh: m.altim_in_hg
      ? `${(m.altim_in_hg * 33.8639).toFixed(0)} hPa`
      : "N/A",
    clouds: m.sky_condition && m.sky_condition.length
      ? m.sky_condition.map(c => `${c.sky_cover}${c.cloud_base_ft_agl ? c.cloud_base_ft_agl : ""}`).join("  •  ")
      : "SKC",
    weather: m.wx_string || "—",
    flightCat: m.flight_category || "N/A"
  };
}

/* ===========================================================
   RENDER DECODED METAR
=========================================================== */

function renderDecodedMETAR(metar) {
  const wx = decodeMETAR(metar);
  const container = document.getElementById("airfieldwx-container");
  if (!container) return;

  container.innerHTML = `
    <div class="wx-row wx-obs-time">${wx.obsTime}</div>

    <div class="wx-row">
      <span class="wx-label">Wind</span>
      <span class="wx-value">${wx.wind}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Visibility</span>
      <span class="wx-value">${wx.visibility}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Clouds</span>
      <span class="wx-value">${wx.clouds}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Weather</span>
      <span class="wx-value">${wx.weather}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Temp</span>
      <span class="wx-value">${wx.temp}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Dewpoint</span>
      <span class="wx-value">${wx.dewpoint}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">QNH</span>
      <span class="wx-value">${wx.qnh}</span>
    </div>

    <div class="wx-row">
      <span class="wx-label">Flight Category</span>
      <span class="wx-value">${wx.flightCat}</span>
    </div>
  `;
}

/* ===========================================================
   NO DATA FALLBACK
=========================================================== */

function renderNoData() {
  const container = document.getElementById("airfieldwx-container");
  if (!container) return;

  container.innerHTML = `
    <div class="wx-row">NO METAR AVAILABLE</div>
  `;
}

/* ===========================================================
   INIT
=========================================================== */

document.addEventListener("DOMContentLoaded", loadAirfieldWX);

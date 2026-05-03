/* ===========================================================
   AIRFIELDWX.JS — YBSU METAR (Decoded Only)
   Clean, stable, no bleed-through, no mode interference
=========================================================== */

function loadAirfieldWX() {
  fetchYBSUMetar();
}

/* -----------------------------------------------------------
   Fetch METAR (via CORS proxy)
----------------------------------------------------------- */
function fetchYBSUMetar() {
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://aviationweather.gov/api/data/metar?ids=YBSU&format=json"
    );

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data[0]) return;

      const metar = data[0];
      decodeMetar(metar);
    })
    .catch((err) => console.error("METAR fetch error:", err));
}

/* -----------------------------------------------------------
   Decode METAR into avionics-friendly fields
----------------------------------------------------------- */
function decodeMetar(m) {
  const wind = m.wind_dir_degrees && m.wind_speed_kt
    ? `${m.wind_dir_degrees}° / ${m.wind_speed_kt}kt`
    : "--";

  const vis = m.visibility_statute_mi
    ? `${m.visibility_statute_mi}sm`
    : "--";

  const cloud = m.sky_condition && m.sky_condition.length
    ? m.sky_condition.map((c) => `${c.sky_cover}${c.cloud_base_ft_agl || ""}`).join(" ")
    : "--";

  const qnh = m.altim_in_hg
    ? (m.altim_in_hg * 33.8639).toFixed(0)
    : "--";

  const cat = determineCategory(m);

  updateAirfieldWX({
    wind,
    vis,
    cloud,
    qnh,
    cat,
    obsTime: formatObsTime(m.observation_time),
  });
}

/* -----------------------------------------------------------
   Determine flight category (simple logic)
----------------------------------------------------------- */
function determineCategory(m) {
  if (!m.flight_category) return "--";
  return m.flight_category;
}

/* -----------------------------------------------------------
   Format observation time
----------------------------------------------------------- */
function formatObsTime(t) {
  if (!t) return "--:--";
  const d = new Date(t);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* -----------------------------------------------------------
   Update UI
----------------------------------------------------------- */
function updateAirfieldWX(data) {
  document.getElementById("metar-wind").textContent = data.wind;
  document.getElementById("metar-vis").textContent = data.vis;
  document.getElementById("metar-cloud").textContent = data.cloud;
  document.getElementById("metar-qnh").textContent = data.qnh;
  document.getElementById("metar-cat").textContent = data.cat;
  document.getElementById("metar-time").textContent = `Obs: ${data.obsTime}`;
}

/* -----------------------------------------------------------
   Initial load
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", loadAirfieldWX);

/* Refresh every 10 minutes */
setInterval(fetchYBSUMetar, 10 * 60 * 1000);

/* ===========================================================
   AIRFIELDWX.JS — YBSU METAR decoded
=========================================================== */

function loadAirfieldWX() {
  fetchYBSUMetar();
}

/* -----------------------------------------------------------
   Fetch METAR
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
      decodeMetar(data[0]);
    })
    .catch((err) => console.error("METAR fetch error:", err));
}

/* -----------------------------------------------------------
   Decode METAR
----------------------------------------------------------- */
function decodeMetar(m) {
  const wind =
    m.wind_dir_degrees != null && m.wind_speed_kt != null
      ? `${m.wind_dir_degrees}° / ${m.wind_speed_kt}kt`
      : "--";

  const vis = m.visibility_statute_mi != null
    ? `${m.visibility_statute_mi}sm`
    : "--";

  const cloud =
    m.sky_condition && m.sky_condition.length
      ? m.sky_condition
          .map((c) => `${c.sky_cover}${c.cloud_base_ft_agl || ""}`)
          .join(" ")
      : "--";

  const qnh =
    m.altim_in_hg != null
      ? (m.altim_in_hg * 33.8639).toFixed(0)
      : "--";

  const cat = m.flight_category || "--";

  const obsTime = formatMetarObsTime(m.observation_time);

  updateAirfieldWX({
    wind,
    vis,
    cloud,
    qnh,
    cat,
    obsTime
  });
}

/* -----------------------------------------------------------
   Format obs time
----------------------------------------------------------- */
function formatMetarObsTime(t) {
  if (!t) return "--:--";
  const d = new Date(t);
  if (isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* -----------------------------------------------------------
   Update DOM
----------------------------------------------------------- */
function updateAirfieldWX(data) {
  const map = {
    "metar-wind": data.wind,
    "metar-vis": data.vis,
    "metar-cloud": data.cloud,
    "metar-qnh": data.qnh,
    "metar-cat": data.cat
  };

  Object.keys(map).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = map[id];
  });

  const t = document.getElementById("metar-time");
  if (t) t.textContent = `Obs: ${data.obsTime}`;
}

/* -----------------------------------------------------------
   Init + refresh
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", loadAirfieldWX);
setInterval(fetchYBSUMetar, 10 * 60 * 1000);

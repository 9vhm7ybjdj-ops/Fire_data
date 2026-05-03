/* ============================================================
   AIRFIELDWX.JS — YBSU METAR (Decoded Only)
   Sunshine Coast Airport (YBSU)
============================================================ */

/* ------------------------------------------------------------
   METAR SOURCE (NOAA)
------------------------------------------------------------ */
const METAR_URL =
  "https://aviationweather.gov/api/data/metar?ids=YBSU&format=json";

/* ------------------------------------------------------------
   Decode METAR into clean fields
------------------------------------------------------------ */
function decodeMetar(metar) {
  if (!metar) return null;

  const out = {
    time: "--:--",
    wind: "---",
    vis: "---",
    cloud: "---",
    qnh: "---",
    cat: "---"
  };

  /* Timestamp */
  if (metar.obsTime) {
    const t = new Date(metar.obsTime);
    const hh = t.getHours().toString().padStart(2, "0");
    const mm = t.getMinutes().toString().padStart(2, "0");
    out.time = `${hh}:${mm}`;
  }

  /* Wind */
  if (metar.windDir && metar.windSpeed) {
    out.wind = `${metar.windDir}° / ${metar.windSpeed}kt`;
  }

  /* Visibility */
  if (metar.visibility) {
    out.vis = `${metar.visibility}m`;
  }

  /* Cloud */
  if (metar.cloudLayers && metar.cloudLayers.length > 0) {
    const c = metar.cloudLayers[0];
    out.cloud = `${c.cover} ${c.baseFt}ft`;
  }

  /* QNH */
  if (metar.altimeter && metar.altimeter.value) {
    out.qnh = `${metar.altimeter.value} hPa`;
  }

  /* Flight Category */
  if (metar.flightCategory) {
    out.cat = metar.flightCategory;
  }

  return out;
}

/* ------------------------------------------------------------
   Update DOM
------------------------------------------------------------ */
function updateAirfieldWX(decoded) {
  if (!decoded) return;

  document.getElementById("metar-time").textContent = `Obs: ${decoded.time}`;
  document.getElementById("metar-wind").textContent = decoded.wind;
  document.getElementById("metar-vis").textContent = decoded.vis;
  document.getElementById("metar-cloud").textContent = decoded.cloud;
  document.getElementById("metar-qnh").textContent = decoded.qnh;
  document.getElementById("metar-cat").textContent = decoded.cat;
}

/* ------------------------------------------------------------
   Fetch METAR
------------------------------------------------------------ */
async function fetchAirfieldWX() {
  try {
    const res = await fetch(METAR_URL);
    const data = await res.json();

    if (!data || !data[0]) return;

    const decoded = decodeMetar(data[0]);
    updateAirfieldWX(decoded);

  } catch (err) {
    console.error("METAR fetch error:", err);
  }
}

/* ------------------------------------------------------------
   Auto‑refresh every 5 minutes
------------------------------------------------------------ */
setInterval(fetchAirfieldWX, 5 * 60 * 1000);

/* ------------------------------------------------------------
   Initial load
------------------------------------------------------------ */
document.addEventListener("mfd-ready", () => {
  fetchAirfieldWX();
});

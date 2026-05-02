/* ===========================================================
   AIRFIELD WX — METAR + TAF
=========================================================== */

async function fetchAirfieldWX() {
  const container = document.getElementById("airfieldwx-container");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch("https://avwx.rest/api/metar/YBSU?format=json");
    const metar = await res.json();

    const tafRes = await fetch("https://avwx.rest/api/taf/YBSU?format=json");
    const taf = await tafRes.json();

    container.innerHTML = `
      <div class="airfield-section">
        <div class="airfield-title">METAR</div>
        <div class="airfield-row"><span>Temp</span><span>${metar.temperature.value}°C</span></div>
        <div class="airfield-row"><span>Wind</span><span>${metar.wind_speed.value} kt</span></div>
        <div class="airfield-row"><span>Vis</span><span>${metar.visibility.value} m</span></div>
      </div>

      <div class="airfield-section">
        <div class="airfield-title">TAF</div>
        <div>${taf.raw}</div>
      </div>
    `;

  } catch (e) {
    container.innerHTML = "Error loading METAR/TAF";
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", fetchAirfieldWX);

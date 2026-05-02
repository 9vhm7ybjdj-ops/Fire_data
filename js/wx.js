/* ===========================================================
   FULL LIVE WX — OPEN-METEO
   4 STATIONS + WIND DIR TEXT + ALL FIELDS
   WIND SPEED + GUSTS IN km/h
   REAL WX TIMESTAMP (BOTTOM RIGHT)
=========================================================== */

const stations = [
  { name: "Nambour", lat: -26.626, lon: 152.959 },
  { name: "Beerburrum", lat: -26.953, lon: 152.959 },
  { name: "Tewantin", lat: -26.391, lon: 153.037 },
  { name: "Sunshine Coast Airport", lat: -26.603, lon: 153.091 }
];

// Convert degrees → compass text
function degToCompass(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

async function fetchStationWX(station) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lon}` +
    `&current=temperature_2m,relative_humidity_2m,dew_point_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,cloud_cover`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current;

    return {
      name: station.name,
      temp: c.temperature_2m,
      rh: c.relative_humidity_2m,
      dew: c.dew_point_2m,
      wind: (c.wind_speed_10m * 3.6).toFixed(0),   // m/s → km/h
      gust: (c.wind_gusts_10m * 3.6).toFixed(0),   // m/s → km/h
      dirDeg: c.wind_direction_10m,
      dirTxt: degToCompass(c.wind_direction_10m),
      rain: c.precipitation,
      cloud: c.cloud_cover,
      time: c.time // <-- REAL WX TIMESTAMP
    };

  } catch (err) {
    return {
      name: station.name,
      temp: "--",
      rh: "--",
      dew: "--",
      wind: "--",
      gust: "--",
      dirDeg: "--",
      dirTxt: "--",
      rain: "--",
      cloud: "--",
      time: null
    };
  }
}

function formatWXTime(utcString) {
  if (!utcString) return "--";

  // Convert UTC → local Sunshine Coast time
  const date = new Date(utcString + "Z");

  return date.toLocaleString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Australia/Brisbane"
  });
}

async function loadWX() {
  const grid = document.getElementById("wx-grid");
  grid.innerHTML = "Loading...";

  const results = await Promise.all(stations.map(fetchStationWX));

  // Use timestamp from the FIRST station (all 4 share the same model time)
  const wxTime = results[0].time;
  const formattedTime = formatWXTime(wxTime);

  grid.innerHTML = results.map(s => `
    <div class="wx-tile">
      <strong>${s.name}</strong><br>
      Temp: ${s.temp}°C<br>
      Dew Pt: ${s.dew}°C<br>
      RH: ${s.rh}%<br>
      Wind: ${s.wind} km/h (${s.dirTxt} ${s.dirDeg}°)<br>
      Gust: ${s.gust} km/h<br>
      Rain: ${s.rain} mm<br>
      Cloud: ${s.cloud}%
    </div>
  `).join("");

  // Update timestamp
  const ts = document.getElementById("wx-timestamp");
  ts.textContent = `Last WX Update: ${formattedTime}`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadWX();

  // Create timestamp element if missing
  if (!document.getElementById("wx-timestamp")) {
    const ts = document.createElement("div");
    ts.id = "wx-timestamp";
    ts.style.position = "absolute";
    ts.style.bottom = "10px";
    ts.style.right = "20px";
    ts.style.color = "#0f0";
    ts.style.fontFamily = "Share Tech Mono, monospace";
    ts.style.fontSize = "16px";
    document.getElementById("crt").appendChild(ts);
  }
});

// Auto-refresh every 5 minutes
setInterval(loadWX, 300000);

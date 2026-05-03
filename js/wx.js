/* ============================================================
   WX ENGINE — Clean, stable, Version A compatible
   Fetches nearest gridpoint, pulls forecast, renders tiles
============================================================ */

/* -------------------------------
   CONFIG
-------------------------------- */

const WX_API = "https://api.weather.gov";

/* -------------------------------
   MAIN ENTRY
-------------------------------- */

async function loadWX() {
  try {
    const coords = await getUserLocation();
    const grid = await getGridpoint(coords.lat, coords.lon);
    const forecast = await getForecast(grid.gridId, grid.gridX, grid.gridY);

    renderWX(forecast);
  } catch (err) {
    console.error("WX ERROR:", err);
    document.getElementById("wx-page-content").innerHTML =
      `<div class="wx-tile"><h3>WX ERROR</h3><p>${err}</p></div>`;
  }
}

/* -------------------------------
   GET USER LOCATION
-------------------------------- */

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      },
      err => reject("Location denied")
    );
  });
}

/* -------------------------------
   GET GRIDPOINT FROM LAT/LON
-------------------------------- */

async function getGridpoint(lat, lon) {
  const url = `${WX_API}/points/${lat},${lon}`;
  const res = await fetch(url);

  if (!res.ok) throw "Failed to get gridpoint";

  const data = await res.json();

  return {
    gridId: data.properties.gridId,
    gridX: data.properties.gridX,
    gridY: data.properties.gridY
  };
}

/* -------------------------------
   GET FORECAST
-------------------------------- */

async function getForecast(gridId, gridX, gridY) {
  const url = `${WX_API}/gridpoints/${gridId}/${gridX},${gridY}/forecast`;
  const res = await fetch(url);

  if (!res.ok) throw "Failed to get forecast";

  const data = await res.json();
  return data.properties.periods;
}

/* -------------------------------
   RENDER WX TILES
-------------------------------- */

function renderWX(periods) {
  const container = document.getElementById("wx-page-content");
  container.innerHTML = "";

  // Use first 3 periods (Today, Tonight, Tomorrow)
  const slice = periods.slice(0, 3);

  slice.forEach(period => {
    const tile = document.createElement("div");
    tile.className = "wx-tile";

    tile.innerHTML = `
      <h3>${period.name}</h3>

      <div class="wx-row">
        <span>Temp</span>
        <span>${period.temperature}°${period.temperatureUnit}</span>
      </div>

      <div class="wx-row">
        <span>Wind</span>
        <span>${period.windSpeed} ${period.windDirection}</span>
      </div>

      <div class="wx-row">
        <span>Forecast</span>
        <span>${period.shortForecast}</span>
      </div>
    `;

    container.appendChild(tile);
  });
}

/* -------------------------------
   AUTO-LOAD WX ON PAGE SHOW
-------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Load WX once at startup
  loadWX();

  // Reload WX when returning to WX page
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.page === "wx-page") {
        loadWX();
      }
    });
  });
});

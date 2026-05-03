/* ============================================================
   WX ENGINE — Open‑Meteo (Correct Version)
   Works globally, works in Australia, no location prompts
============================================================ */

const stations = [
  { name: "Nambour", lat: -26.626, lon: 152.959 },
  { name: "Beerburrum", lat: -26.952, lon: 152.959 },
  { name: "Tewantin", lat: -26.391, lon: 153.037 },
  { name: "Sunshine Coast Airport", lat: -26.603, lon: 153.091 }
];

async function loadWX() {
  const container = document.getElementById("wx-page-content");
  container.innerHTML = "";

  for (const stn of stations) {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${stn.lat}&longitude=${stn.lon}` +
      `&current=temperature_2m,relative_humidity_2m,dew_point_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const c = data.current;

      const tile = document.createElement("div");
      tile.className = "wx-tile";

      tile.innerHTML = `
        <h3>${stn.name}</h3>

        <div class="wx-row">
          <span>Temp</span>
          <span>${c.temperature_2m}°C</span>
        </div>

        <div class="wx-row">
          <span>Humidity</span>
          <span>${c.relative_humidity_2m}%</span>
        </div>

        <div class="wx-row">
          <span>Dew Point</span>
          <span>${c.dew_point_2m}°C</span>
        </div>

        <div class="wx-row">
          <span>Wind</span>
          <span>${c.wind_speed_10m} km/h @ ${c.wind_direction_10m}°</span>
        </div>

        <div class="wx-row">
          <span>Gust</span>
          <span>${c.wind_gusts_10m} km/h</span>
        </div>

        <div class="wx-row">
          <span>Rain</span>
          <span>${c.precipitation} mm</span>
        </div>
      `;

      container.appendChild(tile);

    } catch (err) {
      console.error("WX ERROR:", err);
      container.innerHTML += `<div class="wx-tile"><h3>${stn.name}</h3><p>WX ERROR</p></div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWX();

  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.page === "wx-page") {
        loadWX();
      }
    });
  });
});

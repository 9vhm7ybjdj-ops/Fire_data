/* ===========================================================
   WX TILE DATA (Open-Meteo)
=========================================================== */

const wxStations = [
  { id: "nambour", name: "Nambour", lat: -26.63, lon: 152.96 },
  { id: "maroochydore", name: "Maroochydore", lat: -26.65, lon: 153.09 },
  { id: "caboolture", name: "Caboolture", lat: -27.08, lon: 152.95 },
  { id: "gympie", name: "Gympie", lat: -26.19, lon: 152.66 }
];

function buildWXGrid() {
  const grid = document.getElementById("wx-grid");
  grid.innerHTML = "";

  wxStations.forEach(st => {
    const tile = document.createElement("div");
    tile.className = "wx-tile";
    tile.innerHTML = `
      <div class="wx-title">${st.name}</div>
      <div class="wx-row"><span>Temp</span><span id="${st.id}-temp">--</span></div>
      <div class="wx-row"><span>Wind</span><span id="${st.id}-wind">--</span></div>
      <div class="wx-row"><span>RH</span><span id="${st.id}-rh">--</span></div>
    `;
    grid.appendChild(tile);
  });
}

async function fetchWX() {
  for (const st of wxStations) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${st.lat}&longitude=${st.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      document.getElementById(`${st.id}-temp`).textContent =
        `${data.current.temperature_2m}°C`;

      document.getElementById(`${st.id}-wind`).textContent =
        `${data.current.wind_speed_10m} km/h`;

      document.getElementById(`${st.id}-rh`).textContent =
        `${data.current.relative_humidity_2m}%`;

    } catch (e) {
      console.error("WX fetch failed:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildWXGrid();
  fetchWX();
  setInterval(fetchWX, 300000); // 5 min refresh
});

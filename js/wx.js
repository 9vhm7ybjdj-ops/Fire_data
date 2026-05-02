/* ===========================================================
   WX TILE DATA (Open-Meteo)
   Stations: Nambour, Beerburrum, Tewantin, Sunshine Coast Airport
=========================================================== */

const wxStations = [
  { id: "nambour", name: "Nambour", lat: -26.63, lon: 152.96 },
  { id: "beerburrum", name: "Beerburrum", lat: -26.95, lon: 152.95 },
  { id: "tewantin", name: "Tewantin", lat: -26.39, lon: 153.03 },
  { id: "sunshine", name: "Sunshine Coast Airport", lat: -26.60, lon: 153.09 }
];

/* ===========================================================
   BUILD WX TILE GRID
=========================================================== */

function buildWXGrid() {
  const grid = document.getElementById("wx-grid");
  grid.innerHTML = "";

  wxStations.forEach(st => {
    const tile = document.createElement("div");
    tile.className = "wx-tile";
    tile.innerHTML = `
      <div class="wx-title">${st.name}</div>

      <div class="wx-row"><span>Temp</span><span id="${st.id}-temp">--</span></div>
      <div class="wx-row"><span>Feels</span><span id="${st.id}-feels">--</span></div>
      <div class="wx-row"><span>Dew Pt</span><span id="${st.id}-dew">--</span></div>

      <div class="wx-row"><span>Wind</span><span id="${st.id}-wind">--</span></div>
      <div class="wx-row"><span>Gust</span><span id="${st.id}-gust">--</span></div>

      <div class="wx-row"><span>RH</span><span id="${st.id}-rh">--</span></div>
      <div class="wx-row"><span>Rain 24h</span><span id="${st.id}-rain">--</span></div>

      <div class="wx-row"><span>Obs</span><span id="${st.id}-obs">--</span></div>
    `;
    grid.appendChild(tile);
  });
}

/* ===========================================================
   FETCH WX DATA
=========================================================== */

async function fetchWX() {
  for (const st of wxStations) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${st.lat}&longitude=${st.lon}&current=temperature_2m,apparent_temperature,dew_point_2m,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,rain&timezone=auto`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const c = data.current;

      document.getElementById(`${st.id}-temp`).textContent = `${c.temperature_2m}°C`;
      document.getElementById(`${st.id}-feels`).textContent = `${c.apparent_temperature}°C`;
      document.getElementById(`${st.id}-dew`).textContent = `${c.dew_point_2m}°C`;

      document.getElementById(`${st.id}-wind`).textContent = `${c.wind_speed_10m} km/h`;
      document.getElementById(`${st.id}-gust`).textContent = `${c.wind_gusts_10m} km/h`;

      document.getElementById(`${st.id}-rh`).textContent = `${c.relative_humidity_2m}%`;
      document.getElementById(`${st.id}-rain`).textContent = `${c.rain} mm`;

      document.getElementById(`${st.id}-obs`).textContent = c.time.replace("T", " ");
    } 
    catch (e) {
      console.error("WX fetch failed:", e);
    }
  }
}

/* ===========================================================
   INIT
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  buildWXGrid();
  fetchWX();
  setInterval(fetchWX, 300000); // 5 min refresh
});


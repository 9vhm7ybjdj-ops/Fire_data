document.addEventListener("DOMContentLoaded", () => {

  const stations = [
    {
      id: "nambour",
      name: "Nambour",
      lat: -26.626,
      lon: 152.959
    },
    {
      id: "beerburrum",
      name: "Beerburrum",
      lat: -26.953,
      lon: 152.959
    },
    {
      id: "tewantin",
      name: "Tewantin",
      lat: -26.391,
      lon: 153.038
    },
    {
      id: "sunshine",
      name: "Sunshine Coast Airport",
      lat: -26.603,
      lon: 153.091
    }
  ];

  const wxGrid = document.getElementById("wx-grid");

  // Build the 2×2 grid
  wxGrid.innerHTML = stations.map(s => `
    <div class="wx-tile" id="wx-${s.id}">
      <div class="wx-title">${s.name}</div>
      <div class="wx-temp">--°C</div>
      <div class="wx-wind">Wind: -- km/h</div>
      <div class="wx-gust">Gust: -- km/h</div>
      <div class="wx-dir">Dir: --°</div>
      <div class="wx-hum">Hum: --%</div>
      <div class="wx-rain">Rain: -- mm</div>
      <div class="wx-time">--:--</div>
    </div>
  `).join("");

  function buildUrl(lat, lon) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,relative_humidity_2m,rain&timezone=auto&models=best_match`;
  }

  async function updateStation(station) {
    const url = buildUrl(station.lat, station.lon);

    try {
      const res = await fetch(url);
      const data = await res.json();

      const c = data.current;

      const tile = document.getElementById(`wx-${station.id}`);
      if (!tile) return;

      tile.querySelector(".wx-temp").textContent = `${c.temperature_2m}°C`;
      tile.querySelector(".wx-wind").textContent = `Wind: ${c.wind_speed_10m} km/h`;
      tile.querySelector(".wx-gust").textContent = `Gust: ${c.wind_gusts_10m} km/h`;
      tile.querySelector(".wx-dir").textContent = `Dir: ${c.wind_direction_10m}°`;
      tile.querySelector(".wx-hum").textContent = `Hum: ${c.relative_humidity_2m}%`;
      tile.querySelector(".wx-rain").textContent = `Rain: ${c.rain} mm`;
      tile.querySelector(".wx-time").textContent = c.time.split("T")[1];

    } catch (err) {
      console.error("WX fetch error:", err);
    }
  }

  function updateAll() {
    stations.forEach(updateStation);
  }

  updateAll();
  setInterval(updateAll, 60000);
});

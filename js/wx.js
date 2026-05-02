/* ===========================================================
   LIVE WX — OPEN-METEO FOR YOUR 4 SUNSHINE COAST STATIONS
   Nambour, Beerburrum, Tewantin, Sunshine Coast Airport
=========================================================== */

const stations = [
  {
    name: "Nambour",
    lat: -26.626,
    lon: 152.959
  },
  {
    name: "Beerburrum",
    lat: -26.953,
    lon: 152.959
  },
  {
    name: "Tewantin",
    lat: -26.391,
    lon: 153.037
  },
  {
    name: "Sunshine Coast Airport",
    lat: -26.603,
    lon: 153.091
  }
];

async function fetchStationWX(station) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      name: station.name,
      temp: data.current.temperature_2m,
      rh: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m
    };

  } catch (err) {
    return {
      name: station.name,
      temp: "--",
      rh: "--",
      wind: "--"
    };
  }
}

async function loadWX() {
  const grid = document.getElementById("wx-grid");
  grid.innerHTML = "Loading...";

  const results = await Promise.all(stations.map(fetchStationWX));

  grid.innerHTML = results.map(s => `
    <div class="wx-tile">
      <strong>${s.name}</strong><br>
      Temp: ${s.temp}°C<br>
      Wind: ${s.wind} kt<br>
      RH: ${s.rh}%
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", loadWX);

// Auto-refresh every 5 minutes
setInterval(loadWX, 300000);

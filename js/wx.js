/* ===========================================================
   WX TILE LOADER
=========================================================== */

function loadWX() {
  const grid = document.getElementById("wx-grid");
  grid.innerHTML = `
    <div class="wx-tile">Temp: 22°C</div>
    <div class="wx-tile">Wind: 8kt</div>
    <div class="wx-tile">RH: 41%</div>
    <div class="wx-tile">Rain: 0mm</div>
  `;
}

document.addEventListener("DOMContentLoaded", loadWX);


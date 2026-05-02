/* ===========================================================
   WX TILE LOADER — 2×2 GRID WITH SUNSHINE COAST STATIONS
=========================================================== */

function loadWX() {
  const grid = document.getElementById("wx-grid");

  grid.innerHTML = `
    <div class="wx-tile">
      <strong>YBUD — Buderim</strong><br>
      Temp: 23°C<br>
      Wind: 6kt<br>
      RH: 41%
    </div>

    <div class="wx-tile">
      <strong>YBSU — Sunshine Coast</strong><br>
      Temp: 22°C<br>
      Wind: 8kt<br>
      RH: 39%
    </div>

    <div class="wx-tile">
      <strong>YBBN — Brisbane</strong><br>
      Temp: 24°C<br>
      Wind: 10kt<br>
      RH: 45%
    </div>

    <div class="wx-tile">
      <strong>YBMC — Maroochydore</strong><br>
      Temp: 23°C<br>
      Wind: 7kt<br>
      RH: 42%
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadWX);

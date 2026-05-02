/* ===========================================================
   AIRFIELD WX PAGE
=========================================================== */

function loadAirfieldWX() {
  const container = document.getElementById("airfieldwx-container");

  container.innerHTML = `
    <div class="wx-row">YBUD — Wind 6kt</div>
    <div class="wx-row">YBSU — Temp 23°C</div>
    <div class="wx-row">YBBN — Cloud FEW020</div>
    <div class="wx-row">YBMC — QNH 1016</div>
  `;
}

/* ===========================================================
   INITIALISE AIRFIELD WX ON PAGE LOAD
=========================================================== */

document.addEventListener("DOMContentLoaded", loadAirfieldWX);

/* ===========================================================
   AIRFIELD WX PAGE
=========================================================== */

function loadAirfieldWX() {
  const container = document.getElementById("airfieldwx-container");

  container.innerHTML = `
    <div>YBUD — Wind 6kt</div>
    <div>YBSU — Temp 23°C</div>
    <div>YBBN — Cloud FEW020</div>
    <div>YBMC — QNH 1016</div>
  `;
}

document.addEventListener("DOMContentLoaded", fetchAirfieldWX);

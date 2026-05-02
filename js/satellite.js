/* ===========================================================
   SATELLITE — HIMAWARI
=========================================================== */

let satelliteLoaded = false;

function initSatellite() {
  if (satelliteLoaded) return;
  satelliteLoaded = true;

  const container = document.getElementById("satellite-map");

  const img = document.createElement("img");
  img.src = "https://rammb-slider.cira.colostate.edu/data/imagery/latest/himawari---full_disk/geocolor/1000.jpg";
  img.style.opacity = "0.9";

  container.appendChild(img);
  enableMapControls(container);
}

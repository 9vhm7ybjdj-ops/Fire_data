/* ===========================================================
   COMBO — RADAR + SAT OVERLAY
=========================================================== */

let comboLoaded = false;

function initCombo() {
  if (comboLoaded) return;
  comboLoaded = true;

  const container = document.getElementById("combo-map");

  const sat = document.createElement("img");
  sat.src = "https://rammb-slider.cira.colostate.edu/data/imagery/latest/himawari---full_disk/geocolor/1000.jpg";
  sat.style.opacity = "0.9";

  const radar = document.createElement("img");
  radar.src = "https://tilecache.rainviewer.com/v2/radar/nowcast_0/256/{z}/{x}/{y}/2/1_1.png";
  radar.style.opacity = "0.6";

  container.appendChild(sat);
  container.appendChild(radar);

  enableMapControls(container);
}

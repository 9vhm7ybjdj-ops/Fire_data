/* ===========================================================
   RADAR — RAINVIEWER
=========================================================== */

let radarLoaded = false;

function initRadar() {
  if (radarLoaded) return;
  radarLoaded = true;

  const container = document.getElementById("radar-map");

  const img = document.createElement("img");
  img.src = "https://tilecache.rainviewer.com/v2/radar/nowcast_0/256/{z}/{x}/{y}/2/1_1.png";
  img.style.opacity = "0.8";

  container.appendChild(img);
  enableMapControls(container);
}

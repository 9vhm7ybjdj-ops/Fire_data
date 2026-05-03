/* ===========================================================
   COMBO PAGE — C2 Layout
   Satellite base + Radar overlay + Opacity slider
   Uses the same canvas engine as radar.js and satellite.js
=========================================================== */

let comboSatCanvas, comboSatCtx;
let comboRadarCanvas, comboRadarCtx;

let comboRadarOpacity = 0.7; // default 70%

/* -----------------------------------------------------------
   INIT COMBO PAGE
----------------------------------------------------------- */
function initCombo() {
  comboSatCanvas = document.getElementById("combo-sat");
  comboRadarCanvas = document.getElementById("combo-radar");

  comboSatCtx = comboSatCanvas.getContext("2d");
  comboRadarCtx = comboRadarCanvas.getContext("2d");

  // Bind slider
  const slider = document.getElementById("combo-opacity");
  slider.value = comboRadarOpacity * 100;

  slider.addEventListener("input", (e) => {
    comboRadarOpacity = e.target.value / 100;
    drawCombo(); // redraw with new opacity
  });

  // Initial draw
  drawCombo();
}

/* -----------------------------------------------------------
   DRAW SATELLITE + RADAR OVERLAY
----------------------------------------------------------- */
function drawCombo() {
  if (!comboSatCtx || !comboRadarCtx) return;

  // Clear both layers
  comboSatCtx.clearRect(0, 0, comboSatCanvas.width, comboSatCanvas.height);
  comboRadarCtx.clearRect(0, 0, comboRadarCanvas.width, comboRadarCanvas.height);

  /* ---------------------------------------------------------
     1. Draw Satellite Base Layer
     (Uses your existing satellite engine)
  --------------------------------------------------------- */
  if (window.latestSatelliteImage) {
    comboSatCtx.drawImage(
      window.latestSatelliteImage,
      0, 0,
      comboSatCanvas.width,
      comboSatCanvas.height
    );
  } else {
    comboSatCtx.fillStyle = "black";
    comboSatCtx.fillText("SATELLITE LOADING…", 40, 40);
  }

  /* ---------------------------------------------------------
     2. Draw Radar Overlay Layer
     (Uses your existing radar engine)
  --------------------------------------------------------- */
  comboRadarCtx.globalAlpha = comboRadarOpacity;

  if (window.latestRadarImage) {
    comboRadarCtx.drawImage(
      window.latestRadarImage,
      0, 0,
      comboRadarCanvas.width,
      comboRadarCanvas.height
    );
  } else {
    comboRadarCtx.fillStyle = "yellow";
    comboRadarCtx.fillText("RADAR LOADING…", 40, 40);
  }

  comboRadarCtx.globalAlpha = 1.0; // reset
}

/* -----------------------------------------------------------
   REFRESH HANDLERS
   Called by your radar/satellite update loops
----------------------------------------------------------- */
function comboUpdateSatellite(img) {
  window.latestSatelliteImage = img;
  drawCombo();
}

function comboUpdateRadar(img) {
  window.latestRadarImage = img;
  drawCombo();
}

/* -----------------------------------------------------------
   PAGE ACTIVATION HOOK
   Called when switching to COMBO page
----------------------------------------------------------- */
document.addEventListener("mfd-ready", () => {
  initCombo();
});

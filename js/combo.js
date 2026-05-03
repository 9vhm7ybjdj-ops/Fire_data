/* ============================================================
   COMBO.JS — Radar + Satellite Overlay Engine (C2)
============================================================ */

let comboSatCanvas,
  comboSatCtx,
  comboRadarCanvas,
  comboRadarCtx,
  comboOpacitySlider;

let comboSatelliteImage = null;
let comboRadarImage = null;

function initCombo() {
  comboSatCanvas = document.getElementById("combo-sat");
  comboRadarCanvas = document.getElementById("combo-radar");
  comboOpacitySlider = document.getElementById("combo-opacity");

  if (!comboSatCanvas || !comboRadarCanvas || !comboOpacitySlider) return;

  comboSatCtx = comboSatCanvas.getContext("2d");
  comboRadarCtx = comboRadarCanvas.getContext("2d");

  comboOpacitySlider.addEventListener("input", drawCombo);

  drawCombo();
}

/* ------------------------------------------------------------
   Hooks called by radar.js / satellite.js
------------------------------------------------------------ */
function comboUpdateRadar(img) {
  comboRadarImage = img;
  drawCombo();
}

function comboUpdateSatellite(img) {
  comboSatelliteImage = img;
  drawCombo();
}

/* ------------------------------------------------------------
   Draw Combo Overlay
------------------------------------------------------------ */
function drawCombo() {
  if (!comboSatCtx || !comboRadarCtx) return;

  const w = comboSatCanvas.width;
  const h = comboSatCanvas.height;

  // Clear both
  comboSatCtx.clearRect(0, 0, w, h);
  comboRadarCtx.clearRect(0, 0, w, h);

  // Draw satellite base
  if (comboSatelliteImage) {
    comboSatCtx.drawImage(comboSatelliteImage, 0, 0, w, h);
  }

  // Draw radar overlay with opacity
  if (comboRadarImage) {
    const opacity =
      comboOpacitySlider && comboOpacitySlider.value != null
        ? Number(comboOpacitySlider.value) / 100
        : 0.7;

    comboRadarCtx.save();
    comboRadarCtx.globalAlpha = opacity;
    comboRadarCtx.drawImage(comboRadarImage, 0, 0, w, h);
    comboRadarCtx.restore();
  }
}

/* ------------------------------------------------------------
   Initialisation
------------------------------------------------------------ */
document.addEventListener("mfd-ready", initCombo);

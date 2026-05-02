/* ===========================================================
   SATELLITE PAGE
=========================================================== */

function initSatellite() {
  const canvas = createMapCanvas("satellite-map");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.font = "24px monospace";
  ctx.fillText("SATELLITE DATA", 50, 50);
}

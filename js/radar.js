/* ===========================================================
   RADAR PAGE
=========================================================== */

function initRadar() {
  const canvas = createMapCanvas("radar-map");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "green";
  ctx.font = "24px monospace";
  ctx.fillText("RADAR DATA", 50, 50);
}

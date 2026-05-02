/* ===========================================================
   COMBO PAGE
=========================================================== */

function initCombo() {
  const canvas = createMapCanvas("combo-map");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "yellow";
  ctx.font = "24px monospace";
  ctx.fillText("COMBO OVERLAY", 50, 50);
}

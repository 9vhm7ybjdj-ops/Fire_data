/* ============================================================
   BRIGHTNESS.JS — CRT Brightness Control
============================================================ */

/* ------------------------------------------------------------
   Brightness State
------------------------------------------------------------ */

let brightnessLevel = 1.0; // 100% default


/* ------------------------------------------------------------
   Apply Brightness to CRT Only
------------------------------------------------------------ */

function applyBrightness() {
  const crt = document.getElementById("crt");
  if (!crt) return;

  // Clamp between 20% and 100%
  const clamped = Math.max(0.2, Math.min(1.0, brightnessLevel));

  crt.style.filter = `brightness(${clamped})`;

  console.log(`🔆 Brightness applied: ${Math.round(clamped * 100)}%`);
}


/* ------------------------------------------------------------
   Adjust Brightness (Called by modes.js)
------------------------------------------------------------ */

function adjustBrightness(delta) {
  brightnessLevel += delta;
  brightnessLevel = Math.max(0.2, Math.min(1.0, brightnessLevel));

  applyBrightness();
}


/* ------------------------------------------------------------
   Initialize on MFD Ready
------------------------------------------------------------ */

document.addEventListener("mfd-ready", () => {
  applyBrightness();
});

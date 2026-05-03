/* ============================================================
   SCALING.JS — Responsive MFD Scaling (Avionics-Accurate)
============================================================ */

/* ------------------------------------------------------------
   Target Aspect Ratio (Avionics MFD)
   4:3 is the correct ratio for your CRT layout
------------------------------------------------------------ */

const TARGET_RATIO = 4 / 3;

/* ------------------------------------------------------------
   Scale the Entire MFD
------------------------------------------------------------ */

function scaleMFD() {
  const root = document.getElementById("app-root");
  if (!root) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  const currentRatio = w / h;

  let scale;

  if (currentRatio > TARGET_RATIO) {
    // Screen is too wide → height is limiting factor
    scale = h / 900; // 900px = your design height
  } else {
    // Screen is too tall → width is limiting factor
    scale = w / 1200; // 1200px = your design width
  }

  // Apply scaling
  root.style.transform = `scale(${scale})`;
  root.style.transformOrigin = "top center";

  // Center horizontally
  const scaledWidth = 1200 * scale;
  const offsetX = (w - scaledWidth) / 2;
  root.style.left = `${offsetX}px`;

  // Vertical alignment
  root.style.top = `20px`;

  console.log(`📐 MFD scaled: ${Math.round(scale * 100)}%`);
}

/* ------------------------------------------------------------
   Recalculate on Resize + Orientation Change
------------------------------------------------------------ */

window.addEventListener("resize", scaleMFD);
window.addEventListener("orientationchange", () => {
  setTimeout(scaleMFD, 150);
});

/* ------------------------------------------------------------
   Initialize on MFD Ready
------------------------------------------------------------ */

document.addEventListener("mfd-ready", () => {
  scaleMFD();
});

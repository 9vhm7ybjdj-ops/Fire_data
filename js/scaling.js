/* ============================================================
   SCALING ENGINE — Version A
   Phone‑first, stable, no transform hell
============================================================ */

/*
   The bezel is a fixed virtual size:
   1200 × 900 (defined in bezel.css)

   We scale the ENTIRE bezel uniformly so it fits the screen
   WITHOUT distorting the CRT or buttons.
*/

function scaleMFD() {
  const bezel = document.getElementById("mfd-bezel");
  if (!bezel) return;

  const baseWidth = 1200;
  const baseHeight = 900;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Fit-to-screen scaling (uniform)
  const scale = Math.min(
    screenWidth / baseWidth,
    screenHeight / baseHeight
  );

  bezel.style.transform = `scale(${scale})`;
  bezel.style.transformOrigin = "top center";

  // Center horizontally
  bezel.style.marginLeft = `${(screenWidth - baseWidth * scale) / 2}px`;
}

window.addEventListener("resize", scaleMFD);
window.addEventListener("orientationchange", scaleMFD);

document.addEventListener("DOMContentLoaded", () => {
  scaleMFD();
});

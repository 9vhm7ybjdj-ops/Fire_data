/* ===========================================================
   FULL-PANEL PROPORTIONAL SCALING
   Fits all iPhones, iPads, desktops
=========================================================== */

function scaleMFD() {
  const baseWidth = 1024;
  const baseHeight = 768;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  const mfd = document.getElementById("mfd-container");
  mfd.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleMFD);
window.addEventListener("orientationchange", scaleMFD);
document.addEventListener("DOMContentLoaded", scaleMFD);

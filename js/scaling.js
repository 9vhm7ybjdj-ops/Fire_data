/* ===========================================================
   SCALING ENGINE — FIT 1024×768 INTO ANY SCREEN
=========================================================== */

function scaleMFD() {
  const baseWidth = 1024;
  const baseHeight = 768;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  const wrapper = document.getElementById("scale-wrapper");
  wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleMFD);
window.addEventListener("DOMContentLoaded", scaleMFD);

/* ===========================================================
   SCALING ENGINE — CENTERED, NO CROPPING
=========================================================== */

function scaleMFD() {
  const baseWidth = 1024;
  const baseHeight = 768;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  const wrapper = document.getElementById("scale-wrapper");

  wrapper.style.transform = `scale(${scale})`;

  /* Center vertically + horizontally */
  const offsetX = (window.innerWidth - baseWidth * scale) / 2;
  const offsetY = (window.innerHeight - baseHeight * scale) / 2;

  wrapper.style.position = "absolute";
  wrapper.style.left = `${offsetX}px`;
  wrapper.style.top = `${offsetY}px`;
}

window.addEventListener("resize", scaleMFD);
window.addEventListener("DOMContentLoaded", scaleMFD);

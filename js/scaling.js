/* ===========================================================
   SCALING ENGINE — iPhone SAFE, FULL WIDTH + CENTERED
=========================================================== */

function scaleMFD() {
  const baseWidth = 1024;
  const baseHeight = 768;

  // Use iOS-safe viewport height
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  const scaleX = viewportWidth / baseWidth;
  const scaleY = viewportHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  const wrapper = document.getElementById("scale-wrapper");

  wrapper.style.transform = `scale(${scale})`;

  // Center horizontally and vertically
  const offsetX = (viewportWidth - baseWidth * scale) / 2;
  const offsetY = (viewportHeight - baseHeight * scale) / 2;

  wrapper.style.position = "absolute";
  wrapper.style.left = `${offsetX}px`;
  wrapper.style.top = `${offsetY}px`;
  wrapper.style.transformOrigin = "top left";

  // Prevent iOS Safari from cropping top/bottom
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
}

window.addEventListener("resize", scaleMFD);
window.addEventListener("DOMContentLoaded", scaleMFD);

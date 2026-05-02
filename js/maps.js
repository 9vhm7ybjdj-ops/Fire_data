/* ===========================================================
   MAP UTILITIES
=========================================================== */

function createMapCanvas(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  return canvas;
}

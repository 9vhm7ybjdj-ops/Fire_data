/* ===========================================================
   MAP CONTROLLER — PAN + ZOOM
=========================================================== */

function enableMapControls(container) {
  let scale = 1;
  let posX = 0;
  let posY = 0;
  let dragging = false;
  let startX, startY;

  container.addEventListener("wheel", e => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(0.8, scale), 3);
    container.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
  });

  container.addEventListener("mousedown", e => {
    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
  });

  window.addEventListener("mouseup", () => dragging = false);

  window.addEventListener("mousemove", e => {
    if (!dragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    container.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
  });
}

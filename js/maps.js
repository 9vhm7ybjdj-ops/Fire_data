/* ===========================================================
   MAP ENGINE — CANVAS CREATION + GRID/COASTLINES
=========================================================== */

function createMapCanvas(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 640;
  canvas.id = `${containerId}-canvas`;   // <— CRITICAL

  container.appendChild(canvas);
  return canvas;
}

/* ===========================================================
   GRIDLINES + COASTLINES OVERLAY
=========================================================== */

function drawGridAndCoast(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  // GRIDLINES
  ctx.save();
  ctx.strokeStyle = "rgba(0,255,255,0.15)";
  ctx.lineWidth = 1;

  const step = 64;

  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.restore();

  // COASTLINES (low-opacity OSM tiles)
  const tileSize = 256;
  const zoom = 4;

  const tiles = [
    { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 },
    { x: 8, y: 13 }, { x: 9, y: 13 }, { x: 10, y: 13 },
    { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }
  ];

  tiles.forEach(tile => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://tile.openstreetmap.org/${zoom}/${tile.x}/${tile.y}.png`;

    img.onload = () => {
      ctx.save();
      ctx.globalAlpha = 0.25;
      const px = (tile.x - 8) * tileSize;
      const py = (tile.y - 12) * tileSize;
      ctx.drawImage(img, px, py, tileSize, tileSize);
      ctx.restore();
    };
  });
}

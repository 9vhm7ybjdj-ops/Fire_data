/* ===========================================================
   RADAR PAGE — REAL RAINVIEWER TILES + GRID/COASTLINES
=========================================================== */

function initRadar() {
  const container = document.getElementById("radar-map");
  if (!container) return;

  const canvas = createMapCanvas("radar-map");
  const ctx = canvas.getContext("2d");

  drawGridAndCoast(ctx);
  drawRadarLayer(ctx);
}

/* ===========================================================
   DRAW RADAR LAYER
=========================================================== */

function drawRadarLayer(ctx) {
  const tileSize = 256;
  const zoom = 4;

  const radarUrl = (x, y, z) =>
    `https://tilecache.rainviewer.com/v2/radar/${z}/${x}/${y}/2/1_1.png`;

  const tiles = [
    { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 },
    { x: 8, y: 13 }, { x: 9, y: 13 }, { x: 10, y: 13 },
    { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }
  ];

  tiles.forEach(tile => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = radarUrl(tile.x, tile.y, zoom);

    img.onload = () => {
      const px = (tile.x - 8) * tileSize;
      const py = (tile.y - 12) * tileSize;
      ctx.drawImage(img, px, py, tileSize, tileSize);
    };
  });
}

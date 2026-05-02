/* ===========================================================
   COMBO PAGE — RADAR OVER SATELLITE WITH OPACITY CONTROL
=========================================================== */

let comboOpacity = 0.6; // default radar overlay opacity

function initCombo() {
  const container = document.getElementById("combo-map");
  if (!container) return;

  const canvas = createMapCanvas("combo-map");
  const ctx = canvas.getContext("2d");

  drawComboLayer(ctx);
}

/* ===========================================================
   DRAW COMBO LAYER
=========================================================== */

function drawComboLayer(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const tileSize = 256;
  const zoom = 4;

  /* ------------------------------
     URL PATTERNS
  ------------------------------ */

  const radarUrl = (x, y, z) =>
    `https://tilecache.rainviewer.com/v2/radar/${z}/${x}/${y}/2/1_1.png`;

  const himawariUrl = (x, y, z) =>
    `https://himawari8.nict.go.jp/himawari8/ir/${z}/${x}/${y}.png`;

  /* ------------------------------
     TILE GRID (AUSTRALIA CENTERED)
  ------------------------------ */

  const tiles = [
    { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 },
    { x: 8, y: 13 }, { x: 9, y: 13 }, { x: 10, y: 13 },
    { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }
  ];

  /* ------------------------------
     DRAW SATELLITE BASE LAYER
  ------------------------------ */

  tiles.forEach(tile => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = himawariUrl(tile.x, tile.y, zoom);

    img.onload = () => {
      const px = (tile.x - 8) * tileSize;
      const py = (tile.y - 12) * tileSize;
      ctx.drawImage(img, px, py, tileSize, tileSize);
    };
  });

  /* ------------------------------
     DRAW RADAR OVERLAY (WITH OPACITY)
  ------------------------------ */

  tiles.forEach(tile => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = radarUrl(tile.x, tile.y, zoom);

    img.onload = () => {
      ctx.save();
      ctx.globalAlpha = comboOpacity;

      const px = (tile.x - 8) * tileSize;
      const py = (tile.y - 12) * tileSize;
      ctx.drawImage(img, px, py, tileSize, tileSize);

      ctx.restore();
    };
  });
}

/* ===========================================================
   OPACITY SLIDER (0.0 – 1.0)
=========================================================== */

function setComboOpacity(value) {
  comboOpacity = parseFloat(value);

  const canvas = document.getElementById("combo-map-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  drawComboLayer(ctx);
}

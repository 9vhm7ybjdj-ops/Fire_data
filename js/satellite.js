/* ===========================================================
   SATELLITE PAGE — REAL HIMAWARI-8 TILES (VIS / IR / WV)
=========================================================== */

let currentSatChannel = "ir"; // default channel

function initSatellite() {
  const container = document.getElementById("satellite-map");
  if (!container) return;

  const canvas = createMapCanvas("satellite-map");
  const ctx = canvas.getContext("2d");

  drawSatelliteLayer(ctx, currentSatChannel);
}

/* ===========================================================
   DRAW SATELLITE LAYER
=========================================================== */

function drawSatelliteLayer(ctx, channel) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const tileSize = 256;
  const zoom = 4;

  // Himawari-8 tile URL pattern
  const himawariUrl = (x, y, z, ch) =>
    `https://himawari8.nict.go.jp/himawari8/${ch}/${z}/${x}/${y}.png`;

  // 3x3 tile grid centered on Australia
  const tiles = [
    { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 },
    { x: 8, y: 13 }, { x: 9, y: 13 }, { x: 10, y: 13 },
    { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }
  ];

  tiles.forEach(tile => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = himawariUrl(tile.x, tile.y, zoom, channel);

    img.onload = () => {
      const px = (tile.x - 8) * tileSize;
      const py = (tile.y - 12) * tileSize;
      ctx.drawImage(img, px, py, tileSize, tileSize);
    };
  });
}

/* ===========================================================
   CHANNEL SWITCHING (VIS / IR / WV)
=========================================================== */

function setSatelliteChannel(ch) {
  currentSatChannel = ch;

  const canvas = document.getElementById("satellite-map-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  drawSatelliteLayer(ctx, ch);
}

/* ============================================================
   RADAR.JS — Radar Tile Loader + Canvas Renderer
   Includes comboUpdateRadar() hook for Combo Page (C2)
============================================================ */

let radarCanvas, radarCtx;
let radarImage = new Image();

function initRadar() {
  radarCanvas = document.getElementById("radar-canvas");
  radarCtx = radarCanvas.getContext("2d");

  loadRadarFrame();
}

/* ------------------------------------------------------------
   Load Radar Frame (BOM or Proxy Source)
------------------------------------------------------------ */
function loadRadarFrame() {
  const url = "https://corsproxy.io/?" +
    encodeURIComponent("https://api.rainviewer.com/public/weather-maps.json");

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const frame = data.radar.past[data.radar.past.length - 1];
      const imgUrl = "https://corsproxy.io/?" + encodeURIComponent(frame.path);

      radarImage = new Image();
      radarImage.crossOrigin = "anonymous";
      radarImage.src = imgUrl;

      radarImage.onload = () => {
        window.latestRadarImage = radarImage;

        drawRadar();

        // 🔥 Combo page hook
        if (typeof comboUpdateRadar === "function") {
          comboUpdateRadar(radarImage);
        }
      };
    })
    .catch(err => console.error("Radar load error:", err));
}

/* ------------------------------------------------------------
   Draw Radar Frame
------------------------------------------------------------ */
function drawRadar() {
  if (!radarCtx) return;

  radarCtx.clearRect(0, 0, radarCanvas.width, radarCanvas.height);

  if (radarImage) {
    radarCtx.drawImage(
      radarImage,
      0, 0,
      radarCanvas.width,
      radarCanvas.height
    );
  }
}

/* ------------------------------------------------------------
   Auto-refresh every 5 minutes
------------------------------------------------------------ */
setInterval(loadRadarFrame, 5 * 60 * 1000);

/* ------------------------------------------------------------
   Initial load
------------------------------------------------------------ */
document.addEventListener("mfd-ready", initRadar);

/* ============================================================
   SATELLITE.JS — Satellite Tile Loader + Canvas Renderer
   Includes comboUpdateSatellite() hook for Combo Page (C2)
============================================================ */

let satelliteCanvas, satelliteCtx;
let satelliteImage = new Image();

function initSatellite() {
  satelliteCanvas = document.getElementById("satellite-canvas");
  if (!satelliteCanvas) return;
  satelliteCtx = satelliteCanvas.getContext("2d");

  loadSatelliteFrame();
}

/* ------------------------------------------------------------
   Load Satellite Frame (example GOES/GeoColor via proxy)
------------------------------------------------------------ */
function loadSatelliteFrame() {
  const imgUrl =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/Latest.jpg"
    );

  satelliteImage = new Image();
  satelliteImage.crossOrigin = "anonymous";
  satelliteImage.src = imgUrl;

  satelliteImage.onload = () => {
    window.latestSatelliteImage = satelliteImage;

    drawSatellite();

    // Combo page hook
    if (typeof comboUpdateSatellite === "function") {
      comboUpdateSatellite(satelliteImage);
    }
  };

  satelliteImage.onerror = (err) =>
    console.error("Satellite load error:", err);
}

/* ------------------------------------------------------------
   Draw Satellite Frame
------------------------------------------------------------ */
function drawSatellite() {
  if (!satelliteCtx || !satelliteCanvas) return;

  satelliteCtx.clearRect(0, 0, satelliteCanvas.width, satelliteCanvas.height);

  if (satelliteImage) {
    satelliteCtx.drawImage(
      satelliteImage,
      0,
      0,
      satelliteCanvas.width,
      satelliteCanvas.height
    );
  }
}

/* ------------------------------------------------------------
   Auto-refresh every 10 minutes
------------------------------------------------------------ */
setInterval(loadSatelliteFrame, 10 * 60 * 1000);

/* ------------------------------------------------------------
   Initial load
------------------------------------------------------------ */
document.addEventListener("mfd-ready", initSatellite);

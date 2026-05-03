/* ============================================================
   SATELLITE.JS — Satellite Tile Loader + Canvas Renderer
   Includes comboUpdateSatellite() hook for Combo Page (C2)
============================================================ */

let satCanvas, satCtx;
let satImage = new Image();

function initSatellite() {
  satCanvas = document.getElementById("satellite-canvas");
  satCtx = satCanvas.getContext("2d");

  loadSatelliteFrame();
}

/* ------------------------------------------------------------
   Load Satellite Frame (GOES GeoColor)
------------------------------------------------------------ */
function loadSatelliteFrame() {
  const url = "https://corsproxy.io/?" +
    encodeURIComponent("https://rammb-slider.cira.colostate.edu/data/imagery/latest/goes-16---full_disk/geocolor/1/");

  // Example static filename — replace with your dynamic logic if needed
  const imgUrl = url + "latest.jpg";

  satImage = new Image();
  satImage.crossOrigin = "anonymous";
  satImage.src = imgUrl;

  satImage.onload = () => {
    window.latestSatelliteImage = satImage;

    drawSatellite();

    // 🔥 Combo page hook
    if (typeof comboUpdateSatellite === "function") {
      comboUpdateSatellite(satImage);
    }
  };

  satImage.onerror = () => {
    console.error("Satellite load error");
  };
}

/* ------------------------------------------------------------
   Draw Satellite Frame
------------------------------------------------------------ */
function drawSatellite() {
  if (!satCtx) return;

  satCtx.clearRect(0, 0, satCanvas.width, satCanvas.height);

  if (satImage) {
    satCtx.drawImage(
      satImage,
      0, 0,
      satCanvas.width,
      satCanvas.height
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

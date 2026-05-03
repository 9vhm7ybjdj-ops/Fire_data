/* ============================================================
   MAPS.JS — Canvas Radar + Satellite Engine (No Leaflet)
   Wide CRT (1280×720) — Pan + Zoom (M2)
============================================================ */

/* ------------------------------------------------------------
   CANVAS ELEMENTS
------------------------------------------------------------ */
const radarCanvas = document.getElementById("radar-canvas");
const satCanvas = document.getElementById("satellite-canvas");

const radarCtx = radarCanvas.getContext("2d");
const satCtx = satCanvas.getContext("2d");

/* ------------------------------------------------------------
   VIEWPORT STATE (Pan + Zoom)
------------------------------------------------------------ */
let view = {
  x: 0,
  y: 0,
  zoom: 1.0
};

let isPanning = false;
let lastX = 0;
let lastY = 0;

/* ------------------------------------------------------------
   TILE SOURCES (BOM Radar + Himawari VIS)
   These URLs are stable and public.
------------------------------------------------------------ */
const RADAR_URL =
  "https://api.rainviewer.com/public/weather-maps.json";

const SAT_URL =
  "https://rammb-slider.cira.colostate.edu/data/imagery/latest_full_disk/geocolor/latest.jpg";

/* ------------------------------------------------------------
   IMAGE BUFFERS
------------------------------------------------------------ */
let radarImg = new Image();
let satImg = new Image();

/* ------------------------------------------------------------
   FETCH RADAR (RainViewer)
------------------------------------------------------------ */
async function fetchRadar() {
  try {
    const res = await fetch(RADAR_URL);
    const data = await res.json();

    const latest = data.radar.past.slice(-1)[0];
    const tileUrl = data.host + latest.path + "/0/0/0.png";

    radarImg = new Image();
    radarImg.crossOrigin = "anonymous";
    radarImg.src = tileUrl;

    radarImg.onload = () => drawRadar();

  } catch (err) {
    console.error("Radar fetch error:", err);
  }
}

/* ------------------------------------------------------------
   FETCH SATELLITE (Himawari GeoColor)
------------------------------------------------------------ */
async function fetchSatellite() {
  try {
    satImg = new Image();
    satImg.crossOrigin = "anonymous";
    satImg.src = SAT_URL;

    satImg.onload = () => drawSatellite();

  } catch (err) {
    console.error("Satellite fetch error:", err);
  }
}

/* ------------------------------------------------------------
   DRAW RADAR
------------------------------------------------------------ */
function drawRadar() {
  radarCtx.clearRect(0, 0, radarCanvas.width, radarCanvas.height);

  if (!radarImg.complete) return;

  radarCtx.save();
  radarCtx.translate(view.x, view.y);
  radarCtx.scale(view.zoom, view.zoom);

  radarCtx.drawImage(radarImg, 0, 0, radarCanvas.width, radarCanvas.height);

  radarCtx.restore();
}

/* ------------------------------------------------------------
   DRAW SATELLITE
------------------------------------------------------------ */
function drawSatellite() {
  satCtx.clearRect(0, 0, satCanvas.width, satCanvas.height);

  if (!satImg.complete) return;

  satCtx.save();
  satCtx.translate(view.x, view.y);
  satCtx.scale(view.zoom, view.zoom);

  satCtx.drawImage(satImg, 0, 0, satCanvas.width, satCanvas.height);

  satCtx.restore();
}

/* ------------------------------------------------------------
   PAN + ZOOM HANDLERS
------------------------------------------------------------ */
function startPan(e) {
  isPanning = true;
  lastX = e.clientX;
  lastY = e.clientY;
}

function movePan(e) {
  if (!isPanning) return;

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  view.x += dx;
  view.y += dy;

  lastX = e.clientX;
  lastY = e.clientY;

  drawRadar();
  drawSatellite();
}

function endPan() {
  isPanning = false;
}

function zoomMap(e) {
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  view.zoom = Math.min(4.0, Math.max(0.5, view.zoom + delta));

  drawRadar();
  drawSatellite();
}

/* ------------------------------------------------------------
   ATTACH EVENTS TO BOTH CANVASES
------------------------------------------------------------ */
function attachCanvasEvents(canvas) {
  canvas.addEventListener("mousedown", startPan);
  canvas.addEventListener("mousemove", movePan);
  canvas.addEventListener("mouseup", endPan);
  canvas.addEventListener("mouseleave", endPan);
  canvas.addEventListener("wheel", zoomMap);
}

attachCanvasEvents(radarCanvas);
attachCanvasEvents(satCanvas);

/* ------------------------------------------------------------
   PAGE SWITCH REDRAW
------------------------------------------------------------ */
document.addEventListener("page-changed", (e) => {
  if (e.detail === "radar-page") drawRadar();
  if (e.detail === "satellite-page") drawSatellite();
});

/* ------------------------------------------------------------
   INITIAL LOAD
------------------------------------------------------------ */
document.addEventListener("mfd-ready", () => {
  fetchRadar();
  fetchSatellite();

  // Refresh radar/sat every 10 minutes
  setInterval(fetchRadar, 10 * 60 * 1000);
  setInterval(fetchSatellite, 10 * 60 * 1000);
});

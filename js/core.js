/* ============================================================
   CORE.JS — PAGE SWITCHING + MODE SWITCHING + CLICK SOUND
   Wide CRT (1280×720) — Canvas Radar/Sat
============================================================ */

/* ------------------------------------------------------------
   Mechanical Click Sound (Generated Programmatically)
------------------------------------------------------------ */
let suppressClicks = false;

function playClick() {
  if (suppressClicks) return;

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 420;

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/* ------------------------------------------------------------
   PAGE SWITCHING
------------------------------------------------------------ */
const pages = document.querySelectorAll(".mfd-page");
const pageButtons = document.querySelectorAll("[data-page]");

function showPage(id) {
  pages.forEach(p => p.classList.remove("active-page"));
  document.getElementById(id).classList.add("active-page");

  pageButtons.forEach(btn => btn.classList.remove("active-mode"));
  const activeBtn = document.querySelector(`[data-page="${id}"]`);
  if (activeBtn) activeBtn.classList.add("active-mode");

  playClick();

  document.dispatchEvent(new CustomEvent("page-changed", { detail: id }));
}

/* ------------------------------------------------------------
   MODE SWITCHING (NORMAL / NVG / RED)
------------------------------------------------------------ */
const crt = document.getElementById("crt");
const modeButtons = document.querySelectorAll("[data-action]");

function setMode(mode) {
  crt.classList.remove("normal-mode", "nvg-mode", "red-mode");

  if (mode === "mode-normal") crt.classList.add("normal-mode");
  if (mode === "mode-nvg") crt.classList.add("nvg-mode");
  if (mode === "mode-red") crt.classList.add("red-mode");

  modeButtons.forEach(btn => btn.classList.remove("active-mode"));
  const active = document.querySelector(`[data-action="${mode}"]`);
  if (active) active.classList.add("active-mode");

  playClick();
}

/* ------------------------------------------------------------
   BRIGHTNESS CONTROL (DIM ONLY)
------------------------------------------------------------ */
let brightness = 1.0;

function dimBrightness() {
  brightness -= 0.1;
  if (brightness < 0.3) brightness = 1.0;

  crt.style.filter = `brightness(${brightness})`;
  playClick();
}

/* ------------------------------------------------------------
   EVENT LISTENERS
------------------------------------------------------------ */
pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.getAttribute("data-page");
    showPage(page);
  });
});

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    if (action === "brightness-down") {
      dimBrightness();
    } else {
      setMode(action);
    }
  });
});

/* ------------------------------------------------------------
   OPTION B — DELAYED MFD READY
------------------------------------------------------------ */
function fireMfdReady() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.dispatchEvent(new Event("mfd-ready"));
        console.log("🔥 MFD READY — CRT + scaling stable");
      });
    });
  });
}

/* ------------------------------------------------------------
   INITIAL PAGE LOAD (NO CLICK SOUNDS)
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  suppressClicks = true;

  setMode("mode-normal");
  showPage("wx-page");

  suppressClicks = false;

  fireMfdReady();
});
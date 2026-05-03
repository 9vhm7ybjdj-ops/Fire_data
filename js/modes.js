/* ============================================================
   MODES.JS — NVG, RED, NORMAL Modes
============================================================ */

/* ------------------------------------------------------------
   Mode State
------------------------------------------------------------ */

let currentMode = "normal";

/* ------------------------------------------------------------
   Apply Mode to Body
------------------------------------------------------------ */

function applyMode(mode) {
  const body = document.body;

  body.classList.remove("nvg-mode", "red-mode");

  switch (mode) {
    case "nvg":
      body.classList.add("nvg-mode");
      break;

    case "red":
      body.classList.add("red-mode");
      break;

    default:
      // normal mode = no class
      break;
  }

  currentMode = mode;
  console.log(`🎛 Mode set to: ${mode.toUpperCase()}`);
}

/* ------------------------------------------------------------
   Listen for Mode Button Actions
------------------------------------------------------------ */

document.addEventListener("mfd-action", (e) => {
  const action = e.detail;

  if (action === "mode-normal") {
    applyMode("normal");
  }

  if (action === "mode-nvg") {
    applyMode("nvg");
  }

  if (action === "mode-red") {
    applyMode("red");
  }

  if (action === "brightness-down") {
    adjustBrightness(-0.1);
  }
});

/* ------------------------------------------------------------
   Brightness Control (Shared with brightness.js)
------------------------------------------------------------ */

let brightnessLevel = 1.0;

function adjustBrightness(delta) {
  brightnessLevel = Math.max(0.2, Math.min(1.0, brightnessLevel + delta));

  const crt = document.getElementById("crt");
  if (crt) {
    crt.style.filter = `brightness(${brightnessLevel})`;
  }

  console.log(`🔆 Brightness: ${Math.round(brightnessLevel * 100)}%`);
}

/* ------------------------------------------------------------
   Initialize Mode on MFD Ready
------------------------------------------------------------ */

document.addEventListener("mfd-ready", () => {
  applyMode(currentMode);
});

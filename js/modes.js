/* ===========================================================
   MODE SWITCHING — NORMAL / NVG / RED
=========================================================== */

const body = document.body;
const modeButtons = {
  normal: document.getElementById("btn-normal"),
  nvg: document.getElementById("btn-nvg"),
  red: document.getElementById("btn-red")
};

/* ===========================================================
   CLEAR EXISTING MODE CLASSES
=========================================================== */
function clearModes() {
  body.classList.remove("normal-mode", "nvg-mode", "red-mode");
}

/* ===========================================================
   APPLY SELECTED MODE
=========================================================== */
function setMode(mode) {
  clearModes();
  body.classList.add(`${mode}-mode`);

  // Update active button highlight
  Object.keys(modeButtons).forEach(key => {
    modeButtons[key].classList.toggle("active-mode", key === mode);
  });
}

/* ===========================================================
   EVENT LISTENERS
=========================================================== */
modeButtons.normal.addEventListener("click", () => setMode("normal"));
modeButtons.nvg.addEventListener("click", () => setMode("nvg"));
modeButtons.red.addEventListener("click", () => setMode("red"));

/* ===========================================================
   INITIALIZE DEFAULT MODE
=========================================================== */
setMode("normal");

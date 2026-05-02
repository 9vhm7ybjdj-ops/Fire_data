/* ===========================================================
   MODE SWITCHING — NORMAL / NVG / RED
=========================================================== */

const body = document.body;

const btnNormal = document.getElementById("btn-normal");
const btnNVG = document.getElementById("btn-nvg");
const btnRed = document.getElementById("btn-red");

/* Remove all mode classes */
function clearModes() {
  body.classList.remove("normal-mode", "nvg-mode", "red-mode");
}

/* Apply selected mode */
function setMode(mode) {
  clearModes();
  body.classList.add(`${mode}-mode`);

  // Update active button highlight
  btnNormal.classList.toggle("active-mode", mode === "normal");
  btnNVG.classList.toggle("active-mode", mode === "nvg");
  btnRed.classList.toggle("active-mode", mode === "red");
}

/* Button listeners */
btnNormal.addEventListener("click", () => setMode("normal"));
btnNVG.addEventListener("click", () => setMode("nvg"));
btnRed.addEventListener("click", () => setMode("red"));

/* Default mode on load */
setMode("normal");

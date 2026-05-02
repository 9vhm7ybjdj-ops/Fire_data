/* ===========================================================
   MODE SWITCHING (NVG / RED / NORMAL)
=========================================================== */

function setMode(mode) {
  document.body.classList.remove("nvg", "red");

  if (mode === "nvg") document.body.classList.add("nvg");
  if (mode === "red") document.body.classList.add("red");
}

/* ===========================================================
   MODE BUTTON HANDLERS + CLICK SOUND
=========================================================== */

document.getElementById("btn-nvg").addEventListener("click", () => {
  playClick();
  setMode("nvg");

  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active-mode"));
  document.getElementById("btn-nvg").classList.add("active-mode");
});

document.getElementById("btn-red").addEventListener("click", () => {
  playClick();
  setMode("red");

  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active-mode"));
  document.getElementById("btn-red").classList.add("active-mode");
});

document.getElementById("btn-normal").addEventListener("click", () => {
  playClick();
  setMode("normal");

  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active-mode"));
  document.getElementById("btn-normal").classList.add("active-mode");
});

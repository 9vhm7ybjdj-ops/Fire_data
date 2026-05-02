/* ===========================================================
   MODES — NVG / RED / NORMAL + ACTIVE BUTTON HIGHLIGHT
=========================================================== */

const modeButtons = document.querySelectorAll(".mode-btn");

function setActiveMode(btn) {
  modeButtons.forEach(b => b.classList.remove("active-mode"));
  btn.classList.add("active-mode");
}

document.getElementById("btn-nvg").addEventListener("click", (e) => {
  document.body.classList.add("nvg");
  document.body.classList.remove("red");
  setActiveMode(e.target);
  playClick();
});

document.getElementById("btn-red").addEventListener("click", (e) => {
  document.body.classList.add("red");
  document.body.classList.remove("nvg");
  setActiveMode(e.target);
  playClick();
});

document.getElementById("btn-normal").addEventListener("click", (e) => {
  document.body.classList.remove("nvg");
  document.body.classList.remove("red");
  setActiveMode(e.target);
  playClick();
});

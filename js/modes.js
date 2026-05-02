/* ===========================================================
   MODES — NVG / RED / NORMAL
=========================================================== */

document.getElementById("btn-nvg").addEventListener("click", () => {
  document.body.classList.add("nvg");
  document.body.classList.remove("red");
});

document.getElementById("btn-red").addEventListener("click", () => {
  document.body.classList.add("red");
  document.body.classList.remove("nvg");
});

document.getElementById("btn-normal").addEventListener("click", () => {
  document.body.classList.remove("nvg");
  document.body.classList.remove("red");
});

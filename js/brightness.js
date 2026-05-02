/* ===========================================================
   BRIGHTNESS CONTROL
=========================================================== */

const slider = document.getElementById("brightness-slider");

slider.addEventListener("input", () => {
  const level = slider.value;
  document.documentElement.style.setProperty("--brightness-level", level);
});

/* ============================================================
   AVIONICS LED + SOUND ENGINE
   Hard LED, click sound, CRT reflection sync
============================================================ */

let clickSound = new Audio("assets/click.mp3"); // You supply the file

function setupIllumination() {
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // LED reflection toggle
      document.body.classList.add("led-active");
      setTimeout(() => document.body.classList.remove("led-active"), 120);

      // Play click sound
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    });
  });
}

document.addEventListener("DOMContentLoaded", setupIllumination);

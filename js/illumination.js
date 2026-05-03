/* ============================
   ILLUMINATION CONTROLLER
   ============================ */

document.addEventListener("DOMContentLoaded", () => {

  const illumBtn = document.querySelector(".illum-btn");
  const allButtons = document.querySelectorAll(".bezel-btn");

  // Optional click sound
  let clickSound = null;
  try {
    clickSound = new Audio("assets/click.mp3");
  } catch (e) {
    console.warn("Click sound not found (assets/click.mp3)");
  }

  /* ----------------------------
     ILLUMINATION TOGGLE
     ---------------------------- */
  const toggleIllumination = () => {
    document.body.classList.toggle("illum-on");
    document.body.classList.toggle("illum-off");

    illumBtn.classList.toggle("led-on");

    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  illumBtn.addEventListener("click", toggleIllumination);


  /* ----------------------------
     SYNC LED STATES ON LOAD
     ---------------------------- */
  const syncLEDs = () => {
    const illumOn = document.body.classList.contains("illum-on");

    allButtons.forEach(btn => {
      if (btn.classList.contains("led-on")) {
        btn.style.filter = illumOn ? "brightness(1.0)" : "brightness(0.55)";
      }
    });
  };

  syncLEDs();
});

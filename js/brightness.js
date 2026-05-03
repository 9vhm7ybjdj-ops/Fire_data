/* ==========================================
   BRIGHTNESS KNOB — FINAL FIX
   - Step order: 4 → 3 → 2 → 1 → 4
   - Step 4 = brightest (bottom-right)
   - Angles aligned to detent geometry
   - Brightness NON-INVERTED (CRT already inverts)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const rotateGroup = document.querySelector("#dim-knob .knob-rotate");

  let step = 4; // default

const stepAngles = {
  1: 225, // bottom-left
  2: 315, // top-left
  3: 45,  // top-right
  4: 135  // bottom-right (FULL BRIGHTNESS)
};


  const applyBrightness = () => {
    // DO NOT INVERT — CRT pipeline already inverts
    const brightness = step / 4;
    document.documentElement.style.setProperty("--crt-brightness", brightness);

    rotateGroup.style.transform = `rotate(${stepAngles[step]}deg)`;
  };

  // CLOCKWISE cycle: 4 → 3 → 2 → 1 → 4
  rotateGroup.addEventListener("click", () => {
    step--;
    if (step < 1) step = 4;
    applyBrightness();
  });

  window.addEventListener("load", () => {
    step = 4;
    applyBrightness();
  });
});

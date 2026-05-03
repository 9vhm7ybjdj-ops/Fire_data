/* ============================================================
   BRIGHTNESS ENGINE — Version A
   Subtle dimming for NVG/RED modes
   No bleed, no conflicts, no layout impact
============================================================ */

function applyBrightness() {
  const body = document.body;

  // Default brightness (Normal mode)
  let brightness = 1;

  if (body.classList.contains("nvg-mode")) {
    brightness = 0.55; // NVG-safe dim
  }

  if (body.classList.contains("red-mode")) {
    brightness = 0.75; // Red mode slightly dimmer
  }

  // Apply brightness to CRT only
  const crt = document.getElementById("crt");
  if (crt) {
    crt.style.filter = `brightness(${brightness})`;
  }
}

/* ============================================================
   HOOK INTO MODE CHANGES
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyBrightness();

  // Reapply brightness whenever a mode button is pressed
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (!action) return;

      if (
        action === "mode-normal" ||
        action === "mode-nvg" ||
        action === "mode-red"
      ) {
        // Delay ensures body class is updated first
        setTimeout(applyBrightness, 10);
      }
    });
  });
});

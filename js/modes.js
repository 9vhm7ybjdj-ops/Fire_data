/* ============================================================
   MODES CONTROLLER
   Normal / NVG / RED
   Clean, stable, Version A compatible
============================================================ */

function setMode(mode) {
  document.body.classList.remove("nvg-mode", "red-mode");

  switch (mode) {
    case "normal":
      // Normal mode = no extra class
      break;

    case "nvg":
      document.body.classList.add("nvg-mode");
      break;

    case "red":
      document.body.classList.add("red-mode");
      break;

    default:
      console.warn("Unknown mode:", mode);
  }
}

/* ============================================================
   BUTTON EVENT HOOKS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    const action = btn.dataset.action;

    if (!action) return;

    btn.addEventListener("click", () => {
      if (action === "mode-normal") setMode("normal");
      if (action === "mode-nvg") setMode("nvg");
      if (action === "mode-red") setMode("red");
    });
  });
});

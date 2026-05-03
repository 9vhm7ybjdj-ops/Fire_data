document.addEventListener("DOMContentLoaded", () => {
  const modeButtons = document.querySelectorAll(".mode-btn");

  function setMode(mode) {
    // Remove active state from all mode buttons
    modeButtons.forEach(b => b.classList.remove("active-mode"));

    // Find the correct button
    const btn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
    if (btn) btn.classList.add("active-mode");

    // Update body class
    document.body.classList.remove("normal", "nvg", "red");
    document.body.classList.add(mode);
  }

  // MODE BUTTON HANDLING
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      setMode(mode);
    });
  });

  // INITIAL MODE = NORMAL
  setMode("normal");
});
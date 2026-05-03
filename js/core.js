/* ============================================================
   CORE PAGE + BUTTON CONTROLLER
   Version A — Clean, stable, no drift
============================================================ */

/* -------------------------------
   PAGE SWITCHING
-------------------------------- */

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".mfd-page").forEach(p => {
    p.classList.remove("active-page");
  });

  // Show selected page
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add("active-page");
  }

  // Update button highlight
  updateActiveButton(pageId);
}

/* -------------------------------
   BUTTON ACTIVE STATE
-------------------------------- */

function updateActiveButton(pageId) {
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.classList.remove("active-btn");

    if (btn.dataset.page === pageId) {
      btn.classList.add("active-btn");
    }
  });
}

/* -------------------------------
   BUTTON EVENT ROUTING
-------------------------------- */

function setupButtonEvents() {
  document.querySelectorAll(".bezel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      const action = btn.dataset.action;

      if (page) {
        showPage(page);
      }

      if (action) {
        handleAction(action);
      }
    });
  });
}

/* -------------------------------
   ACTION HANDLER (Modes, etc.)
-------------------------------- */

function handleAction(action) {
  switch (action) {
    case "mode-normal":
      document.body.classList.remove("nvg-mode", "red-mode");
      break;

    case "mode-nvg":
      document.body.classList.add("nvg-mode");
      document.body.classList.remove("red-mode");
      break;

    case "mode-red":
      document.body.classList.add("red-mode");
      document.body.classList.remove("nvg-mode");
      break;

    default:
      console.warn("Unknown action:", action);
  }
}

/* -------------------------------
   INITIALIZE
-------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  setupButtonEvents();
  showPage("wx-page"); // default page
});

/* ============================================================
   CORE.JS — MFD Boot, Page Loader, Event System
============================================================ */

/* ------------------------------------------------------------
   1. FIRE MFD-READY ONLY WHEN CRT EXISTS
------------------------------------------------------------ */

window.addEventListener("DOMContentLoaded", () => {
  const waitForCRT = setInterval(() => {
    const crt = document.getElementById("crt");

    if (crt) {
      clearInterval(waitForCRT);
      console.log("🔥 MFD READY — CRT + scaling stable");
      document.dispatchEvent(new Event("mfd-ready"));
    }
  }, 50);
});


/* ------------------------------------------------------------
   2. PAGE SWITCHING
------------------------------------------------------------ */

function showPage(pageId) {
  const pages = document.querySelectorAll(".mfd-page");
  pages.forEach(p => p.classList.remove("active-page"));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active-page");
  }

  // Update button highlight
  const buttons = document.querySelectorAll(".bezel-btn[data-page]");
  buttons.forEach(btn => {
    if (btn.dataset.page === pageId) {
      btn.classList.add("active-mode");
    } else {
      btn.classList.remove("active-mode");
    }
  });
}


/* ------------------------------------------------------------
   3. COPY PAGE CONTENT INTO CRT ON FIRST LOAD
------------------------------------------------------------ */

document.addEventListener("mfd-ready", () => {
  console.log("📄 Injecting page templates…");

  const pages = [
    "wx",
    "radar",
    "satellite",
    "combo",
    "airfieldwx"
  ];

  pages.forEach(name => {
    const src = document.getElementById(`${name}-page-content`);
    const dst = document.getElementById(`${name}-page`);

    if (src && dst) {
      dst.innerHTML = src.innerHTML;
    }
  });

  // Default page
  showPage("wx-page");
});


/* ------------------------------------------------------------
   4. BUTTON HANDLERS
------------------------------------------------------------ */

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".bezel-btn");
  if (!btn) return;

  // Page buttons
  if (btn.dataset.page) {
    showPage(btn.dataset.page);
  }

  // Mode buttons
  if (btn.dataset.action) {
    document.dispatchEvent(new CustomEvent("mfd-action", {
      detail: btn.dataset.action
    }));
  }
});

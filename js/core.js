/* ===========================================================
   PAGE SWITCHING — WX / RADAR / SAT / COMBO / AIRFIELD WX
=========================================================== */

const pages = document.querySelectorAll(".page");
const pageButtons = document.querySelectorAll(".page-btn");

/* Hide all pages */
function hideAllPages() {
  pages.forEach(p => p.classList.remove("active"));
  pageButtons.forEach(b => b.classList.remove("active-page"));
}

/* Show selected page */
function showPage(pageName) {
  hideAllPages();

  // Activate the page
  const page = document.getElementById(`page-${pageName}`);
  if (page) page.classList.add("active");

  // Highlight the button
  pageButtons.forEach(btn => {
    if (btn.dataset.page === pageName) {
      btn.classList.add("active-page");
    }
  });

  // Fire page-specific events
  if (pageName === "wx") {
    document.dispatchEvent(new Event("load-wx"));
  }
  if (pageName === "radar") {
    document.dispatchEvent(new Event("load-radar"));
  }
  if (pageName === "satellite") {
    document.dispatchEvent(new Event("load-satellite"));
  }
  if (pageName === "combo") {
    document.dispatchEvent(new Event("load-combo"));
  }
  if (pageName === "airfield") {
    document.dispatchEvent(new Event("load-airfieldwx"));
  }
}

/* ===========================================================
   BUTTON CLICK HANDLERS
=========================================================== */

pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;
    showPage(page);
  });
});

/* ===========================================================
   INITIALIZE DEFAULT PAGE
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  showPage("wx"); // Default page
  document.dispatchEvent(new Event("mfd-ready"));
});

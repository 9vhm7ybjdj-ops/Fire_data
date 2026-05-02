/* ===========================================================
   CORE — PAGE SWITCHING + DEPRESSED BUTTON STATE
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const pageButtons = document.querySelectorAll(".page-btn");

  function showPage(id, btn) {
    // Hide all pages
    pages.forEach(p => p.classList.remove("active"));

    // Show selected page
    document.getElementById(`page-${id}`).classList.add("active");

    // Depress selected button
    pageButtons.forEach(b => b.classList.remove("active-page"));
    if (btn) btn.classList.add("active-page");
  }

  // Default page
  showPage("wx");

  // Button switching
  pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page, btn);

      // Initialize pages that require JS
      if (page === "radar") initRadar();
      if (page === "satellite") initSatellite();
      if (page === "combo") initCombo();
      if (page === "airfieldwx") loadAirfieldWX();
    });
  });
});

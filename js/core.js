/* ===========================================================
   CORE — PAGE SWITCHING + INIT
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const buttons = document.querySelectorAll(".mfd-button[data-page]");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${id}`).classList.add("active");
  }

  // Default page
  showPage("wx");

  // Button switching
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page);

      // Map pages need refresh
      if (page === "radar") initRadar();
      if (page === "satellite") initSatellite();
      if (page === "combo") initCombo();
    });
  });
});

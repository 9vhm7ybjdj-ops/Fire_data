document.addEventListener("DOMContentLoaded", () => {
  const pageButtons = document.querySelectorAll(".page-btn");
  const pages = document.querySelectorAll("[data-page-id]");

  // Helper: show a page by ID
  function showPage(pageId) {
    pages.forEach(p => {
      if (p.dataset.pageId === pageId) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  }

  // PAGE BUTTON HANDLING
  pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;

      // Remove active state from all page buttons
      pageButtons.forEach(b => b.classList.remove("active-page"));

      // Add active state to selected button
      btn.classList.add("active-page");

      // Show the selected page
      showPage(page);
    });
  });

  // INITIAL PAGE = WX
  const defaultPage = "wx";
  showPage(defaultPage);

  // Ensure WX button illuminates on load
  const wxBtn = document.querySelector('.page-btn[data-page="wx"]');
  if (wxBtn) wxBtn.classList.add("active-page");
});

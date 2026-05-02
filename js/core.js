/* ===========================================================
   CORE — PAGE SWITCHING + ACTIVE PAGE HIGHLIGHT + CLICK SOUND
=========================================================== */

/* --- CLICK SOUND --- */
const clickAudio = new Audio(
  "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA..."
);

function playClick() {
  clickAudio.currentTime = 0;
  clickAudio.play();
}

/* --- PAGE SWITCHING --- */
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const pageButtons = document.querySelectorAll(".page-btn");

  function showPage(id, btn) {
    // Switch page
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${id}`).classList.add("active");

    // Highlight active page button
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
      playClick();

      // Map pages need refresh
      if (page === "radar") initRadar();
      if (page === "satellite") initSatellite();
      if (page === "combo") initCombo();
    });
  });
});

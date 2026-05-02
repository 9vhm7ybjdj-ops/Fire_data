/* ===========================================================
   SYSTEM-GENERATED MECHANICAL CLICK SOUND
=========================================================== */

function playClick() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 2400;

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/* ===========================================================
   PAGE SWITCHING
=========================================================== */

document.querySelectorAll(".page-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    playClick();

    const page = btn.dataset.page;

    // Switch visible page
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${page}`).classList.add("active");

    // Highlight active button
    document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active-page"));
    btn.classList.add("active-page");

    // Initialise map pages
    if (page === "radar") initRadar();
    if (page === "satellite") initSatellite();
    if (page === "combo") initCombo();
  });
});

/* ===========================================================
   INITIAL PAGE SELECTION (WX)
=========================================================== */

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("page-wx").classList.add("active");
  document.querySelector('.page-btn[data-page="wx"]').classList.add("active-page");

  document.dispatchEvent(new Event("mfd-ready"));
});

/* ===========================================================
   INITIALISE DEFAULT PAGE (WX) — AFTER DOM IS READY
=========================================================== */

window.addEventListener("DOMContentLoaded", () => {
  // Set WX page active
  const wxPage = document.getElementById("page-wx");
  if (wxPage) wxPage.classList.add("active");

  const wxBtn = document.querySelector('.page-btn[data-page="wx"]');
  if (wxBtn) wxBtn.classList.add("active-page");

  // Tell modes.js that the DOM is ready so it can set NORMAL mode
  document.dispatchEvent(new Event("mfd-ready"));
});

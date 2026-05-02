/* ===========================================================
   SYSTEM-GENERATED MECHANICAL CLICK SOUND
=========================================================== */

function playClick() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 2400; // crisp avionics click

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

    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${page}`).classList.add("active");

    document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active-page"));
    btn.classList.add("active-page");
  });
});

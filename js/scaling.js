(function () {
  const root = document.getElementById("mfd-root");

  function applyScale() {
    const designW = 428;
    const designH = 926;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const scale = Math.min(screenW / designW, screenH / designH);

    root.style.position = "absolute";
    root.style.top = "50%";
    root.style.left = "50%";
    root.style.transform = `translate(-50%, -50%) scale(${scale})`;
    root.style.transformOrigin = "center center";
  }

  window.addEventListener("resize", applyScale);
  window.addEventListener("orientationchange", applyScale);

  applyScale();
})();

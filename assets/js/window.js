(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const baseUrl = config.baseUrl || "/";
  const windowContainer = document.getElementById("window-container");
  const loadedWindows = new Map();
  let highestZ = 1000;
  let isMuted = false;
  let hasStarted = false;

  function isMobileViewport() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function getAssetUrl(path) {
    return `${baseUrl}${path.replace(/^\/+/, "")}`;
  }

  function focusWindow(win) {
    if (!win) return;
    highestZ += 1;
    win.style.zIndex = String(highestZ);
  }

  function applyViewportMode(win) {
    if (!win) return;
    win.classList.toggle("mobile", isMobileViewport());
  }

  function applyViewportModeToAll() {
    document.querySelectorAll(".mainwindow").forEach(applyViewportMode);
  }

  function setMinimizeButtonLabel(button, isMinimized) {
    if (!button) return;
    button.textContent = isMinimized ? "[+]" : "[-]";
    button.setAttribute("aria-label", isMinimized ? "Restore window" : "Minimize window");
  }

  function initializeWindow(win) {
    if (!win || win.dataset.windowInitialized) return;

    win.dataset.windowInitialized = "true";
    win.addEventListener("pointerdown", () => focusWindow(win));
    applyViewportMode(win);
    dragElement(win);

    const minimizeButton = win.querySelector(".minimize-btn");
    setMinimizeButtonLabel(minimizeButton, win.classList.contains("minimized"));
  }

  function dragElement(win) {
    const header = document.getElementById(`${win.id}header`) || win.querySelector(".mainwindowheader");
    if (!header) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let activePointerId = null;

    header.addEventListener("pointerdown", (event) => {
      if (isMobileViewport()) return;
      if (event.target.closest("button, a, input, textarea, select")) return;

      event.preventDefault();
      activePointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = win.offsetLeft;
      startTop = win.offsetTop;

      focusWindow(win);
      win.classList.add("dragging");
      playSound("grabSound");
      header.setPointerCapture(activePointerId);
    });

    header.addEventListener("pointermove", (event) => {
      if (event.pointerId !== activePointerId || isMobileViewport()) return;

      const nextLeft = startLeft + event.clientX - startX;
      const nextTop = startTop + event.clientY - startY;
      const maxLeft = Math.max(0, window.innerWidth - win.offsetWidth);
      const maxTop = Math.max(0, window.innerHeight - header.offsetHeight);

      win.style.left = `${Math.min(Math.max(0, nextLeft), maxLeft)}px`;
      win.style.top = `${Math.min(Math.max(0, nextTop), maxTop)}px`;
    });

    function endDrag(event) {
      if (event.pointerId !== activePointerId) return;
      activePointerId = null;
      win.classList.remove("dragging");
      playSound("dropSound");
    }

    header.addEventListener("pointerup", endDrag);
    header.addEventListener("pointercancel", endDrag);
  }

  function showWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    initializeWindow(win);
    playSound("openSound");
    win.classList.remove("closing", "closed", "minimized");
    win.classList.add("active");
    win.style.pointerEvents = "auto";
    focusWindow(win);
    setMinimizeButtonLabel(win.querySelector(".minimize-btn"), false);
  }

  function hideWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    playSound("closeSound");
    win.classList.remove("active", "minimized");
    win.classList.add("closing");
    setMinimizeButtonLabel(win.querySelector(".minimize-btn"), false);

    window.setTimeout(() => {
      win.classList.remove("closing");
      win.classList.add("closed");
      win.style.pointerEvents = "none";
    }, isMobileViewport() ? 0 : 250);
  }

  function loadWindowByName(windowName, windowId) {
    const existingWindow = document.getElementById(windowId);
    if (existingWindow) {
      showWindow(windowId);
      return Promise.resolve(existingWindow);
    }

    if (loadedWindows.has(windowId)) {
      return loadedWindows.get(windowId).then(() => {
        showWindow(windowId);
        return document.getElementById(windowId);
      });
    }

    const request = fetch(`${baseUrl}windows/load_window/${windowName}`, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${windowName}`);
        return response.text();
      })
      .then((html) => {
        if (!windowContainer) throw new Error("Window container is missing");
        windowContainer.insertAdjacentHTML("beforeend", html);
        const win = document.getElementById(windowId);
        initializeWindow(win);
        showWindow(windowId);
        return win;
      })
      .catch((error) => {
        loadedWindows.delete(windowId);
        console.error("Error loading window:", error);
      });

    loadedWindows.set(windowId, request);
    return request;
  }

  function toggleMinimize(button) {
    const windowEl = button.closest(".mainwindow");
    if (!windowEl || !windowEl.classList.contains("active")) return;

    const isMinimized = windowEl.classList.toggle("minimized");
    windowEl.classList.toggle("unminimizing", !isMinimized);
    playSound(isMinimized ? "minSound" : "maxSound");
    setMinimizeButtonLabel(button, isMinimized);

    if (!isMinimized) {
      window.setTimeout(() => windowEl.classList.remove("unminimizing"), 300);
      focusWindow(windowEl);
    }
  }

  function startUp() {
    if (hasStarted) return;
    hasStarted = true;

    const bg = document.getElementById("bgcontainer");
    const getStartedButton = document.getElementById("getStartedButton");
    const muteButton = document.getElementById("muteIcon");
    const shortcutButton = document.getElementById("shortcutButton");
    const minimizeButton = document.getElementById("minimizeButton");
    const vignette = document.getElementById("vignette-transition");

    [bg, muteButton, shortcutButton, minimizeButton].forEach((el) => el && el.classList.remove("invisible"));
    [muteButton, shortcutButton, minimizeButton, getStartedButton].forEach((el) => {
      if (!el) return;
      el.classList.remove("huge");
      el.classList.add("normal");
    });

    vignette && vignette.classList.add("expanded");
    playSound("entrySound");
  }

  function toggleMute() {
    isMuted = !isMuted;
    const muteImage = document.getElementById("muteIconImage");
    const muteButton = document.getElementById("muteIcon");

    if (muteImage) {
      muteImage.src = getAssetUrl(isMuted ? "assets/images/mute.png" : "assets/images/volume.png");
    }

    if (muteButton) {
      muteButton.querySelector("span").textContent = isMuted ? "Sound Muted" : "Mute Sound";
      muteButton.setAttribute("aria-pressed", String(isMuted));
    }

    if (!isMuted) playSound("entrySound");
  }

  function playSound(id) {
    if (isMuted) return;
    const sound = document.getElementById(id);
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function copyEmail() {
    const email = "johanczarpagba@gmail.com";
    const feedback = document.getElementById("copy-feedback");

    navigator.clipboard.writeText(email).then(() => {
      if (!feedback) return;
      feedback.style.display = "block";
      window.setTimeout(() => {
        feedback.style.display = "none";
      }, 2000);
    });
  }

  function minimizeAllWindows() {
    document.querySelectorAll(".mainwindow.active:not(.minimized)").forEach((windowEl) => {
      const minimizeButton = windowEl.querySelector(".minimize-btn");
      if (minimizeButton) toggleMinimize(minimizeButton);
    });
  }

  window.addEventListener("resize", applyViewportModeToAll);

  window.loadWindowByName = loadWindowByName;
  window.showWindow = showWindow;
  window.hideWindow = hideWindow;
  window.toggleMinimize = toggleMinimize;
  window.startUp = startUp;
  window.toggleMute = toggleMute;
  window.playSound = playSound;
  window.copyEmail = copyEmail;
  window.minimizeAllWindows = minimizeAllWindows;
})();

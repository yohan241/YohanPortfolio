let highestZ = 1000;
const main = document.getElementById("main");
let isMuted = false;



function toggleMute(el) {
  isMuted = !isMuted;
  playSound('entrySound')
  const muteIcon = document.getElementById("muteIconb");
  if (muteIcon) {
    muteIcon.src = isMuted 
      ? "<?= base_url(); ?>assets/images/mute.png" 
      : "<?= base_url(); ?>assets/images/speaker.png";
  }


}

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = document.getElementById(elmnt.id + "header");

  const target = header || elmnt;
  target.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (e.target.closest('.close-btn') || e.target.closest('.minimize-btn')) return;

    e.preventDefault();

    // 🆙 Bring window to front
    highestZ++;
    elmnt.style.zIndex = highestZ;

    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.classList.add("dragging");
    playSound('grabSound');
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    playSound('dropSound');
    elmnt.classList.remove("dragging");
  }
}

function showWindow(windowId) {
  const win = document.getElementById(windowId);
  if (!win) return;
  playSound('openSound');
  win.classList.remove("closing", "closed");
  win.classList.add("active");

  // Bring to front
  highestZ++;
  win.style.zIndex = highestZ;

  // Attach drag only once
  if (!win.dataset.dragInitialized) {
    dragElement(win);
    win.dataset.dragInitialized = "true";
  }
}

function hideWindow(windowId) {
  const win = document.getElementById(windowId);
  if (!win) return;
  playSound('closeSound');
  win.classList.remove("active");
  win.classList.add("closing");

  setTimeout(() => {
    win.classList.remove("closing");
    win.classList.add("closed");
  }, 400); // Match animation duration
}

dragElement(main);
main.dataset.dragInitialized = "true";

function loadWindowByName(windowName, windowId) {
  const existingWindow = document.getElementById(windowId);
  if (existingWindow) {
    showWindow(windowId);
    return;
  }

  fetch(`windows/load_window/${windowName}`, {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  .then(response => {
    if (!response.ok) throw new Error("Failed to load window");
    return response.text();
  })
  .then(html => {
    const container = document.getElementById("window-container");
    container.insertAdjacentHTML("beforeend", html);
    showWindow(windowId);
  })
  .catch(err => {
    console.error("Error loading window:", err);
  });
}

function toggleMinimize(button) {
  const windowEl = button.closest('.mainwindow');
  const contentEl = windowEl.querySelector('.mainwindowcontent');

  if (windowEl.classList.contains('minimized')) {
    windowEl.classList.remove('minimized');
    windowEl.classList.add('unminimizing');
    playSound('maxSound');
    setTimeout(() => {
      windowEl.classList.remove('unminimizing');
    }, 300);
  } else {
    windowEl.classList.add('minimized');
    playSound('minSound');
  }

  button.textContent = windowEl.classList.contains('minimized') ? '[+]' : '[–]';

}


function startUp(){
  const bg= document.getElementById("bgcontainer");
  const gsb= document.getElementById("getStartedButton");
  const mute= document.getElementById("muteIcon");
    const mutew= document.getElementById("muteIcon2");
  const min= document.getElementById("minimizeButton");
  bg.classList.remove("invisible");
  mute.classList.remove("invisible");
  min.classList.remove("invisible");
  mute.classList.remove("huge");
  mute.classList.add("normal");
  min.classList.remove("huge");
  min.classList.add("normal");
  gsb.classList.remove("huge");
  gsb.classList.add("normal");
  mutew.classList.remove("invisible");
  mutew.classList.remove("huge");
  mutew.classList.add("normal");
  const vignette = document.getElementById("vignette-transition");
  playSound('entrySound');

  vignette.classList.add("expanded");


  

  setTimeout(() => {
     gsb.classList.remove("normal");
  }, 300); 

}

window.addEventListener("resize", () => {
  const win = document.querySelector(".mainwindow");
  if (window.innerWidth <= 768) {
    win.classList.add("mobile");
  } else {
    win.classList.remove("mobile");
  }
});




function closeWindow(win) {
  win.classList.remove('active');
  win.classList.add('closing');

  // Optional: Cleanup after desktop animation ends
  if (window.innerWidth > 768) {
    setTimeout(() => {
      win.classList.remove('closing');
      win.style.zIndex = -10;
      win.style.pointerEvents = 'none';
    }, 300); // desktop animation duration
  }
}


function playSound(id) {
  if (isMuted) return;
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}


function copyEmail() {
  const email = "johanczarpagba@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const feedback = document.getElementById("copy-feedback");
    feedback.style.display = "block";
    setTimeout(() => {
      feedback.style.display = "none";
    }, 2000);
  });
}


function minimizeAllWindows() {
  const windows = document.querySelectorAll('.mainwindow');

  windows.forEach(windowEl => {
    // Check if it's open and not already minimized
    const content = windowEl.querySelector('.mainwindowcontent');
    const isVisible = windowEl.classList.contains('active');
    const isMinimized = windowEl.classList.contains('minimized');

    if (isVisible && content && !isMinimized) {
      const minimizeBtn = windowEl.querySelector('.minimize-btn');
      if (minimizeBtn) {
        toggleMinimize(minimizeBtn); // Reuse your existing toggleMinimize function
      }
    }
  });
}

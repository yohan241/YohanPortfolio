let highestZ = 1000;
const main = document.getElementById("main");

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = document.getElementById(elmnt.id + "header");

  const target = header || elmnt;
  target.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (e.target.closest('.close-btn')) return;

    e.preventDefault();

    // 🆙 Bring window to front
    highestZ++;
    elmnt.style.zIndex = highestZ;

    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.classList.add("dragging");

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

    elmnt.classList.remove("dragging");
  }
}

function showWindow(windowId) {
  const win = document.getElementById(windowId);
  if (!win) return;

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



function startUp(){
  const bg= document.getElementById("bgcontainer");
  const gsb= document.getElementById("getStartedButton");
  bg.classList.remove("invisible");
  gsb.classList.remove("huge");
  gsb.classList.add("normal");
  const vignette = document.getElementById("vignette-transition");


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

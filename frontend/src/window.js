// frontend/src/window.js
import { getAssetUrl } from './utils.js'
import windowHtmlByName from 'virtual:portfolio-windows'

let highestZ = 1000
const loadedWindows = new Map()
let isMuted = false
let hasStarted = false
let backgroundEffectsStarted = false

function isMobileViewport() { return window.matchMedia('(max-width: 768px)').matches }
function focusWindow(win){ if(!win) return; highestZ++; win.style.zIndex = String(highestZ) }
function applyViewportMode(win){ if(!win) return; win.classList.toggle('mobile', isMobileViewport()) }
function applyViewportModeToAll(){ document.querySelectorAll('.mainwindow').forEach(applyViewportMode) }
function setMinimizeButtonLabel(button,isMinimized){ if(!button) return; button.textContent = isMinimized ? '[+]' : '[-]'; button.setAttribute('aria-label', isMinimized ? 'Restore window' : 'Minimize window') }
function getWindowTitle(win){ return win?.querySelector('.mainwindowheader h4')?.textContent?.trim() || win?.id || 'window' }

function initializeWindow(win){
  if(!win || win.dataset.windowInitialized) return
  win.dataset.windowInitialized = 'true'
  win.addEventListener('pointerdown', () => focusWindow(win))
  applyViewportMode(win)
  dragElement(win)
  initializeGameCarousel(win)
  const minimizeButton = win.querySelector('.minimize-btn')
  setMinimizeButtonLabel(minimizeButton, win.classList.contains('minimized'))
}

function initializeGameCarousel(win){
  if(win.id !== 'gameswindow') return
  const carousel = win.querySelector('.game-carousel')
  if(!carousel || carousel.dataset.wheelInitialized) return
  carousel.dataset.wheelInitialized = 'true'
  carousel.addEventListener('wheel', (event) => {
    if(Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    carousel.scrollBy({ left: event.deltaY, behavior: 'smooth' })
  }, { passive: false })
}

function dragElement(win){
  const header = document.getElementById(`${win.id}header`) || win.querySelector('.mainwindowheader')
  if(!header) return
  let startX=0,startY=0,startLeft=0,startTop=0,activePointerId=null

  header.addEventListener('pointerdown', (event) => {
    if(isMobileViewport()) return
    if(event.target.closest('button,a,input,textarea,select')) return
    event.preventDefault()
    activePointerId = event.pointerId
    startX = event.clientX; startY = event.clientY; startLeft = win.offsetLeft; startTop = win.offsetTop
  focusWindow(win); win.classList.add('dragging'); header.setPointerCapture(activePointerId)
    playSound('grabSound')
  })

  header.addEventListener('pointermove', (event) => {
    if(event.pointerId !== activePointerId || isMobileViewport()) return
    const nextLeft = startLeft + event.clientX - startX
    const nextTop = startTop + event.clientY - startY
    const maxLeft = Math.max(0, window.innerWidth - win.offsetWidth)
    const maxTop = Math.max(0, window.innerHeight - header.offsetHeight)
    win.style.left = `${Math.min(Math.max(0, nextLeft), maxLeft)}px`
    win.style.top = `${Math.min(Math.max(0, nextTop), maxTop)}px`
  })

  function endDrag(event){
    if(event.pointerId !== activePointerId) return
    activePointerId = null
    win.classList.remove('dragging')
    playSound('dropSound')
  }

  header.addEventListener('pointerup', endDrag)
  header.addEventListener('pointercancel', endDrag)
}

export function showWindow(windowId){
  const win = document.getElementById(windowId); if(!win) return
  initializeWindow(win)
  playSound('openSound')
  win.classList.remove('closing','closed','minimized')
  win.classList.add('active'); win.style.pointerEvents='auto'
  focusWindow(win); setMinimizeButtonLabel(win.querySelector('.minimize-btn'), false)
  updateTaskbar()
}

export function hideWindow(windowId){
  const win = document.getElementById(windowId); if(!win) return
  playSound('closeSound')
  win.classList.remove('active','minimized'); win.classList.add('closing')
  setMinimizeButtonLabel(win.querySelector('.minimize-btn'), false)
  setTimeout(()=>{ win.classList.remove('closing'); win.classList.add('closed'); win.style.pointerEvents='none'; updateTaskbar() }, isMobileViewport()?0:250)
  updateTaskbar()
}

export async function loadWindowByName(windowName, windowId){
  if(document.getElementById(windowId)){ showWindow(windowId); return document.getElementById(windowId) }
  if(loadedWindows.has(windowId)){ await loadedWindows.get(windowId); showWindow(windowId); return document.getElementById(windowId) }

  const promise = getWindowHtml(windowName)
    .then(rawHtml => {
      const html = rawHtml.replace(/https?:\/\/[^\/]+\/assets\//g, '/assets/')
      if(!document.getElementById('window-container')){ const c=document.createElement('div'); c.id='window-container'; document.body.appendChild(c) }
      document.getElementById('window-container').insertAdjacentHTML('beforeend', html)
      const win = document.getElementById(windowId); initializeWindow(win); showWindow(windowId); return win
    }).catch(e => { loadedWindows.delete(windowId); console.error(e) })

  loadedWindows.set(windowId, promise)
  return promise
}

function getWindowHtml(windowName){
  if(windowHtmlByName[windowName]) return Promise.resolve(windowHtmlByName[windowName])
  return Promise.reject(new Error(`Unknown window: ${windowName}`))
}

export function toggleMinimize(button){
  const windowEl = button.closest('.mainwindow')
  if(!windowEl || !windowEl.classList.contains('active')) return
  const isMinimized = windowEl.classList.toggle('minimized')
  windowEl.classList.toggle('unminimizing', !isMinimized)
  if(!isMobileViewport()){
    if(isMinimized){
      windowEl.style.width = `${windowEl.offsetWidth}px`
    } else {
      window.setTimeout(() => { windowEl.style.width = '' }, 320)
    }
  }
  playSound(isMinimized ? 'minSound' : 'maxSound')
  setMinimizeButtonLabel(button, isMinimized)
  if(!isMinimized){ setTimeout(()=>windowEl.classList.remove('unminimizing'),300); focusWindow(windowEl); }
  updateTaskbar()
}

export function startUp(){
  if(hasStarted) return
  hasStarted = true
  const bg=document.getElementById('bgcontainer'), getStartedButton=document.getElementById('getStartedButton'), muteButton=document.getElementById('muteIcon'), shortcutButton=document.getElementById('shortcutButton'), minimizeButton=document.getElementById('minimizeButton'), taskbar=document.getElementById('desktopTaskbar'), vignette=document.getElementById('vignette-transition')
  ;[bg,muteButton,shortcutButton,minimizeButton,taskbar].forEach(el => el && el.classList.remove('invisible'))
  ;[muteButton,shortcutButton,minimizeButton,getStartedButton].forEach(el => { if(!el) return; el.classList.remove('huge'); el.classList.add('normal') })
  vignette && vignette.classList.add('expanded')
  startBackgroundEffects()
  updateTaskbar()
  playSound('entrySound')
}

export function toggleMute(){ isMuted = !isMuted; updateMuteControls(); if(!isMuted) playSound('entrySound') }

function updateMuteControls(){
  const iconPath = getAssetUrl(isMuted ? 'assets/images/mute.png' : 'assets/images/volume.png')
  const controls = [
    { button: document.getElementById('muteIcon'), image: document.getElementById('muteIconImage'), mutedText: 'Sound Muted', soundText: 'Mute Sound' },
    { button: document.getElementById('taskbarMuteButton'), image: document.getElementById('taskbarMuteImage'), mutedText: 'Muted', soundText: 'Sound' }
  ]

  controls.forEach(({ button, image, mutedText, soundText }) => {
    if(image) image.src = iconPath
    if(!button) return
    const label = button.querySelector('span')
    if(label) label.textContent = isMuted ? mutedText : soundText
    button.setAttribute('aria-pressed', String(isMuted))
    button.classList.toggle('is-muted', isMuted)
  })
}

export function playSound(id){ if(isMuted) return; const sound = document.getElementById(id); if(!sound) return; sound.currentTime = 0; sound.play().catch(() => {}) }

export function copyEmail(){ const email='johanczarpagba@gmail.com', feedback=document.getElementById('copy-feedback'); navigator.clipboard.writeText(email).then(()=>{ if(!feedback) return; feedback.style.display='block'; setTimeout(()=>feedback.style.display='none',2000) }) }

export function minimizeAllWindows(){ document.querySelectorAll('.mainwindow.active:not(.minimized)').forEach(windowEl => { const minimizeButton = windowEl.querySelector('.minimize-btn'); if(minimizeButton) toggleMinimize(minimizeButton) }) }

function updateTaskbar(){
  const taskbarWindows = document.getElementById('taskbarWindows')
  if(!taskbarWindows) return

  taskbarWindows.innerHTML = ''
  document.querySelectorAll('.mainwindow').forEach(win => {
    if(win.id === 'main' || win.classList.contains('closed') || win.classList.contains('closing')) return
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'taskbar-button taskbar-window'
    button.classList.toggle('is-minimized', win.classList.contains('minimized'))
    button.textContent = getWindowTitle(win)
    button.addEventListener('click', () => {
      if(win.classList.contains('minimized')){
        win.classList.remove('minimized')
        if(!isMobileViewport()) window.setTimeout(() => { win.style.width = '' }, 320)
        setMinimizeButtonLabel(win.querySelector('.minimize-btn'), false)
      }
      showWindow(win.id)
    })
    taskbarWindows.appendChild(button)
  })
}

function startBackgroundEffects(){
  if(backgroundEffectsStarted) return
  backgroundEffectsStarted = true
  generateStars()
  window.addEventListener('resize', generateStars)
  window.setInterval(spawnMeteor, 1200)
  window.setTimeout(spawnMeteor, 350)
}

function generateStars(count = 160){
  const star = document.querySelector('.star')
  if(!star) return
  const stars = []
  for(let i = 0; i < count; i++){
    stars.push(`${Math.floor(Math.random() * window.innerWidth)}px ${Math.floor(Math.random() * window.innerHeight)}px rgba(255,255,255,${Math.random() * 0.55 + 0.35})`)
  }
  star.style.boxShadow = stars.join(', ')
}

function spawnMeteor(){
  const container = document.getElementById('meteors-container')
  if(!container || container.closest('.invisible')) return
  const meteor = document.createElement('div')
  meteor.className = 'meteor'
  meteor.style.left = `${Math.floor(Math.random() * 120)}vw`
  meteor.style.top = `${Math.floor(Math.random() * 28)}vh`
  meteor.style.animationDuration = `${Math.random() * 1.4 + 1.7}s`
  container.appendChild(meteor)
  meteor.addEventListener('animationend', () => meteor.remove())
}

/* exported initializer for main.js */
export function initUI(){
  if(!document.getElementById('window-container')){ const c=document.createElement('div'); c.id='window-container'; document.body.appendChild(c) }
  updateMuteControls()
  updateTaskbar()
  applyViewportModeToAll(); window.addEventListener('resize', applyViewportModeToAll)
}

/* legacy globals for views that use inline handlers */
window.loadWindowByName = loadWindowByName
window.showWindow = showWindow
window.hideWindow = hideWindow
window.toggleMinimize = toggleMinimize
window.startUp = startUp
window.toggleMute = toggleMute
window.copyEmail = copyEmail
window.minimizeAllWindows = minimizeAllWindows
window.playSound = playSound
window.toggleDrawer = window.toggleDrawer || (() => {})

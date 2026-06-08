// frontend/src/main.js
import { initUI } from './window.js'
import homeHtml from 'virtual:portfolio-home'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  app.innerHTML = homeHtml
  initUI()
})

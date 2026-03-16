import { createApp } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import './styles/variables.css'
import './styles/global.css'

import App from './App.vue'

// Inicializa AOS — Animate on Scroll
AOS.init({
  duration: 750,
  once: true,         // anima apenas uma vez ao scrollar
  easing: 'ease-out-cubic',
  offset: 80
})

createApp(App).mount('#app')

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Hero from './sections/Hero.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Contact from './sections/Contact.vue'
</script>

<template>
  <Header />

  <main>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </main>

  <Footer />
</template>

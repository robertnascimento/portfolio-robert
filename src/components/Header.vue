<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Estado ───────────────────────────────────────────────
const isScrolled      = ref(false)
const isMobileOpen    = ref(false)
const isDark          = ref(true)

// ─── Scroll: muda aparência do header ao rolar ────────────
const onScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// ─── Tema dark/light ──────────────────────────────────────
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('light-mode', !isDark.value)
  localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light')
}

// ─── Menu mobile ──────────────────────────────────────────
const toggleMenu = () => { isMobileOpen.value = !isMobileOpen.value }
const closeMenu  = () => { isMobileOpen.value = false }

// ─── Lifecycle ───────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  // Restaura preferência de tema salva
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'light') {
    isDark.value = false
    document.body.classList.add('light-mode')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header :class="['site-header', { scrolled: isScrolled, light: !isDark }]" role="banner">
    <div class="container header-inner">

      <!-- ══ Marca / Logo ══ -->
      <a href="#home" class="brand" aria-label="Robert Iver — ir para o início">
        Robert<span class="brand-accent">Iver</span>
      </a>

      <!-- ══ Navegação desktop ══ -->
      <nav class="nav-desktop" aria-label="Navegação principal">
        <a href="#sobre"    class="nav-link">Sobre</a>
        <a href="#projetos" class="nav-link">Projetos</a>
        <a href="#contato"  class="nav-link">Contato</a>
      </nav>

      <!-- ══ Controles direita ══ -->
      <div class="header-actions">
        <!-- Botão tema dark/light -->
        <button
          class="icon-btn"
          @click="toggleTheme"
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          :title="isDark ? 'Modo claro' : 'Modo escuro'"
        >
          <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>

        <!-- Botão hamburger (mobile) -->
        <button
          class="hamburger-btn"
          @click="toggleMenu"
          :aria-expanded="String(isMobileOpen)"
          aria-controls="mobile-nav"
          aria-label="Abrir menu de navegação"
        >
          <span :class="['bar', { open: isMobileOpen }]">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- ══ Navegação mobile ══ -->
    <nav
      id="mobile-nav"
      :class="['nav-mobile', { open: isMobileOpen }]"
      aria-label="Navegação mobile"
    >
      <a href="#sobre"    class="nav-mobile-link" @click="closeMenu">Sobre</a>
      <a href="#projetos" class="nav-mobile-link" @click="closeMenu">Projetos</a>
      <a href="#contato"  class="nav-mobile-link" @click="closeMenu">Contato</a>
    </nav>
  </header>
</template>

<style scoped>
/* ── Header base ── */
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  height: var(--header-height);
  background: transparent;
  transition:
    background var(--transition-base),
    box-shadow var(--transition-base);
}

/* Fundo sólido após rolar 50px */
.site-header.scrolled {
  background: rgba(18, 18, 18, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.site-header.light.scrolled {
  background: rgba(245, 245, 245, 0.95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.12);
}

/* ── Inner layout ── */
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

/* ── Marca ── */
.brand {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--color-text);
  transition: opacity var(--transition-fast);
}
.brand:hover { opacity: 0.85; }

.brand-accent { color: var(--color-primary); }

/* ── Nav desktop ── */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  position: relative;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-muted);
  padding: 0.25rem 0;
  transition: color var(--transition-base);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-text);
}
.nav-link:hover::after { width: 100%; }

/* ── Ações direita ── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-base);
  color: var(--color-text-muted);
  transition: color var(--transition-base), background var(--transition-base);
}

.icon-btn:hover {
  color: var(--color-accent);
  background: rgba(181, 142, 49, 0.12);
}

/* ── Hamburger ── */
.hamburger-btn {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.bar {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.bar span {
  display: block;
  height: 2px;
  background: var(--color-text);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  transform-origin: center;
}

.bar.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.bar.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.bar.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Nav mobile ── */
.nav-mobile {
  display: none;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--transition-base);
}

.nav-mobile.open { max-height: 240px; }

.nav-mobile-link {
  padding: 1rem var(--spacing-xl);
  font-family: var(--font-heading);
  font-weight: 500;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-base), background var(--transition-base);
}
.nav-mobile-link:hover {
  color: var(--color-text);
  background: rgba(158, 27, 27, 0.06);
}

/* ── Responsivo ── */
@media (max-width: 768px) {
  .nav-desktop    { display: none; }
  .hamburger-btn  { display: flex; }
  .nav-mobile     { display: flex; }
}
</style>

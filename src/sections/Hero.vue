<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Cicla entre papéis profissionais com efeito de fade
const roles = [
  'Vue.js',
  '.NET & C#',
  'PostgreSQL || MySQL',
  'Node.js',
  'Python & Django',
  'MongoDB'
]

const roleIndex   = ref(0)
const currentRole = ref(roles[0])
const fadeRole    = ref(true)

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    fadeRole.value = false
    setTimeout(() => {
      roleIndex.value   = (roleIndex.value + 1) % roles.length
      currentRole.value = roles[roleIndex.value]
      fadeRole.value    = true
    }, 350)
  }, 2500)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <section id="home" class="hero-section" aria-label="Apresentação">
    <!-- Fundo com grid pontilhado animado -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-grid"></div>
      <div class="hero-glow glow-1"></div>
      <div class="hero-glow glow-2"></div>
    </div>

    <div class="container hero-content">
      <!-- Linha tag -->
      <p class="hero-tag" data-aos="fade-down" data-aos-duration="600">
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        Natal / RN — Brasil
      </p>

      <!-- Nome principal -->
      <h1 class="hero-name" data-aos="fade-up" data-aos-delay="100">
        Robert <span class="name-accent">Iver</span>
      </h1>

      <!-- Função dinâmica -->
      <p class="hero-role" data-aos="fade-up" data-aos-delay="200" aria-live="polite">
        <span class="role-prefix">&lt;</span>
        <span :class="['role-text', { visible: fadeRole }]">{{ currentRole }}</span>
        <span class="role-prefix">/&gt;</span>
      </p>

      <!-- Subtítulo -->
      <p class="hero-sub" data-aos="fade-up" data-aos-delay="300">
        Formado em Sistemas para Internet pelo
        <strong>IFRN Campus Canguaretama</strong>, atuando como
        Fullstack Developer na <strong>Agiltec</strong>. Apaixonado por
        tecnologia, código limpo e soluções que fazem a diferença.
      </p>

      <!-- CTAs -->
      <div class="hero-actions" data-aos="fade-up" data-aos-delay="400">
        <a href="#projetos" class="btn-primary">
          <i class="fas fa-code" aria-hidden="true"></i>
          Ver Projetos
        </a>
        <a href="#contato" class="btn-outline">
          <i class="fas fa-paper-plane" aria-hidden="true"></i>
          Entrar em Contato
        </a>
      </div>

      <!-- Badges de stack rápida -->
      <div class="hero-stack" data-aos="fade-up" data-aos-delay="500" aria-label="Principais tecnologias">
        <span class="stack-item"><i class="devicon-csharp-plain colored" aria-hidden="true"></i></span>
        <span class="stack-item"><i class="devicon-dotnetcore-plain colored" aria-hidden="true"></i></span>
        <span class="stack-item"><i class="devicon-vuejs-plain colored" aria-hidden="true"></i></span>
        <!-- <span class="stack-item"><i class="devicon-typescript-plain colored" aria-hidden="true"></i></span> -->
        <span class="stack-item"><i class="devicon-angularjs-plain colored" aria-hidden="true"></i></span>
        <span class="stack-item"><i class="devicon-postgresql-plain colored" aria-hidden="true"></i></span>
        <!-- <span class="stack-item"><i class="devicon-python-plain colored" aria-hidden="true"></i></span>
        <span class="stack-item"><i class="devicon-django-plain colored" aria-hidden="true"></i></span> -->
      </div>
    </div>

    <!-- Indicador de scroll -->
    <a href="#sobre" class="scroll-indicator" aria-label="Rolar para a seção Sobre">
      <i class="fas fa-chevron-down" aria-hidden="true"></i>
    </a>
  </section>
</template>

<style scoped>
/* ── Layout base ── */
.hero-section {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: var(--header-height);
}

/* ── Background ── */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* Grid pontilhado sutil */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(158, 27, 27, 0.18) 1px, transparent 1px);
  background-size: 36px 36px;
  opacity: 0.6;
}

/* Manchas de luz colorida */
.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: var(--color-primary);
  top: -100px;
  right: -100px;
  animation: pulse 8s ease-in-out infinite;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: var(--color-accent);
  bottom: 0;
  left: -80px;
  animation: pulse 10s ease-in-out 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.12; }
  50%       { transform: scale(1.15); opacity: 0.18; }
}

/* ── Conteúdo ── */
.hero-content {
  position: relative;
  z-index: 1;
  padding-top: var(--spacing-3xl);
  padding-bottom: var(--spacing-3xl);
}

/* Tag de localização */
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  font-family: var(--font-heading);
  font-weight: 500;
  color: var(--color-primary);
  background: rgba(158, 27, 27, 0.1);
  border: 1px solid rgba(158, 27, 27, 0.25);
  border-radius: var(--radius-full);
  padding: 5px 14px;
  margin-bottom: var(--spacing-xl);
}

/* Nome */
.hero-name {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: var(--spacing-md);
}

.name-accent {
  color: var(--color-primary);
  display: inline-block;
}

/* Função rotativa */
.hero-role {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  color: var(--color-accent);
  margin-bottom: var(--spacing-xl);
  min-height: 1.8em;
}

.role-prefix {
  color: var(--color-text-muted);
  user-select: none;
}

.role-text {
  opacity: 0;
  transition: opacity 0.35s ease;
  margin: 0 6px;
}

.role-text.visible { opacity: 1; }

/* Subtítulo */
.hero-sub {
  max-width: 580px;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--spacing-2xl);
}

.hero-sub strong {
  color: var(--color-text);
  font-weight: 600;
}

/* CTAs */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

/* Stack icons */
.hero-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.stack-item {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: all var(--transition-base);
}

.stack-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* ── Scroll indicator ── */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  animation: bounce 2.4s ease-in-out infinite;
  transition: color var(--transition-base);
}

.scroll-indicator:hover { color: var(--color-primary); }

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
}

/* ── Responsivo ── */
@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn-primary,
  .hero-actions .btn-outline {
    width: 100%;
    justify-content: center;
  }
}
</style>

<script setup>
const year = new Date().getFullYear()

const socialLinks = [
  { icon: 'fab fa-github',      href: 'https://github.com/robertnascimento',    label: 'GitHub'    },
  { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/in/robertiver/',  label: 'LinkedIn'  },
  { icon: 'fab fa-instagram',   href: 'https://instagram.com', label: 'Instagram' }
]
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">

      <!-- Marca -->
      <div class="footer-brand">
        <a href="#home" class="brand-link" aria-label="Voltar ao topo">
          Robert<span class="brand-accent">Iver</span>
        </a>
        <p class="footer-tagline">Desenvolvedor Fullstack</p>
      </div>

      <!-- Navegação -->
      <nav class="footer-nav" aria-label="Links de navegação do rodapé">
        <a href="#sobre"    class="footer-link">Sobre</a>
        <a href="#projetos" class="footer-link">Projetos</a>
        <a href="#contato"  class="footer-link">Contato</a>
      </nav>

      <!-- Redes sociais -->
      <div class="footer-social" role="list" aria-label="Redes sociais">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          :aria-label="link.label"
          class="social-btn"
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
        >
          <i :class="link.icon" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <!-- Linha de copyright -->
    <div class="footer-bottom">
      <p>© {{ year }} Robert Iver. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-3xl);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
  flex-wrap: wrap;
}

/* ── Marca ── */
.brand-link {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  transition: opacity var(--transition-fast);
}
.brand-link:hover { opacity: 0.8; }

.brand-accent { color: var(--color-primary); }

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: 4px;
}

/* ── Nav ── */
.footer-nav {
  display: flex;
  gap: var(--spacing-xl);
}

.footer-link {
  font-size: var(--text-sm);
  font-family: var(--font-heading);
  color: var(--color-text-muted);
  transition: color var(--transition-base);
}
.footer-link:hover { color: var(--color-primary); }

/* ── Social ── */
.footer-social {
  display: flex;
  gap: var(--spacing-sm);
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-base);
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}

.social-btn:hover {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

/* ── Copyright ── */
.footer-bottom {
  text-align: center;
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}

/* ── Responsivo ── */
@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }

  .footer-nav {
    gap: var(--spacing-lg);
  }
}
</style>

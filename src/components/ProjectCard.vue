<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

/**
 * Mapeamento de tecnologia → classe Devicon.
 * Tecnologias sem ícone Devicon exibem apenas o texto.
 */
const techIconMap = {
  'Vue 3':      'devicon-vuejs-plain colored',
  'C# .NET':    'devicon-csharp-plain colored',
  'PostgreSQL': 'devicon-postgresql-plain colored',
  'Python':     'devicon-python-plain colored',
  'Django':     'devicon-django-plain colored',
  'TypeScript': 'devicon-typescript-plain colored',
  'Angular':    'devicon-angularjs-plain colored',
  'MongoDB':    'devicon-mongodb-plain colored',
  'API':    'devicon-fastapi-plain colored',
  'JavaScript': 'devicon-javascript-plain colored',
  'JS': 'devicon-javascript-plain colored',
  'MySQL':      'devicon-mysql-plain colored',
  'HTML/CSS':   'devicon-html5-plain colored'
}

const getIcon = (tech) => techIconMap[tech] ?? null
</script>

<template>
  <article class="project-card" :class="{ featured: project.featured }">

    <!-- ── Cabeçalho do card ── -->
    <div class="card-top">
      <div class="card-icon" aria-hidden="true">
        <i class="fas fa-terminal"></i>
      </div>
      <div class="card-meta">
        <span class="card-client">{{ project.client }}</span>
        <span class="card-role">{{ project.role }}</span>
      </div>
    </div>

    <!-- ── Conteúdo principal ── -->
    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.shortDescription }}</p>

      <!-- Tecnologias usadas -->
      <ul class="tech-list" aria-label="Tecnologias utilizadas">
        <li
          v-for="tech in project.technologies"
          :key="tech"
          class="tech-badge"
        >
          <i
            v-if="getIcon(tech)"
            :class="getIcon(tech)"
            class="tech-icon"
            aria-hidden="true"
          ></i>
          {{ tech }}
        </li>
      </ul>
    </div>

    <!-- ── Rodapé do card: ações ── -->
    <div class="card-footer">
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        class="card-btn card-btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Ver demonstração do projeto ${project.title}`"
      >
        <i class="fas fa-external-link-alt" aria-hidden="true"></i>
        Demo
      </a>

      <a
        v-if="project.githubUrl && project.githubUrl !== '#'"
        :href="project.githubUrl"
        class="card-btn"
        :class="project.demoUrl ? 'card-btn-outline' : 'card-btn-primary'"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Ver código-fonte do projeto ${project.title} no GitHub`"
      >
        <i class="fab fa-github" aria-hidden="true"></i>
        Código
      </a>

      <span
        v-else
        class="card-btn card-btn-disabled"
        aria-label="Repositório privado"
      >
        <i class="fas fa-lock" aria-hidden="true"></i>
        Privado
      </span>
    </div>

    <!-- Detalhe decorativo de destaque -->
    <span v-if="project.featured" class="featured-badge" aria-label="Projeto em destaque">
      ★ Destaque
    </span>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  overflow: hidden;
}

/* Linha decorativa no topo do card */
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  opacity: 0;
  transition: opacity var(--transition-base);
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(158, 27, 27, 0.3);
}

.project-card:hover::before {
  opacity: 1;
}

/* ── Destaque ── */
.project-card.featured {
  border-color: rgba(158, 27, 27, 0.25);
}
.project-card.featured::before {
  opacity: 0.6;
}

.featured-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: var(--text-xs);
  font-weight: 600;
  font-family: var(--font-heading);
  color: var(--color-accent);
  background: rgba(181, 142, 49, 0.1);
  border: 1px solid rgba(181, 142, 49, 0.3);
  border-radius: var(--radius-full);
  padding: 2px 10px;
}

/* ── Topo ── */
.card-top {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(158, 27, 27, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-client {
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--font-heading);
  color: var(--color-text);
}

.card-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* ── Body ── */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: var(--spacing-sm);
}

.card-desc {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

/* ── Tecnologias ── */
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: 0;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: rgba(158, 27, 27, 0.1);
  border: 1px solid rgba(158, 27, 27, 0.2);
  font-size: var(--text-xs);
  font-weight: 500;
  font-family: var(--font-heading);
  color: var(--color-text-muted);
}

.tech-icon {
  font-size: 0.9rem;
}

/* ── Footer / botões ── */
.card-footer {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.card-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--transition-base);
}

.card-btn-primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-primary);
}
.card-btn-primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-1px);
}

.card-btn-outline {
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}
.card-btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(158, 27, 27, 0.06);
}

.card-btn-disabled {
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}
</style>

<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects.js'

// Filtro de tecnologia (opcional — começa mostrando todos)
const activeFilter = ref('Todos')

const allTechs = ['Todos', ...new Set(projects.flatMap((p) => p.technologies))]

const filtered = ref(projects)

const setFilter = (tech) => {
  activeFilter.value = tech
  filtered.value =
    tech === 'Todos'
      ? projects
      : projects.filter((p) => p.technologies.includes(tech))
}
</script>

<template>
  <section id="projetos" class="section projects-section" aria-labelledby="projetos-titulo">
    <div class="container">

      <!-- ── Cabeçalho ── -->
      <header class="section-header" data-aos="fade-up">
        <span class="section-tag">// portfólio</span><br>
        <h2 id="projetos-titulo" class="section-title">Projetos em Destaque</h2>
        <p class="section-desc">
          Uma seleção dos projetos que mais marcaram minha trajetória — de plataformas
          corporativas a projetos acadêmicos premiados.
        </p>
      </header>

      <!-- ── Filtros por tecnologia ── -->
      <nav
        class="filter-nav"
        data-aos="fade-up"
        data-aos-delay="100"
        aria-label="Filtrar projetos por tecnologia"
        role="list"
      >
        <button
          v-for="tech in allTechs"
          :key="tech"
          :class="['filter-btn', { active: activeFilter === tech }]"
          @click="setFilter(tech)"
          :aria-pressed="String(activeFilter === tech)"
          role="listitem"
        >
          {{ tech }}
        </button>
      </nav>

      <!-- ── Grid de cards ── -->
      <div
        class="projects-grid"
        role="list"
        aria-label="Lista de projetos"
      >
        <div
          v-for="(project, i) in filtered"
          :key="project.id"
          role="listitem"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <ProjectCard :project="project" />
        </div>

        <!-- Mensagem quando nenhum projeto for encontrado -->
        <p v-if="filtered.length === 0" class="empty-msg">
          Nenhum projeto encontrado para esta tecnologia.
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: var(--color-bg-secondary);
}

/* ── Filtros ── */
.filter-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-2xl);
}

.filter-btn {
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  transition: all var(--transition-base);
}

.filter-btn:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-primary);
}

/* ── Grid de projetos ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.projects-grid > div {
  display: flex;
}

/* Mensagem sem resultados */
.empty-msg {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--spacing-3xl) 0;
  font-size: var(--text-lg);
}

/* ── Responsivo ── */
@media (max-width: 960px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

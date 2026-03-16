<script setup>
import avatarSvg from '@/assets/iver.jpeg'

// Tecnologias agrupadas por categoria
const skills = [
  {
    category: 'Frontend',
    icon: 'fas fa-paint-brush',
    items: [
      { name: 'Vue 3',       icon: 'devicon-vuejs-plain colored'        },
    //   { name: 'TypeScript',  icon: 'devicon-typescript-plain colored'   },
      { name: 'Angular',     icon: 'devicon-angularjs-plain colored'    },
    //   { name: 'Ionic',       icon: 'devicon-ionic-original colored'     }
    ]
  },
  {
    category: 'Backend',
    icon: 'fas fa-server',
    items: [
      { name: 'C# .NET',  icon: 'devicon-csharp-plain colored'        },
      { name: '.NET Core', icon: 'devicon-dotnetcore-plain colored'   },
    //   { name: 'Python',    icon: 'devicon-python-plain colored'       },
    //   { name: 'Django',    icon: 'devicon-django-plain colored'       },
      { name: 'Node.js',    icon: 'devicon-nodejs-plain colored'       },
    ]
  },
  {
    category: 'Banco de Dados',
    icon: 'fas fa-database',
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MySQL',      icon: 'devicon-mysql-plain colored'      }
    ]
  }
]

// Estatísticas rápidas
const stats = [
  { value: '3+',  label: 'Anos de estudo'          },
  { value: '10',   label: 'Projetos entregues'       },
  { value: '9+',  label: 'Tecnologias dominadas'    },
  { value: '1',   label: 'Empresa atual (Agiltec)'  }
]
</script>

<template>
  <section id="sobre" class="section about-section" aria-labelledby="sobre-titulo">
    <div class="container">

      <!-- ── Layout de duas colunas ── -->
      <div class="about-grid">

        <!-- Coluna esquerda: avatar + stats ── -->
        <div class="about-visual" data-aos="fade-right">
          <div class="avatar-wrapper">
            <img
              :src="avatarSvg"
              alt="Avatar ilustrativo de Robert Iver"
              class="avatar-img"
              width="260"
              height="260"
            />
            <!-- Anel decorativo -->
            <div class="avatar-ring" aria-hidden="true"></div>
            <!-- Badge disponível -->
            <span class="availability-badge">
              <span class="dot" aria-hidden="true"></span>
              Disponível para freelas
            </span>
          </div>

          <!-- Mini-estatísticas -->
          <div class="stats-grid" role="list" aria-label="Estatísticas">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat-card"
              role="listitem"
            >
              <strong class="stat-value">{{ stat.value }}</strong>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Coluna direita: conteúdo ── -->
        <div class="about-content">

          <!-- Cabeçalho da seção -->
          <header class="section-header" data-aos="fade-up">
            <span class="section-tag">// sobre mim</span><br>
            <h2 id="sobre-titulo" class="section-title">Quem é Robert Iver?</h2>
          </header>

          <!-- Biografia -->
          <div class="bio" data-aos="fade-up" data-aos-delay="100">
            <p>
              Sou desenvolvedor Fullstack apaixonado por tecnologia, com formação em
              <strong>Sistemas para Internet pelo IFRN Campus Canguaretama</strong> e
              atuação profissional na <strong>Agiltec</strong>.
            </p>
            <p>
              Tenho 25 anos e acredito que boas soluções nascem da combinação entre
              código de qualidade, entendimento profundo do negócio e atenção à
              experiência do usuário. Trabalho diariamente com stacks modernas tanto
              no front quanto no back-end, integrando sistemas, APIs e bancos de dados.
            </p>
            <p>
              Atuei como desenvolvedor Fullstack na equipe que desenvolveu e publicou
              o SISCO para a <strong>Equatorial Energia</strong>, participei da equipe
              que criou a plataforma de <strong>estufas inteligentes</strong> apresentada
              na SECITEX (IFRN) e contribuí como desenvolvedor back-end no portal
              institucional do <strong>Núcleo de Inovação Tecnológica</strong> do IFRN.
            </p>
          </div>

          <!-- Skills por categoria -->
          <div class="skills-section" data-aos="fade-up" data-aos-delay="200">
            <h3 class="skills-title">Stack &amp; Tecnologias</h3>

            <div class="skills-groups">
              <div
                v-for="group in skills"
                :key="group.category"
                class="skill-group"
              >
                <p class="group-label">
                  <i :class="group.icon" aria-hidden="true"></i>
                  {{ group.category }}
                </p>
                <ul class="skill-list" :aria-label="`Tecnologias de ${group.category}`">
                  <li
                    v-for="skill in group.items"
                    :key="skill.name"
                    class="skill-badge"
                  >
                    <i :class="skill.icon" class="skill-icon" aria-hidden="true"></i>
                    {{ skill.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Botão de download de currículo (placeholder) -->
          <div data-aos="fade-up" data-aos-delay="300">
            <a href="#contato" class="btn-primary">
              <i class="fas fa-paper-plane" aria-hidden="true"></i>
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: var(--color-bg);
}

/* ── Grid layout ── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: var(--spacing-3xl);
  align-items: start;
}

/* ── Visual / Avatar ── */
.about-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
}

.avatar-wrapper {
  position: relative;
  width: 260px;
  height: 260px;
  flex-shrink: 0;
  aspect-ratio: 1;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* forma orgânica */
  border: 3px solid var(--color-primary);
  background: var(--color-bg-card);
  object-fit: cover;
  position: relative;
  z-index: 1;
  transition: border-radius var(--transition-slow);
}

.avatar-img:hover {
  border-color: var(--color-primary-light);
}


/* Anel decorativo giratório — width/height explícitos garantem círculo perfeito */
.avatar-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  border-radius: 50%;
  border: 2px dashed rgba(158, 27, 27, 0.35);
  animation: spin 20s linear infinite;
  pointer-events: none;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Badge disponível */
.availability-badge {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 5px 14px;
  font-size: var(--text-xs);
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  z-index: 2;
  box-shadow: var(--shadow-sm);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  width: 100%;
}

.stat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-align: center;
  transition: border-color var(--transition-base);
}

.stat-card:hover {
  border-color: var(--color-primary);
}

.stat-value {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.3;
}

/* ── Conteúdo ── */
.section-header {
  margin-bottom: var(--spacing-xl);
}

.bio {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.8;
}

.bio strong {
  color: var(--color-text);
  font-weight: 600;
}

/* ── Skills ── */
.skills-section {
  margin-bottom: var(--spacing-2xl);
}

.skills-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.skills-groups {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-sm);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}

.skill-badge:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.skill-icon {
  font-size: 1rem;
}

/* ── Responsivo ── */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-visual {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .stats-grid {
    max-width: 320px;
  }
}

@media (max-width: 520px) {
  .about-visual {
    flex-direction: column;
    align-items: center;
  }

  .stats-grid {
    width: 100%;
    max-width: 100%;
  }
}
</style>

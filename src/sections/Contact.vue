<script setup>
import { ref, reactive } from 'vue'

/**
 * CONFIGURAÇÃO DO FORMSPREE
 * 1. Crie uma conta gratuita em https://formspree.io
 * 2. Crie um novo formulário e copie o ID (ex: "xpzvlwrk")
 * 3. Substitua 'YOUR_FORM_ID' abaixo pelo seu ID real
 */
const FORMSPREE_ID = 'mgonnzqp'

// ─── Estado do formulário ─────────────────────────────────
const form = reactive({ name: '', email: '', message: '' })

const status   = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
const errorMsg = ref('')

// ─── Validação simples ────────────────────────────────────
const validate = () => {
  if (!form.name.trim())                          return 'Informe seu nome.'
  if (!form.email.trim())                         return 'Informe seu e-mail.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido.'
  if (!form.message.trim())                       return 'Escreva sua mensagem.'
  if (form.message.trim().length < 10)            return 'A mensagem deve ter ao menos 10 caracteres.'
  return null
}

// ─── Submissão via Formspree ──────────────────────────────
const handleSubmit = async () => {
  errorMsg.value = ''
  const err = validate()
  if (err) { errorMsg.value = err; return }

  status.value = 'loading'

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // Conteúdo vindo do usuário — não é executado como código
      body: JSON.stringify({
        name:    form.name.trim(),
        email:   form.email.trim(),
        message: form.message.trim()
      })
    })

    if (res.ok) {
      status.value = 'success'
      form.name = form.email = form.message = ''
    } else {
      status.value = 'error'
      errorMsg.value = 'Falha ao enviar. Tente novamente mais tarde.'
    }
  } catch {
    status.value = 'error'
    errorMsg.value = 'Erro de conexão. Verifique sua internet.'
  }
}

// Reiniciar formulário após sucesso
const resetForm = () => { status.value = 'idle' }

// ─── Redes sociais ────────────────────────────────────────
const socials = [
  { icon: 'fab fa-github',      href: 'https://github.com/robertnascimento',    label: 'GitHub',    color: '#f5f5f5' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/robertiver/',  label: 'LinkedIn',  color: '#0a66c2' },
  { icon: 'fab fa-instagram',   href: 'https://instagram.com', label: 'Instagram', color: '#e4405f' },
  { icon: 'fas fa-envelope',    href: 'mailto:robertiver.dev@gmail.com', label: 'E-mail',  color: '#b58e31' }
]
</script>

<template>
  <section id="contato" class="section contact-section" aria-labelledby="contato-titulo">
    <div class="container">

      <!-- ── Cabeçalho ── -->
      <header class="section-header" data-aos="fade-up">
        <span class="section-tag">// contato</span><br>
        <h2 id="contato-titulo" class="section-title">Vamos Conversar?</h2>
        <p class="section-desc">
          Tem um projeto em mente ou quer bater um papo sobre tecnologia?
          Me envie uma mensagem e responderei assim que possível.
        </p>
      </header>

      <div class="contact-layout">

        <!-- ── Coluna esquerda: informações ── -->
        <aside class="contact-info" data-aos="fade-right" data-aos-delay="100">
          <div class="info-card">
            <i class="fas fa-map-marker-alt info-icon" aria-hidden="true"></i>
            <div>
              <strong>Localização</strong>
              <p>Natal / RN — Brasil</p>
            </div>
          </div>
          <div class="info-card">
            <i class="fas fa-briefcase info-icon" aria-hidden="true"></i>
            <div>
              <strong>Empresa</strong>
              <p>Agiltec — Fullstack Developer</p>
            </div>
          </div>
          <div class="info-card">
            <i class="fas fa-graduation-cap info-icon" aria-hidden="true"></i>
            <div>
              <strong>Formação</strong>
              <p>Sistemas p/ Internet — IFRN</p>
            </div>
          </div>

          <!-- Redes sociais -->
          <div class="social-row" aria-label="Redes sociais">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="social-circle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="social.icon" aria-hidden="true"></i>
            </a>
          </div>
        </aside>

        <!-- ── Coluna direita: formulário ── -->
        <div class="contact-form-wrapper" data-aos="fade-left" data-aos-delay="150">

          <!-- Estado: sucesso -->
          <div v-if="status === 'success'" class="feedback success" role="alert">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
            <h3>Mensagem enviada!</h3>
            <p>Obrigado pelo contato, Robert responderá em breve.</p>
            <button class="btn-primary" @click="resetForm">Enviar outra mensagem</button>
          </div>

          <!-- Formulário -->
          <form
            v-else
            class="contact-form"
            @submit.prevent="handleSubmit"
            novalidate
            aria-label="Formulário de contato"
          >
            <!-- Nome -->
            <div class="field-group">
              <label for="contact-name" class="field-label">Nome <span aria-hidden="true">*</span></label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                class="field-input"
                placeholder="Seu nome completo"
                autocomplete="name"
                required
                :disabled="status === 'loading'"
                maxlength="100"
              />
            </div>

            <!-- E-mail -->
            <div class="field-group">
              <label for="contact-email" class="field-label">E-mail <span aria-hidden="true">*</span></label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                class="field-input"
                placeholder="seu@email.com"
                autocomplete="email"
                required
                :disabled="status === 'loading'"
                maxlength="150"
              />
            </div>

            <!-- Mensagem -->
            <div class="field-group">
              <label for="contact-message" class="field-label">Mensagem <span aria-hidden="true">*</span></label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                class="field-input field-textarea"
                placeholder="Descreva seu projeto ou dúvida..."
                rows="5"
                required
                :disabled="status === 'loading'"
                maxlength="2000"
              ></textarea>
              <span class="char-count" aria-live="polite">{{ form.message.length }}/2000</span>
            </div>

            <!-- Erro de validação -->
            <p v-if="errorMsg" class="error-msg" role="alert">
              <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
              {{ errorMsg }}
            </p>

            <!-- Botão submit -->
            <button
              type="submit"
              class="btn-primary submit-btn"
              :disabled="status === 'loading'"
              :aria-busy="String(status === 'loading')"
            >
              <i
                :class="status === 'loading' ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"
                aria-hidden="true"
              ></i>
              {{ status === 'loading' ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>

            <!-- Nota sobre Formspree -->
            <p class="form-note">
              <i class="fas fa-lock fa-xs" aria-hidden="true"></i>
              Formulário protegido pelo Formspree. Seus dados não são armazenados por este site.
            </p>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--color-bg);
}

/* ── Layout ── */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: var(--spacing-3xl);
  align-items: start;
}

/* ── Info lateral ── */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.info-card:hover { border-color: var(--color-primary); }

.info-icon {
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-top: 2px;
  flex-shrink: 0;
}

.info-card strong {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}

.info-card p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* ── Social row ── */
.social-row {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
}

.social-circle {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}

.social-circle:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: var(--shadow-primary);
}

/* ── Formulário ── */
.contact-form-wrapper {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.field-label span {
  color: var(--color-primary);
}

.field-input {
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.8rem 1rem;
  color: var(--color-text);
  font-size: var(--text-base);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  outline: none;
  resize: none;
}

.field-input::placeholder {
  color: var(--color-text-subtle);
}

.field-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(158, 27, 27, 0.15);
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-textarea {
  line-height: 1.6;
}

.char-count {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  text-align: right;
}

/* ── Erro ── */
.error-msg {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1rem;
  background: rgba(158, 27, 27, 0.1);
  border: 1px solid rgba(158, 27, 27, 0.3);
  border-radius: var(--radius-md);
  color: #e57373;
  font-size: var(--text-sm);
}

/* ── Submit ── */
.submit-btn {
  width: 100%;
  justify-content: center;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-note {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* ── Feedback de sucesso ── */
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl);
}

.feedback.success .fa-check-circle {
  font-size: 3rem;
  color: #22c55e;
}

.feedback h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
}

.feedback p {
  font-size: var(--text-base);
  color: var(--color-text-muted);
}

/* ── Responsivo ── */
@media (max-width: 860px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-form-wrapper {
    padding: var(--spacing-lg);
  }
}
</style>

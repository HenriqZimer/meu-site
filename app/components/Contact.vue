<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <!-- Header da Seção -->
      <div class="section-header" data-animate="fade-in">
        <div class="section-badge">
          <v-icon icon="mdi-email" size="16" />
          <span>Contato</span>
        </div>
        <h2 class="section-title">
          Interessado em 
          <span class="title-highlight">trabalhar comigo</span>?
        </h2>
        <p class="section-subtitle">
          Vamos conversar sobre seu próximo projeto
        </p>
      </div>

      <div class="contact-content">
        <div class="contact-info-card" data-animate="slide-up" data-delay="200">
          <div class="card-header">
            <h3 class="card-title">Entre em Contato</h3>
            <p class="card-subtitle">Estou sempre disponível para novos projetos</p>
          </div>

          <div class="contact-list">
            <div class="contact-item" data-animate="fade-in" data-delay="300">
              <div class="contact-icon">
                <v-icon icon="mdi-email" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">Email</span>
                <a :href="`mailto:${email}`" class="contact-value">{{ email }}</a>
              </div>
            </div>

            <div class="contact-item" data-animate="fade-in" data-delay="400">
              <div class="contact-icon">
                <v-icon icon="mdi-phone" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">Telefone</span>
                <span class="contact-value">{{ phone }}</span>
              </div>
            </div>

            <div class="contact-item" data-animate="fade-in" data-delay="500">
              <div class="contact-icon">
                <v-icon icon="mdi-map-marker" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">Localização</span>
                <span class="contact-value">{{ location }}</span>
              </div>
            </div>
          </div>

          <div class="social-section">
            <h4 class="social-title">Redes Sociais</h4>
            <div class="social-buttons">
              <v-btn
                variant="outlined"
                color="primary"
                class="social-btn"
                :href="githubUrl"
                target="_blank"
              >
                <v-icon start icon="mdi-github" />
                GitHub
              </v-btn>
              <v-btn
                variant="outlined"
                color="primary"
                class="social-btn"
                :href="linkedinUrl"
                target="_blank"
              >
                <v-icon start icon="mdi-linkedin" />
                LinkedIn
              </v-btn>
            </div>
          </div>
        </div>

        <div class="contact-form-card" data-animate="slide-up" data-delay="400">
          <div class="card-header">
            <h3 class="card-title">Envie uma Mensagem</h3>
            <p class="card-subtitle">Descreva seu projeto e vamos conversar</p>
          </div>

          <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <v-text-field
                v-model="formData.name"
                label="Nome"
                :rules="nameRules"
                variant="outlined"
                density="comfortable"
                class="form-field"
              />
              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                variant="outlined"
                density="comfortable"
                class="form-field"
              />
            </div>

            <v-text-field
              v-model="formData.subject"
              label="Assunto"
              :rules="subjectRules"
              variant="outlined"
              density="comfortable"
              class="form-field"
            />

            <v-textarea
              v-model="formData.message"
              label="Mensagem"
              :rules="messageRules"
              variant="outlined"
              rows="5"
              class="form-field"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              :loading="loading"
              :disabled="!valid"
              class="submit-btn"
            >
              <v-icon start icon="mdi-send" />
              Enviar Mensagem
            </v-btn>
          </v-form>

          <v-alert
            v-if="alert.show"
            :type="alert.type"
            class="form-alert"
            closable
            @click:close="alert.show = false"
          >
            {{ alert.message }}
          </v-alert>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Variáveis de ambiente
const email = useRuntimeConfig().public.email
const phone = useRuntimeConfig().public.phone
const location = useRuntimeConfig().public.location
const githubUrl = useRuntimeConfig().public.githubUrl
const linkedinUrl = useRuntimeConfig().public.linkedinUrl

const valid = ref(false)
const loading = ref(false)
const form = ref(null)

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const alert = ref<{
  show: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}>({
  show: false,
  type: 'success',
  message: ''
})

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
]

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const subjectRules = [
  (v: string) => !!v || 'Assunto é obrigatório'
]

const messageRules = [
  (v: string) => !!v || 'Mensagem é obrigatória',
  (v: string) => v.length >= 10 || 'Mensagem deve ter pelo menos 10 caracteres'
]

const handleSubmit = async () => {
  if (!valid.value) return

  loading.value = true

  try {
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 1500))

    alert.value = {
      show: true,
      type: 'success',
      message: 'Mensagem enviada com sucesso! Responderei em breve.'
    }

    // Resetar formulário
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    if (form.value) {
      // Reset do formulário usando interface adequada
      const formElement = form.value as HTMLFormElement
      formElement.reset()
    }
  } catch {
    // Erro capturado mas não utilizado diretamente
    alert.value = {
      show: true,
      type: 'error',
      message: 'Erro ao enviar mensagem. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-section {
  background: rgb(var(--v-theme-background));
  min-height: 100vh;
  padding: 80px 0;
  position: relative;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header da Seção */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(var(--v-theme-primary), 0.1);
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 24px;
  color: rgb(var(--v-theme-primary));
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 16px;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease 0.2s forwards;
}

.title-highlight {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-bottom: 0;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease 0.4s forwards;
}

/* Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: start;
}

/* Cards */
.contact-info-card,
.contact-form-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  padding: 32px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.contact-form-card {
  animation-delay: 0.2s;
}

.card-header {
  margin-bottom: 32px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.card-subtitle {
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 1rem;
  line-height: 1.5;
}

/* Contact List */
.contact-list {
  margin-bottom: 24px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgb(var(--v-theme-surface-bright));
  transition: all 0.3s ease;
}

.contact-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.contact-item:hover {
  transform: translateX(8px);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 8px;
  color: rgb(var(--v-theme-primary));
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
}

.contact-value {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: rgb(var(--v-theme-primary));
}

/* Social Section */
.social-section {
  padding-top: 20px;
  border-top: 1px solid rgb(var(--v-theme-surface-bright));
}

.social-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 12px;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(var(--v-theme-primary), 0.2);
}

/* Form */
.contact-form {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field {
  margin-bottom: 16px;
}

.submit-btn {
  width: 100%;
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  transition: all 0.3s ease !important;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(var(--v-theme-primary), 0.3);
}

.form-alert {
  margin-top: 24px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 60px 0;
  }
  
  .contact-container {
    padding: 0 16px;
  }
  
  .section-header {
    margin-bottom: 60px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .contact-info-card,
  .contact-form-card {
    padding: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .social-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .contact-info-card,
  .contact-form-card {
    padding: 20px;
  }
}
</style>
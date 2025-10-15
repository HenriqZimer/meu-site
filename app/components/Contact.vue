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
        <p class="section-description">
          Vamos conversar sobre seu próximo projeto
        </p>
      </div>

      <div class="contact-content">
        <div class="contact-info-card" data-animate="slide-up" data-delay="200">
          <div class="card-header">
            <h3 class="card-title">Entre em Contato</h3>
            <p class="card-subtitle">
              Estou sempre disponível para novos projetos
            </p>
          </div>

          <div class="contact-list">
            <div class="contact-item" data-animate="fade-in" data-delay="300">
              <div class="contact-icon">
                <v-icon icon="mdi-email" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">Email</span>
                <a :href="`mailto:${email}`" class="contact-value">{{
                  email
                }}</a>
              </div>
            </div>

            <div class="contact-item" data-animate="fade-in" data-delay="400">
              <div class="contact-icon">
                <v-icon icon="mdi-phone" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">Telefone</span>
                <a :href="`tel:${phone}`" class="contact-value">{{ phone }}</a>
              </div>
            </div>

            <div class="contact-item" data-animate="fade-in" data-delay="400">
              <div class="contact-icon">
                <v-icon icon="mdi-whatsapp" size="20" />
              </div>
              <div class="contact-details">
                <span class="contact-label">WhatsApp</span>
                <a :href="`https://wa.me/5547992606276?text=Estou%20entrando%20em%20contato%20pelo%20seu%20site`" class="contact-value">{{ phone }}</a>
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

          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="handleSubmit"
            class="contact-form"
          >
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
import { ref } from "vue";

// Variáveis de ambiente
const email = useRuntimeConfig().public.email;
const phone = useRuntimeConfig().public.phone;
const location = useRuntimeConfig().public.location;
const githubUrl = useRuntimeConfig().public.githubUrl;
const linkedinUrl = useRuntimeConfig().public.linkedinUrl;

const valid = ref(false);
const loading = ref(false);
const form = ref(null);

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const alert = ref<{
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  message: string;
}>({
  show: false,
  type: "success",
  message: "",
});

const nameRules = [
  (v: string) => !!v || "Nome é obrigatório",
  (v: string) => v.length >= 3 || "Nome deve ter pelo menos 3 caracteres",
];

const emailRules = [
  (v: string) => !!v || "Email é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "Email deve ser válido",
];

const subjectRules = [(v: string) => !!v || "Assunto é obrigatório"];

const messageRules = [
  (v: string) => !!v || "Mensagem é obrigatória",
  (v: string) => v.length >= 10 || "Mensagem deve ter pelo menos 10 caracteres",
];

const handleSubmit = async () => {
  if (!valid.value) return;

  loading.value = true;

  try {
    // Criar o corpo do email com os dados do formulário
    const emailBody = `Nome: ${formData.value.name}%0D%0AEmail: ${formData.value.email}%0D%0A%0D%0AMensagem:%0D%0A${formData.value.message}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      formData.value.subject
    )}&body=${emailBody}`;

    // Abrir cliente de email
    window.location.href = mailtoLink;

    // Aguardar um pouco antes de mostrar a mensagem
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert.value = {
      show: true,
      type: "success",
      message:
        "Abrindo seu cliente de email! Se não abrir automaticamente, envie para: " +
        email,
    };

    // Resetar formulário
    formData.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (form.value) {
      const formElement = form.value as any;
      if (formElement.reset) {
        formElement.reset();
      }
    }
  } catch (error) {
    alert.value = {
      show: true,
      type: "error",
      message:
        "Erro ao abrir cliente de email. Envie diretamente para: " + email,
    };
  } finally {
    loading.value = false;
  }
};
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
  background: rgba(59, 130, 246, 0.15) !important;
  border: 1px solid rgba(59, 130, 246, 0.3) !important;
  border-radius: 24px;
  color: rgb(96, 165, 250) !important;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  backdrop-filter: blur(10px);
}

.section-badge .v-icon {
  background: transparent !important;
  background-color: transparent !important;
  color: rgb(96, 165, 250) !important;
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
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.15);
  border-radius: 20px;
  padding: 32px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  transition: all 0.3s ease;
}

.contact-info-card:hover,
.contact-form-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
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
  padding: 16px 0;
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
  width: 48px;
  height: 48px;
  background: rgba(59, 130, 246, 0.1) !important;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  color: rgb(96, 165, 250) !important;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
  background: rgba(59, 130, 246, 0.2) !important;
  border-color: rgba(59, 130, 246, 0.4);
  transform: scale(1.1);
}

.contact-icon .v-icon {
  background: transparent !important;
  background-color: transparent !important;
  color: rgb(96, 165, 250) !important;
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
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  border: 2px solid rgb(59, 130, 246) !important;
  color: rgb(96, 165, 250) !important;
  transition: all 0.3s ease !important;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1) !important;
  border-color: rgb(96, 165, 250) !important;
}

.social-btn .v-icon {
  background: transparent !important;
  background-color: transparent !important;
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
  background-color: transparent !important;
  background: transparent !important;
}

/* Fix para remover background estranho dos campos */
.contact-form :deep(.v-field) {
  background-color: transparent !important;
  background: transparent !important;
}

.contact-form :deep(.v-field__overlay) {
  background-color: transparent !important;
  opacity: 0 !important;
}

.contact-form :deep(.v-field__field) {
  background-color: transparent !important;
}

.contact-form :deep(.v-field--variant-outlined .v-field__outline) {
  color: rgba(var(--v-theme-outline), 0.3);
}

.contact-form :deep(.v-field--focused .v-field__outline) {
  color: rgb(59, 130, 246);
}

.contact-form :deep(.v-field--variant-outlined:hover .v-field__outline) {
  color: rgba(var(--v-theme-outline), 0.5);
}

/* Borda vermelha em campos com erro */
.contact-form :deep(.v-field--error .v-field__outline) {
  color: rgb(239, 68, 68) !important;
}

.contact-form :deep(.v-field--error:not(.v-field--focused) .v-field__outline) {
  color: rgb(239, 68, 68) !important;
}

.contact-form :deep(.v-messages__message) {
  color: rgb(239, 68, 68) !important;
}

.submit-btn {
  width: 100%;
  border-radius: 16px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 14px 28px !important;
  background: rgb(59, 130, 246) !important;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease !important;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.5);
  background: rgb(37, 99, 235) !important;
}

.submit-btn .v-icon {
  background: transparent !important;
  background-color: transparent !important;
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
  .contact-info-card,
  .contact-form-card {
    padding: 20px;
  }
}
</style>

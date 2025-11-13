<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <!-- Header da Seção -->
      <SectionHeader
        badge="Contato"
        icon="mdi-email"
        title-prefix="Interessado em"
        title-highlight="trabalhar comigo"
        description="Vamos conversar sobre seu próximo projeto"
        custom-class="section-header"
      />

      <div class="contact-content">
        <div class="contact-info-card" data-animate="slide-up" data-delay="200">
          <div class="card-header">
            <h3 class="card-title">Entre em Contato</h3>
            <p class="card-subtitle">
              Estou sempre disponível para novos projetos
            </p>
          </div>

          <div class="contact-list">
            <ContactItem
              icon="mdi-email"
              label="Email"
              :value="email"
              :href="`mailto:${email}`"
              :delay="300"
            />
            
            <ContactItem
              icon="mdi-phone"
              label="Telefone"
              :value="phone"
              :href="`tel:${phone}`"
              :delay="400"
            />
            
            <ContactItem
              icon="mdi-whatsapp"
              label="WhatsApp"
              :value="phone"
              :href="contactInfo.whatsapp"
              :delay="450"
              external
            />
            
            <ContactItem
              icon="mdi-map-marker"
              label="Localização"
              :value="location"
              :delay="500"
            />
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VALIDATION_RULES } from "~/constants";
import { useSocialLinks } from "~/composables/useSocialLinks";

// Composables
const { contactInfo } = useSocialLinks();

// Variáveis de ambiente
const config = useRuntimeConfig();
const email = contactInfo.email;
const phone = contactInfo.phone;
const location = contactInfo.location;
const githubUrl = config.public.githubUrl;
const linkedinUrl = config.public.linkedinUrl;

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

// Use validation rules from constants
const nameRules = VALIDATION_RULES.NAME;
const emailRules = VALIDATION_RULES.EMAIL;
const subjectRules = VALIDATION_RULES.SUBJECT;
const messageRules = VALIDATION_RULES.MESSAGE;

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

.contact-section .section-title {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.2s;
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
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

/* Cards */
.contact-info-card {
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.15);
  border-radius: 20px;
  padding: 32px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  transition: all 0.3s ease;
  width: 100%;
}

.contact-info-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
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

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

/* Animations moved to /assets/css/components.css */

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

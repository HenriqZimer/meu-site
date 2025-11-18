<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <!-- Header da Seção -->
      <SectionHeader badge="Contato" icon="mdi-email" title-prefix="Interessado em" title-highlight="trabalhar comigo"
        description="Vamos conversar sobre seu próximo projeto" custom-class="section-header" />

      <div class="contact-content">
        <div class="contact-info-card" data-animate="slide-up" data-delay="200">
          <div class="card-header">
            <h3 class="card-title">Entre em Contato</h3>
            <p class="card-subtitle">
              Estou sempre disponível para novos projetos
            </p>
          </div>

          <div class="contact-list">
            <ContactItem icon="mdi-email" label="Email" :value="email" :href="`mailto:${email}`" :delay="300" />

            <ContactItem icon="mdi-phone" label="Telefone" :value="phone" :href="`tel:${phone}`" :delay="400" />

            <ContactItem icon="mdi-whatsapp" label="WhatsApp" :value="phone" :href="contactInfo.whatsapp" :delay="450"
              external />

            <ContactItem icon="mdi-map-marker" label="Localização" :value="location" :delay="500" />
          </div>

          <div class="social-section">
            <h4 class="social-title">Redes Sociais</h4>
            <div class="social-buttons">
              <v-btn variant="outlined" color="primary" class="social-btn" :href="githubUrl" target="_blank">
                <v-icon start icon="mdi-github" />
                GitHub
              </v-btn>
              <v-btn variant="outlined" color="primary" class="social-btn" :href="linkedinUrl" target="_blank">
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
  padding: 40px 40px 40px 40px;
  background: rgb(var(--v-theme-background));
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Header da Seção */
.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.contact-section .section-title {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.2s;
}

/* Content */
.contact-content {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
}

/* Cards */
.contact-info-card {
  background: rgba(var(--v-theme-surface), 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--v-theme-outline), 0.15);
  border-radius: 24px;
  padding: 40px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: 0.2s;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.contact-info-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 20px 48px rgba(59, 130, 246, 0.2);
  transform: translateY(-4px);
}

.card-header {
  margin-bottom: 32px;
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.1);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 12px;
  letter-spacing: -0.025em;
}

.card-subtitle {
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
}

/* Contact List */
.contact-list {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Social Section */
.social-section {
  padding-top: 28px;
  margin-top: 28px;
  border-top: 2px solid rgba(59, 130, 246, 0.1);
}

.social-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: -0.025em;
}

.social-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.social-btn {
  border-radius: 14px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  height: 48px !important;
  border: 2px solid rgb(59, 130, 246) !important;
  color: rgb(96, 165, 250) !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  letter-spacing: 0.025em !important;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.15) !important;
  border-color: rgb(96, 165, 250) !important;
}

.social-btn .v-icon {
  background: transparent !important;
  background-color: transparent !important;
}

/* Animations moved to /assets/css/components.css */

/* Responsive */
@media (max-width: 1024px) {
  .contact-content {
    max-width: 700px;
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
    margin-bottom: 48px;
  }

  .contact-content {
    max-width: 100%;
  }

  .contact-info-card {
    padding: 28px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-subtitle {
    font-size: 0.95rem;
  }

  .social-buttons {
    gap: 12px;
  }

  .social-btn {
    flex: 1;
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 50px 0;
  }

  .contact-info-card {
    padding: 24px;
  }

  .card-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
  }

  .card-title {
    font-size: 1.35rem;
  }

  .card-subtitle {
    font-size: 0.9rem;
  }

  .contact-list {
    gap: 14px;
  }

  .social-section {
    padding-top: 24px;
    margin-top: 24px;
  }

  .social-title {
    font-size: 1.15rem;
  }

  .social-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .social-btn {
    width: 100%;
    min-width: auto;
  }
}
</style>

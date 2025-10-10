<template>
  <section id="contact" class="bg-grey-lighten-4">
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">Contato</h2>
          <div class="text-h6 text-grey-darken-1">
            Vamos trabalhar juntos
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="5">
          <v-card elevation="2" class="pa-6">
            <h3 class="text-h6 font-weight-bold mb-6">Entre em Contato</h3>

            <v-list class="bg-transparent">
              <v-list-item class="px-0 mb-4">
                <template #prepend>
                  <v-icon color="primary" size="24">mdi-email</v-icon>
                </template>
                <v-list-item-title class="text-body-1">
                  {{ email }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="px-0 mb-4">
                <template #prepend>
                  <v-icon color="primary" size="24">mdi-phone</v-icon>
                </template>
                <v-list-item-title class="text-body-1">
                  {{ phone }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="px-0 mb-4">
                <template #prepend>
                  <v-icon color="primary" size="24">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title class="text-body-1">
                  {{ location }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider class="my-6"/>

            <h4 class="text-subtitle-1 font-weight-bold mb-4">Redes Sociais</h4>
            <div class="d-flex gap-2">
              <v-btn
                icon
                variant="outlined"
                color="primary"
                :href="githubUrl"
                target="_blank"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="outlined"
                color="primary"
                :href="linkedinUrl"
                target="_blank"
              >
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="outlined"
                color="primary"
                :href="`mailto:${email}`"
                target="_blank"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="7">
          <v-card elevation="2" class="pa-6">
            <h3 class="text-h6 font-weight-bold mb-6">Envie uma Mensagem</h3>

            <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="formData.name"
                label="Nome"
                :rules="nameRules"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              />

              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              />

              <v-text-field
                v-model="formData.subject"
                label="Assunto"
                :rules="subjectRules"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              />

              <v-textarea
                v-model="formData.message"
                label="Mensagem"
                :rules="messageRules"
                variant="outlined"
                rows="5"
                class="mb-4"
              />

              <v-btn
                type="submit"
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!valid"
                block
              >
                Enviar Mensagem
              </v-btn>
            </v-form>

            <v-alert
              v-if="alert.show"
              :type="alert.type"
              class="mt-4"
              closable
              @click:close="alert.show = false"
            >
              {{ alert.message }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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

const alert = ref({
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

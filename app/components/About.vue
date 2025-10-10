<template>
  <section id="about">
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">Sobre Mim</h2>
          <div class="text-h6 text-grey-darken-1">
            Conhecendo um pouco mais
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div class="text-body-1 text-grey-darken-1">
            <p class="mb-4">
              Sou um desenvolvedor apaixonado por criar experiências web excepcionais.
              Com formação em Ciência da Computação e anos de experiência prática,
              dedico-me a transformar conceitos complexos em soluções elegantes e intuitivas.
            </p>
            <p class="mb-4">
              Minha jornada no desenvolvimento web começou com curiosidade e evoluiu
              para uma carreira focada em qualidade, performance e experiência do usuário.
              Acredito que o melhor código é aquele que resolve problemas reais de forma simples.
            </p>
            <p>
              Quando não estou programando, gosto de contribuir com projetos open source,
              aprender novas tecnologias e compartilhar conhecimento com a comunidade.
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col v-for="stat in stats" :key="stat.label" cols="6">
              <v-card class="pa-4 text-center" elevation="2">
                <div class="text-h3 font-weight-bold text-primary mb-2">
                  {{ stat.value }}
                </div>
                <div class="text-body-2 text-grey-darken-1">
                  {{ stat.label }}
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-card class="mt-6 pa-6" elevation="2">
            <h3 class="text-h6 font-weight-bold mb-4">Valores</h3>
            <v-chip
              v-for="value in values"
              :key="value"
              class="ma-1"
              color="primary"
              variant="outlined"
            >
              {{ value }}
            </v-chip>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '5+', label: 'Anos de Experiência' },
  { value: '50+', label: 'Projetos Concluídos' },
  { value: '30+', label: 'Clientes Satisfeitos' },
  { value: '100%', label: 'Comprometimento' }
]

const values = [
  'Código Limpo',
  'Qualidade',
  'Inovação',
  'Colaboração',
  'Aprendizado Contínuo',
  'Performance'
]
</script>

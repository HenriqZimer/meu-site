<template>
  <section id="skills" class="bg-grey-lighten-4">
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">Habilidades</h2>
          <div class="text-h6 text-grey-darken-1">
            Tecnologias e ferramentas que domino
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="category in skillCategories" :key="category.name" cols="12" md="4">
          <v-card class="pa-6" elevation="2" height="100%">
            <div class="d-flex align-center mb-4">
              <v-icon :icon="category.icon" size="32" color="primary" class="mr-3"/>
              <h3 class="text-h6 font-weight-bold">{{ category.name }}</h3>
            </div>

            <v-list density="compact" class="bg-transparent">
              <v-list-item
                v-for="skill in category.skills"
                :key="skill.name"
                class="px-0"
              >
                <div class="mb-2">
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-body-2">{{ skill.name }}</span>
                    <span class="text-body-2 text-grey-darken-1">{{ skill.level }}%</span>
                  </div>
                  <v-progress-linear
                    :model-value="skill.level"
                    color="primary"
                    height="6"
                    rounded
                  />
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-8">
        <v-col cols="12" class="text-center">
          <h3 class="text-h6 font-weight-bold mb-4">Outras Tecnologias</h3>
          <v-chip
            v-for="tech in otherTechs"
            :key="tech"
            class="ma-1"
            color="primary"
            variant="outlined"
          >
            {{ tech }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const skillCategories = [
  {
    name: 'Frontend',
    icon: 'mdi-monitor',
    skills: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'CSS/SASS', level: 92 }
    ]
  },
  {
    name: 'Backend',
    icon: 'mdi-server',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 75 }
    ]
  },
  {
    name: 'DevOps',
    icon: 'mdi-cloud',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 82 },
      { name: 'CI/CD', level: 78 },
      { name: 'AWS', level: 75 }
    ]
  }
]

const otherTechs = [
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
  'Vuetify',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Jest',
  'Vitest',
  'Webpack',
  'Vite',
  'Figma'
]
</script>

<template>
  <section id="certifications" class="py-16">
    <v-container>
      <div class="text-center mb-12">
        <h2 class="text-h3 font-weight-bold mb-4">Certificações</h2>
        <p class="text-h6 text-medium-emphasis">
          Minha jornada de aprendizado contínuo e desenvolvimento profissional
        </p>
      </div>

      <v-row>
        <!-- Certificações Obtidas -->
        <v-col cols="12" md="6">
          <v-card class="h-100" elevation="2">
            <v-card-title class="text-h5 text-center bg-success text-white">
              <v-icon left>mdi-certificate</v-icon>
              Certificações Obtidas
            </v-card-title>
            <v-card-text class="pa-6">
              <v-list class="transparent">
                <v-list-item
                  v-for="cert in obtainedCertifications"
                  :key="cert.name"
                  :href="cert.link"
                  target="_blank"
                  class="mb-2 rounded-lg"
                  hover
                >
                  <template #prepend>
                    <v-icon :color="cert.color" size="large">
                      {{ cert.icon }}
                    </v-icon>
                  </template>
                  
                  <v-list-item-title class="font-weight-medium">
                    {{ cert.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle>
                    {{ cert.issuer }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-icon size="small">mdi-open-in-new</v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Certificações Planejadas -->
        <v-col cols="12" md="6">
          <v-card class="h-100" elevation="2">
            <v-card-title class="text-h5 text-center bg-primary text-white">
              <v-icon left>mdi-target</v-icon>
              Próximas Metas
            </v-card-title>
            <v-card-text class="pa-6">
              <v-list class="transparent">
                <v-list-item
                  v-for="cert in plannedCertifications"
                  :key="cert.name"
                  :href="cert.link"
                  target="_blank"
                  class="mb-2 rounded-lg"
                  hover
                >
                  <template #prepend>
                    <v-icon :color="cert.color" size="large">
                      {{ cert.icon }}
                    </v-icon>
                  </template>
                  
                  <v-list-item-title class="font-weight-medium">
                    {{ cert.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle>
                    {{ cert.issuer }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-icon size="small">mdi-open-in-new</v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
// Certificações já obtidas
const obtainedCertifications = [
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
  },
  {
    name: 'Google Cloud Associate',
    issuer: 'Google Cloud',
    icon: 'mdi-google-cloud',
    color: '#4285F4',
    link: 'https://cloud.google.com/certification/cloud-engineer'
  },
  {
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    icon: 'mdi-docker',
    color: '#2496ED',
    link: 'https://www.docker.com/certification/'
  }
]

// Certificações planejadas
const plannedCertifications = [
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    name: 'Kubernetes CKA',
    issuer: 'Cloud Native Computing Foundation',
    icon: 'mdi-kubernetes',
    color: '#326CE5',
    link: 'https://www.cncf.io/certification/cka/'
  },
  {
    name: 'Azure DevOps Engineer',
    issuer: 'Microsoft',
    icon: 'mdi-microsoft-azure',
    color: '#0078D4',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/devops-engineer/'
  }
]
</script>
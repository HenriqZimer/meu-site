<template>
  <v-footer app color="rgba(15, 23, 42, 0.95)">
    <v-container>
      <v-row>
        <!-- Brand -->
        <v-col cols="12" md="4">
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar size="48" rounded="lg">
              <v-img :src="IMAGE_URLS.LOGO" alt="Logo" />
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold text-white">
                Henrique Zimermann
              </div>
              <div class="text-caption text-blue-grey-lighten-2">
                DevOps & Cloud Engineer
              </div>
            </div>
          </div>
          <p class="text-body-2 text-blue-grey-lighten-2">
            Automatizando infraestruturas e otimizando processos de desenvolvimento.
          </p>
        </v-col>

        <!-- Links -->
        <v-col cols="6" md="2">
          <div class="text-subtitle-2 font-weight-bold text-white mb-3">
            Navegação
          </div>
          <v-list density="compact" color="transparent">
            <v-list-item
              v-for="link in quickLinks"
              :key="link.label"
              @click="scrollToSection(link.href)"
              class="text-blue-grey-lighten-2"
            >
              {{ link.label }}
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Contact -->
        <v-col cols="6" md="3">
          <div class="text-subtitle-2 font-weight-bold text-white mb-3">
            Contato
          </div>
          <v-list density="compact" color="transparent">
            <v-list-item
              :href="`https://wa.me/${phoneNumber.replace(/\D/g, '')}`"
              target="_blank"
              prepend-icon="mdi-phone"
              class="text-blue-grey-lighten-2"
            >
              {{ phoneNumber }}
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-map-marker"
              class="text-blue-grey-lighten-2"
            >
              Santa Catarina, Brasil
            </v-list-item>
            <v-list-item
              :href="`mailto:${email}`"
              prepend-icon="mdi-email"
              class="text-blue-grey-lighten-2"
            >
              {{ email }}
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Social -->
        <v-col cols="12" md="3">
          <div class="text-subtitle-2 font-weight-bold text-white mb-3">
            Redes Sociais
          </div>
          <div class="d-flex flex-wrap ga-2">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :icon="social.icon"
              size="small"
              variant="tonal"
              color="primary"
              target="_blank"
            />
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-row>
        <v-col cols="12" class="text-center text-body-2 text-blue-grey-lighten-2">
          © {{ currentYear }} Henrique Zimermann. Todos os direitos reservados.
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      v-show="showScrollTop"
      @click="scrollToTop"
      icon="mdi-arrow-up"
      color="primary"
      size="large"
      position="fixed"
      location="bottom end"
      class="ma-4"
    />
  </v-footer>
</template>

<script setup lang="ts">
import { QUICK_LINKS, IMAGE_URLS } from "~/constants";
import { useNavigation } from "~/composables/useNavigation";
import { useSocialLinks } from "~/composables/useSocialLinks";

const currentYear = new Date().getFullYear();
const showScrollTop = ref(false);

const { scrollToSection, scrollToTop, shouldShowScrollTop } = useNavigation();
const { footerSocialLinks, contactInfo } = useSocialLinks();

const socialLinks = footerSocialLinks;
const quickLinks = QUICK_LINKS;
const email = contactInfo.email;
const phoneNumber = contactInfo.phone;

const handleScroll = () => {
  showScrollTop.value = shouldShowScrollTop();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.v-footer {
  backdrop-filter: blur(12px);
}
</style>

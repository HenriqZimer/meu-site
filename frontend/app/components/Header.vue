<template>
  <v-app-bar
    :elevation="scrolled ? 4 : 0"
    :color="scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)'"
    app
    height="70"
  >
    <template v-slot:prepend>
      <v-btn
        variant="text"
        @click="scrollToSection('home')"
        class="text-none"
      >
        <v-avatar size="40" rounded="lg" class="mr-3">
          <v-img :src="IMAGE_URLS.LOGO" alt="Logo" />
        </v-avatar>
        <div class="d-flex flex-column align-start">
          <span class="text-body-2 font-weight-bold text-white">
            Henrique
          </span>
          <span class="text-caption text-blue-grey-lighten-2">
            DevOps Engineer
          </span>
        </div>
      </v-btn>
    </template>

    <template v-slot:default>
      <div v-show="mdAndUp" class="d-flex align-center ga-2 mx-auto">
        <v-btn
          v-for="item in menuItems"
          :key="item.id"
          variant="text"
          :color="activeSection === item.id ? 'primary' : ''"
          class="text-none"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </v-btn>
      </div>
    </template>

    <template v-slot:append>
      <v-btn
        v-show="mdAndUp"
        color="primary"
        variant="flat"
        class="text-none"
        @click="scrollToSection('contact')"
      >
        Fale Comigo
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>

      <v-btn
        v-show="!mdAndUp"
        icon="mdi-menu"
        variant="text"
        @click="drawer = true"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    width="300"
  >
    <v-list>
      <v-list-item
        prepend-avatar="H"
        title="Henrique Zimermann"
        subtitle="DevOps Engineer"
      />
    </v-list>

    <v-divider />

    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.id"
        :prepend-icon="item.icon"
        :title="item.label"
        :active="activeSection === item.id"
        @click="handleDrawerItemClick(item.id)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { MENU_ITEMS, SCROLL_CONFIG, IMAGE_URLS } from "~/constants";
import { useNavigation } from "~/composables/useNavigation";
import { useDisplay } from 'vuetify';

const { scrollToSection, getActiveSection } = useNavigation();
const { mdAndUp } = useDisplay();

const scrolled = ref(false);
const drawer = ref(false);
const activeSection = ref("home");
const menuItems = MENU_ITEMS;

const handleDrawerItemClick = (id: string) => {
  scrollToSection(id);
  drawer.value = false;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > SCROLL_CONFIG.SCROLL_THRESHOLD;
  const sections = ["home", ...menuItems.map((item) => item.id)];
  activeSection.value = getActiveSection(sections);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(12px);
}
</style>

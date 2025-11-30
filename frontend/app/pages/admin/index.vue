<template>
    <v-app :theme="'dark'">
        <div class="admin-page">
            <!-- Login Screen -->
            <v-container v-if="!isAuthenticated" class="login-container fill-height">
                <!-- Animated Background -->
                <div class="animated-bg">
                    <div class="bg-shape shape-1"></div>
                    <div class="bg-shape shape-2"></div>
                    <div class="bg-shape shape-3"></div>
                </div>

                <v-row align="center" justify="center" class="login-row">
                    <v-col cols="12" sm="8" md="5" lg="4">
                        <!-- Logo/Brand -->
                        <div class="brand-section text-center mb-8">
                            <div class="brand-icon-wrapper">
                                <v-icon icon="mdi-shield-lock" size="64" class="brand-icon" />
                            </div>
                            <h1 class="brand-title mt-4">Admin Portal</h1>
                            <p class="brand-subtitle">Painel de Gerenciamento</p>
                        </div>

                        <!-- Login Card -->
                        <v-card class="login-card" elevation="0">
                            <v-card-text class="pa-8">
                                <h2 class="login-title text-center mb-2">Bem-vindo de volta</h2>
                                <p class="login-subtitle text-center mb-6">Entre com suas credenciais</p>

                                <v-form @submit.prevent="handleLogin">
                                    <v-text-field v-model="loginForm.username" label="Usuário"
                                        prepend-inner-icon="mdi-account-outline" variant="outlined"
                                        density="comfortable" :error-messages="loginError" class="mb-4 custom-input"
                                        hide-details="auto" />

                                    <v-text-field v-model="loginForm.password" label="Senha"
                                        prepend-inner-icon="mdi-lock-outline" :type="showPassword ? 'text' : 'password'"
                                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append-inner="showPassword = !showPassword" variant="outlined"
                                        density="comfortable" :error-messages="loginError" class="mb-6 custom-input"
                                        hide-details="auto" />

                                    <v-btn type="submit" color="primary" size="x-large" block :loading="loading"
                                        class="login-btn">
                                        <v-icon start>mdi-login</v-icon>
                                        Entrar no Painel
                                    </v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>

                        <!-- Footer Info -->
                        <div class="login-footer text-center mt-6">
                            <p class="text-caption">
                                <v-icon size="small" class="mr-1">mdi-shield-check</v-icon>
                                Conexão segura com criptografia JWT
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Admin Content -->
            <v-main v-else class="admin-content">
                <v-container fluid class="pa-0">
                    <!-- Header with Tabs -->
                    <div class="admin-header">
                        <div class="header-content">
                            <div class="header-left">
                                <v-icon icon="mdi-view-dashboard" size="32" class="mr-3" color="primary" />
                                <div>
                                    <h1 class="header-title">Painel Administrativo</h1>
                                    <p class="header-subtitle">Gerenciamento de Conteúdo</p>
                                </div>
                            </div>
                            <v-btn @click="handleLogout" variant="outlined" color="error" prepend-icon="mdi-logout"
                                class="logout-btn">
                                Sair
                            </v-btn>
                        </div>

                        <!-- Tabs -->
                        <v-tabs v-model="activeTab" color="primary" class="admin-tabs">
                            <v-tab value="projects">
                                <v-icon start>mdi-folder-multiple</v-icon>
                                Projetos
                            </v-tab>
                            <v-tab value="skills">
                                <v-icon start>mdi-star-circle</v-icon>
                                Habilidades
                            </v-tab>
                            <v-tab value="certifications">
                                <v-icon start>mdi-certificate</v-icon>
                                Certificações
                            </v-tab>
                            <v-tab value="courses">
                                <v-icon start>mdi-school</v-icon>
                                Cursos
                            </v-tab>
                        </v-tabs>
                    </div>

                    <!-- Tab Content -->
                    <div class="tab-content-wrapper">
                        <v-window v-model="activeTab">
                            <!-- Projects Tab -->
                            <v-window-item value="projects">
                                <AdminProjectsAdmin />
                            </v-window-item>

                            <!-- Skills Tab -->
                            <v-window-item value="skills">
                                <AdminSkillsAdmin />
                            </v-window-item>

                            <!-- Certifications Tab -->
                            <v-window-item value="certifications">
                                <AdminCertificationsAdmin />
                            </v-window-item>

                            <!-- Courses Tab -->
                            <v-window-item value="courses">
                                <AdminCoursesAdmin />
                            </v-window-item>
                        </v-window>
                    </div>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const router = useRouter()

// Estado de autenticação
const isAuthenticated = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const loginError = ref('')

const loginForm = ref({
    username: '',
    password: ''
})

const activeTab = ref('projects')

// Verificar autenticação ao montar
onMounted(async () => {
    const token = localStorage.getItem('admin_token')
    if (token) {
        try {
            // Validar token com backend
            await $fetch(`${config.public.apiUrl}/auth/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            isAuthenticated.value = true
        } catch (error) {
            // Token inválido, limpar storage
            localStorage.removeItem('admin_token')
            localStorage.removeItem('admin_user')
            isAuthenticated.value = false
        }
    }
})

// Login com backend
const handleLogin = async () => {
    loading.value = true
    loginError.value = ''

    try {
        const response = await $fetch<{ access_token: string, user: any }>(`${config.public.apiUrl}/auth/login`, {
            method: 'POST',
            body: {
                username: loginForm.value.username,
                password: loginForm.value.password
            }
        })

        // Salvar token no localStorage
        localStorage.setItem('admin_token', response.access_token)
        localStorage.setItem('admin_user', JSON.stringify(response.user))

        isAuthenticated.value = true
    } catch (error: any) {
        console.error('Erro no login:', error)
        loginError.value = error.data?.message || 'Usuário ou senha incorretos'
    } finally {
        loading.value = false
    }
}

const handleLogout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    loginForm.value.username = ''
    loginForm.value.password = ''
}

// Meta tags
useHead({
    title: 'Admin - Painel Administrativo',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  position: relative;
}/* Login Container with Animated Background */
.login-container {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.animated-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 0;
}

.bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
}

.shape-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400));
    top: -10%;
    left: -10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
    bottom: -10%;
    right: -10%;
    animation-delay: 5s;
}

.shape-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 10s;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(30px, -30px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

.login-row {
    position: relative;
    z-index: 1;
}

/* Brand Section */
.brand-section {
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.brand-icon-wrapper {
    display: inline-flex;
    padding: 20px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.brand-icon {
    color: white;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.brand-title {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.5px;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.brand-subtitle {
    font-size: 1.125rem;
    font-weight: 400;
    opacity: 0.95;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
}

/* Login Card */
.login-card {
    border-radius: 24px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.3s ease;
}

.login-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35) !important;
}

.login-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-gray-900);
    letter-spacing: -0.5px;
}

.login-subtitle {
    color: var(--color-gray-600);
    font-size: 0.95rem;
}

/* Custom Input Fields */
:deep(.custom-input .v-field) {
    border-radius: 12px;
    background: var(--color-white);
    border: 2px solid var(--color-gray-200);
    transition: all 0.3s ease;
}

:deep(.custom-input .v-field:hover) {
    border-color: var(--color-primary-300);
}

:deep(.custom-input .v-field--focused) {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 4px var(--color-primary-alpha-10);
}

:deep(.custom-input .v-field__prepend-inner) {
    color: var(--color-gray-500);
}

:deep(.custom-input .v-field--focused .v-field__prepend-inner) {
    color: var(--color-primary-500);
}

/* Login Button */
.login-btn {
    border-radius: 12px !important;
    font-weight: 600 !important;
    font-size: 1rem !important;
    letter-spacing: 0.5px !important;
    text-transform: none !important;
    padding: 24px 0 !important;
    background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%) !important;
    box-shadow: 0 4px 15px var(--color-primary-alpha-30) !important;
    transition: all 0.3s ease !important;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--color-primary-alpha-40) !important;
}

.login-btn:active {
    transform: translateY(0);
}

/* Login Footer */
.login-footer {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.login-footer .text-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

/* Admin Content Area - Dark Theme */
.admin-content {
    background: #0f172a;
    min-height: 100vh;
    padding: 0;
}

/* Admin Header */
.admin-header {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    position: sticky;
    top: 0;
    z-index: 10;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    line-height: 1.2;
}

.header-subtitle {
    font-size: 0.875rem;
    color: #94a3b8;
    margin: 0;
}

.logout-btn {
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.3) !important;
    transition: all 0.2s ease;
}

.logout-btn:hover {
    background: rgba(239, 68, 68, 0.1) !important;
    border-color: rgba(239, 68, 68, 0.6) !important;
}

/* Admin Tabs - Dark Theme */
.admin-tabs {
    background: transparent !important;
    padding: 0 2rem;
}

:deep(.admin-tabs .v-tab) {
    color: #94a3b8 !important;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
    border-radius: 8px 8px 0 0;
    transition: all 0.2s ease;
    min-height: 48px;
}

:deep(.admin-tabs .v-tab:hover) {
    background: rgba(59, 130, 246, 0.05);
    color: #60a5fa !important;
}

:deep(.admin-tabs .v-tab--selected) {
    background: #0f172a !important;
    color: #3b82f6 !important;
    border-bottom: 2px solid #3b82f6;
}

:deep(.admin-tabs .v-tabs-slider) {
    display: none;
}

/* Tab Content Wrapper */
.tab-content-wrapper {
    padding: 2rem;
}

/* Dark Theme Cards and Components */
:deep(.v-card) {
    background: #1e293b !important;
    border-radius: 12px !important;
    border: 1px solid rgba(59, 130, 246, 0.1) !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
}

:deep(.v-card-title) {
    font-weight: 600;
    color: #ffffff !important;
    padding: 1.5rem;
    background: rgba(59, 130, 246, 0.05);
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

:deep(.v-card-text) {
    color: #e2e8f0 !important;
}

/* Buttons - Dark Theme */
:deep(.v-btn) {
    border-radius: 8px !important;
    font-weight: 500 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    transition: all 0.2s ease !important;
}

:deep(.v-btn:not(.v-btn--icon):hover) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
}

/* Data Table - Dark Theme */
:deep(.v-data-table) {
    background: #1e293b !important;
    color: #e2e8f0 !important;
    border-radius: 12px;
}

:deep(.v-data-table .v-data-table__th) {
    background: rgba(59, 130, 246, 0.05) !important;
    color: #94a3b8 !important;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
}

:deep(.v-data-table .v-data-table__td) {
    border-bottom: 1px solid rgba(59, 130, 246, 0.05) !important;
    color: #e2e8f0 !important;
}

:deep(.v-data-table tbody tr:hover) {
    background: rgba(59, 130, 246, 0.05) !important;
}

/* Form Inputs - Dark Theme */
:deep(.v-text-field),
:deep(.v-textarea),
:deep(.v-select),
:deep(.v-combobox) {
    border-radius: 8px;
}

:deep(.v-field) {
    background: rgba(15, 23, 42, 0.5) !important;
    border: 1px solid rgba(59, 130, 246, 0.2) !important;
    border-radius: 8px !important;
}

:deep(.v-field:hover) {
    border-color: rgba(59, 130, 246, 0.4) !important;
}

:deep(.v-field--focused) {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

:deep(.v-field__input),
:deep(.v-field__input input),
:deep(.v-select__selection-text) {
    color: #e2e8f0 !important;
}

:deep(.v-label) {
    color: #94a3b8 !important;
}

:deep(.v-field--focused .v-label) {
    color: #3b82f6 !important;
}

/* Dialogs - Dark Theme */
:deep(.v-dialog .v-card) {
    background: #1e293b !important;
}

:deep(.v-dialog .v-card-title) {
    background: rgba(59, 130, 246, 0.1);
    color: #ffffff !important;
}

/* Chips - Dark Theme */
:deep(.v-chip) {
    border-radius: 6px !important;
    font-weight: 500 !important;
}

/* Snackbar - Dark Theme */
:deep(.v-snackbar) {
    border-radius: 8px !important;
}

/* Scrollbar - Dark Theme */
:deep(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
}

:deep(*::-webkit-scrollbar-track) {
    background: #0f172a;
}

:deep(*::-webkit-scrollbar-thumb) {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 4px;
}

:deep(*::-webkit-scrollbar-thumb:hover) {
    background: rgba(59, 130, 246, 0.5);
}
</style>

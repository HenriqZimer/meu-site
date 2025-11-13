/**
 * Constantes centralizadas do projeto
 * Todas as strings, URLs e configurações reutilizáveis
 */

// ===== MENU ITEMS =====
export const MENU_ITEMS = [
  { id: "about", label: "Sobre", icon: "mdi-account-circle" },
  { id: "portfolio", label: "Projetos", icon: "mdi-briefcase-variant" },
  { id: "skills", label: "Skills", icon: "mdi-brain" },
  { id: "courses", label: "Cursos", icon: "mdi-school" },
  { id: "certifications", label: "Certificações", icon: "mdi-certificate" },
  { id: "contact", label: "Contato", icon: "mdi-message-text" },
] as const;

// ===== QUICK LINKS (FOOTER) =====
export const QUICK_LINKS = [
  { label: "Sobre", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projetos", href: "portfolio" },
  { label: "Cursos", href: "courses" },
  { label: "Certificações", href: "certifications" },
  { label: "Contato", href: "contact" },
] as const;

// ===== SCROLL CONSTANTS =====
export const SCROLL_CONFIG = {
  HEADER_OFFSET: 80,
  SHOW_SCROLL_TOP_THRESHOLD: 400,
  SCROLL_THRESHOLD: 20,
} as const;

// ===== ANIMATION DELAYS =====
export const ANIMATION_DELAYS = {
  BADGE: 100,
  TITLE: 200,
  DESCRIPTION: 300,
  CONTENT: 400,
  STATS: 500,
  EXTRA: 600,
} as const;

// ===== VALIDATION RULES =====
export const VALIDATION_RULES = {
  EMAIL: [
    (v: string) => !!v || "Email é obrigatório",
    (v: string) => /.+@.+\..+/.test(v) || "Email deve ser válido",
  ],
  NAME: [
    (v: string) => !!v || "Nome é obrigatório",
    (v: string) => v.length >= 3 || "Nome deve ter no mínimo 3 caracteres",
  ],
  SUBJECT: [
    (v: string) => !!v || "Assunto é obrigatório",
    (v: string) => v.length >= 5 || "Assunto deve ter no mínimo 5 caracteres",
  ],
  MESSAGE: [
    (v: string) => !!v || "Mensagem é obrigatória",
    (v: string) => v.length >= 20 || "Mensagem deve ter no mínimo 20 caracteres",
  ],
} as const;

// ===== RESPONSIVE GRID LAYOUTS =====
export const GRID_LAYOUTS = {
  STATS: {
    cols: 6,
    sm: 3,
  },
  CERTIFICATIONS: {
    md: 6,
    lg: 6,
  },
  TWO_COLUMNS: {
    md: 6,
    lg: 6,
  },
} as const;

// ===== CAROUSEL CONFIG =====
export const CAROUSEL_CONFIG = {
  ITEMS_PER_PAGE_DESKTOP: 3,
  ITEMS_PER_PAGE_TABLET: 2,
  ITEMS_PER_PAGE_MOBILE: 1,
} as const;

// ===== IMAGE URLS =====
export const IMAGE_URLS = {
  LOGO: "/logo.png",
  PROFILE_PHOTO: "https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg",
  PLATFORM_LINUXTIPS: "https://imagens.henriqzimer.com.br/linux-tips.png",
  PLATFORM_UDEMY: "https://imagens.henriqzimer.com.br/udemy.png",
} as const;

// ===== EXTERNAL URLS =====
export const getExternalUrls = (config: any) => ({
  GITHUB: config.public.githubUrl,
  LINKEDIN: config.public.linkedinUrl,
  EMAIL: `mailto:${config.public.email}`,
  WHATSAPP: `https://wa.me/5547992606276?text=Estou%20entrando%20em%20contato%20pelo%20seu%20site`,
});

// ===== TECHNOLOGY ICONS & CATEGORIES =====
export const TECH_CATEGORIES = {
  INFRASTRUCTURE: "Infraestrutura",
  CONTAINERIZATION: "Containerização",
  IAC: "IaC",
  CLOUD: "Cloud Provider",
  ORCHESTRATION: "Orquestração",
  MONITORING: "Monitoring",
  DATABASE: "Database",
  CACHE: "Cache",
  VERSION_CONTROL: "Version Control",
  OS: "Operating System",
} as const;

// ===== SOCIAL LINKS BUILDER =====
export const buildSocialLinks = (config: any) => [
  {
    name: "GitHub",
    icon: "mdi-github",
    url: config.public.githubUrl,
    label: "Visitar GitHub",
  },
  {
    name: "LinkedIn",
    icon: "mdi-linkedin",
    url: config.public.linkedinUrl,
    label: "Visitar LinkedIn",
  },
  {
    name: "Email",
    icon: "mdi-email-outline",
    url: `mailto:${config.public.email}`,
    label: "Enviar email",
  },
];

// ===== FOOTER SOCIAL LINKS =====
export const buildFooterSocialLinks = (config: any) => [
  { name: "GitHub", icon: "mdi-github", href: config.public.githubUrl },
  { name: "LinkedIn", icon: "mdi-linkedin", href: config.public.linkedinUrl },
  { name: "Email", icon: "mdi-email-outline", href: `mailto:${config.public.email}` },
];

// ===== FILTER CONFIG =====
export const PROJECT_FILTERS = [
  { value: "all", label: "Todos", icon: "mdi-apps" },
  { value: "infrastructure", label: "Infraestrutura", icon: "mdi-server" },
  { value: "containerization", label: "Containers", icon: "mdi-docker" },
  { value: "automation", label: "Automação", icon: "mdi-robot" },
  { value: "cloud", label: "Cloud", icon: "mdi-cloud" },
] as const;

// ===== STATUS CONFIG =====
export const PROJECT_STATUS = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
  PLANNING: "planning",
} as const;

export const STATUS_CONFIG = {
  [PROJECT_STATUS.COMPLETED]: {
    icon: "mdi-check-circle",
    label: "Concluído",
  },
  [PROJECT_STATUS.IN_PROGRESS]: {
    icon: "mdi-clock-outline",
    label: "Em progresso",
  },
  [PROJECT_STATUS.PLANNING]: {
    icon: "mdi-lightbulb-outline",
    label: "Planejado",
  },
} as const;

// ===== BUTTON TYPES =====
export const BUTTON_TYPES = {
  PRIMARY: {
    variant: "flat",
    color: "primary",
  },
  SECONDARY: {
    variant: "outlined",
    color: "primary",
  },
  SOCIAL: {
    variant: "outlined",
    color: "primary",
  },
} as const;

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillsService } from '../modules/skills/skills.service';
import { ProjectsService } from '../modules/projects/projects.service';
import { CoursesService } from '../modules/courses/courses.service';
import { CertificationsService } from '../modules/certifications/certifications.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const skillsService = app.get(SkillsService);
  const projectsService = app.get(ProjectsService);
  const coursesService = app.get(CoursesService);
  const certificationsService = app.get(CertificationsService);

  console.log('🌱 Starting database seed...');

  // Seed Skills
  console.log('📦 Seeding skills...');
  const skills = [
    {
      name: 'Kubernetes',
      category: 'Orquestração',
      icon: 'mdi-kubernetes',
      color: '#326CE5',
      bgColor: '#e3f2fd',
      order: 1,
    },
    {
      name: 'Docker',
      category: 'Containerização',
      icon: 'mdi-docker',
      color: '#2496ED',
      bgColor: '#e3f2fd',
      order: 2,
    },
    {
      name: 'Terraform',
      category: 'IaC',
      icon: 'mdi-terraform',
      color: '#7B42BC',
      bgColor: '#f3e5f5',
      order: 3,
    },
    {
      name: 'AWS',
      category: 'Cloud Provider',
      icon: 'mdi-aws',
      color: '#FF9900',
      bgColor: '#fff3e0',
      order: 4,
    },
    {
      name: 'Helm',
      category: 'Package Manager',
      icon: 'mdi-ship-wheel',
      color: '#0F1689',
      bgColor: '#e8eaf6',
      order: 5,
    },
    {
      name: 'Node.js',
      category: 'Runtime',
      icon: 'mdi-nodejs',
      color: '#339933',
      bgColor: '#e8f5e9',
      order: 6,
    },
    {
      name: 'Grafana',
      category: 'Visualização',
      icon: 'mdi-chart-box',
      color: '#F46800',
      bgColor: '#fff3e0',
      order: 7,
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      icon: 'mdi-database',
      color: '#336791',
      bgColor: '#e3f2fd',
      order: 8,
    },
    {
      name: 'Redis',
      category: 'Cache',
      icon: 'mdi-memory',
      color: '#DC382D',
      bgColor: '#ffebee',
      order: 9,
    },
    {
      name: 'Git',
      category: 'Version Control',
      icon: 'mdi-git',
      color: '#F05032',
      bgColor: '#ffebee',
      order: 10,
    },
    {
      name: 'Linux',
      category: 'Operating System',
      icon: 'mdi-linux',
      color: '#FCC624',
      bgColor: '#fffde7',
      order: 11,
    },
  ];

  for (const skill of skills) {
    await skillsService.create(skill);
  }
  console.log(`✅ Created ${skills.length} skills`);

  // Seed Projects
  console.log('📦 Seeding projects...');
  const projects = [
    {
      title: 'Docker Swarm com NFS e Cloudflare',
      description:
        'Repositório com configuração de um cluster Docker Swarm para deploy de aplicações web escaláveis com integração NFS e CDN Cloudflare.',
      image: '/portfolio-swarm-nfs-cloudflare.png',
      category: 'containerization',
      technologies: ['Docker', 'Docker Swarm', 'Cloudflare', 'NFS', 'DevOps'],
      demoUrl:
        'https://www.notion.so/wiki-henrique-zimermann/Docker-Swarm-Cluster-de-Alta-Disponibilidade-2520ca676c53809eb88cdf145f32257a',
      githubUrl: 'https://github.com/HenriqZimer/docker-swarm',
      order: 1,
    },
    {
      title: 'EKS com Terraform',
      description:
        'Implementação completa de um cluster EKS na AWS utilizando Terraform para infraestrutura como código, incluindo configurações de rede e segurança.',
      image: '/portfolio-eks-terraform.png',
      category: 'infrastructure',
      technologies: ['EKS', 'Terraform', 'AWS', 'Kubernetes', 'IaC'],
      demoUrl: 'https://github.com/HenriqZimer/eks-terraform',
      githubUrl: 'https://github.com/HenriqZimer/eks-terraform',
      order: 2,
    },
    {
      title: 'Assinatura de Email Automática para Outlook',
      description:
        'Script PowerShell automatizado para geração e deploy de assinaturas de email corporativas no Microsoft Outlook, integrado com Active Directory.',
      image: '/portfolio-powershell-ad-outlook.png',
      category: 'automation',
      technologies: ['PowerShell', 'HTML', 'Active Directory', 'Exchange'],
      demoUrl:
        'https://www.notion.so/wiki-henrique-zimermann/Assinatura-autom-tica-de-Email-Vis-o-Geral-2520ca676c538005bb5dd8ef6d83f1f3',
      githubUrl: 'https://github.com/HenriqZimer/AutomatedOutlookSignature',
      order: 3,
    },
    {
      title: 'Portfolio Pessoal Moderno em Vue',
      description:
        'Site pessoal desenvolvido com Vue 3, Nuxt 3 e Vuetify, focado em performance, acessibilidade e design responsivo.',
      image: '/portfolio-vue-nuxt.png',
      category: 'frontend',
      technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Vuetify', 'CSS'],
      demoUrl: 'https://henriquezimer.dev',
      githubUrl: 'https://github.com/HenriqZimer/meu-site',
      order: 4,
    },
  ];

  for (const project of projects) {
    await projectsService.create(project);
  }
  console.log(`✅ Created ${projects.length} projects`);

  // Seed Courses
  console.log('📦 Seeding courses...');
  const courses = [
    // 2025
    {
      name: 'Descomplicando Kubernetes',
      platform: 'LINUXtips',
      instructor: 'Jeferson Fernando',
      duration: '30h',
      image: '/linux-tips.png',
      link: 'https://www.credential.net/9e6302ff-381c-40ab-84a2-8134e66d0705#acc.4t9M65TG',
      year: '2025',
    },
    {
      name: 'Descomplicando Helm',
      platform: 'LINUXtips',
      instructor: 'Jeferson Fernando',
      duration: '8h',
      image: '/linux-tips.png',
      link: 'https://www.credential.net/e3ce127c-ff2d-481a-809b-c8122a3a019c#acc.7ulCRwUi',
      year: '2025',
    },
    {
      name: 'Descomplicando Docker',
      platform: 'LINUXtips',
      instructor: 'Jeferson Fernando',
      duration: '12h',
      image: '/linux-tips.png',
      link: 'https://www.credential.net/c5958e12-4cca-400c-a0a2-10f2334b4666#acc.aInvtZbs/',
      year: '2025',
    },
    {
      name: 'Docker Essencials',
      platform: 'LINUXtips',
      instructor: 'Jeferson Fernando',
      duration: '6h',
      image: '/linux-tips.png',
      link: 'https://mycourse.app/chvdwqAVGHUBCqQE7',
      year: '2025',
    },
    {
      name: 'Terraform Essencials',
      platform: 'LINUXtips',
      instructor: 'Rafael Gomes',
      duration: '6h',
      image: '/linux-tips.png',
      link: 'https://mycourse.app/Mg0hRASgoL3dL7nUJ',
      year: '2025',
    },
    {
      name: 'Kubernetes Essencials',
      platform: 'LINUXtips',
      instructor: 'Jeferson Fernando',
      duration: '6h',
      image: '/linux-tips.png',
      link: 'https://mycourse.app/cbNZ3gsD2CmzKHhOB',
      year: '2025',
    },
    {
      name: 'Certificação Amazon AWS Certified Cloud Practitioner CLF-C02',
      platform: 'Udemy',
      instructor: 'Andre Iacono',
      duration: '16.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/',
      year: '2025',
    },
    {
      name: 'Terraform para AWS',
      platform: 'Udemy',
      instructor: 'Mateus Muller',
      duration: '7.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-a8ff0165-c1aa-4f8d-af0a-89651b908caf/',
      year: '2025',
    },
    {
      name: 'Fundamentos de Redes para DevOps',
      platform: 'Udemy',
      instructor: 'Mateus Muller',
      duration: '7h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-81ffb271-0aa4-47b8-b452-699532d2c13a/',
      year: '2025',
    },
    {
      name: 'Docker para Desenvolvedores (com Docker Swarm e Kubernetes)',
      platform: 'Udemy',
      instructor: 'Matheus Battisti, Hora de Codar',
      duration: '12.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/',
      year: '2025',
    },
    // 2024
    {
      name: 'Windows Server 2022 + 2019 + Az-104 + Az-900 + A. Directory',
      platform: 'Udemy',
      instructor: 'BoraPraNuvem Cursos para CLOUD! Azure, AWS e muito mais!',
      duration: '25h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/',
      year: '2024',
    },
    {
      name: 'Microsoft Windows Server 2019 [COMPLETO]',
      platform: 'Udemy',
      instructor: 'Denilson Bonatti',
      duration: '12.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-f7d4946d-5b2e-495f-b686-9a6ac091a3fd/',
      year: '2024',
    },
    {
      name: 'Virtualização com VMware',
      platform: 'Udemy',
      instructor: 'Maiki Soares',
      duration: '4.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-f7d4946d-5b2e-495f-b686-9a6ac091a3fd/',
      year: '2024',
    },
    // 2023
    {
      name: 'ProxMox - do Zero ao Profissional + Hyper-V Server 2019',
      platform: 'Udemy',
      instructor: 'DICARJ & BorapraNuvem!',
      duration: '8h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-ab425de7-bf0a-465a-84d1-f3947d3bfeb1/',
      year: '2023',
    },
    {
      name: 'Docker: Ferramenta essencial para Desenvolvedores',
      platform: 'Udemy',
      instructor: 'Leonardo Moura Leitao, Juracy Filho',
      duration: '5.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-a3afaa53-879f-428e-b78e-0a2eabb3ed93/',
      color: 'purple',
      year: '2023',
    },
    {
      name: 'Linux para Desenvolvedores (c/ terminal, Shell, Apache e +)',
      platform: 'Udemy',
      instructor: 'Matheus Battisti, Hora de Codar',
      duration: '7.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-dd044339-c134-4a3a-ad3c-d1ae3e8bb98d/',
      color: 'purple',
      year: '2023',
    },
    {
      name: 'Git e GitHub do básico ao avançado (c/ gist e GitHub Pages)',
      platform: 'Udemy',
      instructor: 'Matheus Battisti, Hora de Codar',
      duration: '8.5h',
      image: '/udemy.png',
      link: 'https://www.udemy.com/certificate/UC-3e4b68f3-3ac9-43b4-a2d1-ff78fd294ed9/',
      color: 'purple',
      year: '2023',
    },
  ];

  for (const course of courses) {
    await coursesService.create(course);
  }
  console.log(`✅ Created ${courses.length} courses`);

  // Seed Certifications
  console.log('📦 Seeding certifications...');
  const certifications = [
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
      issuer: 'Oracle',
      image:
        'https://images.credly.com/images/6e546fd3-414b-4396-9b91-2b5cf7accedf/OCI25FNDCFAV1_cached_image_20250926-30-gc8qc8.png',
      link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=940F36B32BA531E98EE8D9A5C1B99E42EC8B5AFDC558E21B20C31D9FC2E5D9FB',
      date: 'Set 2025',
      skills: 16,
      order: 1,
    },
    {
      name: 'AWS Certified Cloud Practitioner Foundation',
      issuer: 'Amazon Web Services',
      image: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
      link: 'https://www.credly.com/badges/c0a133ca-557a-4c9d-ba13-84b8c26e0a4f',
      date: 'Out 2025',
      skills: 8,
      order: 2,
    },
    {
      name: 'Uncomplicating Docker',
      issuer: 'LINUXtips',
      image:
        'https://images.credly.com/images/1f4948b5-717b-44ae-8484-10c52d4ff4ed/fc576c30-5c05-48f3-aed6-1bc317489a85_cached_image_20251103-29-vx0rga.png',
      link: 'https://www.credential.net/c5958e12-4cca-400c-a0a2-10f2334b4666#acc.49DLSW0d',
      date: 'Nov 2025',
      skills: 4,
      order: 3,
    },
    {
      name: 'Uncomplicating Kubernetes',
      issuer: 'LINUXtips',
      image:
        'https://images.credly.com/images/fe65bff9-69ca-438c-9cf5-2c62273f33ff/62100ac3-8bd7-4622-bbb4-104071717ece_cached_image_20251116-31-xrhd54.png',
      link: 'https://www.credential.net/e3ce127c-ff2d-481a-809b-c8122a3a019c#acc.3i8X2erC',
      date: 'Nov 2025',
      skills: 4,
      order: 4,
    },
  ];

  for (const certification of certifications) {
    await certificationsService.create(certification);
  }
  console.log(`✅ Created ${certifications.length} certifications`);

  console.log('✨ Database seeded successfully!');
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});

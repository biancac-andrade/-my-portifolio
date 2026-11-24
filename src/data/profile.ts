import type {
  ContactIntent,
  EducationItem,
  GitHubProject,
  HardSkillGroup,
  ShowcaseProject,
} from '@/types/profile'

export type { ContactIntent, EducationItem, ShowcaseProject, GitHubProject } from '@/types/profile'

export const contactIntents: Record<
  ContactIntent,
  { label: string; subject: string; description: string }
> = {
  freela: {
    label: 'Freelancer',
    subject: 'Proposta freelancer',
    description:
      'Para freelas, envie escopo, prazo estimado e orçamento de referência. O caminho mais rápido é chamar no WhatsApp.',
  },
  projeto: {
    label: 'Projeto',
    subject: 'Nova parceria de projeto',
    description:
      'Projetos pontuais ou MVPs: descreva o problema, público-alvo e o que já existe (design, API, legado). O caminho mais rápido é o WhatsApp.',
  },
  outro: {
    label: 'Outro',
    subject: 'Contato pelo portfólio',
    description:
      'Mentoria, palestras, voluntariado, comunidades ou networking — escreva do seu jeito. O caminho mais rápido é chamar no WhatsApp.',
  },
}

export const skillsIntro =
  'Tecnologias que uso, trabalho em equipe e linguagens nos repositórios.'

export const ambientMusic = {
  src: '/audio/the-man-who-sold-the-world-instrumental.mp3',
  title: 'The Man Who Sold the World',
  subtitle: 'instrumental',
  volume: 0.3,
} as const

export const hardSkillGroups: readonly HardSkillGroup[] = [
  {
    id: 'frontend',
    title: 'Front-end & UI',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'HTML / CSS', icon: 'htmlcss' },
      { name: 'Angular', icon: 'angular' },
      { name: 'Storybook', icon: 'storybook' },
      { name: 'Acessibilidade (WCAG)', icon: 'a11y' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    skills: [
      { name: 'React Native', icon: 'react-native' },
      { name: 'Expo', icon: 'expo' },
      { name: 'Android', icon: 'android' },
    ],
  },
  {
    id: 'backend',
    title: 'Back-end & integração',
    skills: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'REST APIs', icon: 'rest' },
      { name: 'Java', icon: 'java' },
      { name: 'Azure Functions', icon: 'azure' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Render', icon: 'render' },
    ],
  },
  {
    id: 'craft',
    title: 'Engenharia & qualidade',
    skills: [
      { name: 'Git & GitHub', icon: 'git' },
      { name: 'Design Systems', icon: 'design-systems' },
      { name: 'Testes (unit / componente)', icon: 'tests' },
      { name: 'DevOps leve (CI, hooks)', icon: 'devops' },
    ],
  },
]

export const softSkills = [
  { name: 'Comunicação', icon: 'communication' },
  { name: 'Colaboração', icon: 'collaboration' },
  { name: 'Organização', icon: 'organization' },
  { name: 'Aprendizado contínuo', icon: 'learning' },
  { name: 'Resolução de problemas', icon: 'problem-solving' },
  { name: 'Inclusão digital', icon: 'inclusion' },
] as const

export const profile = {
  name: 'Bianca Andrade',
  legalName: 'Bianca Cristina',
  copyrightYear: 2026,
  github: 'https://github.com/biancac-andrade',
  linkedin: 'https://www.linkedin.com/in/bcandrade/',
  email: 'bc.andrade05@gmail.com',
  location: 'Campinas, São Paulo, Brasil',
  pronouns: 'ela/dela',
  headline: 'Engenheira de Computação · Desenvolvedora Full Stack',
  bio: 'Engenheira de Computação, com pós em Desenvolvimento Web Full Stack e formação contínua em IA. Atuo com React, React Native, TypeScript e Node.js, com foco em acessibilidade, Libras e inclusão digital.',
  aboutHeading: {
    main: 'Desenvolvedora Full Stack',
    muted: 'com foco em soluções de IA e acessibilidade.',
  },
  aboutTagline: 'Criando produtos digitais de ponta a ponta.',
  educationIntro:
    'Graduação e pós que sustentam meu trabalho em Full Stack, IA e acessibilidade.',
  skillsHeading: {
    main: 'Stack e colaboração',
    muted: 'com dados do GitHub.',
  },
  heroAccentStack: [
    'acessibilidade',
    'qualidade',
    'solução',
    'IA',
  ] as const,
  availabilityLabel: 'Disponível para freelancer',
  heroTagline:
    'Full Stack · React · acessibilidade e inclusão digital.',
  heroPitch:
    'Desenvolvedora Full Stack do briefing ao deploy: web, mobile e integrações, com entregas previsíveis, código legível e produto pronto para evoluir.',
  contactHeading: {
    main: 'Tem projeto, freela ou parceria',
    muted: 'na mesa?',
  },
  contactLead: 'Escolha a melhor forma para entrar em contato.',
  whatsappUrl: 'https://wa.me/551998194880',
  whatsappDisplay: '+55 (19) 98194-4880',
  whatsappDefaultMessage: 'Oi, Bianca! Eu vim do seu portfólio.',
  resumeUrl: '/curriculo-bianca-andrade-2026.pdf',
  avatarUrl:
    'https://media.licdn.com/dms/image/v2/D4D03AQH6aOBJF7QgDw/profile-displayphoto-scale_200_200/B4DZwgvN2HHEAY-/0/1770075774957?e=2147483647&v=beta&t=dqiH7kXHBxa61z1WwV6yDvLVo2uyacfSfCO_tynvb68',
  avatarWaveMp4: '/avatar/nav-avatar-wave.mp4',
  avatarWaveWebm: '/avatar/nav-avatar-wave.webm',
  avatarWavePoster: '/avatar/nav-avatar-poster.jpg',
  githubAngularRepos: [
    'brag-bot',
    'cfp-platform',
    'ia-checklist-hub',
  ] as const,
  githubRepoLanguages: [
    { name: 'JavaScript', repoCount: 30, share: 52.6 },
    { name: 'TypeScript', repoCount: 5, share: 8.8 },
    { name: 'HTML', repoCount: 6, share: 10.5 },
    { name: 'Java', repoCount: 5, share: 8.8 },
    { name: 'CSS', repoCount: 4, share: 7 },
    { name: 'Angular', repoCount: 3, share: 5.3 },
    { name: 'Sem linguagem', repoCount: 3, share: 5.3 },
    { name: 'Kotlin', repoCount: 1, share: 1.8 },
  ],
  educationCarousel: [
    {
      id: 'graduacao',
      institution: 'Centro Universitário Salesiano (UNISAL)',
      degree: 'Engenharia da Computação',
      kind: 'Graduação',
      period: 'Concluída',
      logoUrl: '/education/unisal.png',
      sourceUrl: 'https://www.essj.com.br/tags/unisal/',
      logoVariant: 'wide',
      logoSurface: 'light',
      accent: 'signal',
      status: 'Concluída',
      badgeLabel: 'UNISAL',
    },
    {
      id: 'pos-fullstack',
      institution: 'PUC Minas',
      degree: 'Desenvolvimento Web Full Stack',
      kind: 'Pós-graduação',
      period: '2022 – 2023',
      logoUrl: '/education/pucminas-crest-2025.png',
      sourceUrl:
        'https://www.pucminas.br/destaques/Paginas/default.aspx',
      logoVariant: 'crest',
      logoSurface: 'light',
      accent: 'insight',
      status: 'Concluída',
      badgeLabel: 'PUC Minas',
    },
    {
      id: 'unipds-ia',
      institution: 'UNIPDS Educação',
      degree: 'Engenharia de IA Aplicada',
      kind: 'Pós-graduação',
      period: '2026 – 2027',
      logoUrl: '/education/unipds-official.png',
      sourceUrl:
        'https://unipds.com.br/gads-pos-ia-v2/',
      logoVariant: 'wide',
      logoSurface: 'dark',
      accent: 'cyan',
      status: 'Em andamento',
      badgeLabel: 'UNIPDS',
    },
  ] as const satisfies readonly EducationItem[],
  volunteer: [
    'WoMakersCode — Front-end (2022–2024)',
    'GRACE ICMC-USP — Mentora Tech Innovation Summer School (2023)',
    'Fundação 1Bi / Potencialize — voluntária em chatbots para ONGs (2020–2021)',
  ],
} as const

export const projectsIntro =
  'Soluções em nuvem e apps publicados — com link para o projeto no ar e repositório no GitHub quando o código é público.'

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'ado-jira',
    title: 'ADO-Jira-Sync',
    description:
      'Azure Function em TypeScript: Service Hooks do Azure DevOps sincronizam status e comentários com o Jira Cloud. Convenção PROJ-123 em branch/PR, config por variáveis de ambiente e deploy serverless.',
    tags: ['TypeScript', 'Azure', 'Jira', 'DevOps'],
    category: 'nuvem',
    status: 'live',
    repoUrl: 'https://github.com/biancac-andrade/ADO-Jira-Sync',
    previewVideo: '/projects/ado-jira-sync-preview.mp4',
    previewPoster: '/projects/ado-jira-sync-poster.jpg',
    previewImageAlt: 'Demonstração em vídeo da sincronização ADO e Jira',
    previewAspect: '1280/564',
    previewTheme: 'azure',
  },
  {
    id: 'catalog-bricrise',
    title: 'Catálogo Bricrisê',
    description:
      'Vitrine da minha marca artesanal: pulseiras em macramê, photocards e peças por tema — com preços, disponibilidade e pedido direto no WhatsApp. Next.js, conteúdo no Contentful e deploy na Vercel.',
    context:
      'Projeto autoral de ponta a ponta: faço as peças, defino a vitrine e evoluo a experiência no catálogo ao vivo.',
    tags: ['Next.js', 'Contentful', 'TypeScript', 'Vercel', 'Produto pessoal'],
    category: 'apps',
    status: 'live',
    statusLabel: 'Projeto pessoal · no ar',
    liveCtaLabel: 'Ver catálogo',
    liveUrl: 'https://catalog-bricrise.vercel.app/',
    repoUrl: 'https://github.com/biancac-andrade/Catalog-Bricrise',
    previewImage: '/projects/catalog-bricrise-preview.png',
    previewImageAlt:
      'Catálogo da Bricrisê com grade de produtos e menu de temas',
    previewAspect: '1024/640',
    previewTheme: 'mobile',
  },
  {
    id: 'ia-checklist',
    title: 'IA Checklist Hub',
    description:
      'Tracker de estudo da pós em Engenharia de IA: progresso por matéria e módulo, com sync na Supabase.',
    tags: ['Angular', 'TypeScript', 'Supabase', 'IA'],
    category: 'nuvem',
    status: 'live',
    liveUrl: 'https://ia-checklist-hub-y7nm.onrender.com/',
    repoUrl: 'https://github.com/biancac-andrade/ia-checklist-hub',
    previewImage: '/projects/ia-checklist-hub-preview.png',
    previewImageAlt:
      'Dashboard IA Course Tracker com progresso de certificado e lista de matérias',
    previewTheme: 'design',
  },
]

export const featuredProjects: GitHubProject[] = showcaseProjects
  .filter((p): p is ShowcaseProject & { repoUrl: string } => Boolean(p.repoUrl))
  .map(({ title, description, tags, repoUrl }) => ({
    title,
    description,
    tags,
    repoUrl,
  }))

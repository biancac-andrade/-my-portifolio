export type ContactIntent = 'freela' | 'projeto' | 'outro'

export type EducationItem = {
  id: string
  institution: string
  degree: string
  kind: string
  period?: string
  logoUrl: string
  sourceUrl?: string
  logoVariant?: 'crest' | 'wide'
  logoSurface?: 'light' | 'dark'
  accent?: 'cyan' | 'insight' | 'signal'
  status: string
  badgeLabel?: string
}

export type SkillIconId =
  | 'react'
  | 'typescript'
  | 'htmlcss'
  | 'angular'
  | 'storybook'
  | 'a11y'
  | 'react-native'
  | 'expo'
  | 'android'
  | 'nodejs'
  | 'rest'
  | 'java'
  | 'azure'
  | 'firebase'
  | 'supabase'
  | 'mongodb'
  | 'render'
  | 'git'
  | 'design-systems'
  | 'tests'
  | 'devops'

export type HardSkill = {
  name: string
  icon: SkillIconId
}

export type HardSkillGroup = {
  id: string
  title: string
  skills: readonly HardSkill[]
}

export type SoftSkillIconId =
  | 'communication'
  | 'collaboration'
  | 'organization'
  | 'learning'
  | 'problem-solving'
  | 'inclusion'

export type ProjectCategory = 'nuvem' | 'apps' | 'integracao'

export type ShowcaseProject = {
  id: string
  title: string
  description: string
  context?: string
  tags: string[]
  category: ProjectCategory
  status: 'live' | 'repo' | 'soon'
  statusLabel?: string
  liveCtaLabel?: string
  repoUrl?: string
  liveUrl?: string
  previewImage?: string
  previewImageAlt?: string
  previewVideo?: string
  previewPoster?: string
  previewAspect?: string
  previewTheme: 'azure' | 'firebase' | 'mobile' | 'design' | 'bot'
}

export type GitHubProject = {
  title: string
  description: string
  tags: string[]
  repoUrl: string
}

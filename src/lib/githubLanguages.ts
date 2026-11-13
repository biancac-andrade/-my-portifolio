export const ANGULAR_LABEL = 'Angular'

export type GitHubRepoSummary = {
  name: string
  language: string | null
  fork: boolean
}

export type RepoLanguageStat = {
  name: string
  repoCount: number
  share: number
}

const UNKNOWN_LABEL = 'Sem linguagem'

const ANGULAR_CHECK_LANGUAGES = new Set([
  'TypeScript',
  'HTML',
  'CSS',
  'JavaScript',
])

export function shouldCheckAngular(repo: GitHubRepoSummary): boolean {
  if (repo.fork) return false
  const lang = repo.language
  if (!lang) return true
  return ANGULAR_CHECK_LANGUAGES.has(lang)
}

export function aggregateRepoLanguages(
  repos: readonly GitHubRepoSummary[],
  angularRepos: ReadonlySet<string> = new Set(),
): RepoLanguageStat[] {
  const counts = new Map<string, number>()

  for (const repo of repos) {
    if (repo.fork) continue
    const name = angularRepos.has(repo.name)
      ? ANGULAR_LABEL
      : repo.language?.trim() || UNKNOWN_LABEL
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  if (total === 0) return []

  return [...counts.entries()]
    .map(([name, repoCount]) => ({
      name,
      repoCount,
      share: Math.round((repoCount / total) * 1000) / 10,
    }))
    .sort((a, b) => b.repoCount - a.repoCount)
}

export function languageAccent(name: string): string {
  const map: Record<string, string> = {
    JavaScript: '#e8c547',
    TypeScript: '#5ce1e6',
    HTML: '#f59a72',
    CSS: '#8fa8cf',
    Java: '#d4a43a',
    Kotlin: '#b39ddb',
    [ANGULAR_LABEL]: '#e05252',
    Python: '#56c8e8',
    Go: '#5bda8e',
    Ruby: '#f07178',
    Vue: '#7ee0a8',
    Shell: '#7cae94',
    [UNKNOWN_LABEL]: '#8aa3ad',
    Outros: '#6b7280',
  }
  return map[name] ?? '#8aa3ad'
}

const DONUT_MAX_SLICES = 7

export function languageDonutSlices(
  stats: readonly RepoLanguageStat[],
  maxSlices = DONUT_MAX_SLICES,
): RepoLanguageStat[] {
  if (stats.length <= maxSlices) return [...stats]
  const head = stats.slice(0, maxSlices)
  const tail = stats.slice(maxSlices)
  const repoCount = tail.reduce((sum, row) => sum + row.repoCount, 0)
  const share =
    Math.round(tail.reduce((sum, row) => sum + row.share, 0) * 10) / 10
  return [
    ...head,
    { name: 'Outros', repoCount, share: share > 0 ? share : 0 },
  ]
}

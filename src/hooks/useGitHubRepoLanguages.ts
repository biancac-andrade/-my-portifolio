import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import {
  aggregateRepoLanguages,
  shouldCheckAngular,
  type GitHubRepoSummary,
  type RepoLanguageStat,
} from '@/lib/githubLanguages'

const GITHUB_API = 'https://api.github.com'

async function fetchUserRepos(username: string): Promise<GitHubRepoSummary[]> {
  const all: GitHubRepoSummary[] = []
  let page = 1

  while (page <= 5) {
    const url = new URL(`${GITHUB_API}/users/${username}/repos`)
    url.searchParams.set('per_page', '100')
    url.searchParams.set('page', String(page))
    url.searchParams.set('type', 'owner')

    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    })

    if (!res.ok) throw new Error(`GitHub API ${res.status}`)

    const batch = (await res.json()) as Array<{
      name: string
      language: string | null
      fork: boolean
    }>
    if (batch.length === 0) break

    for (const repo of batch) {
      all.push({
        name: repo.name,
        language: repo.language,
        fork: repo.fork,
      })
    }

    if (batch.length < 100) break
    page += 1
  }

  return all
}

async function repoHasAngular(
  username: string,
  repoName: string,
): Promise<boolean> {
  const res = await fetch(
    `${GITHUB_API}/repos/${username}/${repoName}/contents/angular.json`,
    { headers: { Accept: 'application/vnd.github+json' } },
  )
  return res.ok
}

async function discoverAngularRepos(
  username: string,
  repos: readonly GitHubRepoSummary[],
  known: readonly string[],
): Promise<Set<string>> {
  const angular = new Set(known)
  const candidates = repos.filter(shouldCheckAngular)

  await Promise.all(
    candidates.map(async (repo) => {
      if (angular.has(repo.name)) return
      if (await repoHasAngular(username, repo.name)) {
        angular.add(repo.name)
      }
    }),
  )

  return angular
}

export function useGitHubRepoLanguages(
  username: string,
  fallback: readonly RepoLanguageStat[],
) {
  const [stats, setStats] = useState<RepoLanguageStat[]>([...fallback])
  const [totalRepos, setTotalRepos] = useState(
    fallback.reduce((n, row) => n + row.repoCount, 0),
  )
  const [angularCount, setAngularCount] = useState<number>(
    profile.githubAngularRepos.length,
  )
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const repos = await fetchUserRepos(username)
        const angularRepos = await discoverAngularRepos(
          username,
          repos,
          profile.githubAngularRepos,
        )
        const aggregated = aggregateRepoLanguages(repos, angularRepos)
        if (cancelled || aggregated.length === 0) return

        setStats(aggregated)
        setTotalRepos(repos.filter((r) => !r.fork).length)
        setAngularCount(
          [...angularRepos].filter((name) =>
            repos.some((r) => r.name === name && !r.fork),
          ).length,
        )
        setLive(true)
      } catch {
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [username])

  return { stats, totalRepos, angularCount, live, loading }
}

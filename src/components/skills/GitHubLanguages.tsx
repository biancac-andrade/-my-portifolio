import { motion } from 'motion/react'
import { useMemo } from 'react'
import { profile } from '@/data/profile'
import { useGitHubRepoLanguages } from '@/hooks/useGitHubRepoLanguages'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  languageAccent,
  languageDonutSlices,
  type RepoLanguageStat,
} from '@/lib/githubLanguages'

const GITHUB_USERNAME = 'biancac-andrade'

const DONUT_SIZE = 196
const DONUT_STROKE = 24

type GitHubLanguagesProps = {
  embedded?: boolean
}

function LanguageDonut({
  slices,
  totalRepos,
  animate,
}: {
  slices: readonly RepoLanguageStat[]
  totalRepos: number
  animate: boolean
}) {
  const radius = (DONUT_SIZE - DONUT_STROKE) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <motion.div
      className="github-lang__donut-wrap"
      initial={animate ? { opacity: 0, scale: 0.92 } : false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.22, 1] }}
    >
      <svg
        className="github-lang__donut"
        width={DONUT_SIZE}
        height={DONUT_SIZE}
        viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
        role="img"
        aria-label={`Distribuição de linguagens em ${totalRepos} repositórios`}
      >
        <circle
          className="github-lang__donut-bg"
          cx={DONUT_SIZE / 2}
          cy={DONUT_SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={DONUT_STROKE}
        />
        <g transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}>
          {slices.map((row) => {
            const length = (row.share / 100) * circumference
            const gap = Math.max(circumference - length, 0)
            const dashOffset = -offset
            offset += length

            return (
              <motion.circle
                key={row.name}
                className="github-lang__donut-seg"
                cx={DONUT_SIZE / 2}
                cy={DONUT_SIZE / 2}
                r={radius}
                fill="none"
                stroke={languageAccent(row.name)}
                strokeWidth={DONUT_STROKE}
                strokeLinecap="butt"
                initial={
                  animate
                    ? { strokeDasharray: `0 ${circumference}`, strokeDashoffset: dashOffset }
                    : {
                        strokeDasharray: `${length} ${gap}`,
                        strokeDashoffset: dashOffset,
                      }
                }
                whileInView={{
                  strokeDasharray: `${length} ${gap}`,
                  strokeDashoffset: dashOffset,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}
        </g>
      </svg>
      <div className="github-lang__donut-center">
        <span className="github-lang__donut-value">{totalRepos}</span>
        <span className="github-lang__donut-label">repos</span>
      </div>
    </motion.div>
  )
}

export function GitHubLanguages({ embedded = false }: GitHubLanguagesProps) {
  const reducedMotion = useReducedMotion()
  const { stats, totalRepos, loading } = useGitHubRepoLanguages(
    GITHUB_USERNAME,
    profile.githubRepoLanguages,
  )

  const slices = useMemo(() => languageDonutSlices(stats), [stats])

  return (
    <section
      className={embedded ? 'github-lang github-lang--embedded' : 'github-lang'}
      aria-labelledby="github-lang-title"
      aria-busy={loading}
    >
      <motion.h3
        id="github-lang-title"
        className={embedded ? 'skills-card__title' : 'subsection-title'}
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
      >
        Linguagens de Código
      </motion.h3>

      <p className="github-lang__lede">
        {totalRepos} repositórios públicos no GitHub
      </p>

      <div className="github-lang__viz">
        <LanguageDonut
          slices={slices}
          totalRepos={totalRepos}
          animate={!reducedMotion}
        />

        <ul className="github-lang__legend">
          {stats.map((row, index) => (
            <motion.li
              key={row.name}
              className="github-lang__legend-item"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035 }}
            >
              <span
                className="github-lang__legend-swatch"
                style={{ background: languageAccent(row.name) }}
                aria-hidden
              />
              <span className="github-lang__legend-copy">
                <span className="github-lang__legend-name">{row.name}</span>
                <span className="github-lang__legend-meta">
                  {row.share}% · {row.repoCount}{' '}
                  {row.repoCount === 1 ? 'repo' : 'repos'}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

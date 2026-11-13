import { motion } from 'motion/react'
import type { ShowcaseProject } from '@/types/profile'
import { ProjectPreviewFrame } from '@/components/projects/ProjectPreviewFrame'
import { Reveal } from '@/components/ui/Reveal'
import { IconArrowUpRight, IconGitHub } from '@/components/ui/icons'

const statusLabel: Record<ShowcaseProject['status'], string> = {
  live: 'No ar · nuvem',
  repo: 'Repositório público',
  soon: 'Deploy em breve',
}

type ProjectShowcaseRowProps = {
  project: ShowcaseProject
  index: number
  total: number
}

export function ProjectShowcaseRow({
  project,
  index,
  total,
}: ProjectShowcaseRowProps) {
  const flipped = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')
  const previewHref = project.liveUrl ?? project.repoUrl

  return (
    <Reveal>
      <article
        className={`project-row${flipped ? ' project-row--flip' : ''}`}
      >
        <ProjectPreviewFrame
          project={project}
          href={previewHref}
        />

        <div className="project-row__copy">
          <p className="project-row__meta">
            <span>
              {number} / {totalLabel}
            </span>
            <span className="project-row__dot" aria-hidden>
              •
            </span>
            <span
              className="project-row__status"
              data-status={project.status}
            >
              {statusLabel[project.status]}
            </span>
          </p>

          <h3 className="project-row__title">{project.title}</h3>
          <p className="project-row__desc">{project.description}</p>

          <ul className="project-row__tags">
            {project.tags.map((tag) => (
              <li key={tag}>#{tag.toLowerCase()}</li>
            ))}
          </ul>

          <div className="project-row__actions">
            {project.liveUrl ? (
              <motion.a
                className="project-row__btn project-row__btn--primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver na nuvem
                <IconArrowUpRight width={18} height={18} aria-hidden />
              </motion.a>
            ) : (
              <span
                className="project-row__btn project-row__btn--muted"
                aria-disabled
              >
                Nuvem · em breve
              </span>
            )}

            {project.repoUrl ? (
              <motion.a
                className="project-row__btn project-row__btn--ghost"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconGitHub width={18} height={18} aria-hidden />
                GitHub
              </motion.a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

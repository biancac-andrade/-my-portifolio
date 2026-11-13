import { motion } from 'motion/react'
import { projectsIntro, showcaseProjects } from '@/data/profile'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { ProjectShowcaseRow } from '@/components/projects/ProjectShowcaseRow'
import { Reveal } from '@/components/ui/Reveal'
import { SectionWash } from '@/components/ui/SectionWash'

export function ProjectsSection() {
  const total = showcaseProjects.length

  return (
    <section className="section section--projects" id="projetos">
      <SectionWash variant="projects" />

      <Reveal>
        <span className="section-label section-label--projects">
          04 / Projetos
        </span>
        <h2 className="sr-only">Projetos</h2>
        <p className="projects-intro">{projectsIntro}</p>
      </Reveal>

      <motion.div
        className="project-showcase"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.22, 1] }}
      >
        {showcaseProjects.map((project, index) => (
          <ProjectShowcaseRow
            key={project.id}
            project={project}
            index={index}
            total={total}
          />
        ))}
      </motion.div>

      <SectionSocialDock />
    </section>
  )
}

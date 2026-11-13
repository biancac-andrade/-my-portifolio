import { motion } from 'motion/react'
import {
  hardSkillGroups,
  profile,
  skillsIntro,
  softSkills,
} from '@/data/profile'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { GitHubLanguages } from '@/components/skills/GitHubLanguages'
import { SkillTechIcon } from '@/components/skills/SkillTechIcon'
import { SoftSkillIcon } from '@/components/skills/SoftSkillIcon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionWash } from '@/components/ui/SectionWash'

export function SkillsSection() {
  return (
    <section className="section section--skills" id="competencias">
      <SectionWash variant="skills" />

      <Reveal className="skills-header">
        <span className="section-label section-label--skills">
          03 / Skills
        </span>
        <h2 className="skills-headline">
          <span className="skills-headline__main">
            {profile.skillsHeading.main}
          </span>{' '}
          <span className="skills-headline__muted">
            {profile.skillsHeading.muted}
          </span>
        </h2>
        <p className="skills-intro">{skillsIntro}</p>
      </Reveal>

      <div className="skills-bento">
        <Reveal className="skills-card skills-card--hard">
          <h3 className="skills-card__title">Hard skills</h3>
          <p className="skills-card__lede">
            Tecnologias e práticas que uso em web, mobile, nuvem e acessibilidade.
          </p>
          <div className="skills-hard-grid">
            {hardSkillGroups.map((group) => (
              <motion.div
                key={group.id}
                className="skills-hard-group"
                layout
              >
                <h4 className="skills-hard-group__title">{group.title}</h4>
                <ul className="skills-hard-chips">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill.name}
                      className="skills-hard-chip"
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: skillIndex * 0.03,
                        type: 'spring',
                        stiffness: 400,
                        damping: 26,
                      }}
                      whileHover={{
                        y: -2,
                        scale: 1.03,
                        transition: { type: 'spring', stiffness: 420, damping: 22 },
                      }}
                    >
                      <SkillTechIcon
                        id={skill.icon}
                        className="skills-hard-chip__icon"
                        width={20}
                        height={20}
                      />
                      <span className="skills-hard-chip__name">{skill.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="skills-card skills-card--soft">
          <h3 className="skills-card__title">Soft skills</h3>
          <ul className="skills-soft-chips" aria-label="Soft skills">
            {softSkills.map((skill, index) => (
              <motion.li
                key={skill.name}
                className="skills-soft-chip"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.05 + index * 0.05,
                  type: 'spring',
                  stiffness: 380,
                  damping: 24,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 420, damping: 22 },
                }}
              >
                <SoftSkillIcon
                  id={skill.icon}
                  className="skills-soft-chip__icon"
                  width={16}
                  height={16}
                />
                <span className="skills-soft-chip__name">{skill.name}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="skills-card skills-card--github">
          <GitHubLanguages embedded />
        </Reveal>
      </div>

      <SectionSocialDock />
    </section>
  )
}

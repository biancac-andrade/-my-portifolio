import { motion } from 'motion/react'
import { profile } from '@/data/profile'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { AboutPortrait } from '@/components/ui/AboutPortrait'
import { Reveal } from '@/components/ui/Reveal'
import { SectionWash } from '@/components/ui/SectionWash'

export function AboutSection() {
  return (
    <section className="section section--about" id="sobre">
      <SectionWash variant="about" />

      <Reveal className="about-split-wrap">
        <motion.div
          className="about-split"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="about-split__copy">
            <span className="section-label section-label--about">
              01 / Sobre mim
            </span>

            <h2 className="about-heading">
              <span className="about-heading__line about-heading__line--main">
                {profile.aboutHeading.main}
              </span>
              <span className="about-heading__line about-heading__line--muted">
                {profile.aboutHeading.muted}
              </span>
            </h2>

            <p className="about-tagline">{profile.aboutTagline}</p>

            <p className="about-body">
              Sou <strong>Engenheira da Computação</strong>, com pós em{' '}
              <strong>Desenvolvimento Web Full Stack</strong> e formação
              contínua em <strong>Engenharia de IA</strong>. Atuo como{' '}
              <strong>Desenvolvedora Full Stack</strong>, conectando{' '}
              <strong>React</strong>, <strong>TypeScript</strong>,{' '}
              <strong>React Native</strong> e <strong>Node.js</strong> a
              entregas que priorizam <strong>interfaces intuitivas</strong>,
              soluções escaláveis e <strong>acessibilidade</strong> — com
              atenção especial a <strong>Libras</strong> e{' '}
              <strong>inclusão digital</strong>.
            </p>
          </div>

          <AboutPortrait />
        </motion.div>
      </Reveal>

      <SectionSocialDock primary />
    </section>
  )
}

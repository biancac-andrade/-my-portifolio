import { motion } from 'motion/react'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { HeroGreeting } from '@/components/hero/HeroGreeting'
import { HeroStage } from '@/components/hero/HeroStage'
import { ScrollCue } from '@/components/hero/ScrollCue'
import { SectionWash } from '@/components/ui/SectionWash'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 0.8, 0.22, 1] as const },
  },
}

export function HeroSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="hero" id="inicio">
      <SectionWash variant="hero" />

      <motion.div
        className="hero-layout hero-layout--phrase"
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? false : 'hidden'}
        animate="show"
      >
        <div className="hero-layout__copy-wrap">
          <motion.div
            className="hero-layout__copy"
            variants={reducedMotion ? undefined : item}
          >
            <motion.p
              className="hero-availability"
              variants={reducedMotion ? undefined : item}
            >
              <span className="hero-availability__dot" aria-hidden />
              {profile.availabilityLabel}
            </motion.p>

            <HeroGreeting />

            <motion.p
              className="hero-pitch"
              variants={reducedMotion ? undefined : item}
            >
              {profile.heroPitch}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="hero-layout__stage"
          variants={reducedMotion ? undefined : item}
        >
          <HeroStage />
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  )
}

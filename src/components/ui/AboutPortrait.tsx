import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function AboutPortrait() {
  const reducedMotion = useReducedMotion()
  const figureRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  })

  const driftY = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -22])
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [0.9, 1.04, 1, 0.96])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const ringGlow = useTransform(scrollYProgress, [0.15, 0.55], [0.55, 1])

  return (
    <motion.figure
      ref={figureRef}
      className="about-portrait"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.65, ease: [0.22, 0.8, 0.22, 1] }}
      style={
        reducedMotion
          ? undefined
          : {
              y: driftY,
              scale,
            }
      }
    >
      <motion.div
        className="about-portrait__ring"
        aria-hidden
        style={
          reducedMotion
            ? undefined
            : {
                rotate,
                opacity: ringGlow,
              }
        }
        animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' } }
        }
      >
        <img
          className="about-portrait__img"
          src={profile.avatarUrl}
          alt={`Fotografia de ${profile.name}`}
          width={320}
          height={320}
        />
      </motion.div>
      <figcaption className="about-portrait__caption">
        {profile.location}
      </figcaption>
    </motion.figure>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const transition = {
  duration: 0.45,
  ease: [0.22, 0.8, 0.22, 1] as const,
}

export function HeroGreeting() {
  const reducedMotion = useReducedMotion()
  const accents = profile.heroAccentStack
  const [accentIndex, setAccentIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setAccentIndex((i) => (i + 1) % accents.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [accents.length, reducedMotion])

  const accent = reducedMotion ? accents[0] : accents[accentIndex]

  return (
    <header className="hero__headline">
      <h1 className="hero__title">
        <span className="hero__title-line hero__title-line--lead">
          <span className="hero__title-phrase">Eu construo o futuro</span>
        </span>
        <span
          className="hero__title-line hero__title-line--accent"
          aria-live="polite"
        >
          <span className="hero__title-phrase hero__title-phrase--tight">
            no código com{' '}
            <span className="hero__accent-wrap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={accent}
                  className="hero__accent"
                  data-caps={accent === 'IA' ? true : undefined}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={transition}
                >
                  {accent}
                </motion.span>
              </AnimatePresence>
            </span>
            .
          </span>
        </span>
      </h1>
    </header>
  )
}

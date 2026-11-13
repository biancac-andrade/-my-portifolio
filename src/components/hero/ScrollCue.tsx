import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ScrollCue() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="scroll-cue" aria-hidden>
      <motion.a
        className="scroll-cue__down"
        href="#sobre"
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-label="Ir para sobre"
      >
        ↓
      </motion.a>
      <motion.p
        className="scroll-cue__hint"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Role para &quot;Sobre&quot;
      </motion.p>
    </div>
  )
}

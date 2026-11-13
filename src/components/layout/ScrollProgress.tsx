import { motion, useScroll } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  )
}

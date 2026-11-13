import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const variants: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)', scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
  },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 0.8, 0.22, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

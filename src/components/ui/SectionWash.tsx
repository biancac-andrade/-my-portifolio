import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type SectionWashVariant =
  | 'hero'
  | 'about'
  | 'education'
  | 'skills'
  | 'projects'
  | 'contact'

type SectionWashProps = {
  variant: SectionWashVariant
}

export function SectionWash({ variant }: SectionWashProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const drift = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const fade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.25])

  return (
    <motion.div
      ref={ref}
      className={`section-wash section-wash--${variant}`}
      style={reducedMotion ? undefined : { y: drift, opacity: fade }}
      aria-hidden
    />
  )
}

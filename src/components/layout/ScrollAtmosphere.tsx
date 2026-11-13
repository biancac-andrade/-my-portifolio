import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ScrollChapter = 'dawn' | 'about' | 'work' | 'contact'

function chapterFromProgress(value: number): ScrollChapter {
  if (value < 0.22) return 'dawn'
  if (value < 0.48) return 'about'
  if (value < 0.76) return 'work'
  return 'contact'
}

export function ScrollAtmosphere() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const chapter = useTransform(scrollYProgress, chapterFromProgress)

  useEffect(() => {
    document.documentElement.dataset.scrollChapter = 'dawn'
    return () => {
      delete document.documentElement.dataset.scrollChapter
    }
  }, [])

  useMotionValueEvent(chapter, 'change', (value) => {
    document.documentElement.dataset.scrollChapter = value
  })

  const honeyY = useTransform(scrollYProgress, [0, 0.5, 1], ['-8%', '28%', '62%'])
  const honeyX = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['-12%', '18%', '8%', '-6%'])
  const honeyScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 0.92])
  const honeyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.75, 1],
    [0.5, 0.38, 0.32, 0.42, 0.48],
  )

  const slateY = useTransform(scrollYProgress, [0, 0.45, 1], ['35%', '-5%', '-42%'])
  const slateX = useTransform(scrollYProgress, [0, 1], ['25%', '-18%'])
  const slateOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 1],
    [0.22, 0.36, 0.4, 0.3],
  )

  const roseY = useTransform(scrollYProgress, [0, 0.6, 1], ['70%', '15%', '-25%'])
  const roseX = useTransform(scrollYProgress, [0, 1], ['-20%', '30%'])
  const roseOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.85, 1],
    [0.12, 0.28, 0.34, 0.26, 0.2],
  )

  const lineY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (reducedMotion) {
    return (
      <div
        className="scroll-atmosphere scroll-atmosphere--static"
        data-chapter="dawn"
        aria-hidden
      />
    )
  }

  return (
    <div className="scroll-atmosphere" aria-hidden>
      <motion.div
        className="scroll-atmosphere__blob scroll-atmosphere__blob--honey"
        style={{
          y: honeyY,
          x: honeyX,
          scale: honeyScale,
          opacity: honeyOpacity,
        }}
      />
      <motion.div
        className="scroll-atmosphere__blob scroll-atmosphere__blob--slate"
        style={{
          y: slateY,
          x: slateX,
          opacity: slateOpacity,
        }}
      />
      <motion.div
        className="scroll-atmosphere__blob scroll-atmosphere__blob--rose"
        style={{
          y: roseY,
          x: roseX,
          opacity: roseOpacity,
        }}
      />
      <motion.div
        className="scroll-atmosphere__sweep"
        style={{ y: lineY }}
      />
      <div className="scroll-atmosphere__grain" />
    </div>
  )
}

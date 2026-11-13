import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import 'lenis/dist/lenis.css'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.15,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

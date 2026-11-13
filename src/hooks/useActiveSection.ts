import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const SECTION_IDS = [
  'inicio',
  'sobre',
  'formacao',
  'competencias',
  'projetos',
  'contato',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

const MARKER_VIEWPORT_RATIO = 0.34
const INICIO_MAX_BOTTOM_VP = 0.52

function resolveActiveSection(): SectionId {
  const hero = document.getElementById('inicio')
  if (hero) {
    const heroRect = hero.getBoundingClientRect()
    if (heroRect.bottom > window.innerHeight * INICIO_MAX_BOTTOM_VP) {
      return 'inicio'
    }
  }

  const contato = document.getElementById('contato')
  if (contato) {
    const contatoRect = contato.getBoundingClientRect()
    const nearPageEnd =
      window.innerHeight - contatoRect.bottom < 80 &&
      contatoRect.top < window.innerHeight * 0.55
    if (nearPageEnd) return 'contato'
  }

  const markerY = window.innerHeight * MARKER_VIEWPORT_RATIO
  let current: SectionId = 'inicio'

  for (const id of SECTION_IDS) {
    if (id === 'inicio') continue
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= markerY) current = id
  }

  return current
}

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('inicio')
  const frameRef = useRef(0)
  const lenis = useLenis()

  const scheduleSync = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0
      setActive(resolveActiveSection())
    })
  }, [])

  useEffect(() => {
    scheduleSync()
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }
    }
  }, [scheduleSync])

  useEffect(() => {
    if (!lenis) return
    lenis.on('scroll', scheduleSync)
    scheduleSync()
    return () => {
      lenis.off('scroll', scheduleSync)
    }
  }, [lenis, scheduleSync])

  return active
}

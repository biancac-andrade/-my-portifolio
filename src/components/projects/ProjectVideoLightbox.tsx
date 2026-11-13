import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ShowcaseProject } from '@/types/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ProjectVideoLightboxProps = {
  open: boolean
  onClose: () => void
  project: ShowcaseProject
}

export function ProjectVideoLightbox({
  open,
  onClose,
  project,
}: ProjectVideoLightboxProps) {
  const reducedMotion = useReducedMotion()
  const titleId = useId()
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !open) return
    video.currentTime = 0
    void video.play().catch(() => {})
    return () => {
      video.pause()
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="project-lightbox__panel"
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-lightbox__head">
              <div>
                <p className="project-lightbox__kicker">Demonstração</p>
                <h2 className="project-lightbox__title" id={titleId}>
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="project-lightbox__close"
                onClick={onClose}
                aria-label="Fechar vídeo"
              >
                ✕
              </button>
            </div>
            <div className="project-lightbox__stage">
              <video
                ref={videoRef}
                className="project-lightbox__video"
                src={project.previewVideo}
                poster={project.previewPoster}
                controls
                playsInline
                preload="metadata"
              >
                <track kind="captions" />
              </video>
            </div>
            {project.repoUrl ? (
              <p className="project-lightbox__foot">
                <a
                  className="project-lightbox__repo"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver repositório no GitHub →
                </a>
              </p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

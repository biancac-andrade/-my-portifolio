import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { ShowcaseProject } from '@/types/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ProjectVideoLightbox } from '@/components/projects/ProjectVideoLightbox'

const themeGradients: Record<ShowcaseProject['previewTheme'], string> = {
  azure:
    'linear-gradient(145deg, #1e3556 0%, #2d5a8c 42%, #6ec4bc 100%)',
  firebase:
    'linear-gradient(145deg, #162a45 0%, #c46f42 35%, #5cb8ad 100%)',
  mobile:
    'linear-gradient(160deg, #6e52a0 0%, #162a45 55%, #5cb8ad 100%)',
  design:
    'linear-gradient(150deg, #2a3342 0%, #6e52a0 48%, #9ed9d2 100%)',
  bot:
    'linear-gradient(150deg, #0f1c2e 0%, #3a424f 50%, #b53b45 100%)',
}

type ProjectPreviewFrameProps = {
  project: ShowcaseProject
  href?: string
}

function ProjectPreviewVideo({
  project,
  reducedMotion,
}: {
  project: ShowcaseProject
  reducedMotion: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return
    video.muted = true
    const play = () => {
      void video.play().catch(() => {})
    }
    play()
    video.addEventListener('loadeddata', play)
    return () => video.removeEventListener('loadeddata', play)
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <img
        className="project-frame__shot"
        src={project.previewPoster ?? project.previewImage}
        alt={project.previewImageAlt ?? `Captura do projeto ${project.title}`}
        style={{ aspectRatio: project.previewAspect ?? '1280/564' }}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className="project-frame__shot project-frame__shot--video"
      src={project.previewVideo}
      poster={project.previewPoster}
      style={{ aspectRatio: project.previewAspect ?? '1280/564' }}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      disablePictureInPicture
      aria-hidden
    />
  )
}

export function ProjectPreviewFrame({ project, href }: ProjectPreviewFrameProps) {
  const reducedMotion = useReducedMotion()
  const gradient = themeGradients[project.previewTheme]
  const hasVideo = Boolean(project.previewVideo)
  const hasImage = Boolean(project.previewImage)
  const hasMedia = hasVideo || hasImage
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const inner = (
    <>
      <span className="project-frame__label"># Frame — {project.title}</span>
      {hasVideo ? (
        <span className="project-frame__expand-hint" aria-hidden>
          Clique para ampliar
        </span>
      ) : null}
      <motion.div
        className="project-frame__screen"
        data-shot={hasMedia || undefined}
        style={hasMedia ? undefined : { background: gradient }}
        whileHover={reducedMotion ? undefined : { scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        <div className="project-frame__chrome" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {hasVideo ? (
          <ProjectPreviewVideo
            project={project}
            reducedMotion={reducedMotion}
          />
        ) : hasImage ? (
          <img
            className="project-frame__shot"
            src={project.previewImage}
            alt={project.previewImageAlt ?? `Captura do projeto ${project.title}`}
            style={{
              aspectRatio: project.previewAspect ?? '1024/490',
            }}
            width={1024}
            height={490}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="project-frame__mock">
            <p className="project-frame__mock-title">{project.title}</p>
            <ul className="project-frame__mock-tags">
              {project.tags.slice(0, 3).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
      <span className="project-frame__border" aria-hidden />
      {['nw', 'ne', 'sw', 'se'].map((pos) => (
        <span key={pos} className="project-frame__handle" data-pos={pos} />
      ))}
    </>
  )

  const openLightbox = () => {
    if (hasVideo) setLightboxOpen(true)
  }

  const frame =
    hasVideo ? (
      <button
        type="button"
        className="project-frame project-frame--expandable"
        onClick={openLightbox}
        aria-label={`Assistir demonstração de ${project.title} em tela maior`}
      >
        {inner}
      </button>
    ) : href ? (
      <a
        className="project-frame"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir projeto ${project.title}`}
      >
        {inner}
      </a>
    ) : (
      <div className="project-frame">{inner}</div>
    )

  return (
    <>
      {frame}
      {hasVideo ? (
        <ProjectVideoLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          project={project}
        />
      ) : null}
    </>
  )
}

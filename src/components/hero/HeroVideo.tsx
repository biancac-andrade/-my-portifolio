import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const MP4 = '/hero/hero-loop.mp4'
const WEBM = '/hero/hero-loop.webm'
const POSTER = '/hero/hero-loop-poster.jpg'

export function HeroVideo() {
  const reducedMotion = useReducedMotion()
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

  return (
    <figure className="hero-video" aria-hidden={reducedMotion}>
      {reducedMotion ? (
        <img
          className="hero-video__media"
          src={POSTER}
          alt=""
          width={720}
          height={1280}
          loading="eager"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          className="hero-video__media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      )}
      <span className="hero-video__rim" aria-hidden />
    </figure>
  )
}

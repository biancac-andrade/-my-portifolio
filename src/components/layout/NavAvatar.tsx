import { useEffect, useRef } from 'react'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type NavAvatarProps = {
  className?: string
  width?: number
  height?: number
}

export function NavAvatar({
  className,
  width = 36,
  height = 36,
}: NavAvatarProps) {
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

  if (reducedMotion) {
    return (
      <img
        className={className}
        src={profile.avatarWavePoster}
        alt=""
        width={width}
        height={height}
        decoding="async"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className={className}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={profile.avatarWavePoster}
      disablePictureInPicture
      aria-hidden
    >
      <source src={profile.avatarWaveWebm} type="video/webm" />
      <source src={profile.avatarWaveMp4} type="video/mp4" />
    </video>
  )
}

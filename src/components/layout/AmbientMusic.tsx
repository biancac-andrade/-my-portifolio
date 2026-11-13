import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ambientMusic } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STORAGE_KEY = 'portfolio-ambient-music'

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeStored(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
  } catch {
  }
}

function rampVolume(
  audio: HTMLAudioElement,
  target: number,
  durationMs: number,
  onDone?: () => void,
) {
  const start = audio.volume
  const delta = target - start
  if (Math.abs(delta) < 0.001 || durationMs <= 0) {
    audio.volume = target
    onDone?.()
    return
  }
  const t0 = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / durationMs)
    const eased = 1 - (1 - t) ** 2
    audio.volume = start + delta * eased
    if (t < 1) requestAnimationFrame(step)
    else onDone?.()
  }
  requestAnimationFrame(step)
}

export function AmbientMusic() {
  const reducedMotion = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const playingRef = useRef(false)
  const wasPlayingRef = useRef(false)

  const syncPlayState = useCallback(async (on: boolean) => {
    const audio = audioRef.current
    if (!audio || failed) return

    if (on) {
      audio.volume = 0
      try {
        await audio.play()
        rampVolume(audio, ambientMusic.volume, 900)
        playingRef.current = true
        setPlaying(true)
        writeStored(true)
      } catch {
        setPlaying(false)
        writeStored(false)
      }
    } else {
      rampVolume(audio, 0, 400, () => {
        audio.pause()
        audio.currentTime = 0
      })
      playingRef.current = false
      setPlaying(false)
      writeStored(false)
    }
  }, [failed])

  const syncPlayStateRef = useRef(syncPlayState)
  syncPlayStateRef.current = syncPlayState

  const toggle = () => {
    void syncPlayState(!playing)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onCanPlay = () => setReady(true)
    const onError = () => {
      setFailed(true)
      setPlaying(false)
    }

    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('error', onError)

    const onVisibility = () => {
      if (document.hidden) {
        wasPlayingRef.current = playingRef.current
        if (playingRef.current) audio.pause()
      } else if (wasPlayingRef.current && !failed) {
        void audio.play().catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', onVisibility)

    const wantOn = readStored()
    if (wantOn) {
      void syncPlayStateRef.current(true)
    }

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [failed])

  if (failed) return null

  const label = playing
    ? `Pausar: ${ambientMusic.title} (${ambientMusic.subtitle})`
  : `Som ambiente: ${ambientMusic.title} (${ambientMusic.subtitle})`

  return (
    <div className="ambient-music">
      <audio
        ref={audioRef}
        src={ambientMusic.src}
        loop
        preload="metadata"
        aria-hidden
      />
      <motion.button
        type="button"
        className="ambient-music__toggle"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={label}
        title={label}
        disabled={!ready && !playing}
        whileHover={reducedMotion ? undefined : { scale: 1.03 }}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      >
        <span className="ambient-music__icon" aria-hidden>
          {playing ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M9 9v10M15 9v10" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          )}
        </span>
        <span className="ambient-music__copy">
          <span className="ambient-music__kicker">
            {playing ? 'Tocando' : 'Som ambiente'}
          </span>
          <span className="ambient-music__track">
            {ambientMusic.title}
            <span className="ambient-music__track-muted">
              {' '}
              · {ambientMusic.subtitle}
            </span>
          </span>
        </span>
        {playing && !reducedMotion ? (
          <span className="ambient-music__bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        ) : null}
      </motion.button>
    </div>
  )
}

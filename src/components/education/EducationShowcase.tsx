import { motion } from 'motion/react'
import { useCallback, useRef, useState, type PointerEvent } from 'react'
import type { EducationItem } from '@/types/profile'
import { useNarrowViewport } from '@/hooks/useNarrowViewport'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type EducationShowcaseProps = {
  items: readonly EducationItem[]
}

const CARD_SHIFT = 292
const SWIPE_THRESHOLD_PX = 42

function defaultEducationIndex(count: number) {
  if (count <= 1) return 0
  return Math.floor((count - 1) / 2)
}

export function EducationShowcase({ items }: EducationShowcaseProps) {
  const [index, setIndex] = useState(() => defaultEducationIndex(items.length))
  const reducedMotion = useReducedMotion()
  const narrow = useNarrowViewport()
  const compact = narrow || reducedMotion
  const swipePointer = useRef<number | null>(null)
  const swipeStartX = useRef(0)

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, items.length - 1)))
    },
    [items.length],
  )

  const onViewportPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!compact) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    swipePointer.current = event.pointerId
    swipeStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onViewportPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!compact || swipePointer.current !== event.pointerId) return
    const delta = event.clientX - swipeStartX.current
    swipePointer.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    goTo(index + (delta < 0 ? 1 : -1))
  }

  const onViewportPointerCancel = () => {
    swipePointer.current = null
  }

  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  return (
    <div
      className="edu-spotlight spotlight-carousel spotlight-carousel--sides"
      data-compact={compact || undefined}
    >
      <div className="spotlight-carousel__rail">
        <button
          type="button"
          className="spotlight-carousel__side spotlight-carousel__side--prev spotlight-carousel__side--rail"
          onClick={prev}
          disabled={index === 0}
          aria-label="Formação anterior"
        >
          ←
        </button>

        <div
          className="spotlight-carousel__viewport spotlight-carousel__viewport--tall"
          onPointerDown={onViewportPointerDown}
          onPointerUp={onViewportPointerUp}
          onPointerCancel={onViewportPointerCancel}
        >
          {compact ? (
            <>
              <button
                type="button"
                className="edu-spotlight__edge edu-spotlight__edge--prev"
                onClick={prev}
                disabled={index === 0}
                aria-label="Formação anterior"
              >
                ←
              </button>
              <button
                type="button"
                className="edu-spotlight__edge edu-spotlight__edge--next"
                onClick={next}
                disabled={index === items.length - 1}
                aria-label="Próxima formação"
              >
                →
              </button>
            </>
          ) : null}
          <ul className="spotlight-carousel__stage" aria-live="polite">
            {items.map((item, i) => {
              const offset = i - index
              const isActive = offset === 0
              const visible = compact
                ? isActive
                : Math.abs(offset) <= 2

              if (compact && !isActive) return null

              return (
                <motion.li
                  key={item.id}
                  className="spotlight-carousel__item"
                  initial={false}
                  animate={
                    compact
                      ? {
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          y: 0,
                          rotateY: 0,
                          zIndex: 20,
                        }
                      : {
                          x: offset * CARD_SHIFT,
                          y: isActive ? -14 : 6,
                          scale: isActive ? 1.06 : 0.94,
                          opacity: isActive
                            ? 1
                            : Math.abs(offset) === 1
                              ? 1
                              : 0,
                          rotateY: offset * -4,
                          zIndex: 30 - Math.abs(offset) * 10,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: compact ? 400 : 280,
                    damping: compact ? 34 : 28,
                  }}
                  style={{
                    pointerEvents:
                      visible && Math.abs(offset) <= 1 ? 'auto' : 'none',
                  }}
                  aria-hidden={!isActive && reducedMotion}
                >
                  <motion.article
                    className="edu-poster"
                    data-accent={item.accent ?? 'cyan'}
                    data-active={isActive || undefined}
                    whileHover={
                      reducedMotion || !isActive || compact
                        ? undefined
                        : {
                            y: -6,
                            boxShadow:
                              '0 28px 64px color-mix(in srgb, var(--black) 35%, transparent)',
                          }
                    }
                    onClick={() => {
                      if (!isActive && !compact) goTo(i)
                    }}
                  >
                    <span className="edu-poster__grid" aria-hidden />
                    <span className="edu-poster__kind">{item.kind}</span>
                    <div className="edu-poster__body">
                      <motion.div
                        className="edu-poster__emblem"
                        data-variant={item.logoVariant ?? 'crest'}
                        data-surface={item.logoSurface ?? 'light'}
                        aria-hidden
                        whileHover={
                          reducedMotion || !isActive
                            ? undefined
                            : { scale: 1.05 }
                        }
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 22,
                        }}
                      >
                        <img
                          src={item.logoUrl}
                          alt=""
                          width={52}
                          height={52}
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>
                      <div className="edu-poster__copy">
                        <h3 className="edu-poster__degree">{item.degree}</h3>
                        <p className="edu-poster__school">{item.institution}</p>
                        {item.period ? (
                          <p className="edu-poster__period">{item.period}</p>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="edu-poster__chip"
                      data-status={
                        item.status === 'Em andamento' ? 'progress' : 'done'
                      }
                    >
                      <span className="edu-poster__chip-dot" aria-hidden />
                      <span className="edu-poster__chip-label">
                        {item.badgeLabel ?? item.institution}
                      </span>
                      <span className="edu-poster__chip-sep" aria-hidden>
                        ·
                      </span>
                      <span className="edu-poster__chip-status">
                        {item.status}
                      </span>
                    </div>
                  </motion.article>
                </motion.li>
              )
            })}
          </ul>
        </div>

        <button
          type="button"
          className="spotlight-carousel__side spotlight-carousel__side--next spotlight-carousel__side--rail"
          onClick={next}
          disabled={index === items.length - 1}
          aria-label="Próxima formação"
        >
          →
        </button>
      </div>

      <div className="edu-spotlight__footer">
        {compact ? (
          <>
            <p className="edu-spotlight__counter">
              <span className="sr-only">Formação atual: </span>
              {index + 1} de {items.length}
            </p>
            <div
              className="edu-spotlight__dots edu-spotlight__dots--compact"
              role="tablist"
              aria-label="Formações"
            >
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className="spotlight-carousel__dot"
                  aria-selected={i === index}
                  aria-label={`${item.badgeLabel ?? item.institution} — ${item.degree}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </>
        ) : (
          <div
            className="spotlight-carousel__dots edu-spotlight__dots"
            role="tablist"
            aria-label="Formações"
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                className="spotlight-carousel__dot"
                aria-selected={i === index}
                aria-label={`${item.badgeLabel ?? item.institution} — ${item.degree}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

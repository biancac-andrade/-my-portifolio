import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { NavAvatar } from '@/components/layout/NavAvatar'

const links: Array<{
  href: string
  label: string
  id:
    | 'sobre'
    | 'formacao'
    | 'competencias'
    | 'projetos'
    | 'contato'
  mobileOnly?: boolean
}> = [
  { href: '#sobre', label: 'Sobre', id: 'sobre' },
  { href: '#formacao', label: 'Formação', id: 'formacao' },
  { href: '#competencias', label: 'Skills', id: 'competencias' },
  { href: '#projetos', label: 'Projetos', id: 'projetos' },
  { href: '#contato', label: 'Contato', id: 'contato', mobileOnly: true },
]

export function FloatingNav() {
  const active = useActiveSection()
  const reducedMotion = useReducedMotion()
  const firstName = profile.name.split(' ')[0]
  const [desktopNav, setDesktopNav] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const sync = () => setDesktopNav(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const contatoOnCta = desktopNav
  const isContatoActive = active === 'contato'

  return (
    <div className="floating-nav-shell">
      <motion.header
        className="floating-nav"
        initial={reducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 0.8, 0.22, 1] }}
      >
        <a className="floating-nav__brand" href="#inicio">
          <NavAvatar className="floating-nav__avatar" />
          <span className="floating-nav__name">{firstName}</span>
          <span className="floating-nav__name floating-nav__name--full">
            {profile.name}
          </span>
        </a>

        <nav className="floating-nav__links" aria-label="Principal">
          <div className="floating-nav__links-track">
            {links.map((link) => {
              const isActive = active === link.id
              const showGlow =
                isActive && !(link.id === 'contato' && contatoOnCta)

              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="floating-nav__link"
                  data-active={isActive || undefined}
                  data-mobile={link.mobileOnly || undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {showGlow ? (
                    <motion.span
                      className="floating-nav__link-glow"
                      layoutId="nav-active"
                      layout="position"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                      aria-hidden
                    />
                  ) : null}
                  <span className="floating-nav__link-label">{link.label}</span>
                </a>
              )
            })}
          </div>
        </nav>

        <motion.a
          className="floating-nav__cta"
          href="#contato"
          data-active={isContatoActive || undefined}
          aria-current={isContatoActive ? 'page' : undefined}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          {isContatoActive && contatoOnCta ? (
            <motion.span
              className="floating-nav__cta-glow"
              layoutId="nav-active"
              layout="position"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              aria-hidden
            />
          ) : null}
          <span className="floating-nav__cta-label">Contato</span>
        </motion.a>
      </motion.header>
    </div>
  )
}

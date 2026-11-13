import { motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '@/data/profile'
import { IconGitHub, IconLinkedIn, IconWhatsApp } from '@/components/ui/icons'

const ORB = 'clamp(2.35rem, 5.5vw, 2.85rem)'

const channels = [
  {
    id: 'github',
    href: profile.github,
    label: 'GitHub — biancac-andrade',
    className: 'contact-stack__orb--github',
    icon: <IconGitHub width={18} height={18} />,
  },
  {
    id: 'linkedin',
    href: profile.linkedin,
    label: 'LinkedIn — bcandrade',
    className: 'contact-stack__orb--linkedin',
    icon: <IconLinkedIn width={18} height={18} />,
  },
  {
    id: 'whatsapp',
    href: `${profile.whatsappUrl}?text=${encodeURIComponent(profile.whatsappDefaultMessage)}`,
    label: `WhatsApp — ${profile.whatsappDisplay}`,
    className: 'contact-stack__orb--whatsapp',
    icon: <IconWhatsApp width={18} height={18} />,
  },
] as const

type SectionSocialDockProps = {
  primary?: boolean
  className?: string
}

export function SectionSocialDock({
  primary = false,
  className,
}: SectionSocialDockProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const list = (
    <motion.ul
      className="contact-stack section-social-dock__stack"
      aria-label="Redes e contato"
      onMouseLeave={() => setHovered(null)}
      initial={false}
    >
      {channels.map((item) => (
        <li key={item.id} className="contact-stack__item">
          <motion.a
            href={item.href}
            className={`contact-stack__orb section-social-dock__orb ${item.className}`}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            style={{ width: ORB, height: ORB }}
            onHoverStart={() => setHovered(item.id)}
            onFocus={() => setHovered(item.id)}
            onBlur={() => setHovered(null)}
            animate={{
              scale:
                hovered === null ? 1 : hovered === item.id ? 1.12 : 0.94,
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            data-front={hovered === item.id || undefined}
          >
            {item.icon}
          </motion.a>
        </li>
      ))}
    </motion.ul>
  )

  const rootClass = `section-social-dock ${className ?? ''}`.trim()

  if (primary) {
    return (
      <nav className={rootClass} aria-label="Redes sociais">
        {list}
      </nav>
    )
  }

  return <div className={rootClass}>{list}</div>
}

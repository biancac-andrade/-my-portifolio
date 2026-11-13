import type { SoftSkillIconId } from '@/types/profile'
import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { id: SoftSkillIconId }

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.65,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SoftSkillIcon({ id, ...props }: Props) {
  switch (id) {
    case 'communication':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path
            d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5.2L9 19v-3.5H6a2 2 0 0 1-2-2v-7Z"
            {...stroke}
          />
          <path d="M8 9h8M8 12.5h5" {...stroke} />
        </svg>
      )
    case 'collaboration':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="9" cy="9" r="2.6" {...stroke} />
          <circle cx="16.5" cy="10" r="2.1" {...stroke} />
          <path
            d="M4.5 18.5c.6-2.2 2.3-3.5 4.5-3.5s3.9 1.3 4.5 3.5M13.5 18.5c.45-1.6 1.7-2.7 3.2-2.7 1.1 0 2 .5 2.6 1.4"
            {...stroke}
          />
        </svg>
      )
    case 'organization':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="5" y="4" width="14" height="16" rx="2" {...stroke} />
          <path d="M9 8.5h6M9 12h6M9 15.5h4" {...stroke} />
        </svg>
      )
    case 'learning':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path
            d="M4.5 8.5 12 5l7.5 3.5v7L12 19l-7.5-3.5v-7Z"
            {...stroke}
          />
          <path d="M12 8.5v10.5M7.5 6.8v8.7M16.5 6.8v8.7" {...stroke} />
        </svg>
      )
    case 'problem-solving':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path
            d="M9.2 18.5h5.6c2.4 0 4.2-1.8 4.2-4.1 0-1.7-1-3.2-2.6-3.8.2-2.5-2.1-4.6-4.7-4.1-1.4-.9-3.3-.5-4.2 1-.9-.3-1.8 0-2.3.7-.8 1.1-.3 2.7.9 3.2-.9 1.5-.2 3.4 1.3 4.3-.5.9-.3 2 .5 2.6"
            {...stroke}
          />
          <path d="M10.5 18.5v2M13.5 18.5v2" {...stroke} />
        </svg>
      )
    case 'inclusion':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="6.5" r="2.4" {...stroke} />
          <path d="M6.5 18c.5-2.5 2.6-4 5.5-4s5 1.5 5.5 4" {...stroke} />
          <path
            d="M17.5 14.5c1.6.3 2.9 1.4 3.4 3M16.8 12.2v3.3"
            {...stroke}
          />
        </svg>
      )
    default:
      return null
  }
}

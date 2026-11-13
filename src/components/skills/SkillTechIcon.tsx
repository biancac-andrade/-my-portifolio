import type { SkillIconId } from '@/types/profile'
import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { id: SkillIconId }

export function SkillTechIcon({ id, ...props }: Props) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="12" r="2.2" fill="#5ce1e6" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            stroke="#5ce1e6"
            strokeWidth="1.2"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            stroke="#5ce1e6"
            strokeWidth="1.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            stroke="#5ce1e6"
            strokeWidth="1.2"
            transform="rotate(-60 12 12)"
          />
        </svg>
      )
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <rect width="24" height="24" rx="4" fill="#3178c6" />
          <path
            fill="#fff"
            d="M13.5 14.9v2.5c1.1.5 2.3.8 3.6.8 1.6 0 2.6-.8 2.6-2.1 0-1-.5-1.6-2.4-2.3l-1.1-.5c-1.5-.6-2.2-1.3-2.2-2.5 0-1.4 1.2-2.4 3-2.4 1 0 1.9.2 2.8.6v2.4c-.7-.4-1.6-.6-2.6-.6-1.4 0-2.1.6-2.1 1.5 0 .9.4 1.3 2 1.9l1.1.5c1.7.7 2.5 1.5 2.5 2.7 0 1.5-1.2 2.6-3.3 2.6-1.2 0-2.3-.3-3.3-.9zM8.2 11h-2V8H3V6h8.7v2H8.2v3z"
          />
        </svg>
      )
    case 'htmlcss':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path fill="#e44d26" d="M3 2h18l-1.6 18.4L12 22l-7.4-1.6L3 2z" />
          <path fill="#f06529" d="M12 20.2 17.5 19 18.8 5H12v15.2z" />
          <path
            fill="#fff"
            d="M12 7.5h5.5l-.4 4.2H12V7.5zm0 6.8h3.1l-.3 3.2L12 18.1v-3.8z"
          />
        </svg>
      )
    case 'angular':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path fill="#dd0031" d="M12 2 2 6.5l1.5 13L12 22l8.5-2.5L22 6.5 12 2z" />
          <path fill="#fff" d="M12 4.8 5.2 7.2l1.2 10.6L12 19.5l5.6-1.7 1.2-10.6L12 4.8z" />
          <path fill="#dd0031" d="M12 8.5 8.5 16h2.1l.7-1.8h2.2l.7 1.8h2.1L12 8.5zm-.5 4.1.8-2.2.8 2.2h-1.6z" />
        </svg>
      )
    case 'storybook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#ff4785"
            d="M4 20V4l8-2 8 2v16l-8 2-8-2zm3.2-2.1 4.8 1.2 4.8-1.2V6.8l-4.8-1.2-4.8 1.2v11.1z"
          />
          <path fill="#fff" d="M9.5 8.5h5v2h-5v-2zm0 3.5h5v2h-5v-2z" />
        </svg>
      )
    case 'a11y':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5bda8e" strokeWidth="1.6" aria-hidden {...props}>
          <circle cx="12" cy="4.5" r="2" fill="#5bda8e" stroke="none" />
          <path d="M12 7v14M7 10h10M8.5 21 12 17l3.5 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'react-native':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect width="24" height="24" rx="6" fill="#61dafb" fillOpacity="0.18" />
          <circle cx="12" cy="12" r="2" fill="#61dafb" />
          <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#61dafb" strokeWidth="1.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="8.5"
            ry="3.5"
            stroke="#61dafb"
            strokeWidth="1.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="8.5"
            ry="3.5"
            stroke="#61dafb"
            strokeWidth="1.2"
            transform="rotate(-60 12 12)"
          />
        </svg>
      )
    case 'expo':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <rect width="24" height="24" rx="6" fill="#0f172a" />
          <path
            fill="#fff"
            d="M12 4.5 5 11.5 12 18.5l7-7-7-7zm0 2.8 4.2 4.2-4.2 4.2-4.2-4.2L12 7.3z"
          />
        </svg>
      )
    case 'android':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#3ddc84"
            d="M8.8 5.2 7.9 3.4a.5.5 0 1 1 .9-.5l.9 1.8a6.9 6.9 0 0 1 4.6 0l.9-1.8a.5.5 0 1 1 .9.5l-.9 1.8A6.2 6.2 0 0 1 19 10v4.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10c0-1.9 1.1-3.6 2.8-4.8z"
          />
          <circle cx="9.5" cy="10.5" r="0.9" fill="#0a0f18" />
          <circle cx="14.5" cy="10.5" r="0.9" fill="#0a0f18" />
          <path
            fill="#3ddc84"
            d="M5.5 11.5h-.8a1 1 0 0 0-1 1v2.2a1 1 0 0 0 1 1h.8V11.5zm14.8 0h.8a1 1 0 0 1 1 1v2.2a1 1 0 0 1-1 1h-.8V11.5z"
          />
        </svg>
      )
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#5bda8e"
            d="M12 2C9.8 2 8 3.1 6.8 4.3 5.6 5.5 5 7.1 5 8.8v6.4c0 1.7.6 3.3 1.8 4.5C8 20.9 9.8 22 12 22s4-.9 5.2-2.3c1.2-1.2 1.8-2.8 1.8-4.5V8.8c0-1.7-.6-3.3-1.8-4.5C16 3.1 14.2 2 12 2zm0 2c1.2 0 2.2.5 3 1.3.8.8 1.2 1.8 1.2 3v6.4c0 1.2-.4 2.2-1.2 3-.8.8-1.8 1.3-3 1.3s-2.2-.5-3-1.3c-.8-.8-1.2-1.8-1.2-3V8.3c0-1.2.4-2.2 1.2-3 .8-.8 1.8-1.3 3-1.3z"
          />
          <path fill="#0a0f18" d="M11 7h2v10h-2V7zm-3 4h2v2H8v-2zm7 0h2v2h-2v-2z" />
        </svg>
      )
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#7b8cff" strokeWidth="1.6" aria-hidden {...props}>
          <path d="M4 8h16M4 12h12M4 16h8" strokeLinecap="round" />
          <circle cx="19" cy="12" r="2" fill="#7b8cff" stroke="none" />
        </svg>
      )
    case 'java':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#e44d26"
            d="M8.2 17.5s-.6.7.5.7c1.3 0 2.2-.8 2.2-.8l-1.1-3.2s-.9 2.2-1.6 3.3zM14.5 18.2s.5.6-.4.6c-1.1 0-1.9-.5-1.9-.5l.8-2.8s.7 1.8 1.5 2.7z"
          />
          <path
            fill="#5382a1"
            d="M12 3s-4.5 2.8-2.2 7.2c.8 1.5 2.4 2 2.4 2s-1.2 1.8-2.8 2.5c2.2.6 6.8-.9 6.8-5.5C16.2 6.8 12 3 12 3z"
          />
        </svg>
      )
    case 'azure':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path fill="#0089d6" d="m4 18 4.5-2.5L12 6l3.5 9.5L20 18H4z" />
          <path fill="#50e6ff" d="M8.5 15.5 12 6l3.5 9.5H8.5z" opacity="0.85" />
        </svg>
      )
    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path fill="#ffca28" d="M12 3 4 20h6l2-8 4 8h4L12 3z" />
          <path fill="#ffa000" d="M12 3 8 20h8L12 3z" opacity="0.55" />
        </svg>
      )
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#3ecf8e"
            d="M12 2.5c4.2 0 7.5 3.1 7.5 7.2 0 3.4-2 5.6-4.8 7.8-1.4 1-2.8 2-3.6 3.6-.4.8-.6 1.6-.6 2.4V21H9.8v-.5c0-2.8 1.2-4.9 3.1-6.7 2.3-2.2 3.6-3.8 3.6-6.1 0-2.3-1.8-4.1-4.4-4.1-1.6 0-3 .8-3.9 2.1l1.5 1c.6-.8 1.5-1.3 2.5-1.3 1.5 0 2.6 1.1 2.6 2.7 0 1.4-.7 2.4-2.4 4-1.8 1.8-3.4 4.2-3.7 7.3h-1.8c.4-3.8 2.4-6.5 4.3-8.4 1.9-1.9 2.8-3.2 2.8-5 0-3.6-2.9-6.5-6.7-6.5S5.3 6.2 5.3 9.8h-2C3.3 5.1 7.1 2.5 12 2.5z"
          />
        </svg>
      )
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <path
            fill="#47a248"
            d="M12 2c-.2 2.4-.9 4.4-2.3 6.1-.8 1-1.8 1.9-3.1 2.5-.1.5-.1 1-.1 1.4.2 1.2.8 2.2 1.7 3 .5 4.2.9 7.6 1.4 10.2.3 1.1.7 2 1.3 2.8h.2c.6-.8 1-1.7 1.3-2.8.5-2.6.9-6 1.4-10.2.9-.8 1.5-1.8 1.7-3 0-.4 0-.9-.1-1.4-1.3-.6-2.3-1.5-3.1-2.5C12.9 6.4 12.2 4.4 12 2z"
          />
        </svg>
      )
    case 'render':
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...props}>
          <rect width="24" height="24" rx="5" fill="#1f2937" />
          <path
            fill="#fff"
            d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"
            opacity="0.95"
          />
          <circle cx="17" cy="16" r="1.4" fill="#5ce1e6" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="#f05133" aria-hidden {...props}>
          <path d="M21.6 10.2 13.8 2.4a1.6 1.6 0 0 0-2.3 0l-1.9 1.9 2.4 2.4a1.9 1.9 0 0 1 2.4 2.4l2.3 2.3a1.9 1.9 0 0 1-1.2.4 1.8 1.8 0 0 1-1.2-.5L9.5 9.7v6.7a2.5 2.5 0 0 0 .7.2c.8.2 1.5-.1 2.3-.9l5.2-5.2a3.5 3.5 0 0 0 0-5L16 4.9l6.6 6.6a1.6 1.6 0 0 1 0 2.3z" />
        </svg>
      )
    case 'design-systems':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b4bfff" strokeWidth="1.5" aria-hidden {...props}>
          <rect x="3" y="3" width="8" height="8" rx="2" fill="#7b8cff" fillOpacity="0.25" />
          <rect x="13" y="3" width="8" height="8" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
          <rect x="13" y="13" width="8" height="8" rx="2" fill="#5bda8e" fillOpacity="0.25" />
        </svg>
      )
    case 'tests':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5ce1e6" strokeWidth="1.6" aria-hidden {...props}>
          <path d="M9 12 11 14l4-5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      )
    case 'devops':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5ce1e6" strokeWidth="1.6" aria-hidden {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" />
          <path d="m8.5 8.5 2 2m3 3 2 2m0-7-2 2m-3 3-2 2" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

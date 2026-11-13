import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState, type FormEvent } from 'react'
import { contactIntents, profile } from '@/data/profile'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { IconArrowUpRight, IconDownload } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionWash } from '@/components/ui/SectionWash'
import type { ContactIntent } from '@/types/profile'
import {
  hasContactFormDelivery,
  submitContactForm,
} from '@/lib/submitContactForm'

export function ContactSection() {
  const [intent, setIntent] = useState<ContactIntent>('projeto')
  const [name, setName] = useState('')
  const [replyTo, setReplyTo] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const usesWeb3Forms = hasContactFormDelivery()

  const active = contactIntents[intent]

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  const sendMail = () => {
    const subject = encodeURIComponent(active.subject)
    const body = encodeURIComponent(
      [
        name.trim() ? `Olá, sou ${name.trim()}.` : 'Olá, Bianca.',
        '',
        message.trim() || '(escreva sua mensagem aqui)',
        '',
        `— Enviado pelo portfólio · assunto: ${active.label}`,
      ].join('\n'),
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setSent(false)

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      setFormError('Escreva uma mensagem antes de enviar.')
      return
    }

    if (!usesWeb3Forms) {
      sendMail()
      return
    }

    if (!replyTo.trim()) {
      setFormError('Informe seu e-mail para eu poder responder.')
      return
    }

    setSending(true)
    const result = await submitContactForm({
      name,
      message: trimmedMessage,
      subject: active.subject,
      intentLabel: active.label,
      replyTo,
    })
    setSending(false)

    if (result.ok) {
      setSent(true)
      setMessage('')
      setReplyTo('')
      return
    }

    const errors: Record<typeof result.reason, string> = {
      missing_key:
        'Formulário não configurado. Defina VITE_WEB3FORMS_ACCESS_KEY no `.env`.',
      invalid: 'Preencha a mensagem.',
      network: 'Falha de rede. Tente de novo em instantes.',
      api: 'Não foi possível enviar agora. Use o e-mail ou WhatsApp.',
    }
    setFormError(errors[result.reason])
  }

  return (
    <section className="section section--contact" id="contato">
      <SectionWash variant="contact" />

      <div className="contact-layout">
        <Reveal className="contact-layout__head">
          <span className="section-label section-label--contact">
            05 / Contato
          </span>
          <h2 className="contact-headline">
            <span className="contact-headline__main">
              {profile.contactHeading.main}
            </span>{' '}
            <span className="contact-headline__muted">
              {profile.contactHeading.muted}
            </span>
          </h2>
          <p className="contact-lede">{profile.contactLead}</p>
        </Reveal>

        <Reveal delay={0.05} className="contact-layout__card-wrap">
          <motion.div
            className="contact-card"
            initial={false}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <div className="contact-field">
              <span className="contact-field__label">E-mail</span>
              <div className="contact-field__row">
                <a
                  className="contact-field__value"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
                <motion.button
                  type="button"
                  className="contact-field__pill"
                  onClick={copyEmail}
                  whileTap={{ scale: 0.97 }}
                  aria-live="polite"
                >
                  {copied ? 'Copiado ✓' : 'Copiar'}
                </motion.button>
              </div>
            </div>

            <motion.div className="contact-quick" layout>
              <p className="contact-quick__label">Mensagem rápida</p>
              <div
                className="intent-row"
                role="group"
                aria-label="Tipo de contato"
              >
                {(Object.keys(contactIntents) as ContactIntent[]).map((key) => {
                  const item = contactIntents[key]
                  const pressed = intent === key
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      className="intent-chip"
                      data-active={pressed || undefined}
                      onClick={() => setIntent(key)}
                      whileTap={{ scale: 0.96 }}
                      layout
                    >
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={intent}
                  className="intent-copy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.8, 0.22, 1] }}
                >
                  {active.description}
                </motion.p>
              </AnimatePresence>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <label className="field">
                  <span>Seu nome</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Como posso te chamar?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                {usesWeb3Forms ? (
                  <label className="field">
                    <span>Seu e-mail</span>
                    <input
                      type="email"
                      name="replyTo"
                      autoComplete="email"
                      placeholder="Para eu te responder"
                      value={replyTo}
                      onChange={(e) => setReplyTo(e.target.value)}
                      required
                    />
                  </label>
                ) : null}
                <label className="field">
                  <span>Mensagem</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Conte o contexto do projeto, prazo ou ideia…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                {formError ? (
                  <p className="contact-form__feedback contact-form__feedback--error" role="alert">
                    {formError}
                  </p>
                ) : null}
                {sent ? (
                  <p className="contact-form__feedback contact-form__feedback--ok" role="status">
                    Mensagem enviada para {profile.email}. Obrigada pelo contato!
                  </p>
                ) : null}
                <div className="contact-form__actions">
                  <motion.button
                    type="submit"
                    className="button button--contact-primary contact-form__send"
                    disabled={sending}
                    whileHover={sending ? undefined : { scale: 1.01 }}
                    whileTap={sending ? undefined : { scale: 0.98 }}
                  >
                    {sending
                      ? 'Enviando…'
                      : usesWeb3Forms
                        ? 'Enviar mensagem'
                        : 'Enviar e-mail'}
                    <IconArrowUpRight width={18} height={18} aria-hidden />
                  </motion.button>
                  {profile.resumeUrl ? (
                    <a
                      className="button contact-form__resume"
                      href={profile.resumeUrl}
                      download="curriculo-bianca-andrade-2026.pdf"
                      aria-label="Baixar currículo em PDF"
                    >
                      <IconDownload width={18} height={18} aria-hidden />
                      Currículo
                    </a>
                  ) : null}
                </div>
              </form>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>

      <SectionSocialDock />
    </section>
  )
}

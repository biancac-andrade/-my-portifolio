export type ContactFormPayload = {
  name: string
  message: string
  subject: string
  intentLabel: string
  replyTo?: string
}

export type ContactFormResult =
  | { ok: true }
  | { ok: false; reason: 'missing_key' | 'invalid' | 'network' | 'api' }

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export function hasContactFormDelivery(): boolean {
  return Boolean(accessKey?.trim())
}

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactFormResult> {
  const key = accessKey?.trim()
  if (!key) return { ok: false, reason: 'missing_key' }

  const name = payload.name.trim()
  const message = payload.message.trim()
  if (!message) return { ok: false, reason: 'invalid' }

  const body = {
    access_key: key,
    subject: `[Portfólio] ${payload.subject}`,
    from_name: name || 'Visitante do portfólio',
    name: name || 'Visitante do portfólio',
    email: payload.replyTo?.trim() ?? '',
    message: [
      message,
      '',
      `— Tipo de contato: ${payload.intentLabel}`,
      payload.replyTo?.trim()
        ? `— Responder para: ${payload.replyTo.trim()}`
        : '— E-mail de resposta não informado',
    ].join('\n'),
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) return { ok: false, reason: 'api' }

    const data = (await res.json()) as { success?: boolean }
    if (!data.success) return { ok: false, reason: 'api' }

    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

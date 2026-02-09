import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const TO_EMAIL = 'riley@graphicdefine.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as {
    name?: string
    business?: string
    email?: string
    projectType?: string
    budget?: string
    existingSite?: string
    details?: string
  }

  const { name, business, email, projectType, budget, existingSite, details } = body
  if (!name?.trim() || !email?.trim() || !details?.trim()) {
    return res.status(400).json({ error: 'Name, email, and project details are required' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'Graphic Define Contact <onboarding@resend.dev>'

  try {
    const resend = new Resend(apiKey)

    const text = [
      `Name: ${name}`,
      `Business: ${business || '—'}`,
      `Email: ${email}`,
      `Project type: ${projectType || '—'}`,
      `Budget: ${budget || '—'}`,
      existingSite ? `Existing site: ${existingSite}` : null,
      '',
      'Details:',
      details,
    ]
      .filter(Boolean)
      .join('\n')

    const { error } = await resend.emails.send({
      from,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${name}${business ? ` (${business})` : ''}`,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      const message = typeof error === 'object' && error !== null && 'message' in error ? String((error as { message: string }).message) : 'Failed to send'
      return res.status(500).json({ error: message })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    const message = err instanceof Error ? err.message : 'Failed to send'
    return res.status(500).json({ error: message })
  }
}

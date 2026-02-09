import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: number
  role: 'bot' | 'user'
  text: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hi! I can answer questions about Graphic Define's services, work, and approach. What can I help with?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const payload = [...messages, userMsg].map(({ role, text: t }) => ({ role, text: t }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      })

      let data: { reply?: string; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        const snippet = await res.text().then((t) => t.slice(0, 200).replace(/\s+/g, ' ').trim())
        throw new Error(`(${res.status}) ${snippet || 'Non-JSON response'}`)
      }

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'bot', text: data.reply ?? '' },
      ])
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e)
      const fallback =
        "I'm having trouble connecting right now. You can reach us directly at riley@graphicdefine.com or through our Contact page."
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'bot',
          text: errMsg ? `Chat error: ${errMsg}\n\n${fallback}` : fallback,
        },
      ])
    }

    setLoading(false)
  }, [input, loading, messages])

  const goToContact = () => {
    setOpen(false)
    navigate('/contact')
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gd-bg-elevated)] border border-[var(--color-gd-border)] text-[var(--color-gd-text)] shadow-lg shadow-black/30 transition-all hover:scale-105 hover:border-[var(--color-gd-muted)]"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-50 flex w-80 sm:w-96 flex-col rounded-2xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg)] shadow-2xl shadow-black/40"
          style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-gd-border)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--color-gd-text)]">Graphic Define</p>
              <p className="text-xs text-[var(--color-gd-muted)]">Ask about our work and services</p>
            </div>
            <button
              onClick={goToContact}
              className="rounded-full border border-[var(--color-gd-border)] px-3 py-1 text-xs font-medium text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] hover:border-[var(--color-gd-muted)] transition-colors"
            >
              Contact us
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: '200px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-gd-text)] text-[var(--color-gd-bg)]'
                      : 'bg-[var(--color-gd-bg-elevated)] border border-[var(--color-gd-border)] text-[var(--color-gd-text)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[var(--color-gd-bg-elevated)] border border-[var(--color-gd-border)] px-3.5 py-2.5">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gd-muted)] animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gd-muted)] animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gd-muted)] animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--color-gd-border)] px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 rounded-xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-gd-text)] placeholder:text-[var(--color-gd-muted)]/60 outline-none focus:border-[var(--color-gd-muted)] disabled:opacity-60"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gd-text)] text-[var(--color-gd-bg)] transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

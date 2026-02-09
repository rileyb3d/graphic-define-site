import { useState, useEffect, type FormEvent } from 'react'
import { useInView } from './hooks/useInView'

function AnimatedSection({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

const INPUT_CLASS =
  'w-full rounded-xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg)] px-4 py-3 text-sm text-[var(--color-gd-text)] placeholder:text-[var(--color-gd-muted)]/60 outline-none transition-colors focus:border-[var(--color-gd-muted)] focus:ring-1 focus:ring-[var(--color-gd-muted)]'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setSubmitError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: (data.get('name') as string)?.trim(),
      business: (data.get('business') as string)?.trim(),
      email: (data.get('email') as string)?.trim(),
      projectType: (data.get('projectType') as string) || '',
      budget: (data.get('budget') as string) || '',
      existingSite: (data.get('existingSite') as string)?.trim() || undefined,
      details: (data.get('details') as string)?.trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to send')
      }
    } catch {
      setSubmitError('Something went wrong sending your message. Please email us directly at ')
    }
    setSending(false)
  }

  return (
    <main className="pt-14">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left column - info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-gd-accent)]">
                  Contact
                </span>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-4xl">
                  Get a free mockup
                </h1>
                <p className="mt-4 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                  Tell us about your project and we'll put together a free mockup to show you what's possible. No commitment, no pressure.
                </p>

                <div className="mt-10 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-gd-text)]">What happens next</h3>
                    <ol className="mt-3 space-y-3">
                      {[
                        'You fill out the form with your project details.',
                        'We review and put together a free mockup.',
                        'We walk you through it and discuss next steps.',
                      ].map((step, i) => (
                        <li key={step} className="flex items-start gap-3 text-sm text-[var(--color-gd-muted)]">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-gd-border)] text-xs text-[var(--color-gd-muted)]">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="border-t border-[var(--color-gd-border)] pt-6">
                    <h3 className="text-sm font-semibold text-[var(--color-gd-text)]">Prefer email?</h3>
                    <a
                      href="mailto:riley@graphicdefine.com"
                      className="mt-2 inline-block text-sm text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors"
                    >
                      riley@graphicdefine.com
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column - form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <AnimatedSection>
                  <div className="rounded-2xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] p-10 text-center">
                    <svg className="mx-auto h-10 w-10 text-[var(--color-gd-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--color-gd-text)]">We got it.</h3>
                    <p className="mt-2 text-sm text-[var(--color-gd-muted)]">
                      We'll review your project details and get back to you with a mockup soon.
                    </p>
                  </div>
                </AnimatedSection>
              ) : (
                <AnimatedSection style={{ transitionDelay: '80ms' }}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Jane Smith"
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="business" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                          Business name
                        </label>
                        <input
                          type="text"
                          id="business"
                          name="business"
                          required
                          placeholder="Acme Co."
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="jane@company.com"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="projectType" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                          What do you need?
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          className={INPUT_CLASS + ' appearance-none'}
                          defaultValue=""
                          onChange={(e) => {
                            const el = document.getElementById('existingSiteRow')
                            if (el) {
                              el.style.display = e.target.value === 'redesign' ? 'block' : 'none'
                            }
                          }}
                        >
                          <option value="" disabled>Select one</option>
                          <option value="new-site">New website from scratch</option>
                          <option value="redesign">Redesign existing site</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                          Ballpark budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          className={INPUT_CLASS + ' appearance-none'}
                          defaultValue=""
                        >
                          <option value="" disabled>Select range</option>
                          <option value="under-5k">Under $5k</option>
                          <option value="5k-15k">$5k - $15k</option>
                          <option value="15k-50k">$15k - $50k</option>
                          <option value="50k+">$50k+</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>
                    </div>

                    <div id="existingSiteRow" style={{ display: 'none' }}>
                      <label htmlFor="existingSite" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                        Existing site URL
                      </label>
                      <input
                        type="url"
                        id="existingSite"
                        name="existingSite"
                        placeholder="https://yoursite.com"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div>
                      <label htmlFor="details" className="block text-xs font-medium text-[var(--color-gd-muted)] mb-2">
                        Tell us about the project
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        required
                        rows={5}
                        placeholder="What does your business do? What problems are you trying to solve?"
                        className={INPUT_CLASS + ' resize-none'}
                      />
                    </div>

                    {submitError && (
                      <div className="rounded-xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] px-4 py-3 text-sm text-[var(--color-gd-muted)]">
                        {submitError}
                        <a href="mailto:riley@graphicdefine.com" className="text-[var(--color-gd-text)] underline hover:no-underline">
                          riley@graphicdefine.com
                        </a>
                        .
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-[var(--color-gd-muted)]">
                        We'll respond within 24 hours.
                      </p>
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex rounded-full bg-[var(--color-gd-text)] px-7 py-3 text-sm font-medium text-[var(--color-gd-bg)] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? 'Sending...' : 'Send project details'}
                      </button>
                    </div>
                  </form>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

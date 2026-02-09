import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { NAV_LINKS, VALUE_PILLARS, CASE_STUDIES } from './data'
import { useInView } from './hooks/useInView'
import Chatbot from './Chatbot'

function PillarIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
  ]
  return icons[index] ?? icons[0]
}

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

function HeroSection() {
  return (
    <section className="relative pt-20 pb-0 sm:pt-24 lg:pt-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-4xl lg:text-5xl">
            We build complex so you can have simple.
          </h1>
          <p className="mt-4 text-base text-[var(--color-gd-muted)] sm:text-lg max-w-xl mx-auto">
            Serious expertise and craft in every project. Fast delivery, low maintenance. We're on your side.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-[var(--color-gd-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-gd-bg)] transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Start a project
            </Link>
            <a
              href="#work"
              className="inline-flex rounded-full border border-[var(--color-gd-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-gd-text)] transition-colors hover:border-[var(--color-gd-muted)] hover:bg-[var(--color-gd-bg-elevated)] hover:scale-[1.02]"
            >
              See our work
            </a>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 lg:mt-8 w-full">
        <div
          className="mx-auto"
          style={{
            width: '100%',
            maxWidth: '1600px',
            maskImage: `
              linear-gradient(to bottom, black 0%, black 45%, transparent 95%),
              linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 10%, black 100%)
            `.trim(),
            WebkitMaskImage: `
              linear-gradient(to bottom, black 0%, black 45%, transparent 95%),
              linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 10%, black 100%)
            `.trim(),
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in' as any,
          }}
        >
          <img
            src="/hero-offworld.png"
            alt="Offworld Depot asset library"
            className="block w-full h-auto"
            loading="eager"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* Approach teaser */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px sm:grid-cols-3 rounded-2xl border border-[var(--color-gd-border)] overflow-hidden">
            {VALUE_PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="h-full bg-[var(--color-gd-bg-elevated)] p-6 sm:p-8">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-gd-accent)]/15 text-[var(--color-gd-accent)]">
                    <PillarIcon index={i} />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[var(--color-gd-text)]">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="mt-6 text-center">
              <Link
                to="/approach"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gd-muted)] hover:text-[var(--color-gd-accent)] transition-colors"
              >
                Learn more about how we work
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case studies - large showcase */}
      <section id="work" className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              Selected work
            </h2>
            <p className="mt-2 text-sm text-[var(--color-gd-muted)] max-w-lg">
              Marketplaces, platforms, and sites that own their data and run themselves.
            </p>
          </AnimatedSection>
          <div className="mt-10 space-y-8">
            {CASE_STUDIES.map((study, i) => (
              <AnimatedSection key={study.slug} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link
                  to={`/work/${study.slug}`}
                  className="group block rounded-2xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--color-gd-muted)]/60 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className="relative aspect-[2/1] sm:aspect-[5/2] overflow-hidden bg-black/50">
                    <img
                      src={study.image}
                      alt={study.site}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gd-bg-elevated)] via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 py-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--color-gd-text)] group-hover:text-[var(--color-gd-accent)] transition-colors truncate">
                          {study.site}
                        </h3>
                        <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider text-[var(--color-gd-accent)] shrink-0">
                          {study.tagline}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-gd-muted)] line-clamp-1">
                        {study.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gd-muted)] group-hover:text-[var(--color-gd-accent)] transition-colors shrink-0">
                      View project
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              Ready to make the complex simple?
            </h2>
            <p className="mt-3 text-sm text-[var(--color-gd-muted)]">
              Tell us about your project and we'll put together a free mockup.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-[var(--color-gd-text)] px-7 py-3 text-sm font-medium text-[var(--color-gd-bg)] transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Get a free mockup
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-gd-border)] bg-[var(--color-gd-bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 text-[var(--color-gd-text)]">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-contain brightness-0 invert" />
            <span className="text-lg font-semibold">Graphic Define</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isHash = link.href.startsWith('/#')
              if (isHash && isHome) {
                return (
                  <a
                    key={link.href}
                    href={link.href.replace('/', '')}
                    className="text-sm text-[var(--color-gd-muted)] transition-colors hover:text-[var(--color-gd-text)]"
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-[var(--color-gd-muted)] transition-colors hover:text-[var(--color-gd-text)]"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <Link
            to="/contact"
            className="hidden rounded-full bg-[var(--color-gd-text)] px-4 py-2 text-sm font-medium text-[var(--color-gd-bg)] transition-opacity hover:opacity-90 md:inline-block"
          >
            Get in touch
          </Link>
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2 text-[var(--color-gd-text)]"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-5 bg-current transition-transform ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-[var(--color-gd-border)] px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[var(--color-gd-text)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="border-t border-[var(--color-gd-border)] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div className="shrink-0">
              <Link to="/" className="flex items-center gap-2 text-[var(--color-gd-text)]">
                <img src="/logo.png" alt="" className="h-7 w-7 rounded-md object-contain brightness-0 invert" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-gd-text)] mb-3">Work</h4>
                <ul className="space-y-2">
                  {CASE_STUDIES.map((study) => (
                    <li key={study.slug}>
                      <Link
                        to={`/work/${study.slug}`}
                        className="text-xs text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors"
                      >
                        {study.site}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-gd-text)] mb-3">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/approach" className="text-xs text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors">
                      Approach
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-xs text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-gd-text)] mb-3">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:riley@graphicdefine.com" className="text-xs text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors">
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-[var(--color-gd-border)] pt-6">
            <span className="text-xs text-[var(--color-gd-muted)]">&copy; Graphic Define</span>
          </div>
        </div>
      </footer>

      <Chatbot />
    </>
  )
}

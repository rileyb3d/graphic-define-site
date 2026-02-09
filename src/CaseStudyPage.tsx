import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CASE_STUDIES } from './data'
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

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = CASE_STUDIES.find((s) => s.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!study) return <Navigate to="/" replace />

  const otherStudies = CASE_STUDIES.filter((s) => s.slug !== slug)

  return (
    <main className="pt-14">
      {/* Back link */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gd-muted)] hover:text-[var(--color-gd-text)] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All work
        </Link>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <AnimatedSection>
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-gd-accent)]">
            {study.tagline}
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-4xl lg:text-5xl">
            {study.site}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-gd-muted)] max-w-2xl">
            {study.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-gd-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-gd-bg)] transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Visit live site
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Hero screenshot */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="rounded-2xl border border-[var(--color-gd-border)] overflow-hidden">
            <img
              src={study.image}
              alt={`${study.site} screenshot`}
              className="block w-full h-auto"
              loading="eager"
              draggable={false}
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Results strip */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {study.results.map((result) => (
              <div key={result.label} className="text-center sm:text-left">
                <p className="text-xl font-semibold text-[var(--color-gd-text)] sm:text-2xl">
                  {result.value}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gd-muted)] sm:text-sm">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Overview + Features */}
      <section className="border-t border-[var(--color-gd-border)]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Overview */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="text-lg font-semibold text-[var(--color-gd-text)]">Overview</h2>
                <p className="mt-4 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                  {study.overview}
                </p>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection style={{ transitionDelay: '80ms' }}>
                <h3 className="text-sm font-semibold text-[var(--color-gd-text)]">What we built</h3>
                <ul className="mt-3 space-y-2">
                  {study.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-gd-muted)]">
                      <svg className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-gd-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection style={{ transitionDelay: '160ms' }}>
                <h3 className="text-sm font-semibold text-[var(--color-gd-text)]">Tech stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] px-3 py-1 text-xs text-[var(--color-gd-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="border-t border-[var(--color-gd-border)]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg font-semibold text-[var(--color-gd-text)]">More work</h2>
          </AnimatedSection>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {otherStudies.map((other, i) => (
              <AnimatedSection key={other.slug} style={{ transitionDelay: `${i * 80}ms` }}>
                <Link
                  to={`/work/${other.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--color-gd-muted)]/60 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                    <img
                      src={other.image}
                      alt={other.site}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-gd-accent)]">
                      {other.tagline}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-[var(--color-gd-text)] group-hover:text-[var(--color-gd-accent)] transition-colors">
                      {other.site}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-gd-muted)]">
                      {other.highlight}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-gd-border)] py-12 sm:py-16">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              Want something like this?
            </h2>
            <p className="mt-3 text-sm text-[var(--color-gd-muted)]">
              Tell us about your project and we'll build you a free mockup.
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

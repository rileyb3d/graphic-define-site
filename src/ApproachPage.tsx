import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business inside out. What are your goals? What systems do you already have? Where are the bottlenecks? We map the complexity before we touch any code.',
    details: [
      'Business model and revenue analysis',
      'Current systems and pain point audit',
      'User journey mapping',
      'Technical feasibility assessment',
    ],
  },
  {
    number: '02',
    title: 'Architecture',
    description: 'We design the system before we build it. Data flows, automation logic, integrations, user experience. This is where we make the hard decisions that keep things simple later.',
    details: [
      'System architecture and data modeling',
      'Automation workflow design',
      'Integration planning (payments, email, analytics)',
      'UI/UX wireframes and prototyping',
    ],
  },
  {
    number: '03',
    title: 'Build',
    description: 'We build with real expertise, not templates. Custom code, thoughtful engineering, and constant testing. Every decision optimizes for your long-term simplicity.',
    details: [
      'Custom frontend and backend development',
      'Automation implementation and testing',
      'Payment and third-party integrations',
      'Performance optimization',
    ],
  },
  {
    number: '04',
    title: 'Launch & evolve',
    description: 'We ship on time and stay involved. After launch, we monitor, refine, and make sure everything runs smooth. Your site gets better over time, not worse.',
    details: [
      'Staged rollout and QA',
      'Analytics setup and monitoring',
      'Post-launch iteration based on real data',
      'Ongoing support and optimization',
    ],
  },
]

const PRINCIPLES = [
  {
    title: 'Complexity is our job, simplicity is your experience',
    description: 'Behind every simple interface is a complex system that took real thought to design. We absorb the complexity so you never have to think about it. The harder we work on the backend, the easier your day-to-day becomes.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Automation with intention',
    description: 'We don\'t automate for the sake of it. Every automated workflow we build solves a real problem: eliminating manual data entry, triggering the right follow-up at the right time, calculating payouts without human error. The automation serves the business, not the other way around.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Own everything',
    description: 'Your site, your data, your analytics, your customers. We build on platforms and infrastructure that you control. No vendor lock-in, no surprise fees, no third party standing between you and your users.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: 'Ship fast, build to last',
    description: 'Speed doesn\'t mean cutting corners. We scope tightly, make decisions early, and build right the first time. You get a site that launches on schedule and doesn\'t fall apart six months later.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Real expertise, not templates',
    description: 'Every project is custom-built by people who understand both the code and the business problem. We don\'t reskin themes or drag and drop. We write the systems that make your specific business run better.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Low maintenance by design',
    description: 'We architect for independence. Clean code, solid infrastructure, automated processes. You shouldn\'t need us on speed dial after launch. The system should just work.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

export default function ApproachPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-14">
      {/* Hero */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-gd-accent)]">
              Our approach
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-4xl lg:text-5xl max-w-3xl">
              We do the hard work so your business runs on autopilot.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-gd-muted)] max-w-2xl leading-relaxed">
              Every project starts with a problem that looks impossible to simplify. Our job is to understand the complexity, design the right system, and build it so well that you forget it's there. That takes real expertise, not shortcuts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              What we believe
            </h2>
            <p className="mt-3 text-sm text-[var(--color-gd-muted)] max-w-lg">
              The principles behind every system we build.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((principle, i) => (
              <AnimatedSection key={principle.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="h-full rounded-2xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] p-6 sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-gd-accent)]/10 text-[var(--color-gd-accent)]">
                    {principle.icon}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[var(--color-gd-text)] leading-snug">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              How we work
            </h2>
            <p className="mt-3 text-sm text-[var(--color-gd-muted)] max-w-lg">
              A clear process that keeps you in the loop without dragging you into the weeds.
            </p>
          </AnimatedSection>

          <div className="mt-12 space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.number} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative grid gap-6 lg:grid-cols-12 py-10 border-t border-[var(--color-gd-border)] first:border-t-0">
                  {/* Step number */}
                  <div className="lg:col-span-1">
                    <span className="text-2xl font-semibold text-[var(--color-gd-accent)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Title and description */}
                  <div className="lg:col-span-5">
                    <h3 className="text-xl font-semibold text-[var(--color-gd-text)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-6">
                    <ul className="space-y-2.5">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-[var(--color-gd-muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-gd-accent)] shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech philosophy */}
      <section className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
                The tech behind simple
              </h2>
              <p className="mt-4 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                We pick technology based on what solves your problem best, not what's trendy. That said, we work with modern, battle-tested tools that scale with your business and don't create technical debt.
              </p>
              <p className="mt-4 text-sm text-[var(--color-gd-muted)] leading-relaxed">
                Every stack we choose is optimized for performance, maintainability, and your team's ability to understand what's happening without needing a PhD in computer science.
              </p>
            </AnimatedSection>

            <AnimatedSection style={{ transitionDelay: '80ms' }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
                  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST / GraphQL', 'Serverless'] },
                  { category: 'Automation', items: ['Custom workflows', 'Email sequences', 'Payment pipelines', 'Data sync'] },
                  { category: 'Infrastructure', items: ['Vercel', 'AWS', 'Stripe', 'Analytics'] },
                ].map((group) => (
                  <div key={group.category} className="rounded-xl border border-[var(--color-gd-border)] bg-[var(--color-gd-bg-elevated)] p-5">
                    <h4 className="text-xs font-semibold text-[var(--color-gd-accent)] uppercase tracking-wider">
                      {group.category}
                    </h4>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-xs text-[var(--color-gd-muted)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-gd-border)] py-16 sm:py-24">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-gd-text)] sm:text-3xl">
              Ready to see what we can build for you?
            </h2>
            <p className="mt-3 text-sm text-[var(--color-gd-muted)]">
              Tell us about your project and we'll put together a free mockup.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-[var(--color-gd-text)] px-7 py-3 text-sm font-medium text-[var(--color-gd-bg)] transition-all hover:opacity-90 hover:scale-[1.02]"
              >
                Get a free mockup
              </Link>
              <Link
                to="/#work"
                className="inline-flex rounded-full border border-[var(--color-gd-border)] px-7 py-3 text-sm font-medium text-[var(--color-gd-text)] transition-colors hover:border-[var(--color-gd-muted)] hover:bg-[var(--color-gd-bg-elevated)]"
              >
                See our work
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}

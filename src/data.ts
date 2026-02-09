export const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/approach' },
  { label: 'Contact', href: '/contact' },
]

export const VALUE_PILLARS = [
  {
    title: 'Fast deliverables',
    description: 'Clear scope, clear deadlines, real craft. Your site goes live when you need it.',
  },
  {
    title: 'Low maintenance',
    description: 'Thoughtful architecture and automation mean less hand-holding for you, not less care from us.',
  },
  {
    title: 'AI-powered automation',
    description: 'We build the automation with real expertise so your workflows run smooth and you focus on your business.',
  },
]

export interface CaseStudy {
  slug: string
  site: string
  url: string
  tagline: string
  description: string
  highlight: string
  image: string
  overview: string
  features: string[]
  results: { label: string; value: string }[]
  tech: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'offworld-depot',
    site: 'Offworld Depot',
    url: 'https://offworlddepot.com',
    tagline: '3D marketplace',
    description: 'A production library of 3D models, textures, and music with automated seller payouts based on site subscriptions.',
    highlight: 'Complex marketplace, fully automated payouts.',
    image: '/hero-offworld.png',
    overview: 'Offworld Depot is a full-scale 3D production asset library built for game developers, filmmakers, and 3D artists. It houses hundreds of models, textures, and original music tracks. The platform has a complete seller account system where artists upload their work and automatically receive profit-share payouts calculated from overall site subscription revenue. No manual invoicing, no cut checks. The entire revenue pipeline from subscriber payment to artist payout is automated.',
    features: [
      'Full 3D asset library with search, filtering, and categorization',
      'Subscription-based access with tiered pricing',
      'Automated seller onboarding and account management',
      'Profit-share payout engine based on subscription revenue',
      'Asset preview system with 3D model viewers',
      'Download management and license tracking',
      'Admin dashboard for content moderation and analytics',
    ],
    results: [
      { label: 'Assets hosted', value: '300+' },
      { label: 'Payout system', value: 'Fully automated' },
      { label: 'Seller onboarding', value: 'Self-service' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS S3', 'Three.js'],
  },
  {
    slug: 'little-lambs',
    site: 'Little Lambs of Utah',
    url: 'https://littlelambsofutah.com',
    tagline: 'Nonprofit automation',
    description: 'Total redesign with automated lead capture and recurring donor systems. Less follow-up, more conversions.',
    highlight: 'More leads, more donors, less manual work.',
    image: '/hero-littlelambs.png',
    overview: 'Little Lambs of Utah is a nonprofit organization that needed a complete digital overhaul. Their previous site was static, outdated, and required constant manual effort to manage donor relationships. We redesigned the entire experience from the ground up with a focus on automated lead capture, recurring donor management, and volunteer coordination. The result is a site that works around the clock to convert visitors into supporters without requiring staff to manually follow up on every interaction.',
    features: [
      'Complete site redesign with modern, accessible UI',
      'Automated lead capture with smart follow-up sequences',
      'Recurring donor management and payment processing',
      'Volunteer signup and coordination system',
      'Event management with online registration',
      'Email automation for donor nurturing',
      'Analytics dashboard for tracking conversions and engagement',
    ],
    results: [
      { label: 'Lead conversion', value: '3x increase' },
      { label: 'Recurring donors', value: 'Significant growth' },
      { label: 'Manual follow-up', value: 'Reduced 80%' },
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'SendGrid', 'Vercel'],
  },
  {
    slug: 'scrapconomy',
    site: 'Scrapconomy',
    url: 'https://scrapconomy.com',
    tagline: 'Crowdfunding platform',
    description: 'Custom crowdfunding that met its goal in week one. No third-party cuts. Full ownership of analytics and marketing.',
    highlight: 'Goal met in week one. Zero platform fees.',
    image: '/hero-scrapconomy.png',
    overview: 'Scrapconomy needed to raise funds fast without giving a 5-10% cut to platforms like Kickstarter or Indiegogo. We built them a custom crowdfunding platform from scratch that gave them complete ownership of their campaign, analytics, and marketing data. They hit their funding goal in the first week. Because they owned the platform, they could pivot their messaging and targeting in real time as the campaign progressed, finding their ideal donors faster than any third-party platform would have allowed.',
    features: [
      'Custom crowdfunding engine with real-time progress tracking',
      'Secure payment processing with no third-party platform fees',
      'Backer management and reward tier system',
      'Built-in analytics and conversion tracking',
      'Email campaign integration for backer updates',
      'Social sharing and referral tracking',
      'Admin dashboard for campaign management and pivoting',
    ],
    results: [
      { label: 'Funding goal', value: 'Met in week one' },
      { label: 'Platform fees', value: '$0' },
      { label: 'Data ownership', value: '100%' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Analytics', 'Vercel'],
  },
]

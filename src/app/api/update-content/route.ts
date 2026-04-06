import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-update-secret')
  if (!secret || secret !== process.env.UPDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const results: string[] = []

  // 1. Update hero section
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      slides: [
        {
          title: 'Your Competitors Are Already Using AI. Are You?',
          subtitle:
            'We help businesses get 30-80% more leads with AI chatbots, automation, and smart websites — in weeks, not months',
          description: null,
          ctaText: 'Get Your Free AI Audit',
          ctaLink: '#analyzer',
        },
      ],
    },
  })
  results.push('hero-section updated')

  // 2. Replace all services
  const existingServices = await payload.find({ collection: 'services', limit: 100 })
  for (const s of existingServices.docs) {
    await payload.delete({ collection: 'services', id: s.id })
  }

  const servicesData = [
    {
      title: 'AI Chatbots & Automation',
      slug: 'ai-chatbots',
      subtitle: 'Your 24/7 AI Employee',
      description:
        'Your AI assistant handles 80% of customer inquiries 24/7. No breaks, no sick days, any language.',
      icon: 'brain' as const,
      features: [
        { feature: 'Handles 80% of support tickets automatically' },
        { feature: 'Speaks every language your customers do' },
        { feature: 'Pays for itself within the first month' },
      ],
      order: 1,
    },
    {
      title: 'Website Development',
      slug: 'websites',
      subtitle: 'Websites That Sell',
      description:
        'A website that actually converts visitors into paying customers. Fast, SEO-optimized, built to sell.',
      icon: 'globe' as const,
      features: [
        { feature: 'Converts 2-3x more visitors into leads' },
        { feature: 'Loads in under 2 seconds on any device' },
        { feature: 'Ranks on Google from day one' },
      ],
      order: 2,
    },
    {
      title: 'Marketing & Lead Generation',
      slug: 'marketing',
      subtitle: 'Leads on Autopilot',
      description:
        'A steady stream of qualified leads every month. AI-powered targeting that finds the right people.',
      icon: 'megaphone' as const,
      features: [
        { feature: 'Generates 30-80% more qualified leads' },
        { feature: 'Reduces cost per lead by up to 50%' },
        { feature: 'Targets the right audience automatically' },
      ],
      order: 3,
    },
    {
      title: 'Business Process Automation',
      slug: 'automation',
      subtitle: 'Work Smarter, Not Harder',
      description:
        'Save 20+ hours every week. Connect your tools, eliminate manual work, scale without hiring.',
      icon: 'zap' as const,
      features: [
        { feature: 'Saves 20+ hours of manual work per week' },
        { feature: 'Eliminates 95% of data entry errors' },
        { feature: 'Scales your operations without new hires' },
      ],
      order: 4,
    },
  ]

  const createdServices: Record<string, number> = {}
  for (const s of servicesData) {
    const created = await payload.create({ collection: 'services', data: s })
    createdServices[s.slug] = created.id as number
  }
  results.push(`${servicesData.length} services created`)

  // 3. Replace all portfolio items
  const existingPortfolio = await payload.find({ collection: 'portfolio', limit: 100 })
  for (const p of existingPortfolio.docs) {
    await payload.delete({ collection: 'portfolio', id: p.id })
  }

  const portfolioData = [
    {
      title: 'AI Customer Support for E-commerce',
      slug: 'ai-support-ecommerce',
      category: createdServices['ai-chatbots'],
      description:
        '80% of customer inquiries handled automatically, 60% reduction in support costs, ROI visible in first month. Multi-language AI chatbot deployed for a Nordic e-commerce brand.',
      technologies: [{ tech: 'GPT-4' }, { tech: 'Python' }, { tech: 'Next.js' }],
      clientName: 'Nordic Retail Group',
      featured: true,
      order: 1,
    },
    {
      title: 'SaaS Platform for HR Management',
      slug: 'hr-saas-platform',
      category: createdServices['websites'],
      description:
        'Full HR management platform launched in 8 weeks. 3x faster employee onboarding, 50% less admin time. Built on Next.js and Payload CMS with AI-powered analytics.',
      technologies: [{ tech: 'Next.js' }, { tech: 'Payload CMS' }, { tech: 'PostgreSQL' }],
      clientName: 'TalentFlow Inc.',
      featured: true,
      order: 2,
    },
    {
      title: 'Logistics Automation System',
      slug: 'logistics-automation',
      category: createdServices['automation'],
      description:
        '95% reduction in manual data entry, 70% faster order processing, saving 200+ hours per month. End-to-end logistics automation connecting warehouse, shipping, and CRM systems.',
      technologies: [{ tech: 'n8n' }, { tech: 'Node.js' }, { tech: 'REST APIs' }],
      clientName: 'FastShip Logistics',
      featured: true,
      order: 3,
    },
    {
      title: 'Real Estate Marketing Campaign',
      slug: 'real-estate-marketing',
      category: createdServices['marketing'],
      description:
        '340% ROI from digital campaign, 5x increase in qualified leads, #1 Google ranking for target keywords. Comprehensive strategy combining SEO, paid ads, and 3D virtual tours.',
      technologies: [{ tech: 'Google Ads' }, { tech: 'SEO' }, { tech: '3D Tours' }],
      clientName: 'Prestige Properties',
      featured: true,
      order: 4,
    },
  ]

  for (const p of portfolioData) {
    await payload.create({ collection: 'portfolio', data: p as any })
  }
  results.push(`${portfolioData.length} portfolio items created`)

  // 4. Replace all pricing plans
  const existingPlans = await payload.find({ collection: 'pricing-plans', limit: 100 })
  for (const p of existingPlans.docs) {
    await payload.delete({ collection: 'pricing-plans', id: p.id })
  }

  const plansData = [
    {
      name: 'Launch',
      price: '$2,999',
      period: ' one-time',
      description: 'Get online and start converting',
      features: [
        { feature: 'Conversion-optimized website', included: true },
        { feature: 'Mobile-first responsive design', included: true },
        { feature: 'SEO setup so Google finds you', included: true },
        { feature: 'Lead capture forms that convert', included: true },
        { feature: 'AI chatbot integration', included: false },
        { feature: 'Business process automation', included: false },
        { feature: 'Ongoing optimization', included: false },
      ],
      highlighted: false,
      ctaText: 'Get Started',
      order: 1,
    },
    {
      name: 'Grow',
      price: '$7,999',
      period: ' one-time',
      description: 'AI chatbot + automation included',
      features: [
        { feature: 'Everything in Launch', included: true },
        { feature: 'AI handles 80% of inquiries', included: true },
        { feature: 'Automated lead qualification', included: true },
        { feature: 'CRM and tools connected', included: true },
        { feature: 'Multi-language AI support', included: true },
        { feature: '20+ hours saved per week', included: true },
        { feature: '3 months of support included', included: true },
      ],
      highlighted: true,
      ctaText: 'Most Popular',
      order: 2,
    },
    {
      name: 'Scale',
      price: 'Custom',
      period: '',
      description: 'Full AI transformation for your business',
      features: [
        { feature: 'Everything in Grow', included: true },
        { feature: 'Custom AI agents for your workflows', included: true },
        { feature: 'Full business process automation', included: true },
        { feature: 'Advanced analytics dashboard', included: true },
        { feature: 'Multi-platform integration', included: true },
        { feature: 'Dedicated team and priority support', included: true },
        { feature: 'Ongoing optimization and scaling', included: true },
      ],
      highlighted: false,
      ctaText: 'Contact Us',
      order: 3,
    },
  ]

  for (const p of plansData) {
    await payload.create({ collection: 'pricing-plans', data: p })
  }
  results.push(`${plansData.length} pricing plans created`)

  // 5. Replace all testimonials
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 100 })
  for (const t of existingTestimonials.docs) {
    await payload.delete({ collection: 'testimonials', id: t.id })
  }

  const testimonialsData = [
    {
      clientName: 'Erik Lindstrom',
      clientRole: 'CEO',
      company: 'Nordic Retail Group',
      quote:
        'The AI chatbot handles 80% of our 2,000+ monthly inquiries now. Our support costs dropped 60% in the first month, and customer satisfaction actually went up by 15 points. Best investment we made this year.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Sarah Chen',
      clientRole: 'CTO',
      company: 'TalentFlow Inc.',
      quote:
        'They delivered our HR platform in 8 weeks instead of the 16 we expected. Employee onboarding went from 5 days to under 2, and our HR team saves 20 hours per week on admin tasks. The code quality is exceptional.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Marco Rossi',
      clientRole: 'Founder',
      company: 'Prestige Properties',
      quote:
        'Our digital campaign delivered 340% ROI in 3 months. We went from 12 leads per month to over 60 qualified ones, and we hit #1 on Google for our target keywords. The results speak for themselves.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Anna Kowalska',
      clientRole: 'Operations Director',
      company: 'FastShip Logistics',
      quote:
        'The automation workflows save us 200+ hours every month. Order processing is 70% faster, data entry errors dropped to near zero, and we did it all without hiring a single new person.',
      rating: 5,
      featured: true,
    },
  ]

  for (const t of testimonialsData) {
    await payload.create({ collection: 'testimonials', data: t })
  }
  results.push(`${testimonialsData.length} testimonials created`)

  // 6. Update about page
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      headline: 'We Help Businesses Grow with AI',
      story:
        'We started this agency with a simple belief: AI should work for every business, not just tech giants. Our team combines deep expertise in artificial intelligence, web development, and business strategy to deliver solutions that actually move the needle. We have helped 50+ companies automate their operations, generate more leads, and scale without hiring armies of people. Every project starts with understanding your business — not selling you technology.',
      mission:
        'To make AI accessible and profitable for every business, regardless of size or industry.',
      team: [
        {
          name: 'Anton',
          role: 'Co-Founder & AI Architect',
          bio: 'Full-stack developer and AI specialist with a passion for building systems that automate business growth. Expert in n8n workflows, chatbot development, and web applications.',
          linkedin: 'https://linkedin.com',
        },
        {
          name: 'Partner',
          role: 'Co-Founder & Business Strategist',
          bio: 'Business development expert who bridges the gap between technology and business results. Focused on ensuring every AI implementation delivers measurable ROI.',
          linkedin: 'https://linkedin.com',
        },
      ],
      values: [
        {
          title: 'Results Over Technology',
          description:
            "We don't sell AI for the sake of AI. Every recommendation is backed by projected ROI and clear business impact.",
          icon: 'target',
        },
        {
          title: 'Speed of Delivery',
          description:
            "First results in 2 weeks, not 6 months. We move fast because your business can't wait.",
          icon: 'zap',
        },
        {
          title: 'Transparency',
          description:
            'Clear pricing, honest timelines, regular updates. You always know exactly where your project stands.',
          icon: 'shield-check',
        },
        {
          title: 'Long-Term Partnership',
          description:
            "We don't disappear after launch. Ongoing support, optimization, and scaling as your business grows.",
          icon: 'handshake',
        },
      ],
    },
  })
  results.push('about-page updated')

  // 7. Update site settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'AI Agency',
      tagline: 'AI Solutions That Grow Your Business',
      contactEmail: 'hello@aiadvisors.pl',
      contactPhone: '+47 XXX XX XXX',
      address: 'Oslo, Norway — Working Worldwide',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
      footer: {
        copyrightText: '© 2026 AI Agency. All rights reserved.',
        showSocialLinks: true,
      },
    },
  })
  results.push('site-settings updated')

  return NextResponse.json({ success: true, updated: results })
}

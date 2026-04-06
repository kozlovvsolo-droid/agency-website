import type { Payload } from 'payload'

export async function seed(payload: Payload) {
  console.log('Seeding database...')

  // 1. Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@agency.com',
      password: process.env.ADMIN_PASSWORD || 'admin-' + Math.random().toString(36).slice(2) + '-' + Date.now(),
    },
  })
  console.log('Created admin user: admin@agency.com')

  // 2. Create services
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
  console.log(`Created ${servicesData.length} services`)

  // 3. Create portfolio items
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
  console.log(`Created ${portfolioData.length} portfolio items`)

  // 4. Create testimonials
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
  console.log(`Created ${testimonialsData.length} testimonials`)

  // 5. Create pricing plans
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
  console.log(`Created ${plansData.length} pricing plans`)

  // 6. Seed Hero Section global
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      slides: [
        {
          title: 'Your Competitors Are Already Using AI. Are You?',
          subtitle:
            'We help businesses get 30-80% more leads with AI chatbots, automation, and smart websites \u2014 in weeks, not months',
          description: null,
          ctaText: 'Get Your Free AI Audit',
          ctaLink: '#analyzer',
        },
      ],
    },
  })
  console.log('Seeded Hero Section')

  // 7. Seed How It Works global
  await payload.updateGlobal({
    slug: 'how-it-works',
    data: {
      title: 'How It Works',
      subtitle:
        'Our proven process ensures your project is delivered on time, on budget, and beyond expectations.',
      steps: [
        {
          stepNumber: 1,
          title: 'Consultation',
          description:
            'We start with a deep dive into your business goals, challenges, and vision. Understanding your needs is the foundation of every successful project.',
          icon: 'message-circle',
        },
        {
          stepNumber: 2,
          title: 'Strategy & Planning',
          description:
            'Our team creates a detailed roadmap with clear milestones, technology recommendations, and a realistic timeline for your project.',
          icon: 'clipboard',
        },
        {
          stepNumber: 3,
          title: 'Development',
          description:
            'We build your solution iteratively with regular demos and feedback cycles. You see real progress every week, not just at the end.',
          icon: 'code',
        },
        {
          stepNumber: 4,
          title: 'Launch & Support',
          description:
            'After thorough testing and your approval, we launch your project and provide ongoing support to ensure long-term success.',
          icon: 'rocket',
        },
      ],
    },
  })
  console.log('Seeded How It Works')

  // 8. Seed Site Settings global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'AI Agency',
      tagline: 'AI Solutions That Grow Your Business',
      contactEmail: 'hello@aiadvisors.pl',
      contactPhone: '+47 400 00 000',
      address: 'Oslo, Norway \u2014 Working Worldwide',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
      footer: {
        copyrightText: '\u00a9 2026 AI Agency. All rights reserved.',
        showSocialLinks: true,
      },
    },
  })
  console.log('Seeded Site Settings')

  // 9. Seed blog posts
  const blogPostsData = [
    {
      title: 'How an AI Chatbot Can Replace Your Support Team',
      slug: 'ai-chatbot-replace-support-team',
      excerpt:
        'One of our clients cut support costs by 60% in 30 days. Here is exactly how an AI chatbot handles 80% of customer inquiries \u2014 and what it means for your bottom line.',
      author: 'Agency Team',
      category: 'ai' as const,
      publishedAt: '2026-03-25T10:00:00.000Z',
      featured: true,
      order: 1,
    },
    {
      title: '5 Business Processes You Should Automate Today',
      slug: '5-business-processes-automate-today',
      excerpt:
        'These five manual workflows are costing you 20+ hours every week. See how businesses are saving 200+ hours per month with automation \u2014 and how you can start this week.',
      author: 'Agency Team',
      category: 'ai' as const,
      publishedAt: '2026-03-18T10:00:00.000Z',
      featured: true,
      order: 2,
    },
    {
      title: 'The Real Cost of Web Development in 2026',
      slug: 'real-cost-web-development-2026',
      excerpt:
        'Agency quotes range from $2K to $200K for the same project. We break down the true cost of ownership across agencies, freelancers, and DIY \u2014 so you know exactly what you are paying for.',
      author: 'Agency Team',
      category: 'web' as const,
      publishedAt: '2026-03-10T10:00:00.000Z',
      featured: true,
      order: 3,
    },
  ]

  for (const post of blogPostsData) {
    await payload.create({ collection: 'blog-posts', data: post })
  }
  console.log(`Created ${blogPostsData.length} blog posts`)

  // 10. Seed About Page
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      headline: 'We Help Businesses Grow with AI',
      story: 'We started this agency with a simple belief: AI should work for every business, not just tech giants. Our team combines deep expertise in artificial intelligence, web development, and business strategy to deliver solutions that actually move the needle. We have helped 50+ companies automate their operations, generate more leads, and scale without hiring armies of people. Every project starts with understanding your business — not selling you technology.',
      mission: 'To make AI accessible and profitable for every business, regardless of size or industry.',
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
        { title: 'Results Over Technology', description: 'We don\'t sell AI for the sake of AI. Every recommendation is backed by projected ROI and clear business impact.', icon: 'target' },
        { title: 'Speed of Delivery', description: 'First results in 2 weeks, not 6 months. We move fast because your business can\'t wait.', icon: 'zap' },
        { title: 'Transparency', description: 'Clear pricing, honest timelines, regular updates. You always know exactly where your project stands.', icon: 'shield-check' },
        { title: 'Long-Term Partnership', description: 'We don\'t disappear after launch. Ongoing support, optimization, and scaling as your business grows.', icon: 'handshake' },
      ],
    },
  })
  console.log('Seeded About Page')

  console.log('Seeding complete!')
}

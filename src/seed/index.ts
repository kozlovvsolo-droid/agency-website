import type { Payload } from 'payload'

export async function seed(payload: Payload) {
  console.log('Seeding database...')

  // 1. Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@agency.com',
      password: process.env.ADMIN_PASSWORD || 'change-me-immediately',
    },
  })
  console.log('Created admin user: admin@agency.com')

  // 2. Create services
  const servicesData = [
    {
      title: 'AI Assistants & Chatbots',
      slug: 'ai-assistants',
      subtitle: 'Intelligent Virtual Helpers',
      description: 'Custom AI-powered assistants and chatbots that understand your business context, handle customer inquiries, and automate repetitive tasks around the clock.',
      icon: 'brain' as const,
      features: [
        { feature: 'Custom GPT-powered chatbots' },
        { feature: 'Multi-language support' },
        { feature: '24/7 customer support automation' },
      ],
      order: 1,
    },
    {
      title: 'Mobile Applications',
      slug: 'mobile-apps',
      subtitle: 'iOS & Android',
      description: 'Native and cross-platform mobile applications with modern UI/UX, AI integration, and seamless backend connectivity for your business needs.',
      icon: 'smartphone' as const,
      features: [
        { feature: 'React Native / Flutter' },
        { feature: 'AI-enhanced features' },
        { feature: 'App Store optimization' },
      ],
      order: 2,
    },
    {
      title: 'Full-Stack Web Development',
      slug: 'web-development',
      subtitle: 'Modern Web Applications',
      description: 'High-performance web applications built with Next.js, React, and TypeScript. From landing pages to complex SaaS platforms with scalable architecture.',
      icon: 'globe' as const,
      features: [
        { feature: 'Next.js + React + TypeScript' },
        { feature: 'Headless CMS integration' },
        { feature: 'SEO & Core Web Vitals' },
      ],
      order: 3,
    },
    {
      title: 'WordPress & WooCommerce',
      slug: 'wordpress',
      subtitle: 'Content & E-commerce',
      description: 'Professional WordPress sites and WooCommerce stores with custom themes, plugins, and performance optimization for content-driven businesses.',
      icon: 'layout' as const,
      features: [
        { feature: 'Custom themes & plugins' },
        { feature: 'WooCommerce stores' },
        { feature: 'Migration & optimization' },
      ],
      order: 4,
    },
    {
      title: 'Business Automation',
      slug: 'automation',
      subtitle: 'Streamline Your Processes',
      description: 'End-to-end business process automation using n8n, Zapier, and custom workflows. Connect your tools, eliminate manual work, and scale operations.',
      icon: 'zap' as const,
      features: [
        { feature: 'n8n & Zapier workflows' },
        { feature: 'CRM & ERP integration' },
        { feature: 'Custom API development' },
      ],
      order: 5,
    },
    {
      title: '3D Configurators',
      slug: '3d-configurators',
      subtitle: 'Interactive Product Visualization',
      description: 'AI-driven 3D product configurators that let customers visualize and customize products in real-time, increasing engagement and reducing returns.',
      icon: 'box' as const,
      features: [
        { feature: 'Real-time 3D rendering' },
        { feature: 'AI-powered recommendations' },
        { feature: 'E-commerce integration' },
      ],
      order: 6,
    },
    {
      title: '3D Design & Visualization',
      slug: '3d-design',
      subtitle: 'Stunning Visual Content',
      description: 'Professional 3D modeling, rendering, and animation for product visualization, architectural projects, and marketing materials that captivate audiences.',
      icon: 'palette' as const,
      features: [
        { feature: 'Product visualization' },
        { feature: 'Architectural rendering' },
        { feature: 'Animation & motion' },
      ],
      order: 7,
    },
    {
      title: 'Digital Marketing & SEO',
      slug: 'digital-marketing',
      subtitle: 'Growth & Visibility',
      description: 'Data-driven digital marketing strategies including SEO, content marketing, social media, and paid advertising to grow your online presence and revenue.',
      icon: 'megaphone' as const,
      features: [
        { feature: 'SEO & content strategy' },
        { feature: 'Social media management' },
        { feature: 'PPC & analytics' },
      ],
      order: 8,
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
      category: createdServices['ai-assistants'],
      description: 'Built a multi-language AI chatbot handling 80% of customer inquiries for a Nordic e-commerce brand, reducing support costs by 60%.',
      technologies: [{ tech: 'GPT-4' }, { tech: 'Python' }, { tech: 'Next.js' }],
      clientName: 'Nordic Retail Group',
      featured: true,
      order: 1,
    },
    {
      title: 'SaaS Platform for HR Management',
      slug: 'hr-saas-platform',
      category: createdServices['web-development'],
      description: 'Full-stack HR management platform with recruitment tracking, employee onboarding, and performance analytics built on Next.js and Payload CMS.',
      technologies: [{ tech: 'Next.js' }, { tech: 'Payload CMS' }, { tech: 'PostgreSQL' }],
      clientName: 'TalentFlow Inc.',
      featured: true,
      order: 2,
    },
    {
      title: 'Furniture 3D Configurator',
      slug: 'furniture-configurator',
      category: createdServices['3d-configurators'],
      description: 'Interactive 3D configurator allowing customers to customize furniture pieces in real-time, with AR preview capability and direct checkout integration.',
      technologies: [{ tech: 'Three.js' }, { tech: 'React' }, { tech: 'WebGL' }],
      clientName: 'ModernHome Design',
      featured: true,
      order: 3,
    },
    {
      title: 'Logistics Automation System',
      slug: 'logistics-automation',
      category: createdServices['automation'],
      description: 'End-to-end logistics automation connecting warehouse, shipping, and CRM systems. Reduced manual data entry by 95% and order processing time by 70%.',
      technologies: [{ tech: 'n8n' }, { tech: 'Node.js' }, { tech: 'REST APIs' }],
      clientName: 'FastShip Logistics',
      featured: true,
      order: 4,
    },
    {
      title: 'Restaurant Chain Mobile App',
      slug: 'restaurant-mobile-app',
      category: createdServices['mobile-apps'],
      description: 'Cross-platform mobile app for a restaurant chain featuring online ordering, loyalty program, table reservations, and AI-powered menu recommendations.',
      technologies: [{ tech: 'React Native' }, { tech: 'Firebase' }, { tech: 'Stripe' }],
      clientName: 'Urban Bites',
      featured: true,
      order: 5,
    },
    {
      title: 'Real Estate Marketing Campaign',
      slug: 'real-estate-marketing',
      category: createdServices['digital-marketing'],
      description: 'Comprehensive digital marketing campaign for luxury real estate, achieving 340% ROI through targeted SEO, social media, and 3D virtual tours.',
      technologies: [{ tech: 'Google Ads' }, { tech: 'SEO' }, { tech: '3D Tours' }],
      clientName: 'Prestige Properties',
      featured: true,
      order: 6,
    },
  ]

  for (const p of portfolioData) {
    await payload.create({ collection: 'portfolio', data: p as any })
  }
  console.log(`Created ${portfolioData.length} portfolio items`)

  // 4. Create testimonials
  const testimonialsData = [
    {
      clientName: 'Erik Lindström',
      clientRole: 'CEO',
      company: 'Nordic Retail Group',
      quote: 'The AI chatbot they built handles 80% of our customer inquiries now. Our support team can finally focus on complex issues instead of repetitive questions. The ROI was visible within the first month.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Sarah Chen',
      clientRole: 'CTO',
      company: 'TalentFlow Inc.',
      quote: 'They delivered our HR platform ahead of schedule and the code quality was exceptional. The Payload CMS integration makes it incredibly easy for our team to manage content without developer help.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Marco Rossi',
      clientRole: 'Founder',
      company: 'ModernHome Design',
      quote: 'The 3D configurator transformed our online sales. Customers spend 3x more time on our site and our return rate dropped by 40%. Best investment we\'ve made in years.',
      rating: 5,
      featured: true,
    },
    {
      clientName: 'Anna Kowalska',
      clientRole: 'Operations Director',
      company: 'FastShip Logistics',
      quote: 'The automation workflows they set up with n8n saved us hundreds of hours per month. What used to take a team of 5 people now runs completely on autopilot.',
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
      name: 'Starter',
      price: '$2,999',
      period: ' one-time',
      description: 'Perfect for small businesses getting started with digital presence',
      features: [
        { feature: 'Landing page or simple website', included: true },
        { feature: 'Mobile responsive design', included: true },
        { feature: 'Basic SEO setup', included: true },
        { feature: 'Contact form', included: true },
        { feature: 'CMS integration', included: false },
        { feature: 'Custom AI features', included: false },
        { feature: 'Ongoing support', included: false },
      ],
      highlighted: false,
      ctaText: 'Get Started',
      order: 1,
    },
    {
      name: 'Professional',
      price: '$9,999',
      period: ' one-time',
      description: 'Full-featured solution for growing businesses',
      features: [
        { feature: 'Multi-page website or web app', included: true },
        { feature: 'Mobile responsive design', included: true },
        { feature: 'Advanced SEO optimization', included: true },
        { feature: 'Payload CMS integration', included: true },
        { feature: 'AI chatbot integration', included: true },
        { feature: 'Business automation (n8n)', included: true },
        { feature: '3 months support included', included: true },
      ],
      highlighted: true,
      ctaText: 'Most Popular',
      order: 2,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large-scale projects',
      features: [
        { feature: 'Custom web application / SaaS', included: true },
        { feature: 'Mobile app (iOS + Android)', included: true },
        { feature: 'Full AI integration suite', included: true },
        { feature: 'Headless CMS + Commerce', included: true },
        { feature: 'Advanced automation workflows', included: true },
        { feature: '3D configurator / visualization', included: true },
        { feature: 'Dedicated team + ongoing support', included: true },
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
          title: 'Digital Experiences That Make Your Business Grow',
          subtitle: 'AI-Powered Solutions for the Modern Enterprise',
          description: 'We combine cutting-edge AI, modern web technologies, and automation to build digital products that drive real business results.',
          ctaText: 'Explore Our Services',
          ctaLink: '#services',
        },
        {
          title: 'From Idea to Launch — Full-Stack Development',
          subtitle: 'Next.js • React • TypeScript • Payload CMS',
          description: 'We build fast, scalable, and maintainable web applications using the most modern technology stack available today.',
          ctaText: 'See Our Work',
          ctaLink: '#portfolio',
        },
        {
          title: 'Automate Everything. Scale Without Limits.',
          subtitle: 'n8n Workflows • AI Agents • API Integration',
          description: 'Eliminate manual work, connect your tools, and let intelligent automation handle the rest. Save hundreds of hours every month.',
          ctaText: 'View Pricing',
          ctaLink: '#pricing',
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
      subtitle: 'Our proven process ensures your project is delivered on time, on budget, and beyond expectations.',
      steps: [
        {
          stepNumber: 1,
          title: 'Consultation',
          description: 'We start with a deep dive into your business goals, challenges, and vision. Understanding your needs is the foundation of every successful project.',
          icon: 'message-circle',
        },
        {
          stepNumber: 2,
          title: 'Strategy & Planning',
          description: 'Our team creates a detailed roadmap with clear milestones, technology recommendations, and a realistic timeline for your project.',
          icon: 'clipboard',
        },
        {
          stepNumber: 3,
          title: 'Development',
          description: 'We build your solution iteratively with regular demos and feedback cycles. You see real progress every week, not just at the end.',
          icon: 'code',
        },
        {
          stepNumber: 4,
          title: 'Launch & Support',
          description: 'After thorough testing and your approval, we launch your project and provide ongoing support to ensure long-term success.',
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
      siteName: 'Digital Agency',
      tagline: 'AI, Web Development & Automation',
      contactEmail: 'hello@agency.com',
      contactPhone: '+1 (555) 000-0000',
      address: 'Remote — Working Worldwide',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
      footer: {
        copyrightText: '© 2026 Digital Agency. All rights reserved.',
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
      excerpt: 'Modern AI chatbots can handle up to 80% of routine customer inquiries without human intervention. We break down the real-world results from deploying AI support across multiple industries and what it means for your bottom line.',
      author: 'Agency Team',
      category: 'ai' as const,
      publishedAt: '2026-03-25T10:00:00.000Z',
      featured: true,
      order: 1,
    },
    {
      title: '5 Business Processes You Should Automate Today',
      slug: '5-business-processes-automate-today',
      excerpt: 'From invoice processing to lead qualification, these five workflows are costing you hours every week. Learn how n8n and custom automation pipelines can eliminate manual work and reduce errors by over 90%.',
      author: 'Agency Team',
      category: 'ai' as const,
      publishedAt: '2026-03-18T10:00:00.000Z',
      featured: true,
      order: 2,
    },
    {
      title: 'The Real Cost of Web Development in 2026',
      slug: 'real-cost-web-development-2026',
      excerpt: 'Agency rates, freelancer quotes, and DIY builders all promise different things at wildly different price points. We compare the true cost of ownership across approaches so you can make an informed decision for your next project.',
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

  console.log('Seeding complete!')
}

import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  access: { read: () => true },
  fields: [
    { name: 'slides', type: 'array', minRows: 1, maxRows: 8, fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ctaText', type: 'text', defaultValue: 'Learn More' },
      { name: 'ctaLink', type: 'text', defaultValue: '#services' },
    ]},
  ],
}

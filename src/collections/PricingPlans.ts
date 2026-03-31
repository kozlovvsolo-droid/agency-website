import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'price', type: 'text', required: true },
    { name: 'period', type: 'text', defaultValue: '/month' },
    { name: 'description', type: 'textarea' },
    { name: 'features', type: 'array', fields: [
      { name: 'feature', type: 'text', required: true },
      { name: 'included', type: 'checkbox', defaultValue: true },
    ]},
    { name: 'highlighted', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'ctaText', type: 'text', defaultValue: 'Get Started' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}

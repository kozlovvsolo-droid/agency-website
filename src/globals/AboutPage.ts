import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: { read: () => true },
  fields: [
    { name: 'headline', type: 'text', defaultValue: 'We Help Businesses Grow with AI' },
    { name: 'story', type: 'textarea' },
    { name: 'mission', type: 'textarea' },
    {
      name: 'team',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'linkedin', type: 'text' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'select', options: [
          { label: 'Brain', value: 'brain' },
          { label: 'Target', value: 'target' },
          { label: 'Shield', value: 'shield-check' },
          { label: 'Handshake', value: 'handshake' },
          { label: 'Zap', value: 'zap' },
          { label: 'Heart', value: 'heart' },
        ]},
      ],
    },
  ],
}

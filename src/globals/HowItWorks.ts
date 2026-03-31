import type { GlobalConfig } from 'payload'

export const HowItWorks: GlobalConfig = {
  slug: 'how-it-works',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'How It Works' },
    { name: 'subtitle', type: 'textarea' },
    { name: 'steps', type: 'array', minRows: 1, fields: [
      { name: 'stepNumber', type: 'number', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'icon', type: 'select', options: [
        { label: 'Chat', value: 'message-circle' },
        { label: 'Plan', value: 'clipboard' },
        { label: 'Build', value: 'code' },
        { label: 'Launch', value: 'rocket' },
      ]},
    ]},
  ],
}

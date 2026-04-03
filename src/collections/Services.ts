import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'icon', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'icon', type: 'select', required: true, options: [
      { label: 'AI / Brain', value: 'brain' },
      { label: 'Mobile', value: 'smartphone' },
      { label: 'Web / Globe', value: 'globe' },
      { label: 'Layout', value: 'layout' },
      { label: 'Automation / Zap', value: 'zap' },
      { label: '3D Cube', value: 'box' },
      { label: 'Design / Palette', value: 'palette' },
      { label: 'Marketing / Megaphone', value: 'megaphone' },
    ]},
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'features', type: 'array', fields: [
      { name: 'feature', type: 'text', required: true },
    ]},
    { name: 'problemStatement', type: 'textarea', admin: { description: 'What problem does this service solve?' } },
    { name: 'longDescription', type: 'textarea', admin: { description: 'Detailed service description for the service page' } },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}

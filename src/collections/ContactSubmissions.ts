import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'subject', 'createdAt'] },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'service', type: 'relationship', relationTo: 'services' },
    { name: 'status', type: 'select', defaultValue: 'new',
      options: ['new', 'read', 'replied', 'archived'],
      admin: { position: 'sidebar' } },
  ],
}

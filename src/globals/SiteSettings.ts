import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Digital Agency' },
    { name: 'tagline', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'socialLinks', type: 'group', fields: [
      { name: 'facebook', type: 'text' },
      { name: 'instagram', type: 'text' },
      { name: 'linkedin', type: 'text' },
      { name: 'twitter', type: 'text' },
    ]},
    { name: 'footer', type: 'group', fields: [
      { name: 'copyrightText', type: 'text' },
      { name: 'showSocialLinks', type: 'checkbox', defaultValue: true },
    ]},
  ],
}

import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText' },
    { name: 'author', type: 'text', defaultValue: 'Agency Team' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'AI & Automation', value: 'ai' },
        { label: 'Web Development', value: 'web' },
        { label: 'Business', value: 'business' },
        { label: 'Case Study', value: 'case-study' },
      ],
    },
    { name: 'publishedAt', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number' },
  ],
}

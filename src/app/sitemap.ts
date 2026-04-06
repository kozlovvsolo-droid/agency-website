import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  try {
    const payload = await getPayload({ config: configPromise })

    const [servicesResult, blogResult, portfolioResult] = await Promise.all([
      payload.find({ collection: 'services', limit: 100 }),
      payload.find({ collection: 'blog-posts', limit: 100 }),
      payload.find({ collection: 'portfolio', limit: 100 }),
    ])

    const servicePages: MetadataRoute.Sitemap = servicesResult.docs.map((s: any) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    const blogPages: MetadataRoute.Sitemap = blogResult.docs.map((p: any) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    const portfolioPages: MetadataRoute.Sitemap = portfolioResult.docs.map((p: any) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    return [...staticPages, ...servicePages, ...blogPages, ...portfolioPages]
  } catch {
    return staticPages
  }
}

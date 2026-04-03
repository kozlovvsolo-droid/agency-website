import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: services } = await payload.find({ collection: 'services', limit: 100 })
    const servicePages: MetadataRoute.Sitemap = services.map((s: any) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    return [...staticPages, ...servicePages]
  } catch {
    return staticPages
  }
}

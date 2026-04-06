export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

async function getService(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] as any | null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: 'Service Not Found' }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  return {
    title: `${service.title} — AI Agency`,
    description: service.description?.slice(0, 160) || service.title,
    alternates: { canonical: `${baseUrl}/services/${slug}` },
    openGraph: {
      title: service.title,
      description: service.description?.slice(0, 160) || service.title,
      type: 'website',
      url: `${baseUrl}/services/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description?.slice(0, 160) || service.title,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const service = await getService(slug)
  if (!service) notFound()

  const { docs: relatedWork } = await payload.find({
    collection: 'portfolio',
    where: { category: { equals: service.id } },
    limit: 3,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'AI Agency',
      url: baseUrl,
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-accent-600">
        <Container>
          <div className="max-w-4xl mx-auto">
            {service.subtitle && (
              <span className="inline-block text-sm font-medium text-white/70 bg-white/10 px-4 py-1.5 rounded-full mb-4">
                {service.subtitle}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">{service.description}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              Back to Services
            </Link>

            {/* Problem Statement */}
            {service.problemStatement && (
              <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{service.problemStatement}</p>
              </div>
            )}

            {/* Solution / Long Description */}
            {service.longDescription && (
              <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {service.longDescription}
                </p>
              </div>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {service.features.map((f: any, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 size={18} className="text-primary-500 flex-shrink-0" />
                      {f.feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-12">
                <SectionHeading title="Key Benefits" centered={false} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.benefits.map((benefit: any, i: number) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Portfolio */}
            {relatedWork.length > 0 && (
              <div className="mb-12">
                <SectionHeading title="Related Work" centered={false} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedWork.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/portfolio/${item.slug}`}
                      className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      {item.clientName && (
                        <p className="text-sm text-accent-500 font-medium mb-2">{item.clientName}</p>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-4">
                Book a free consultation and let&apos;s discuss your project.
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'portfolio',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  if (!docs.length) notFound()

  const item = docs[0] as any
  const service = item.category

  return (
    <main>
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-accent-600">
        <Container>
          <div className="max-w-4xl mx-auto">
            {service?.title && (
              <span className="inline-block text-sm font-medium text-white/70 bg-white/10 px-4 py-1.5 rounded-full mb-4">
                {service.title}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {item.title}
            </h1>
            {item.clientName && (
              <p className="text-white/70 text-lg">Client: {item.clientName}</p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              Back to Portfolio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                </div>

                {item.technologies?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h2>
                    <div className="flex flex-wrap gap-3">
                      {item.technologies.map((t: any, i: number) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm"
                        >
                          {t.tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-3 text-sm">
                    {item.clientName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Client</span>
                        <span className="font-medium text-gray-900">{item.clientName}</span>
                      </div>
                    )}
                    {service?.title && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Service</span>
                        <span className="font-medium text-gray-900">{service.title}</span>
                      </div>
                    )}
                  </div>
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      View Live Project
                    </a>
                  )}
                </div>

                <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
                  <CheckCircle2 size={24} className="mb-3 text-white/80" />
                  <h3 className="font-bold text-lg mb-2">Want a similar project?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Let&apos;s discuss your requirements and build something amazing.
                  </p>
                  <Link
                    href="/#contact"
                    className="block bg-white text-primary-600 text-center px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

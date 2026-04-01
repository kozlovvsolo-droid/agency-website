export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'

const categoryLabels: Record<string, string> = {
  ai: 'AI & Automation',
  web: 'Web Development',
  business: 'Business',
  'case-study': 'Case Study',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!docs.length) notFound()

  const post = docs[0] as any

  return (
    <main>
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-800 to-accent-600">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tag size={14} className="text-white/60" />
              <span className="text-sm font-medium text-white/80">
                {categoryLabels[post.category] || post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author || 'Agency Team'}
              </span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
              <p className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-primary-500 pl-6 italic">
                {post.excerpt}
              </p>

              {post.content ? (
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {typeof post.content === 'string'
                      ? post.content
                      : 'Full article content available in the admin panel.'}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>Full article coming soon.</p>
                </div>
              )}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to transform your business?
              </h3>
              <p className="text-gray-600 mb-4">
                Let&apos;s discuss how we can implement similar solutions for your company.
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

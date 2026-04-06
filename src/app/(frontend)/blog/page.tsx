export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Blog — AI Agency Insights',
  description: 'Read our latest articles on AI, web development, automation, and digital transformation.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — AI Agency Insights',
    description: 'Read our latest articles on AI, web development, automation, and digital transformation.',
    type: 'website',
  },
}

const POSTS_PER_PAGE = 12

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10))
  const payload = await getPayload({ config: configPromise })

  const { docs: posts, totalPages } = await payload.find({
    collection: 'blog-posts',
    sort: '-publishedAt',
    limit: POSTS_PER_PAGE,
    page: currentPage,
  })

  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            title="Blog"
            subtitle="Latest insights on AI, web development, and digital transformation"
            as="h1"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(posts as any[]).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-50 text-primary-600">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-50 text-accent-600">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">No blog posts yet. Check back soon!</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition ${
                    page === currentPage
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}

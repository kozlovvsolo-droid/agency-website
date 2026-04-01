export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata = {
  title: 'Blog — Latest Insights',
  description: 'Read our latest articles on AI, web development, automation, and digital transformation.',
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    sort: '-publishedAt',
    limit: 20,
  })

  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            title="Blog"
            subtitle="Latest insights on AI, web development, and digital transformation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(posts as any[]).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}

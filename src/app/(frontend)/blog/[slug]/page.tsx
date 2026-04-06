export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
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

async function getPost(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] as any | null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  return {
    title: `${post.title} — AI Agency Blog`,
    description: post.excerpt || post.title,
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'Agency Team'],
      url: `${baseUrl}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
    },
  }
}

function renderRichText(content: any): React.ReactNode {
  if (typeof content === 'string') return content

  if (!content?.root?.children) {
    return 'Full article content available in the admin panel.'
  }

  const renderChildren = (children: any[]): React.ReactNode[] =>
    children.map((node: any, i: number) => {
      if (node.type === 'text') {
        let text: React.ReactNode = node.text
        if (node.format & 1) text = <strong key={i}>{text}</strong>
        if (node.format & 2) text = <em key={i}>{text}</em>
        if (node.format & 8) text = <code key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{text}</code>
        return <span key={i}>{text}</span>
      }
      if (node.type === 'paragraph') {
        return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{node.children ? renderChildren(node.children) : null}</p>
      }
      if (node.type === 'heading') {
        const level = node.tag || 'h2'
        const Tag = level as keyof JSX.IntrinsicElements
        return <Tag key={i} className="font-bold text-gray-900 mt-8 mb-4">{node.children ? renderChildren(node.children) : null}</Tag>
      }
      if (node.type === 'list') {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return <ListTag key={i} className={`mb-4 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} text-gray-700`}>{node.children ? renderChildren(node.children) : null}</ListTag>
      }
      if (node.type === 'listitem') {
        return <li key={i} className="mb-1">{node.children ? renderChildren(node.children) : null}</li>
      }
      if (node.type === 'link') {
        return <a key={i} href={node.fields?.url || '#'} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">{node.children ? renderChildren(node.children) : null}</a>
      }
      if (node.type === 'quote') {
        return <blockquote key={i} className="border-l-4 border-primary-500 pl-4 italic text-gray-600 my-4">{node.children ? renderChildren(node.children) : null}</blockquote>
      }
      if (node.children) return <div key={i}>{renderChildren(node.children)}</div>
      return null
    })

  return renderChildren(content.root.children)
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author || 'Agency Team' },
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'AI Agency',
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/blog/${slug}`,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                  {renderRichText(post.content)}
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

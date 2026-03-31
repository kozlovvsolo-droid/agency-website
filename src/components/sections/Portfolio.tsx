import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ExternalLink } from 'lucide-react'

type PortfolioItem = {
  id: string
  title: string
  description: string
  image?: { url?: string; alt?: string } | null
  technologies?: { tech: string }[] | null
  clientName?: string | null
  projectUrl?: string | null
  category?: { title?: string } | null
}

const cardGradients = [
  'from-primary-700 to-accent-600',
  'from-accent-600 to-primary-800',
  'from-primary-600 to-primary-900',
  'from-accent-500 to-primary-700',
  'from-primary-800 to-accent-500',
  'from-primary-500 to-accent-600',
]

export function Portfolio({ items }: { items: PortfolioItem[] }) {
  return (
    <section id="portfolio" className="py-24">
      <Container>
        <SectionHeading
          title="Our Portfolio"
          subtitle="Selected projects showcasing our expertise across different industries"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden aspect-[4/3]${item.projectUrl ? ' cursor-pointer' : ''}`}
            >
              {/* Background layer */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${cardGradients[index % cardGradients.length]} group-hover:scale-105 transition-transform duration-500`} />
                )}
              </div>

              {/* Dark overlay - always visible */}
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 1,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)',
                }}
              />

              {/* Content - always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white" style={{ zIndex: 2 }}>
                {item.category && typeof item.category === 'object' && item.category.title && (
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block"
                    style={{ backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
                  >
                    {item.category.title}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm mb-0" style={{ color: 'rgba(209, 213, 219, 1)' }}>
                  {item.description}
                </p>

                {/* Expand on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded text-white"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                          {t.tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      View Project <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

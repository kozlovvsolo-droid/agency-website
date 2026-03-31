import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Star, Quote } from 'lucide-react'

type Testimonial = {
  id: string
  clientName: string
  clientRole?: string | null
  company?: string | null
  quote: string
  rating?: number | null
  avatar?: { url?: string } | null
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by businesses across industries to deliver results"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <Quote className="text-primary-200 mb-4" size={32} />
              <p className="text-gray-600 italic mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < t.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3">
                {t.avatar?.url ? (
                  <img src={t.avatar.url} alt={t.clientName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {t.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{t.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {[t.clientRole, t.company].filter(Boolean).join(' at ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

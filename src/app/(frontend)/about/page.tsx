export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Brain, Target, ShieldCheck, Handshake, Zap, Heart, Linkedin } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — AI Agency',
  description: 'Meet the team behind AI Agency. We help businesses grow with AI chatbots, automation, and smart websites.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us — AI Agency',
    description: 'Meet the team behind AI Agency. We help businesses grow with AI chatbots, automation, and smart websites.',
    type: 'website',
  },
}

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  target: Target,
  'shield-check': ShieldCheck,
  handshake: Handshake,
  zap: Zap,
  heart: Heart,
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const about = await payload.findGlobal({ slug: 'about-page' }) as any

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-800 to-accent-600">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {about.headline || 'We Help Businesses Grow with AI'}
            </h1>
            {about.mission && (
              <p className="text-lg text-white/80 leading-relaxed">{about.mission}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Story */}
      {about.story && (
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <SectionHeading title="Our Story" />
              <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {about.story}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Team */}
      {about.team && about.team.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <SectionHeading
              title="Meet the Team"
              subtitle="The people behind the results"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {about.team.map((member: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                    {member.name?.charAt(0) || '?'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-accent-500 font-medium mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Values */}
      {about.values && about.values.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading
              title="Our Values"
              subtitle="What drives every project we take on"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.values.map((value: any, i: number) => {
                const Icon = iconMap[value.icon] || Zap
                return (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-primary-600" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Let&apos;s discuss how AI and automation can transform your business.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-primary-600 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}

import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  Brain, Smartphone, Globe, Layout, Zap, Box, Palette, Megaphone, ArrowRight,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  smartphone: Smartphone,
  globe: Globe,
  layout: Layout,
  zap: Zap,
  box: Box,
  palette: Palette,
  megaphone: Megaphone,
}

type Service = {
  id: string
  title: string
  subtitle?: string | null
  description: string
  icon: string
  features?: { feature: string }[] | null
}

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <Container>
        <SectionHeading
          title="What We Offer"
          subtitle="Comprehensive digital solutions to transform your business and accelerate growth"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                  <Icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                {service.subtitle && (
                  <p className="text-sm text-accent-500 font-medium mb-2">{service.subtitle}</p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors group-hover:gap-2.5"
                >
                  Learn More <ArrowRight size={14} className="transition-all" />
                </a>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

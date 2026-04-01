import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const companies = [
  'Nordic Retail Group',
  'TalentFlow',
  'ModernHome Design',
  'FastShip Logistics',
  'Urban Bites',
  'Prestige Properties',
]

export function TrustedBy() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <SectionHeading
          title="Trusted By Industry Leaders"
          subtitle="50+ companies worldwide trust us with their digital transformation"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {companies.map((company) => (
            <div
              key={company}
              className="bg-white rounded-lg p-4 text-center text-gray-700 font-medium text-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              {company}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

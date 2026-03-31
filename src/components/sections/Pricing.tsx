import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Check, X } from 'lucide-react'

type PricingPlan = {
  id: string
  name: string
  price: string
  period?: string | null
  description?: string | null
  features?: { feature: string; included?: boolean | null }[] | null
  highlighted?: boolean | null
  ctaText?: string | null
}

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <SectionHeading
          title="Pricing Plans"
          subtitle="Transparent pricing for every stage of your business growth"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-primary-600 text-white shadow-2xl scale-105 relative'
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              {plan.description && (
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              )}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {f.included !== false ? (
                      <Check size={16} className={plan.highlighted ? 'text-white' : 'text-green-500'} />
                    ) : (
                      <X size={16} className={plan.highlighted ? 'text-white/40' : 'text-gray-300'} />
                    )}
                    <span className={f.included === false ? (plan.highlighted ? 'text-white/40' : 'text-gray-400') : ''}>
                      {f.feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-primary-700 hover:bg-gray-100'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.ctaText || 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

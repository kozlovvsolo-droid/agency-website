import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MessageCircle, ClipboardList, Code, Rocket } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  'message-circle': MessageCircle,
  clipboard: ClipboardList,
  code: Code,
  rocket: Rocket,
}

type Step = {
  stepNumber: number
  title: string
  description: string
  icon?: string | null
}

type HowItWorksData = {
  title?: string | null
  subtitle?: string | null
  steps?: Step[] | null
}

export function HowItWorks({ data }: { data: HowItWorksData }) {
  const steps = data?.steps || []

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <Container>
        <SectionHeading
          title={data?.title || 'How It Works'}
          subtitle={data?.subtitle || undefined}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon || ''] || Code
            return (
              <div key={index} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                )}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 mb-6">
                  <Icon className="text-primary-600" size={32} />
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

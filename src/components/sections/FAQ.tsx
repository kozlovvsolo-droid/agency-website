'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const faqItems = [
  {
    question: 'What services do you offer?',
    answer:
      'We specialize in AI-powered solutions, full-stack web development, mobile apps, business automation, 3D configurators, and digital marketing. Each service is tailored to your business needs.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Our pricing starts at $750 for simple projects and goes up to $9,999+ for complex solutions. Enterprise projects are custom-quoted. We offer transparent pricing with detailed breakdowns.',
  },
  {
    question: 'How long does development take?',
    answer:
      'Timeline depends on scope. Simple projects take 2-4 weeks, standard projects 4-8 weeks, and complex solutions 8-16 weeks. We provide a detailed timeline during the initial consultation.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer:
      'Yes! We offer support packages ranging from email support to dedicated team access. After launch, we ensure your solution runs smoothly with regular updates and maintenance.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We use modern tech stack: Next.js, React, TypeScript, Payload CMS, n8n, PostgreSQL, and AWS. We choose the best tools for your specific project requirements.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a free 30-minute consultation with our team. We\'ll discuss your goals, challenges, and provide a roadmap with timeline and pricing. No commitment needed.',
  },
]

function FAQItem({ question, answer, isOpen, onClick }: any) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary-600 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="pb-6 text-gray-600 leading-relaxed">{answer}</div>}
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our services and process"
        />
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

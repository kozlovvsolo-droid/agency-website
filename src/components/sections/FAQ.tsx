'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const faqItems = [
  {
    question: 'How quickly can we see results?',
    answer:
      'Most clients see their first AI automation working within 2 weeks. A basic chatbot can be live in days. Full website + automation projects typically take 4-8 weeks from kickoff to launch, with measurable results from month one.',
  },
  {
    question: 'Will the AI chatbot sound robotic?',
    answer:
      'No. Modern AI assistants are trained on your business context, tone of voice, and actual customer conversations. They handle nuanced questions, switch between languages naturally, and know when to escalate to a human. Most customers cannot tell the difference.',
  },
  {
    question: 'What if we already have a website?',
    answer:
      'We can add AI chatbot and automation to your existing site without rebuilding it. We integrate with WordPress, Shopify, custom platforms, and practically any modern website. If your site needs a refresh, we can handle that too.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Our packages start at $2,999 for a conversion-optimized website. The Grow package ($7,999) includes AI chatbot + business automation and is our most popular option. Enterprise projects are custom-quoted based on scope. Every project includes a clear ROI projection before you commit.',
  },
  {
    question: 'Do we need technical knowledge?',
    answer:
      'Not at all. We handle everything from setup to deployment. You get a simple dashboard to manage content, and the AI runs on autopilot. Our team provides training and ongoing support so your team feels confident from day one.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every package includes support. We monitor performance, optimize the AI based on real conversations, and iterate on what works. The Grow and Scale packages include extended support periods. We treat launch as the starting line, not the finish line.',
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

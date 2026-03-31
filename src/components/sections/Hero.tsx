'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  title: string
  subtitle?: string | null
  description?: string | null
  ctaText?: string | null
  ctaLink?: string | null
}

const gradients = [
  'from-primary-800 via-primary-700 to-accent-600',
  'from-accent-600 via-primary-700 to-primary-900',
  'from-primary-900 via-accent-600 to-primary-700',
]

export function Hero({ data }: { data: { slides?: Slide[] | null } }) {
  const slides = data?.slides || []
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const slide = slides[current]

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[current % gradients.length]} transition-all duration-1000`}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl mx-auto sm:mx-16 lg:mx-0 lg:ml-24">
          <h1
            key={`title-${current}`}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up"
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              key={`sub-${current}`}
              className="text-xl sm:text-2xl text-white/80 mb-4 animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              {slide.subtitle}
            </p>
          )}
          {slide.description && (
            <p
              key={`desc-${current}`}
              className="text-lg text-white/70 mb-8 max-w-2xl animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {slide.description}
            </p>
          )}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <a
              href={slide.ctaLink || '#services'}
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {slide.ctaText || 'Learn More'}
            </a>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent((current + 1) % slides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto sm:mx-16 lg:mx-0 lg:ml-24"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xl sm:text-2xl text-white/80 mb-4">
                {slide.subtitle}
              </p>
            )}
            {slide.description && (
              <p className="text-lg text-white/70 mb-8 max-w-2xl">
                {slide.description}
              </p>
            )}
            <div>
              <a
                href={slide.ctaLink || '#services'}
                className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                {slide.ctaText || 'Learn More'}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {slides.length > 1 && (
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {slides.length > 1 && (
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </section>
  )
}

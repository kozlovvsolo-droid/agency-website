'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

type HeroData = {
  slides?:
    | {
        title: string
        subtitle?: string | null
        description?: string | null
        ctaText?: string | null
        ctaLink?: string | null
      }[]
    | null
}

export function Hero({ data }: { data: HeroData }) {
  const slide = data?.slides?.[0]
  if (!slide) return null

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-primary-950 to-gray-900" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-6">
              <Sparkles size={14} />
              Trusted by 50+ businesses worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={slide.ctaLink || '#analyzer'}
                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/25"
              >
                {slide.ctaText || 'Get Started'}
                <ArrowRight size={20} />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium transition-all"
              >
                See Our Results
              </a>
            </div>
          </motion.div>

          {/* Right: Visual element - animated stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              {
                value: '80%',
                label: 'Inquiries automated',
                color: 'from-primary-500 to-primary-600',
              },
              {
                value: '3x',
                label: 'More leads generated',
                color: 'from-accent-500 to-accent-600',
              },
              {
                value: '20h+',
                label: 'Saved per week',
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                value: '2 wk',
                label: 'Average setup time',
                color: 'from-amber-500 to-amber-600',
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

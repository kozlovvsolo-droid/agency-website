'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const stats = [
  { value: 150, label: 'Projects Completed', suffix: '+' },
  { value: 50, label: 'Happy Clients', suffix: '+' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
  { value: 24, label: 'Hours Support', suffix: '/7' },
]

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {displayValue}
        {suffix}
      </div>
      <p className="text-white/70 text-sm sm:text-base">{label}</p>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary-700 to-primary-900">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </Container>
    </section>
  )
}

import React from 'react'

export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: {
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'text-center mb-16' : 'mb-12'}>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}

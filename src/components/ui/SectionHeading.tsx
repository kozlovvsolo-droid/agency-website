import React from 'react'

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  as: Tag = 'h2',
}: {
  title: string
  subtitle?: string
  centered?: boolean
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={centered ? 'text-center mb-16' : 'text-left mb-12'}>
      <Tag className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</Tag>
      {subtitle && (
        <p className={`text-lg text-gray-600 ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>{subtitle}</p>
      )}
    </div>
  )
}

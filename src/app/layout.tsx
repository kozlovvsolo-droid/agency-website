import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Digital Agency — AI, Web Development & Automation',
  description: 'We build digital experiences that make your business grow. AI assistants, web development, automation, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Digital Agency — AI, Web Development & Automation',
  description: 'We build digital experiences that make your business grow. AI assistants, web development, automation, and more.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'),
  openGraph: {
    title: 'Digital Agency — AI-Powered Solutions',
    description: 'Custom AI assistants, full-stack web development, and business automation. From idea to launch.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Digital Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Agency — AI-Powered Solutions',
    description: 'Custom AI assistants, full-stack web development, and business automation.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'AI Agency \u2014 AI Solutions That Grow Your Business',
    template: '%s | AI Agency',
  } as any,
  description:
    'Get 30-80% more leads with AI chatbots, business automation, and smart websites. Results in weeks, not months.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'),
  openGraph: {
    title: 'AI Agency \u2014 Grow Your Business with AI',
    description:
      'Get 30-80% more leads with AI chatbots, business automation, and smart websites. Results in weeks, not months.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AI Agency',
    url: '/',
  },
  alternates: { canonical: '/' },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency \u2014 Grow Your Business with AI',
    description:
      'Get 30-80% more leads with AI chatbots, business automation, and smart websites. Results in weeks, not months.',
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

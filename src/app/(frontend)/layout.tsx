import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingChat } from '@/components/ui/FloatingChat'
import { CookieConsent } from '@/components/ui/CookieConsent'
import '../globals.css'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }) as any

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency-website-fort2.vercel.app'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.siteName || 'AI Agency',
    description: 'AI Solutions That Grow Your Business',
    url: baseUrl,
    email: siteSettings?.contactEmail || 'hello@aiadvisors.pl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oslo',
      addressCountry: 'NO',
    },
    sameAs: [
      siteSettings?.socialLinks?.linkedin,
      siteSettings?.socialLinks?.twitter,
      siteSettings?.socialLinks?.instagram,
    ].filter(Boolean),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />
      {children}
      <Footer siteSettings={siteSettings} />
      <FloatingChat />
      <CookieConsent />
    </>
  )
}

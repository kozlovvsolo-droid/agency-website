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
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <>
      <Header />
      {children}
      <Footer siteSettings={siteSettings as any} />
      <FloatingChat />
      <CookieConsent />
    </>
  )
}

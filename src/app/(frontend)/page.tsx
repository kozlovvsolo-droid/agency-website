import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [heroData, howItWorksData, servicesData, portfolioData, plansData, testimonialsData] =
    await Promise.all([
      payload.findGlobal({ slug: 'hero-section' }),
      payload.findGlobal({ slug: 'how-it-works' }),
      payload.find({ collection: 'services', sort: 'order', limit: 20 }),
      payload.find({
        collection: 'portfolio',
        where: { featured: { equals: true } },
        sort: 'order',
        limit: 6,
      }),
      payload.find({ collection: 'pricing-plans', sort: 'order' }),
      payload.find({
        collection: 'testimonials',
        where: { featured: { equals: true } },
      }),
    ])

  return (
    <main>
      <Hero data={heroData} />
      <Services services={servicesData.docs as any[]} />
      <Portfolio items={portfolioData.docs as any[]} />
      <HowItWorks data={howItWorksData} />
      <Pricing plans={plansData.docs as any[]} />
      <Testimonials testimonials={testimonialsData.docs as any[]} />
      <Contact />
    </main>
  )
}

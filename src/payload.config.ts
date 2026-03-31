import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Portfolio } from './collections/Portfolio'
import { Testimonials } from './collections/Testimonials'
import { PricingPlans } from './collections/PricingPlans'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { HeroSection } from './globals/HeroSection'
import { HowItWorks } from './globals/HowItWorks'
import { SiteSettings } from './globals/SiteSettings'
import { seed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'users',
      auth: true,
      access: { read: () => true },
      fields: [],
    },
    Media,
    Services,
    Portfolio,
    Testimonials,
    PricingPlans,
    ContactSubmissions,
  ],
  globals: [HeroSection, HowItWorks, SiteSettings],
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter()
    : sqliteAdapter({
        client: { url: process.env.DATABASE_URI || 'file:./payload.db' },
      }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  async onInit(payload) {
    const users = await payload.find({ collection: 'users', limit: 1 })
    if (users.totalDocs === 0) {
      await seed(payload)
    }
  },
})

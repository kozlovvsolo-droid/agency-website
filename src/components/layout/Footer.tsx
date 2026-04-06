import React from 'react'
import { Container } from '@/components/ui/Container'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

export function Footer({ siteSettings }: { siteSettings?: { siteName?: string; contactEmail?: string; socialLinks?: { linkedin?: string; twitter?: string; instagram?: string } } }) {
  const siteName = siteSettings?.siteName || 'Agency'
  const socialLinks = siteSettings?.socialLinks
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              {siteName}<span className="text-accent-400">.</span>
            </h3>
            <p className="text-gray-400 max-w-md mb-6">
              We build digital experiences that make your business grow. From AI solutions to full-stack web development.
            </p>
            {socialLinks && (
              <div className="flex gap-4">
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { label: 'AI Chatbots', slug: 'ai-chatbots' },
                { label: 'Web Development', slug: 'websites' },
                { label: 'Marketing', slug: 'marketing' },
                { label: 'Automation', slug: 'automation' },
              ].map((item) => (
                <li key={item.slug}>
                  <a href={`/services/${item.slug}`} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

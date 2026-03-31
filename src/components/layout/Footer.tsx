import React from 'react'
import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Agency<span className="text-accent-400">.</span>
            </h3>
            <p className="text-gray-400 max-w-md mb-6">
              We build digital experiences that make your business grow. From AI solutions to full-stack web development.
            </p>
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
              {['AI Solutions', 'Web Development', 'Mobile Apps', 'Automation'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Digital Agency. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

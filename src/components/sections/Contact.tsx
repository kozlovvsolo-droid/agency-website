'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export function Contact({ siteSettings }: { siteSettings?: { contactEmail?: string; contactPhone?: string; address?: string } }) {
  const email = siteSettings?.contactEmail || 'hello@agency.com'
  const phone = siteSettings?.contactPhone || '+1 (555) 000-0000'
  const address = siteSettings?.address || 'Remote — Worldwide'
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24">
      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to start your project? Reach out and let's discuss your needs"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Mail className="text-primary-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Phone className="text-primary-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
            <input
              name="subject"
              type="text"
              required
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'sending' ? (
                'Sending...'
              ) : status === 'sent' ? (
                'Message Sent!'
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
            {status === 'sent' && (
              <p className="text-green-600 text-sm text-center">Thank you! We'll get back to you shortly.</p>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}

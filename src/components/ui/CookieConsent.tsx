'use client'

import React, { useEffect, useState } from 'react'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (value: boolean) => {
    localStorage.setItem('cookie-consent', JSON.stringify(value))
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:flex items-center justify-between gap-4">
        <p className="text-sm text-gray-300">We use cookies to improve your experience and analyze site usage.</p>
        <div className="flex gap-3 mt-4 sm:mt-0 shrink-0">
          <button
            onClick={() => handleConsent(false)}
            className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

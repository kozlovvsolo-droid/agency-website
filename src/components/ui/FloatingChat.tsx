'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

export function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://t.me/easyailifes"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3"
      >
        <span className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
        <div className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 animate-pulse">
          <MessageCircle size={28} className="text-white" />
        </div>
      </a>
    </div>
  )
}

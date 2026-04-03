'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Bot,
  Zap,
  TrendingUp,
  Clock,
  Mail,
  ArrowRight,
  Sparkles,
  DollarSign,
  Target,
  MessageSquare,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'

type Priority = 'high' | 'medium' | 'low'
type Category = 'chatbot' | 'automation' | 'marketing' | 'sales'

interface Recommendation {
  title: string
  description: string
  estimated_savings: string
  priority: Priority
  category: Category
}

interface AnalysisResult {
  score: number
  company_name: string
  industry: string
  recommendations: Recommendation[]
  quick_wins: string[]
  estimated_monthly_savings: string
  summary: string
}

const categoryIcons: Record<Category, React.ReactNode> = {
  chatbot: <MessageSquare className="w-5 h-5" />,
  automation: <Zap className="w-5 h-5" />,
  marketing: <BarChart3 className="w-5 h-5" />,
  sales: <TrendingUp className="w-5 h-5" />,
}

const priorityStyles: Record<Priority, string> = {
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-300 border-green-500/30',
}

function ScoreRing({ score }: { score: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color =
    score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444'

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-white/60 text-sm">out of 100</span>
      </div>
    </div>
  )
}

export function AIAnalyzer() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      setResult(data)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !result) return

    setEmailLoading(true)
    try {
      await fetch('/api/analyze-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), url, score: result.score }),
      })
      setEmailSent(true)
    } catch {
      // Silently fail — the analysis is still shown
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <section
      id="analyzer"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 text-accent-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free Tool
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Free AI Business Analysis
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Enter your website URL and discover what AI can automate in your business
          </p>
        </motion.div>

        {/* Input form */}
        <motion.form
          onSubmit={handleAnalyze}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL (e.g. example.com)"
                className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent backdrop-blur-sm text-lg"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  Analyzing
                </>
              ) : (
                <>
                  Analyze <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/70 py-12"
            >
              <Bot className="w-12 h-12 mx-auto mb-4 text-accent-400 animate-pulse" />
              <p className="text-lg">Analyzing your website with AI...</p>
              <p className="text-sm text-white/50 mt-2">This usually takes 10-15 seconds</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header: Score + Summary */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                >
                  <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
                    AI Readiness Score
                  </h3>
                  <ScoreRing score={result.score} />
                  <p className="text-white/40 text-sm mt-4">
                    {result.company_name} &middot; {result.industry}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
                      Summary
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed">{result.summary}</p>
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-accent-500/20 border border-accent-500/30">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-accent-400 shrink-0" />
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">
                          Estimated Monthly Savings
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {result.estimated_monthly_savings}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recommendations */}
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-400" />
                Recommendations
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {result.recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-white/10 text-accent-400">
                        {categoryIcons[rec.category]}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${priorityStyles[rec.priority]}`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{rec.title}</h4>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">{rec.description}</p>
                    <div className="flex items-center gap-2 text-accent-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{rec.estimated_savings}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Wins */}
              <div className="relative">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-400" />
                  Quick Wins — Ready in 2 Weeks
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {result.quick_wins.map((win, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-white/80 text-sm leading-relaxed">{win}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Email gate overlay */}
                {!emailSent && (
                  <div className="relative mt-8">
                    <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-primary-900/95 z-10 pointer-events-none" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="relative z-20 p-8 rounded-2xl bg-gradient-to-r from-accent-600/30 to-primary-700/30 border border-accent-500/30 backdrop-blur-sm text-center"
                    >
                      <Mail className="w-10 h-10 text-accent-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Get the Full Detailed Report
                      </h3>
                      <p className="text-white/60 mb-6 max-w-md mx-auto">
                        Enter your email to receive a comprehensive PDF report with implementation roadmap and ROI projections
                      </p>
                      <form
                        onSubmit={handleEmailSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                        <button
                          type="submit"
                          disabled={emailLoading}
                          className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
                        >
                          {emailLoading ? 'Sending...' : 'Get Report'}
                          {!emailLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </form>
                    </motion.div>
                  </div>
                )}

                {emailSent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-6 rounded-2xl bg-green-500/20 border border-green-500/30 text-center"
                  >
                    <ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-200 font-medium">
                      Thank you! We&apos;ll send your detailed report shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  )
}

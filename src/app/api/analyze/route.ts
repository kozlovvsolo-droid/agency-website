import { NextResponse } from 'next/server'

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW)
  rateLimitMap.set(ip, recent)
  if (recent.length >= RATE_LIMIT) return true
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const { url } = await request.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Analysis service is not configured' },
        { status: 503 },
      )
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    // Scrape website content via Jina Reader
    let scrapedContent: string
    try {
      const jinaRes = await fetch(`https://r.jina.ai/${normalizedUrl}`, {
        headers: { Accept: 'text/plain' },
        signal: AbortSignal.timeout(15000),
      })
      if (!jinaRes.ok) {
        return NextResponse.json(
          { error: 'Could not fetch the website. Please check the URL and try again.' },
          { status: 422 },
        )
      }
      scrapedContent = await jinaRes.text()
    } catch {
      return NextResponse.json(
        { error: 'Could not fetch the website. Please check the URL and try again.' },
        { status: 422 },
      )
    }

    const truncated = scrapedContent.slice(0, 3000)

    const systemPrompt = `You are an AI business analyst. Analyze the provided website content and return AI automation recommendations. Return ONLY valid JSON, no markdown fences.`

    const userPrompt = `Analyze this business website and provide AI automation recommendations.

Website URL: ${normalizedUrl}
Website content:
${truncated}

Return a JSON object with:
{
  "score": number (0-100, AI readiness score),
  "company_name": string (detected company name),
  "industry": string (detected industry),
  "recommendations": [
    {
      "title": string,
      "description": string (what to automate),
      "estimated_savings": string (e.g. "15-20 hours/month"),
      "priority": "high" | "medium" | "low",
      "category": "chatbot" | "automation" | "marketing" | "sales"
    }
  ],
  "quick_wins": [string, string, string],
  "estimated_monthly_savings": string (e.g. "$3,000-5,000"),
  "summary": string (2-3 sentences about the business's AI potential)
}

Be specific and realistic. Base recommendations on what you can see on the website. Provide 3-5 recommendations.`

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
      signal: AbortSignal.timeout(30000),
    })

    if (!openaiRes.ok) {
      return NextResponse.json(
        { error: 'Analysis failed. Please try again later.' },
        { status: 502 },
      )
    }

    const openaiData = await openaiRes.json()
    const content = openaiData.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'Analysis returned empty results.' },
        { status: 502 },
      )
    }

    // Parse JSON from the response, stripping markdown fences if present
    const cleaned = content.replace(/```json?\s*/g, '').replace(/```\s*/g, '').trim()
    const analysis = JSON.parse(cleaned)

    return NextResponse.json(analysis)
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

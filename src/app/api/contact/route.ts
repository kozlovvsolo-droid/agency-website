import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || undefined,
        subject: body.subject,
        message: body.message,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

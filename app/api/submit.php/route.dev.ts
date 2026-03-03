import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Honeypot check
  if (body._hp_field) {
    return NextResponse.json({ success: true })
  }

  // Time-based bot check
  if (body._started_at) {
    const elapsed = Date.now() - Number(body._started_at)
    if (elapsed < 3000) {
      return NextResponse.json({ success: true })
    }
  }

  // Log submission for local development
  console.log('--- FORM SUBMISSION ---')
  console.log('Variant:', body.variantId)
  console.log('Answers:', JSON.stringify(body.answers, null, 2))
  console.log('--- END SUBMISSION ---')

  // In production, PHP handles email sending.
  // This route is for local development only.
  return NextResponse.json({ success: true })
}

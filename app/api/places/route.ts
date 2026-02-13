import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'myplanb-questionnaire/1.0 (fragebogen@myplanb.at)',
          'Accept-Language': 'de',
        },
      }
    )

    if (!res.ok) {
      return NextResponse.json([], { status: 200 })
    }

    const data = await res.json()

    const results = data.map((item: { display_name: string; lat: string; lon: string }) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }))

    return NextResponse.json(results)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

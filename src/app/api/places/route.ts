export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get('input') ?? '';
  const isNj = req.nextUrl.searchParams.get('branch') === 'nj';
  if (input.length < 1) return NextResponse.json({ predictions: [] });

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('[/api/places] GOOGLE_PLACES_API_KEY is not set');
    return NextResponse.json({ predictions: [] }, { status: 500 });
  }

  const params = new URLSearchParams({
    input,
    types: 'address',
    components: 'country:us',
    // Suggestions are not proof of coverage; booking also checks ZIP/municipality.
    location: isNj ? '40.9455,-74.0712' : '41.5382,-72.8070',
    radius: isNj ? '30000' : '90000',
    key: apiKey,
  });

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
    );
    const data = await res.json();

    // Keep suggestions in the selected state.
    const predictions = (data.predictions ?? []).filter(
      (p: { description: string }) =>
        isNj
          ? p.description.includes(', NJ,') || p.description.includes(', New Jersey')
          : p.description.includes(', CT,') || p.description.includes(', Connecticut'),
    );

    return NextResponse.json({ predictions });
  } catch (err) {
    console.error('[/api/places] fetch error:', err);
    return NextResponse.json({ predictions: [] }, { status: 500 });
  }
}

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
}

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(req: NextRequest) {
  const input = (req.nextUrl.searchParams.get('input') ?? '').trim();
  const placeId = req.nextUrl.searchParams.get('placeId');
  const sessionToken = req.nextUrl.searchParams.get('sessionToken') ?? '';

  if (!placeId && input.length < 3) return json({ predictions: [] });
  if (
    input.length > 200 ||
    (placeId !== null && !/^[A-Za-z0-9_-]{1,255}$/.test(placeId)) ||
    !/^[A-Za-z0-9_-]{1,36}$/.test(sessionToken)
  ) {
    return json({ error: 'Invalid address lookup.' }, 400);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return json({ error: 'Address lookup is unavailable.' }, 503);

  try {
    const headers = { 'X-Goog-Api-Key': apiKey };
    if (placeId) {
      const params = new URLSearchParams({ sessionToken, languageCode: 'en' });
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?${params}`, {
        headers: { ...headers, 'X-Goog-FieldMask': 'formattedAddress,addressComponents' },
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Place details returned ${res.status}`);
      const data = await res.json();
      const components: AddressComponent[] = data.addressComponents ?? [];
      const component = (type: string) => components.find((item) => item.types.includes(type));
      if (
        component('country')?.shortText !== 'US' ||
        component('administrative_area_level_1')?.shortText !== 'CT'
      ) {
        return json({ error: 'Please enter a Connecticut service address.' }, 422);
      }
      if (!data.formattedAddress) throw new Error('Place details missing address');
      return json({
        address: data.formattedAddress.replace(/, (USA|United States)$/, ''),
        zip: component('postal_code')?.longText ?? '',
      });
    }

    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'X-Goog-FieldMask':
          'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text',
      },
      body: JSON.stringify({
        input,
        sessionToken,
        includedRegionCodes: ['us'],
        includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
        languageCode: 'en',
        // Bias toward Connecticut without excluding towns near its borders.
        locationBias: {
          rectangle: {
            low: { latitude: 40.98, longitude: -73.73 },
            high: { latitude: 42.05, longitude: -71.78 },
          },
        },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Autocomplete returned ${res.status}`);
    const data = await res.json();
    const predictions = (data.suggestions ?? [])
      .flatMap((item: { placePrediction?: { placeId: string; text: { text: string } } }) =>
        item.placePrediction
          ? [
              {
                place_id: item.placePrediction.placeId,
                description: item.placePrediction.text.text,
              },
            ]
          : [],
      )
      .filter((item: { description: string }) => /, (CT|Connecticut)(,|$)/.test(item.description));
    return json({ predictions });
  } catch (error) {
    // Never log the request URL, API key, or customer's address.
    console.error('[/api/places]', error instanceof Error ? error.message : 'Lookup failed');
    return json({ error: 'Address lookup is unavailable.' }, 502);
  }
}

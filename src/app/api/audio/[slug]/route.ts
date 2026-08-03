export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'IKne3meq5aSn9XLyUdCD'; // Charlie
const MODEL_ID = 'eleven_turbo_v2_5';
const MAX_CHARS = 4500;

function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 503 });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const bodyText = htmlToText(post.content);
  const text = `${post.title}. ${bodyText}`.slice(0, MAX_CHARS);

  const elRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    },
  );

  if (!elRes.ok) {
    const err = await elRes.text();
    console.error('[/api/audio] ElevenLabs error:', elRes.status, err);
    return NextResponse.json(
      { error: 'Audio generation failed', detail: err },
      { status: elRes.status },
    );
  }

  // Buffer the full response so the browser gets Content-Length and can
  // calculate duration correctly (streaming has no length = Infinity duration bug)
  const buffer = await elRes.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': String(buffer.byteLength),
      'Cache-Control': 'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}

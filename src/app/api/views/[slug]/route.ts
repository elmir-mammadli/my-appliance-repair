import { Redis } from'@upstash/redis';
import { NextRequest, NextResponse } from'next/server';

const redis = new Redis({
 url: process.env.KV_REST_API_URL!,
 token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(
 _req: NextRequest,
 { params }: { params: Promise<{ slug: string }> }
) {
 const { slug } = await params;
 const count = await redis.incr(`views:${slug}`);
 return NextResponse.json({ count });
}

export async function GET(
 _req: NextRequest,
 { params }: { params: Promise<{ slug: string }> }
) {
 const { slug } = await params;
 const count = (await redis.get<number>(`views:${slug}`)) ?? 0;
 return NextResponse.json({ count });
}

import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Post } from '@/lib/posts';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT = 'MyAppliance Repair LLC — Connecticut appliance repair blog';

const NAVY = '#172554';
const SLATE = '#64748b';
const BLUE_50 = '#eff6ff';
const BLUE_100 = '#dbeafe';
const BLUE_700 = '#1d4ed8';
const AMBER = '#ffb81c';

// Font + logo bytes only need to be read once per server instance.
let assetsPromise: Promise<{
  lexendExtraBold: Buffer;
  lexendBold: Buffer;
  sourceSansRegular: Buffer;
  sourceSansSemiBold: Buffer;
  logoDataUri: string;
}> | null = null;

function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = (async () => {
      const [lexendExtraBold, lexendBold, sourceSansRegular, sourceSansSemiBold, logoPng] =
        await Promise.all([
          readFile(join(process.cwd(), 'assets/fonts/Lexend-ExtraBold.woff')),
          readFile(join(process.cwd(), 'assets/fonts/Lexend-Bold.woff')),
          readFile(join(process.cwd(), 'assets/fonts/SourceSans3-Regular.woff')),
          readFile(join(process.cwd(), 'assets/fonts/SourceSans3-SemiBold.woff')),
          readFile(join(process.cwd(), 'assets/og/logo-wordmark.png')),
        ]);
      return {
        lexendExtraBold,
        lexendBold,
        sourceSansRegular,
        sourceSansSemiBold,
        logoDataUri: `data:image/png;base64,${logoPng.toString('base64')}`,
      };
    })();
  }
  return assetsPromise;
}

async function loadPhoto(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') ?? 'image/jpeg';
    return `data:${contentType};base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

// Budgets are empirically tuned against the actual Lexend ExtraBold render at
// each size within the ~628px-wide left column (see blog-og-image render tests),
// not a generic character-count guess — the font runs wide, so guessing low
// silently clips text with no ellipsis instead of truncating cleanly.
function fitTitle(title: string): { text: string; fontSize: number; maxLines: number; showExcerpt: boolean } {
  const len = title.length;
  if (len <= 30) return { text: title, fontSize: 58, maxLines: 2, showExcerpt: true };
  if (len <= 58) return { text: title, fontSize: 46, maxLines: 3, showExcerpt: true };
  if (len <= 72) return { text: title, fontSize: 37, maxLines: 3, showExcerpt: true };
  if (len <= 95) return { text: title, fontSize: 32, maxLines: 4, showExcerpt: true };
  return { text: truncate(title, 112), fontSize: 30, maxLines: 4, showExcerpt: false };
}

export async function renderBlogOgImage(post: Post): Promise<ImageResponse> {
  const [assets, photoDataUri] = await Promise.all([loadAssets(), loadPhoto(post.image)]);
  const { text: titleText, fontSize: titleSize, maxLines, showExcerpt } = fitTitle(post.title);
  const excerpt = truncate(post.excerpt, 118);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
        }}
      >
        {/* Brand gradient signature bar */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 10,
            background: `linear-gradient(90deg, ${NAVY} 0%, #2563eb 55%, ${AMBER} 100%)`,
          }}
        />

        <div style={{ display: 'flex', flex: 1, width: '100%' }}>
          {/* Left: content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              padding: '0 56px',
              gap: 18,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.logoDataUri}
              alt=""
              width={190}
              height={63}
              style={{ marginBottom: 8 }}
            />

            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: BLUE_100,
                color: BLUE_700,
                fontFamily: 'Source Sans 3',
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                padding: '7px 16px',
              }}
            >
              {post.category}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Lexend',
                fontWeight: 800,
                fontSize: titleSize,
                lineHeight: 1.18,
                letterSpacing: -0.5,
                color: NAVY,
                maxHeight: maxLines * titleSize * 1.18 + 4,
                overflow: 'hidden',
              }}
            >
              {titleText}
            </div>

            {showExcerpt ? (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Source Sans 3',
                  fontWeight: 400,
                  fontSize: 21,
                  lineHeight: 1.5,
                  color: SLATE,
                  maxWidth: 580,
                }}
              >
                {excerpt}
              </div>
            ) : null}

            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: AMBER,
                color: NAVY,
                fontFamily: 'Lexend',
                fontWeight: 700,
                fontSize: 19,
                padding: '15px 30px',
                marginTop: 10,
              }}
            >
              Book a Service Call
            </div>
          </div>

          {/* Right: photo card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 460,
              background: BLUE_50,
            }}
          >
            <div style={{ display: 'flex', position: 'relative', width: 372, height: 460 }}>
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  width: 372,
                  height: 460,
                  background: AMBER,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 372,
                  height: 460,
                  border: '8px solid #ffffff',
                  overflow: 'hidden',
                  background: NAVY,
                }}
              >
                {photoDataUri ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoDataUri}
                    alt=""
                    width={372}
                    height={460}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Lexend', data: assets.lexendExtraBold, weight: 800, style: 'normal' },
        { name: 'Lexend', data: assets.lexendBold, weight: 700, style: 'normal' },
        { name: 'Source Sans 3', data: assets.sourceSansRegular, weight: 400, style: 'normal' },
        { name: 'Source Sans 3', data: assets.sourceSansSemiBold, weight: 600, style: 'normal' },
      ],
    }
  );
}

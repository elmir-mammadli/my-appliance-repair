import { getPostBySlug } from '@/lib/posts';
import { renderBlogOgImage, OG_IMAGE_SIZE, OG_IMAGE_ALT } from '@/lib/blog-og-image';

export const runtime = 'nodejs';
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response('Not found', { status: 404 });
  return renderBlogOgImage(post);
}

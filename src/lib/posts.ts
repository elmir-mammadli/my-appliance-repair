import postsData from '../../content/posts.json';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date"2026-03-18"
  readTime: string; //"6 min read"
  author: string;
  featuredColor: string; // Tailwind gradient classes
  accentColor: string; // Badge bg + text classes
  image: string; // Unsplash image URL
  content: string; // HTML string
}

export const posts: Post[] = postsData as Post[];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/**
 * The service page a post belongs under. Category alone can't separate washer from
 * dryer, so the slug and title break the tie for the "Washers & Dryers" bucket.
 */
export function getServiceSlugForPost(post: Post): string | null {
  const haystack = `${post.slug} ${post.title}`.toLowerCase();

  switch (post.category) {
    case 'Refrigerators':
      return 'refrigerator-repair';
    case 'Dishwashers':
      return 'dishwasher-repair';
    case 'Ovens & Ranges':
      return 'oven-range-repair';
    case 'Washers & Dryers':
      return /dryer|lint|vent/.test(haystack) ? 'dryer-repair' : 'washer-repair';
    default:
      if (/refrigerator|fridge|freezer|ice maker/.test(haystack)) return 'refrigerator-repair';
      if (/dishwasher/.test(haystack)) return 'dishwasher-repair';
      if (/\boven\b|range|stove|burner/.test(haystack)) return 'oven-range-repair';
      if (/dryer|lint|vent/.test(haystack)) return 'dryer-repair';
      if (/washer|washing machine|laundry/.test(haystack)) return 'washer-repair';
      return null;
  }
}

/**
 * Ranked by how much a post has in common with the current one: same category first,
 * then same appliance, then whatever is newest. Previously this returned the first N
 * posts in file order, so every article on the site linked to the same two.
 */
export function getRelatedPosts(currentSlug: string, count = 2): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return posts.slice(0, count);

  const currentService = getServiceSlugForPost(current);

  return posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      if (currentService && getServiceSlugForPost(p) === currentService) score += 1;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, count)
    .map((entry) => entry.post);
}

/** Posts to surface from a service page, newest first. */
export function getPostsForService(serviceSlug: string, count = 3): Post[] {
  return posts
    .filter((p) => getServiceSlugForPost(p) === serviceSlug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

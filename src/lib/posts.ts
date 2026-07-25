import postsData from'../../content/posts.json';

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

export function getRelatedPosts(currentSlug: string, count = 2): Post[] {
 return posts.filter((p) => p.slug !== currentSlug).slice(0, count);
}

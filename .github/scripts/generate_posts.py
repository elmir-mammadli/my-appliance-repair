#!/usr/bin/env python3
"""
Automated blog post generator for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions daily. Generates 2 research-backed blog posts using Claude API with web search.
"""

import json
import math
import os
import sys
from datetime import datetime
from pathlib import Path

import anthropic

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

POSTS_JSON_PATH = Path(__file__).parent.parent.parent / "content" / "posts.json"
COMPANY_NAME = "MY APPLIANCE Repair"
COMPANY_URL = "myappliance.us"
AUTHOR = "MY APPLIANCE Repair Team"
MODEL = "claude-opus-4-5"
POSTS_PER_RUN = 2

# Color gradients keyed by category
CATEGORY_COLORS: dict[str, tuple[str, str]] = {
    "Refrigerators":   ("from-blue-900 via-blue-800 to-blue-700", "bg-blue-500 text-white"),
    "Dishwashers":     ("from-violet-900 via-violet-800 to-violet-600", "bg-violet-500 text-white"),
    "Maintenance":     ("from-teal-800 via-teal-700 to-teal-500", "bg-teal-500 text-white"),
    "Tips & Advice":   ("from-amber-700 via-amber-600 to-yellow-500", "bg-amber-400 text-amber-900"),
    "Smart Home":      ("from-indigo-600 to-indigo-900", "bg-indigo-400 text-white"),
    "Technology":      ("from-cyan-600 to-cyan-900", "bg-cyan-400 text-cyan-900"),
    "Washers & Dryers":("from-teal-600 to-teal-800", "bg-teal-400 text-teal-900"),
    "Ovens & Ranges":  ("from-orange-700 via-orange-600 to-amber-500", "bg-orange-400 text-orange-900"),
    "Energy Savings":  ("from-green-700 via-green-600 to-emerald-500", "bg-green-400 text-green-900"),
    "Safety":          ("from-red-700 via-red-600 to-rose-500", "bg-red-400 text-white"),
    "default":         ("from-slate-700 via-slate-600 to-slate-500", "bg-slate-400 text-white"),
}

# Unsplash images keyed by category
CATEGORY_IMAGES: dict[str, str] = {
    "Refrigerators":    "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    "Dishwashers":      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    "Maintenance":      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    "Tips & Advice":    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    "Smart Home":       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "Technology":       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "Washers & Dryers": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    "Ovens & Ranges":   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "Energy Savings":   "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    "Safety":           "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "default":          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_existing_posts() -> list[dict]:
    if not POSTS_JSON_PATH.exists():
        return []
    with open(POSTS_JSON_PATH, encoding="utf-8") as f:
        return json.load(f)


def save_posts(posts: list[dict]) -> None:
    POSTS_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(POSTS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        f.write("\n")


def estimate_read_time(html_content: str) -> str:
    # Strip tags roughly for word count
    import re
    text = re.sub(r"<[^>]+>", " ", html_content)
    words = len(text.split())
    minutes = math.ceil(words / 200)
    return f"{minutes} min read"


def format_date_today() -> str:
    return datetime.utcnow().strftime("%-m/%-d/%Y").replace(
        datetime.utcnow().strftime("%-m"), datetime.utcnow().strftime("%B"), 1
    )


def today_string() -> str:
    now = datetime.utcnow()
    return now.strftime("%B %-d, %Y")


def get_colors(category: str) -> tuple[str, str]:
    return CATEGORY_COLORS.get(category, CATEGORY_COLORS["default"])


def get_image(category: str) -> str:
    return CATEGORY_IMAGES.get(category, CATEGORY_IMAGES["default"])


def extract_text_between(text: str, start_marker: str, end_marker: str) -> str | None:
    s = text.find(start_marker)
    if s == -1:
        return None
    s += len(start_marker)
    e = text.find(end_marker, s)
    if e == -1:
        return text[s:].strip()
    return text[s:e].strip()


# ---------------------------------------------------------------------------
# Step 1 — Research phase
# ---------------------------------------------------------------------------

def research_topic(
    client: anthropic.Anthropic,
    existing_slugs: list[str],
    existing_titles: list[str],
    attempt: int,
) -> dict | None:
    """
    Use Claude with web_search to find a fresh blog topic and gather research.
    Returns a dict with: title, slug, category, excerpt, research_summary
    """
    existing_list = "\n".join(f"- {t}" for t in existing_titles)

    prompt = f"""You are a content strategist for {COMPANY_NAME}, a Connecticut home appliance repair company at {COMPANY_URL}.

Your task: propose ONE new, original blog post topic for the company blog — then use the web_search tool to research it thoroughly.

Existing post titles (do NOT duplicate these topics):
{existing_list}

Requirements for the new topic:
- Must be genuinely useful to Connecticut homeowners
- Should relate to: appliance repair, maintenance, energy savings, appliance buying advice, troubleshooting, seasonal tips, or smart home appliances
- Pick a topic not already covered above
- Preference for topics with current data, seasonal relevance, or trending searches

Steps:
1. First, pick a specific topic and tell me the proposed: title, slug (kebab-case, URL-safe), category (one of: Refrigerators, Dishwashers, Maintenance, Tips & Advice, Smart Home, Technology, Washers & Dryers, Ovens & Ranges, Energy Savings, Safety), and a 155-character-max excerpt.
2. Then use web_search to find: current statistics, recent news, common homeowner questions, cost data, or seasonal trends related to your chosen topic.
3. After searching, compile a RESEARCH SUMMARY (key facts, data points, relevant statistics you found) that a writer can use to write an authoritative blog post.

Format your final response EXACTLY like this:
TITLE: [title here]
SLUG: [slug here]
CATEGORY: [category here]
EXCERPT: [excerpt here, max 155 chars]
RESEARCH SUMMARY:
[Your compiled research notes here — bullet points preferred]"""

    try:
        response = client.beta.messages.create(
            model=MODEL,
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}],
            tools=[{"type": "web_search_20250305", "name": "web_search"}],
            betas=["web_search_2025_03_05"],
        )
    except Exception as e:
        print(f"  [research] API error: {e}", file=sys.stderr)
        return None

    # Collect all text blocks from the response
    full_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            full_text += block.text + "\n"

    if not full_text.strip():
        print("  [research] Empty response from Claude", file=sys.stderr)
        return None

    # Parse structured fields
    title = extract_text_between(full_text, "TITLE:", "\n")
    slug = extract_text_between(full_text, "SLUG:", "\n")
    category = extract_text_between(full_text, "CATEGORY:", "\n")
    excerpt = extract_text_between(full_text, "EXCERPT:", "\n")
    research_summary = extract_text_between(full_text, "RESEARCH SUMMARY:", "")

    if not all([title, slug, category, excerpt, research_summary]):
        print(f"  [research] Could not parse all fields. Raw response:\n{full_text[:500]}", file=sys.stderr)
        return None

    # Clean slug
    import re
    slug = re.sub(r"[^a-z0-9-]", "-", slug.lower().strip())
    slug = re.sub(r"-+", "-", slug).strip("-")

    # Ensure slug is unique
    if slug in existing_slugs:
        slug = f"{slug}-{attempt}"

    return {
        "title": title.strip(),
        "slug": slug,
        "category": category.strip(),
        "excerpt": excerpt.strip()[:155],
        "research_summary": research_summary.strip(),
    }


# ---------------------------------------------------------------------------
# Step 2 — Writing phase
# ---------------------------------------------------------------------------

def write_post(
    client: anthropic.Anthropic,
    research: dict,
) -> str | None:
    """
    Use the research summary to write a full blog post in HTML.
    Returns the HTML content string.
    """
    prompt = f"""You are a skilled content writer for {COMPANY_NAME}, a Connecticut appliance repair company at {COMPANY_URL}.

Write a complete, high-quality blog post based on the research below.

Post details:
- Title: {research["title"]}
- Category: {research["category"]}
- Target length: 700–900 words

Research summary (use this to make the post authoritative and data-driven):
{research["research_summary"]}

Writing guidelines:
- Write for Connecticut homeowners — knowledgeable but not technical
- Use <h2> and <h3> for section headings, <p> for paragraphs, <ul>/<li> for lists
- Include specific facts/data from the research where natural
- Naturally mention {COMPANY_NAME} in 1–2 places (not spammy)
- End with a soft CTA paragraph mentioning {COMPANY_URL}
- Return ONLY the HTML body content (no <html>, <head>, or <body> tags — just the inner content starting with <p> or <h2>)
- Do not include a title heading (the <h1> is handled separately by the site)"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [writing] API error: {e}", file=sys.stderr)
        return None

    content = ""
    for block in response.content:
        if hasattr(block, "text"):
            content += block.text

    content = content.strip()

    # Strip any accidental markdown code fences
    import re
    content = re.sub(r"^```html\s*", "", content)
    content = re.sub(r"\s*```$", "", content)
    content = content.strip()

    return content if content else None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def generate_post(
    client: anthropic.Anthropic,
    existing_posts: list[dict],
    attempt: int,
) -> dict | None:
    existing_slugs = [p["slug"] for p in existing_posts]
    existing_titles = [p["title"] for p in existing_posts]

    print(f"\n--- Generating post {attempt + 1} ---")
    print("  Phase 1: Researching topic...")

    research = research_topic(client, existing_slugs, existing_titles, attempt)
    if not research:
        print("  Failed to complete research phase.", file=sys.stderr)
        return None

    print(f"  Topic: {research['title']}")
    print(f"  Slug:  {research['slug']}")
    print(f"  Category: {research['category']}")
    print("  Phase 2: Writing post...")

    content_html = write_post(client, research)
    if not content_html:
        print("  Failed to complete writing phase.", file=sys.stderr)
        return None

    featured_color, accent_color = get_colors(research["category"])

    post = {
        "slug": research["slug"],
        "title": research["title"],
        "excerpt": research["excerpt"],
        "category": research["category"],
        "date": today_string(),
        "readTime": estimate_read_time(content_html),
        "author": AUTHOR,
        "featuredColor": featured_color,
        "accentColor": accent_color,
        "image": get_image(research["category"]),
        "content": content_html,
    }

    print(f"  Done! ~{post['readTime']}")
    return post


def main() -> None:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    existing_posts = load_existing_posts()
    print(f"Loaded {len(existing_posts)} existing posts from {POSTS_JSON_PATH}")

    new_posts: list[dict] = []

    for i in range(POSTS_PER_RUN):
        # Include newly generated posts so the next iteration avoids duplicates
        all_posts_so_far = existing_posts + new_posts
        post = generate_post(client, all_posts_so_far, i)
        if post:
            new_posts.append(post)
        else:
            print(f"  Skipping post {i + 1} due to errors.", file=sys.stderr)

    if not new_posts:
        print("\nNo new posts were generated. Exiting without modifying posts.json.")
        sys.exit(0)

    # Prepend new posts (newest first)
    updated_posts = new_posts + existing_posts
    save_posts(updated_posts)

    print(f"\n=== Summary ===")
    print(f"Generated {len(new_posts)} new post(s):")
    for p in new_posts:
        print(f"  - [{p['date']}] {p['title']}")
    print(f"Total posts in posts.json: {len(updated_posts)}")


if __name__ == "__main__":
    main()

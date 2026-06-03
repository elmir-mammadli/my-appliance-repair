#!/usr/bin/env python3
"""
Automated blog post generator for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions daily. Generates 2 blog posts using Claude API.
"""

import json
import math
import os
import re
import sys
from datetime import datetime
from pathlib import Path

import anthropic

try:
    from tavily import TavilyClient as _TavilyClient
    _TAVILY_AVAILABLE = True
except ImportError:
    _TAVILY_AVAILABLE = False

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

POSTS_JSON_PATH = Path(__file__).parent.parent.parent / "content" / "posts.json"
COMPANY_NAME = "MY APPLIANCE Repair"
COMPANY_URL = "myappliance.us"
AUTHOR = "Elmir R."
MODEL = "claude-opus-4-5"
POSTS_PER_RUN = 2

# Color gradients keyed by category
CATEGORY_COLORS: dict[str, tuple[str, str]] = {
    "Refrigerators":    ("from-blue-900 via-blue-800 to-blue-700", "bg-blue-500 text-white"),
    "Dishwashers":      ("from-violet-900 via-violet-800 to-violet-600", "bg-violet-500 text-white"),
    "Maintenance":      ("from-teal-800 via-teal-700 to-teal-500", "bg-teal-500 text-white"),
    "Tips & Advice":    ("from-amber-700 via-amber-600 to-yellow-500", "bg-amber-400 text-amber-900"),
    "Smart Home":       ("from-indigo-600 to-indigo-900", "bg-indigo-400 text-white"),
    "Technology":       ("from-cyan-600 to-cyan-900", "bg-cyan-400 text-cyan-900"),
    "Washers & Dryers": ("from-teal-600 to-teal-800", "bg-teal-400 text-teal-900"),
    "Ovens & Ranges":   ("from-orange-700 via-orange-600 to-amber-500", "bg-orange-400 text-orange-900"),
    "Energy Savings":   ("from-green-700 via-green-600 to-emerald-500", "bg-green-400 text-green-900"),
    "Safety":           ("from-red-700 via-red-600 to-rose-500", "bg-red-400 text-white"),
    "default":          ("from-slate-700 via-slate-600 to-slate-500", "bg-slate-400 text-white"),
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
    text = re.sub(r"<[^>]+>", " ", html_content)
    words = len(text.split())
    minutes = math.ceil(words / 200)
    return f"{minutes} min read"


def today_string() -> str:
    now = datetime.utcnow()
    return now.strftime("%B %-d, %Y")


def get_colors(category: str) -> tuple[str, str]:
    return CATEGORY_COLORS.get(category, CATEGORY_COLORS["default"])


def get_image(category: str) -> str:
    return CATEGORY_IMAGES.get(category, CATEGORY_IMAGES["default"])


def parse_field(text: str, field: str) -> str | None:
    """Extract a single-line field value like 'FIELD: value'."""
    match = re.search(rf"^{re.escape(field)}:\s*(.+)$", text, re.MULTILINE | re.IGNORECASE)
    return match.group(1).strip() if match else None


def parse_research_summary(text: str) -> str | None:
    """Extract the RESEARCH SUMMARY block (everything after the marker)."""
    match = re.search(r"RESEARCH SUMMARY:\s*\n(.*)", text, re.DOTALL | re.IGNORECASE)
    if match:
        summary = match.group(1).strip()
        return summary if summary else None
    return None


# ---------------------------------------------------------------------------
# Tavily research helper
# ---------------------------------------------------------------------------

def init_tavily() -> object | None:
    """Return a TavilyClient if available and key is set, otherwise None."""
    if not _TAVILY_AVAILABLE:
        return None
    key = os.environ.get("TAVILY_API_KEY")
    if not key:
        return None
    try:
        return _TavilyClient(api_key=key)
    except Exception as e:
        print(f"  [tavily] Init failed: {e}", file=sys.stderr)
        return None


def tavily_search(tavily, query: str) -> list[dict]:
    """Run a single Tavily search; return list of {title, content, url} dicts."""
    try:
        results = tavily.search(query=query, max_results=3)
        return results.get("results", [])
    except Exception as e:
        print(f"  [tavily] Search failed for '{query}': {e}", file=sys.stderr)
        return []


def gather_research(tavily, topic_hint: str, month_year: str) -> str:
    """
    Run 2-3 Tavily searches and format the results as a context block.
    Returns an empty string if Tavily is unavailable or all searches fail.
    """
    if tavily is None:
        return ""

    queries = [
        f"Connecticut appliance repair {month_year}",
        f"appliance problems Connecticut homeowners 2026",
        f"{topic_hint} Connecticut homeowners",
    ]

    all_results: list[dict] = []
    for q in queries:
        all_results.extend(tavily_search(tavily, q))

    if not all_results:
        return ""

    lines = ["Recent news and data from the web:"]
    for r in all_results:
        title = r.get("title", "").strip()
        snippet = r.get("content", "").strip()[:300]
        url = r.get("url", "").strip()
        if title or snippet:
            lines.append(f"- {title}: {snippet} ({url})")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Step 1 — Topic selection + outline
# ---------------------------------------------------------------------------

def pick_topic_and_outline(
    client: anthropic.Anthropic,
    existing_slugs: list[str],
    existing_titles: list[str],
    attempt: int,
) -> dict | None:
    """
    Ask Claude to pick a fresh blog topic and provide a detailed content outline.
    Returns a dict with: title, slug, category, excerpt, research_summary
    """
    existing_list = "\n".join(f"- {t}" for t in existing_titles) or "(none yet)"

    prompt = f"""You are a content strategist for {COMPANY_NAME}, a Connecticut home appliance repair company at {COMPANY_URL}.

Your task: propose ONE new, original blog post topic and provide a detailed content outline for it.

Existing post titles (do NOT duplicate these topics):
{existing_list}

Requirements for the new topic:
- Must be genuinely useful to Connecticut homeowners
- Should relate to: appliance repair, maintenance, energy savings, appliance buying advice, troubleshooting, seasonal tips, or smart home appliances
- Pick a topic not already covered above
- Draw on your knowledge of common homeowner problems, seasonal patterns, energy costs in the Northeast, and appliance repair best practices

Format your response EXACTLY like this (fill in each field):
TITLE: [compelling blog post title]
SLUG: [kebab-case-url-slug]
CATEGORY: [one of: Refrigerators, Dishwashers, Maintenance, Tips & Advice, Smart Home, Technology, Washers & Dryers, Ovens & Ranges, Energy Savings, Safety]
EXCERPT: [compelling summary, max 155 characters]
RESEARCH SUMMARY:
[Detailed content outline and key points for the writer — include: main angle, 4-6 section ideas, specific tips or facts to include, Connecticut-relevant details, and any seasonal/regional context. Bullet points preferred.]"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [topic] API error: {e}", file=sys.stderr)
        return None

    full_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            full_text += block.text + "\n"

    if not full_text.strip():
        print("  [topic] Empty response from Claude", file=sys.stderr)
        return None

    # Parse required fields
    title = parse_field(full_text, "TITLE")
    slug = parse_field(full_text, "SLUG")

    if not title or not slug:
        print(f"  [topic] Missing TITLE or SLUG. Raw response:\n{full_text[:500]}", file=sys.stderr)
        return None

    # Parse optional fields with fallbacks
    category = parse_field(full_text, "CATEGORY") or "Tips & Advice"
    excerpt = parse_field(full_text, "EXCERPT") or title[:155]

    # Validate category
    if category not in CATEGORY_COLORS:
        category = "Tips & Advice"

    # RESEARCH SUMMARY is optional — fall back to excerpt
    research_summary = parse_research_summary(full_text) or excerpt

    # Clean slug
    slug = re.sub(r"[^a-z0-9-]", "-", slug.lower().strip())
    slug = re.sub(r"-+", "-", slug).strip("-")

    # Ensure slug is unique
    if slug in existing_slugs:
        slug = f"{slug}-{attempt}"

    return {
        "title": title,
        "slug": slug,
        "category": category,
        "excerpt": excerpt[:155],
        "research_summary": research_summary,
    }


# ---------------------------------------------------------------------------
# Step 2 — Writing phase
# ---------------------------------------------------------------------------

def write_post(
    client: anthropic.Anthropic,
    research: dict,
    web_context: str = "",
) -> str | None:
    """
    Use the content outline to write a full blog post in HTML.
    Returns the HTML content string.
    """
    context_block = f"\n{web_context}\n" if web_context else ""

    prompt = f"""You are a skilled content writer for {COMPANY_NAME}, a Connecticut appliance repair company at {COMPANY_URL}.

Write a complete, high-quality blog post based on the outline below.
{context_block}
Post details:
- Title: {research["title"]}
- Category: {research["category"]}
- Target length: 700–900 words

Content outline (use this to structure an authoritative, helpful post):
{research["research_summary"]}

Writing guidelines:
- Write for Connecticut homeowners — knowledgeable but not overly technical
- Use <h2> and <h3> for section headings, <p> for paragraphs, <ul>/<li> for lists
- Include specific, practical tips and actionable advice

BRANDING — follow these rules exactly:
1. Mention "{COMPANY_NAME}" naturally 2–3 times throughout the post — woven into the content, never forced. Examples: "At {COMPANY_NAME}, we see this problem regularly in CT homes..." or "{COMPANY_NAME} technicians recommend..."
2. Include 2–3 internal anchor links as actual <a> HTML tags placed naturally mid-sentence (NOT in a separate CTA paragraph):
   - At least one to the booking section: <a href="/#booking" style="color:#1e3a5f;font-weight:600;">book a service call</a>
   - At least one to the contact form: <a href="/#contact" style="color:#1e3a5f;font-weight:600;">contact our team</a>
   - Optionally one to services: <a href="/#services" style="color:#1e3a5f;font-weight:600;">our appliance repair services</a>
   - Example placement: "If you notice any of these signs, <a href="/#booking" style="color:#1e3a5f;font-weight:600;">book a service call</a> before it gets worse."
3. End the post with a soft branded CTA paragraph (separate from the inline links) in this style:
   "For Connecticut homeowners dealing with [topic], {COMPANY_NAME} offers same-day service across the state. <a href="/#booking" style="color:#1e3a5f;font-weight:600;">Schedule your repair online</a> or <a href="/#contact" style="color:#1e3a5f;font-weight:600;">get in touch</a> — we'll have your appliance running again fast."

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
    tavily=None,
) -> dict | None:
    existing_slugs = [p["slug"] for p in existing_posts]
    existing_titles = [p["title"] for p in existing_posts]

    print(f"\n--- Generating post {attempt + 1} ---")
    print("  Phase 1: Selecting topic and outline...")

    research = pick_topic_and_outline(client, existing_slugs, existing_titles, attempt)
    if not research:
        print("  Failed to select topic.", file=sys.stderr)
        return None

    print(f"  Topic:    {research['title']}")
    print(f"  Slug:     {research['slug']}")
    print(f"  Category: {research['category']}")

    # Tavily research phase
    month_year = datetime.utcnow().strftime("%B %Y")
    if tavily is not None:
        print("  Phase 2: Gathering live web research via Tavily...")
        web_context = gather_research(tavily, research["title"], month_year)
        if web_context:
            print(f"  Found {web_context.count(chr(10))} result snippets.")
        else:
            print("  No Tavily results — falling back to Claude knowledge only.")
    else:
        print("  Tavily not configured — using Claude knowledge only.")
        web_context = ""

    print("  Phase 3: Writing post...")

    content_html = write_post(client, research, web_context)
    if not content_html:
        print("  Failed to write post.", file=sys.stderr)
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

    tavily = init_tavily()
    if tavily:
        print("Tavily search client initialized — live research enabled.")
    else:
        print("Tavily not available — posts will use Claude knowledge only.")

    existing_posts = load_existing_posts()
    print(f"Loaded {len(existing_posts)} existing posts from {POSTS_JSON_PATH}")

    new_posts: list[dict] = []

    for i in range(POSTS_PER_RUN):
        # Include newly generated posts so the next iteration avoids duplicates
        all_posts_so_far = existing_posts + new_posts
        post = generate_post(client, all_posts_so_far, i, tavily=tavily)
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

#!/usr/bin/env python3
"""
Automated blog post generator for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions. Generates blog posts using Claude API.

v2 — humanized rewrite. Changes vs v1:
  - Titles: no colons, no "Why Your..." template, varied formats, Connecticut
    mentions capped, recent title structures passed in as negative examples
  - Writing: persona voice (Elmir), banned AI phrases, varied rhythm,
    at most one list per post, anecdotes
  - sanitize() runs on title, excerpt, AND content (em dashes were leaking
    into excerpts before)
  - Word target randomized per post (450-1100), so read times vary
  - Image pools per category with anti-repeat rotation
  - temperature=1.0 on all calls
  - Optional irregular cadence: POSTS_PER_RUN env var, plus SKIP_CHANCE to
    randomly skip a run entirely so the archive doesn't show 2 posts
    every single day
"""

import json
import math
import os
import random
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
COMPANY_NAME = "My Appliance Repair"
COMPANY_URL = "myappliance.us"
AUTHOR = "Elmir R."
MODEL = "claude-sonnet-4-6"

# How many posts per run. Default randomly picks 1 or 2 (weighted toward 1)
# so the archive doesn't show a perfectly uniform two-a-day pattern.
# Set POSTS_PER_RUN=2 in the workflow env to force the old behavior.
POSTS_PER_RUN = int(os.environ.get("POSTS_PER_RUN", 0)) or random.choice([1, 1, 2])

# Chance (0.0-1.0) that a run exits without posting anything, to break up
# the daily cadence. Default 0 = never skip. Try 0.25 for a natural rhythm.
SKIP_CHANCE = float(os.environ.get("SKIP_CHANCE", "0"))

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

# Image POOLS per category. The generator picks randomly and avoids any image
# used in the last IMAGE_NO_REPEAT_WINDOW posts, so the same photo doesn't
# appear twice on one screen.
#
# >>> ADD MORE URLs TO THESE POOLS. <<<
# I've seeded each pool with your existing images, but 3-5 per category is
# what actually fixes the repeated-photo problem. Grab them from unsplash.com
# (search the category, copy image address, keep the ?w=800&q=80 suffix).
CATEGORY_IMAGE_POOLS: dict[str, list[str]] = {
    "Refrigerators": [
        "https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=800&q=80",
    ],
    "Dishwashers": [
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    ],
    "Maintenance": [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    ],
    "Tips & Advice": [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    "Smart Home": [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    "Technology": [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    ],
    "Washers & Dryers": [
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    ],
    "Ovens & Ranges": [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    "Energy Savings": [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    ],
    "Safety": [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    ],
    "default": [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
}
IMAGE_NO_REPEAT_WINDOW = 9  # don't reuse an image shown in the last N posts

# ---------------------------------------------------------------------------
# Voice / persona / style
# ---------------------------------------------------------------------------

WRITER_PERSONA = f"""You are Elmir, who has run {COMPANY_NAME}, an appliance repair
company in Connecticut, for about 15 years. You write the company blog yourself,
usually in the evening, typing fast. You know this stuff cold from actual service
calls, not from reading articles. You write like you talk to customers in their
kitchen: direct, a little opinionated, occasionally funny, never salesy.

You sometimes reference real-feeling specifics from the job: a call in Waterbury
last month, a brand you keep seeing the same failure on, what a part roughly
costs, what you tell customers who ask if it's worth fixing. Invent plausible
details freely, but keep them modest and concrete (no miraculous stories, no
exact statistics you couldn't know)."""

STYLE_RULES = """HARD STYLE RULES (violating any of these ruins the post):

Rhythm:
- Vary paragraph length a lot. Some paragraphs are one sentence. One might be six.
- Vary sentence length. Use an occasional fragment. Like this.
- Contractions everywhere (it's, don't, you'll, won't).
- Fine to start sentences with And, But, or So.

BANNED punctuation:
- NO em dashes, NO en dashes. Use a comma, a period, or parentheses.
- No semicolons.
- No bold inside paragraphs.

BANNED phrases and constructions (or close variants):
- "it's not just X, it's Y" / "more than just"
- "whether you're X or Y"
- "In today's world" / "When it comes to"
- "it's worth noting" / "it's important to note" / "keep in mind"
- "Additionally" / "Moreover" / "Furthermore" / "In conclusion"
- "game-changer" / "peace of mind" / "seamless" / "elevate" / "look no further"
- "The Bottom Line" as a heading
- Rule-of-three adjective lists ("fast, reliable, and affordable"). Two max.

Structure:
- Headings must NOT be parallel or formulaic. Bad: "Understanding the Problem",
  "Why It Matters". Good: "The noise usually means the fan", "When it's honestly
  not worth fixing", "One thing people always skip".
- Don't open with a rhetorical question or a definition. Open mid-thought, like
  a person launching into a story or a complaint.
- Don't summarize at the end. End on advice, an opinion, or the CTA.
- Sections don't need equal length. One can be two sentences.
- At most ONE <ul> list in the whole post, only if it genuinely helps. Prefer prose.
- Mention Connecticut at most once in the body, if at all. Readers already know
  where we are."""

VOICE_SAMPLE = """Example of the voice (copy the feel, not the content):

<p>Got a call last Tuesday from a guy in Meriden whose dryer was taking three
cycles to dry a load of towels. He was ready to buy a new one. Total repair
was a $40 vent cleaning.</p>
<p>This happens constantly. So before you spend $900, check the vent.</p>"""

TITLE_RULES = """TITLE RULES (these matter more than anything):
- NO colons. No "Main Title: Subtitle" structure, ever.
- Do NOT start with "Why Your". Do not use "A Guide to", "Survival Guide",
  "Everything You Need to Know", "The Hidden Cost of", or "The Ultimate".
- Do NOT put "Connecticut" or "CT" in the title unless the topic is genuinely
  about the state (a law, a utility program). Weather topics don't count.
- Keep it under ~60 characters when you can.
- Pick a DIFFERENT format than the recent titles listed below. Rotate between:
  a plain statement ("Hard water is quietly wrecking your dishwasher"),
  a question ("Ice maker died again this spring?"),
  an imperative ("Stop rinsing your dishes before the dishwasher"),
  a mild joke ("Your fridge hates July as much as you do"),
  a specific observation ("That clicking noise is almost always the start relay").
- It should read like something a person typed, not an SEO template."""


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
    minutes = max(1, math.ceil(words / 200))
    return f"{minutes} min read"


def today_string() -> str:
    return datetime.utcnow().strftime("%B %-d, %Y")


def get_colors(category: str) -> tuple[str, str]:
    return CATEGORY_COLORS.get(category, CATEGORY_COLORS["default"])


def pick_image(category: str, existing_posts: list[dict]) -> str:
    """Pick an image from the category pool, avoiding recently used ones."""
    pool = CATEGORY_IMAGE_POOLS.get(category, CATEGORY_IMAGE_POOLS["default"])
    recent = {p.get("image") for p in existing_posts[:IMAGE_NO_REPEAT_WINDOW]}
    fresh = [u for u in pool if u not in recent]
    return random.choice(fresh if fresh else pool)


def parse_field(text: str, field: str) -> str | None:
    match = re.search(rf"^{re.escape(field)}:\s*(.+)$", text, re.MULTILINE | re.IGNORECASE)
    return match.group(1).strip() if match else None


def parse_research_summary(text: str) -> str | None:
    match = re.search(r"RESEARCH SUMMARY:\s*\n(.*)", text, re.DOTALL | re.IGNORECASE)
    if match:
        summary = match.group(1).strip()
        return summary or None
    return None


def response_text(response) -> str:
    return "".join(getattr(b, "text", "") for b in response.content).strip()


# ---------------------------------------------------------------------------
# Sanitizer — hard guard, runs on title, excerpt, and content
# ---------------------------------------------------------------------------

BANNED_REPLACEMENTS = [
    (r"\s*[\u2014\u2013]\s*", ", "),          # em/en dash -> comma
    (r"\s+--\s+", ", "),                       # double dash
    (r";\s+", ", "),                           # semicolons in prose
    (r"(?i)\bit'?s (?:also )?worth noting that\s*", ""),
    (r"(?i)\bit'?s important to (?:note|remember|understand) that\s*", ""),
    (r"(?i)\bkeep in mind that\s*", ""),
    (r"(?i)\bin today'?s (?:world|fast-paced world|market),?\s*", ""),
    (r"(?i)\bwhen it comes to\b", "with"),
    (r"(?i)(<p>)(?:Additionally|Moreover|Furthermore|In conclusion),\s*", r"\1"),
    (r"(?i)\. (?:Additionally|Moreover|Furthermore),\s*", ". "),
    (r"[\u201c\u201d]", '"'),                  # curly quotes -> straight
    (r"[\u2018\u2019]", "'"),
]


def sanitize(text: str) -> str:
    for pattern, repl in BANNED_REPLACEMENTS:
        text = re.sub(pattern, repl, text)
    text = re.sub(r"(<p>)([a-z])", lambda m: m.group(1) + m.group(2).upper(), text)
    text = re.sub(r",\s*,", ",", text)
    text = re.sub(r"  +", " ", text)
    return text.strip()


def sanitize_title(title: str) -> str:
    title = sanitize(title)
    # If a colon slipped through anyway, keep only the front half.
    if ":" in title:
        title = title.split(":")[0].strip()
    return title.strip(' "')


# ---------------------------------------------------------------------------
# Tavily research helper
# ---------------------------------------------------------------------------

def init_tavily():
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
    try:
        results = tavily.search(query=query, max_results=3)
        return results.get("results", [])
    except Exception as e:
        print(f"  [tavily] Search failed for '{query}': {e}", file=sys.stderr)
        return []


def gather_research(tavily, topic_hint: str, month_year: str) -> str:
    if tavily is None:
        return ""
    queries = [
        f"Connecticut appliance repair {month_year}",
        "appliance problems Connecticut homeowners 2026",
        f"{topic_hint} homeowners",
    ]
    all_results: list[dict] = []
    for q in queries:
        all_results.extend(tavily_search(tavily, q))
    if not all_results:
        return ""
    lines = ["Recent news and data from the web (paraphrase, never quote):"]
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

def pick_topic_and_outline(client, existing_slugs, existing_titles, attempt):
    existing_list = "\n".join(f"- {t}" for t in existing_titles) or "(none yet)"
    recent_titles = "\n".join(f"- {t}" for t in existing_titles[:5]) or "(none yet)"

    prompt = f"""{WRITER_PERSONA}

You're planning your next blog post.

All existing post titles (do NOT duplicate these topics):
{existing_list}

Requirements for the new topic:
- Genuinely useful to homeowners: appliance repair, maintenance, energy savings,
  buying advice, troubleshooting, seasonal tips, or smart home appliances
- Something not already covered above
- Ground it in what you actually see on service calls

{TITLE_RULES}

The 5 most recent titles are below. Your new title must NOT resemble any of
their structures or openings:
{recent_titles}

The EXCERPT must also sound human: no colons, no em dashes, no "Learn how to",
no "Discover". Write it like the first thing you'd say to a customer about it.
Don't put "Connecticut" in the excerpt.

Format your response EXACTLY like this:
TITLE: [title following all the rules above]
SLUG: [kebab-case-url-slug]
CATEGORY: [one of: Refrigerators, Dishwashers, Maintenance, Tips & Advice, Smart Home, Technology, Washers & Dryers, Ovens & Ranges, Energy Savings, Safety]
EXCERPT: [casual one-or-two sentence hook, max 155 characters]
RESEARCH SUMMARY:
[Outline for the post: the main angle, 4-6 loose section ideas, specific tips
or numbers to include, one or two anecdote seeds from service calls, any
seasonal context. Bullet points fine.]"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=1500,
            temperature=1.0,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [topic] API error: {e}", file=sys.stderr)
        return None

    full_text = response_text(response)
    if not full_text:
        print("  [topic] Empty response from Claude", file=sys.stderr)
        return None

    title = parse_field(full_text, "TITLE")
    slug = parse_field(full_text, "SLUG")
    if not title or not slug:
        print(f"  [topic] Missing TITLE or SLUG. Raw:\n{full_text[:500]}", file=sys.stderr)
        return None

    title = sanitize_title(title)
    category = parse_field(full_text, "CATEGORY") or "Tips & Advice"
    if category not in CATEGORY_COLORS:
        category = "Tips & Advice"

    excerpt = sanitize(parse_field(full_text, "EXCERPT") or title)[:155]
    research_summary = parse_research_summary(full_text) or excerpt

    slug = re.sub(r"[^a-z0-9-]", "-", slug.lower().strip())
    slug = re.sub(r"-+", "-", slug).strip("-")
    if slug in existing_slugs:
        slug = f"{slug}-{attempt}"

    return {
        "title": title,
        "slug": slug,
        "category": category,
        "excerpt": excerpt,
        "research_summary": research_summary,
    }


# ---------------------------------------------------------------------------
# Step 2 — Writing phase
# ---------------------------------------------------------------------------

def write_post(client, research, web_context=""):
    context_block = f"\n{web_context}\n" if web_context else ""

    # Varied length per post -> varied read times on the index page
    target_words = random.randrange(450, 1101, 50)

    link_options = [
        '<a href="/#booking" style="color:#1e3a5f;font-weight:600;">book a service call</a>',
        '<a href="/#contact" style="color:#1e3a5f;font-weight:600;">contact our team</a>',
        '<a href="/#services" style="color:#1e3a5f;font-weight:600;">our appliance repair services</a>',
    ]
    chosen_links = random.sample(link_options, k=2)

    prompt = f"""{WRITER_PERSONA}

{STYLE_RULES}

{VOICE_SAMPLE}
{context_block}
Write the blog post.

Title (already rendered by the site, don't repeat it): {research["title"]}
Category: {research["category"]}
Length: roughly {target_words} words. Don't pad to hit a number. If you're done
saying what you have to say, stop.

Rough outline (deviate freely, follow your own train of thought):
{research["research_summary"]}

Branding, kept light:
- Mention "{COMPANY_NAME}" once or twice, naturally, in first person ("we").
- Work these two links into sentences mid-paragraph (not in a CTA block):
  {chosen_links[0]}
  {chosen_links[1]}
- End with ONE short, casual closing paragraph that includes
  <a href="/#booking" style="color:#1e3a5f;font-weight:600;">schedule a repair</a>.
  Two sentences max, no hype.

Output ONLY the HTML body content using <p>, <h2>, <h3>, and at most one <ul>.
No <h1>, no code fences, no preamble."""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=3000,
            temperature=1.0,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [writing] API error: {e}", file=sys.stderr)
        return None

    content = response_text(response)
    content = re.sub(r"^```html\s*", "", content)
    content = re.sub(r"\s*```$", "", content).strip()
    return sanitize(content) if content else None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def generate_post(client, existing_posts, attempt, tavily=None):
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

    month_year = datetime.utcnow().strftime("%B %Y")
    web_context = ""
    if tavily is not None:
        print("  Phase 2: Gathering live web research via Tavily...")
        web_context = gather_research(tavily, research["title"], month_year)
        if web_context:
            print(f"  Found {web_context.count(chr(10))} result snippets.")
        else:
            print("  No Tavily results, using Claude knowledge only.")
    else:
        print("  Tavily not configured, using Claude knowledge only.")

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
        "image": pick_image(research["category"], existing_posts),
        "content": content_html,
    }

    print(f"  Done! ~{post['readTime']}")
    return post


def main() -> None:
    if SKIP_CHANCE and random.random() < SKIP_CHANCE:
        print(f"Randomly skipping this run (SKIP_CHANCE={SKIP_CHANCE}). No posts today.")
        sys.exit(0)

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    tavily = init_tavily()
    print("Tavily search client initialized." if tavily else "Tavily not available.")

    existing_posts = load_existing_posts()
    print(f"Loaded {len(existing_posts)} existing posts from {POSTS_JSON_PATH}")
    print(f"Posts this run: {POSTS_PER_RUN}")

    new_posts: list[dict] = []
    for i in range(POSTS_PER_RUN):
        all_posts_so_far = new_posts + existing_posts
        post = generate_post(client, all_posts_so_far, i, tavily=tavily)
        if post:
            new_posts.insert(0, post)  # newest first among today's posts
        else:
            print(f"  Skipping post {i + 1} due to errors.", file=sys.stderr)

    if not new_posts:
        print("\nNo new posts were generated. Exiting without modifying posts.json.")
        sys.exit(0)

    updated_posts = new_posts + existing_posts
    save_posts(updated_posts)

    print("\n=== Summary ===")
    print(f"Generated {len(new_posts)} new post(s):")
    for p in new_posts:
        print(f"  - [{p['date']}] {p['title']}")
    print(f"Total posts in posts.json: {len(updated_posts)}")


if __name__ == "__main__":
    main()
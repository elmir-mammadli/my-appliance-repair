#!/usr/bin/env python3
"""
Monthly SEO Strategy Generator for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions on the 1st of each month. Analyzes existing content,
researches trends via Tavily, and generates a full SEO strategy document.
"""

import json
import os
import re
import sys
from collections import Counter
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
CONTENT_DIR = Path(__file__).parent.parent.parent / "content"
COMPANY_NAME = "My Appliance Repair"
COMPANY_URL = "myappliance.us"
MODEL = "claude-sonnet-4-6"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_posts() -> list[dict]:
    if not POSTS_JSON_PATH.exists():
        print(f"ERROR: {POSTS_JSON_PATH} not found.", file=sys.stderr)
        sys.exit(1)
    with open(POSTS_JSON_PATH, encoding="utf-8") as f:
        return json.load(f)


def analyze_posts(posts: list[dict]) -> dict:
    """Extract content analytics from existing posts."""
    categories = Counter(p.get("category", "Unknown") for p in posts)
    titles = [p.get("title", "") for p in posts]
    slugs = [p.get("slug", "") for p in posts]
    authors = Counter(p.get("author", "") for p in posts)

    # Extract rough keywords from titles (words > 4 chars)
    all_words: list[str] = []
    for title in titles:
        words = re.findall(r"\b[a-z]{5,}\b", title.lower())
        all_words.extend(words)
    top_keywords = Counter(all_words).most_common(20)

    return {
        "total_posts": len(posts),
        "categories": dict(categories),
        "top_keywords": top_keywords,
        "recent_titles": titles[:10],  # 10 most recent
        "total_slugs": slugs,
    }


def next_month_label() -> tuple[str, str]:
    """Return (YYYY-MM, Month YYYY) for the coming month."""
    now = datetime.utcnow()
    if now.month == 12:
        year, month = now.year + 1, 1
    else:
        year, month = now.year, now.month + 1
    dt = datetime(year, month, 1)
    return dt.strftime("%Y-%m"), dt.strftime("%B %Y")


def current_month_label() -> str:
    return datetime.utcnow().strftime("%B %Y")


# ---------------------------------------------------------------------------
# Tavily helpers
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
        results = tavily.search(query=query, max_results=4)
        return results.get("results", [])
    except Exception as e:
        print(f"  [tavily] Search failed for '{query}': {e}", file=sys.stderr)
        return []


def gather_strategy_research(tavily, month_year: str, next_month: str) -> str:
    """Research CT appliance trends, seasonal topics, and content gaps."""
    if tavily is None:
        return ""

    queries = [
        f"Connecticut appliance repair search trends {month_year}",
        f"seasonal appliance issues homeowners {next_month}",
        f"appliance repair local SEO Connecticut 2026",
        f"home appliance problems spring summer Connecticut",
    ]

    all_results: list[dict] = []
    for q in queries:
        all_results.extend(tavily_search(tavily, q))

    if not all_results:
        return ""

    lines = [f"Web research — CT appliance trends and SEO signals for {next_month}:"]
    seen_urls: set[str] = set()
    for r in all_results:
        url = r.get("url", "").strip()
        if url in seen_urls:
            continue
        seen_urls.add(url)
        title = r.get("title", "").strip()
        snippet = r.get("content", "").strip()[:350]
        if title or snippet:
            lines.append(f"- {title}: {snippet} ({url})")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Strategy generation
# ---------------------------------------------------------------------------

def generate_strategy(
    client: anthropic.Anthropic,
    analytics: dict,
    research: str,
    next_month_ym: str,
    next_month_label: str,
) -> str | None:
    """Generate the full monthly SEO strategy document in Markdown."""

    categories_str = "\n".join(
        f"  - {cat}: {count} posts" for cat, count in sorted(analytics["categories"].items(), key=lambda x: -x[1])
    )
    top_kw_str = ", ".join(w for w, _ in analytics["top_keywords"][:15])
    recent_titles_str = "\n".join(f"  - {t}" for t in analytics["recent_titles"])
    research_block = f"\n{research}\n" if research else "\n(No live research available — use your knowledge of 2026 local SEO and seasonal appliance trends.)\n"

    prompt = f"""You are a senior SEO strategist for {COMPANY_NAME}, a Connecticut appliance repair company at {COMPANY_URL}.

Generate a comprehensive monthly SEO strategy document for {next_month_label}.

## Current content inventory:
- Total posts published: {analytics["total_posts"]}
- Category breakdown:
{categories_str}
- Most-used title keywords: {top_kw_str}
- 10 most recent post titles:
{recent_titles_str}
{research_block}
Generate a full SEO strategy document in Markdown. Include ALL of the following sections:

---

# SEO Strategy — {next_month_label}
*Generated for {COMPANY_NAME} ({COMPANY_URL})*

## Executive Summary
[2-3 paragraphs: what's working in the content mix, what gaps exist, overall strategic priority for the month]

## Keyword Opportunities
[10-15 long-tail keywords to target this month. Focus on local CT searches like "refrigerator repair Stamford CT", "washer repair New Haven CT", "dryer not heating Bridgeport", etc. For each keyword include: the keyword, estimated search intent (informational/transactional), and why it's a good target now]

## Content Calendar
[8 suggested blog post topics for {next_month_label}. For each include:
- **Suggested title**
- Target keyword(s)
- Category
- Why this will rank (2-3 sentences on the opportunity)
- Best publish week (Week 1, 2, 3, or 4)]

## Double-Down Recommendations
[Which existing categories/topics are getting good coverage and should be built on further. Reference the actual category counts above. Include rationale.]

## Technical SEO Notes
[3-5 structural improvements to focus on this month — internal linking strategy, heading structure, meta description quality, schema markup opportunities for a local repair business, page speed considerations]

## Local SEO Focus
[Specific CT city + service combinations to target this month. Include 8-10 specific geo+service combinations like "dishwasher repair Hartford CT", "appliance repair Norwalk CT". Explain seasonal/timing rationale for any that are time-sensitive.]

---

Write the full document now. Be specific and actionable — avoid generic advice. All recommendations should be grounded in the actual content inventory and Connecticut market context."""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [strategy] API error: {e}", file=sys.stderr)
        return None

    content = ""
    for block in response.content:
        if hasattr(block, "text"):
            content += block.text

    content = content.strip()

    # Strip any accidental markdown fences wrapping the whole output
    content = re.sub(r"^```(?:markdown)?\s*", "", content)
    content = re.sub(r"\s*```$", "", content).strip()

    return content if content else None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

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
        print("Tavily not available — strategy will use Claude knowledge only.")

    posts = load_posts()
    print(f"Loaded {len(posts)} posts from {POSTS_JSON_PATH}")

    # Analyze existing content
    print("Analyzing existing content inventory...")
    analytics = analyze_posts(posts)
    print(f"  Categories: {dict(analytics['categories'])}")
    print(f"  Total posts: {analytics['total_posts']}")

    # Determine target month
    next_ym, next_label = next_month_label()
    print(f"Generating strategy for: {next_label}")

    # Gather research
    if tavily:
        print("Gathering live research via Tavily...")
        research = gather_strategy_research(tavily, current_month_label(), next_label)
        if research:
            print(f"  Found {research.count(chr(10))} research snippets.")
        else:
            print("  No Tavily results — using Claude knowledge.")
    else:
        research = ""

    # Generate strategy
    print("Generating strategy document via Claude...")
    strategy_md = generate_strategy(client, analytics, research, next_ym, next_label)

    if not strategy_md:
        print("ERROR: Failed to generate strategy document.", file=sys.stderr)
        sys.exit(1)

    # Save strategy file
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    output_path = CONTENT_DIR / f"seo-strategy-{next_ym}.md"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(strategy_md)
        f.write("\n")

    print(f"\nStrategy saved to: {output_path}")

    # Also print to GitHub Actions output
    print("\n" + "=" * 60)
    print(f"MONTHLY SEO STRATEGY — {next_label}")
    print("=" * 60)
    print(strategy_md)
    print("=" * 60)


if __name__ == "__main__":
    main()

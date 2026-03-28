#!/usr/bin/env python3
"""
Daily SEO Article Auditor for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions daily. Audits and improves existing blog posts using
Tavily for current SEO signals and Claude API for rewriting.
"""

import json
import os
import re
import sys
import time
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


def save_posts(posts: list[dict]) -> None:
    with open(POSTS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        f.write("\n")


def today_string() -> str:
    return datetime.utcnow().strftime("%Y-%m-%d")


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
        results = tavily.search(query=query, max_results=3)
        return results.get("results", [])
    except Exception as e:
        print(f"  [tavily] Search failed for '{query}': {e}", file=sys.stderr)
        return []


def gather_seo_research(tavily, post: dict) -> str:
    """Gather current SEO best practices for a post's topic via Tavily."""
    if tavily is None:
        return ""

    title = post.get("title", "")
    category = post.get("category", "")

    queries = [
        f"2026 SEO best practices appliance repair blog {category}",
        f"Connecticut appliance repair local SEO {category}",
        f"{title[:60]} SEO optimization tips",
    ]

    all_results: list[dict] = []
    for q in queries:
        all_results.extend(tavily_search(tavily, q))

    if not all_results:
        return ""

    lines = ["Current SEO research and best practices from the web:"]
    for r in all_results:
        title_r = r.get("title", "").strip()
        snippet = r.get("content", "").strip()[:300]
        url = r.get("url", "").strip()
        if title_r or snippet:
            lines.append(f"- {title_r}: {snippet} ({url})")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# SEO audit and rewrite
# ---------------------------------------------------------------------------

def audit_and_improve_post(
    client: anthropic.Anthropic,
    post: dict,
    seo_research: str,
) -> dict | None:
    """
    Audit the post for SEO quality and rewrite content/excerpt if needed.
    Returns a dict with keys: needs_improvement, improved_content, improved_excerpt, changes_summary
    Returns None on API error.
    """
    current_content = post.get("content", "")
    current_excerpt = post.get("excerpt", "")
    title = post.get("title", "")
    category = post.get("category", "")
    slug = post.get("slug", "")

    research_block = f"\n{seo_research}\n" if seo_research else "\n(No live research available — use your knowledge of 2026 SEO best practices.)\n"

    prompt = f"""You are an SEO specialist auditing blog posts for {COMPANY_NAME}, a Connecticut appliance repair company at {COMPANY_URL}.

Post to audit:
- Title: {title}
- Category: {category}
- Slug: {slug}
- Current excerpt (meta description): {current_excerpt}
- Current content (HTML):
{current_content}
{research_block}
Audit this post against current SEO best practices. Check for:
1. Title tag optimization (compelling, includes target keyword, ~55-60 chars)
2. Keyword density and natural keyword usage (primary keyword should appear 3-5 times)
3. Heading structure (H2/H3 usage — should have 3+ H2s, H3s where appropriate)
4. Internal linking — are <a href="/#booking"> and <a href="/#contact"> anchor links present? They must be.
5. Meta description quality — excerpt should be 120-160 chars, compelling, includes keyword
6. Readability (short paragraphs, bullet points, scannable structure)
7. Semantic relevance to local Connecticut appliance repair
8. Brand mentions — {COMPANY_NAME} should appear 2-3 times

Then rewrite/improve the content HTML and excerpt. Rules:
- The content is HTML — output must be valid HTML
- Keep ALL existing fields intact — only return improved content and excerpt
- Preserve or ADD the branded anchor links: <a href="/#booking" style="color:#1e3a5f;font-weight:600;">book a service call</a> and <a href="/#contact" style="color:#1e3a5f;font-weight:600;">contact our team</a>
- Keep {COMPANY_NAME} brand mentions (2-3 per post)
- Do NOT add <html>, <head>, or <body> tags
- Improve keyword density, heading structure, and readability as needed
- If the excerpt is weak (under 120 chars or too generic), write a better one (120-155 chars)

Respond in this EXACT format:
NEEDS_IMPROVEMENT: [yes/no]
CHANGES_MADE: [1-3 sentence summary of what was improved and why]
IMPROVED_EXCERPT: [the improved excerpt, or "UNCHANGED" if it's already good]
IMPROVED_CONTENT:
[the full improved HTML content — everything after this line until END_CONTENT]
END_CONTENT"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        print(f"  [audit] API error for '{title}': {e}", file=sys.stderr)
        return None

    full_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            full_text += block.text

    if not full_text.strip():
        print(f"  [audit] Empty response for '{title}'", file=sys.stderr)
        return None

    # Parse response
    needs_improvement = False
    needs_match = re.search(r"^NEEDS_IMPROVEMENT:\s*(.+)$", full_text, re.MULTILINE | re.IGNORECASE)
    if needs_match:
        needs_improvement = needs_match.group(1).strip().lower() == "yes"

    changes_summary = ""
    changes_match = re.search(r"^CHANGES_MADE:\s*(.+)$", full_text, re.MULTILINE | re.IGNORECASE)
    if changes_match:
        changes_summary = changes_match.group(1).strip()

    improved_excerpt = current_excerpt
    excerpt_match = re.search(r"^IMPROVED_EXCERPT:\s*(.+)$", full_text, re.MULTILINE | re.IGNORECASE)
    if excerpt_match:
        val = excerpt_match.group(1).strip()
        if val.upper() != "UNCHANGED" and val:
            improved_excerpt = val

    # Extract improved content between IMPROVED_CONTENT: and END_CONTENT
    content_match = re.search(
        r"IMPROVED_CONTENT:\s*\n(.*?)(?:\nEND_CONTENT|\Z)",
        full_text,
        re.DOTALL,
    )
    improved_content = current_content
    if content_match:
        extracted = content_match.group(1).strip()
        # Strip accidental markdown fences
        extracted = re.sub(r"^```html\s*", "", extracted)
        extracted = re.sub(r"\s*```$", "", extracted).strip()
        if extracted:
            improved_content = extracted

    return {
        "needs_improvement": needs_improvement,
        "improved_content": improved_content,
        "improved_excerpt": improved_excerpt,
        "changes_summary": changes_summary,
    }


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
        print("Tavily search client initialized — live SEO research enabled.")
    else:
        print("Tavily not available — auditing with Claude knowledge only.")

    posts = load_posts()
    print(f"Loaded {len(posts)} posts from {POSTS_JSON_PATH}")

    audited_count = 0
    improved_count = 0
    improvement_log: list[str] = []

    for i, post in enumerate(posts):
        title = post.get("title", f"(post {i})")
        slug = post.get("slug", "")
        print(f"\n[{i + 1}/{len(posts)}] Auditing: {title[:70]}")

        # Gather live SEO research
        if tavily:
            print("  Gathering SEO research via Tavily...")
            seo_research = gather_seo_research(tavily, post)
            if seo_research:
                print(f"  Found {seo_research.count(chr(10))} research snippets.")
            else:
                print("  No Tavily results — using Claude knowledge.")
        else:
            seo_research = ""

        # Audit and improve
        result = audit_and_improve_post(client, post, seo_research)
        audited_count += 1

        if result is None:
            print(f"  ERROR: Audit failed for '{title}' — skipping.", file=sys.stderr)
        elif result["needs_improvement"] or result["improved_content"] != post.get("content", ""):
            # Apply improvements
            posts[i] = {
                **post,
                "content": result["improved_content"],
                "excerpt": result["improved_excerpt"],
            }
            improved_count += 1
            summary = result["changes_summary"] or "Content optimized."
            print(f"  IMPROVED: {summary}")
            improvement_log.append(f"- [{slug}] {summary}")
        else:
            print("  No changes needed.")

        # Be gentle on APIs — 1 second sleep between posts
        if i < len(posts) - 1:
            time.sleep(1)

    # Save only if there were changes
    original_json = json.dumps(load_posts(), indent=2, ensure_ascii=False) + "\n"
    new_json = json.dumps(posts, indent=2, ensure_ascii=False) + "\n"

    if new_json != original_json:
        save_posts(posts)
        print(f"\nSaved updated posts to {POSTS_JSON_PATH}")
    else:
        print("\nNo changes to posts.json — nothing to save.")

    # Summary
    print(f"\n{'=' * 50}")
    print(f"SEO AUDIT SUMMARY — {today_string()}")
    print(f"{'=' * 50}")
    print(f"Posts audited:  {audited_count}")
    print(f"Posts improved: {improved_count}")
    if improvement_log:
        print("\nKey improvements:")
        for entry in improvement_log:
            print(f"  {entry}")
    else:
        print("\nAll posts were already well-optimized.")


if __name__ == "__main__":
    main()

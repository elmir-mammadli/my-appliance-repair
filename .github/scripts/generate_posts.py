#!/usr/bin/env python3
"""
Automated blog post generator for MY APPLIANCE Repair (myappliance.us)
Runs via GitHub Actions. Generates blog posts using Claude API.

v3 — technical humanizer rewrite. Changes vs v2:
  - Persona upgraded to 20-year veteran with deep brand/part knowledge
  - STYLE_RULES expanded with humanizer patterns and web UX writing principles
  - TECHNICAL_GROUNDING block gives Claude real facts to cite (costs, lifespans,
    failure rates, part names, energy stats) — no more vague platitudes
  - Writing prompt now requires front-loading value in every section opening
  - Topic prompt requires factual hooks in the research outline
  - Sanitizer adds explicit em-dash/en-dash unicode escapes as extra guard
  - All else (JSON handling, Tavily, image pools, cadence) unchanged
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

POSTS_PER_RUN = int(os.environ.get("POSTS_PER_RUN", 0)) or random.choice([1, 1, 2])
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
IMAGE_NO_REPEAT_WINDOW = 9

# ---------------------------------------------------------------------------
# Voice / persona / style
# ---------------------------------------------------------------------------

WRITER_PERSONA = f"""You are Elmir, owner of {COMPANY_NAME} in Connecticut. You have been
doing appliance repair for 20 years, first as a technician, now running your own shop.
You've personally done thousands of service calls.

You know this business at a part-number level. You know that a Whirlpool dryer thermal
fuse (part 3392519) costs about $6 and takes 20 minutes to replace. You know Samsung
French door fridges from 2017-2020 have a disproportionate ice maker control board
failure rate. You know GE dishwashers from the early 2010s had circulation pump seals
that would go around year 8. You know which brands' control boards cost more to replace
than the machine is worth, and you tell customers that straight.

You write the company blog yourself, usually in the evening. You write like you talk
to customers at their kitchen table: direct, specific, occasionally opinionated, never
selling anything. You use real numbers (not round numbers), real part names, real
brand patterns. You've earned the right to have opinions and you share them."""

TECHNICAL_GROUNDING = """Technical facts you can draw from freely (cite these naturally in the post,
don't dump them all in — pick the ones that fit the topic):

APPLIANCE LIFESPANS (industry averages):
- Refrigerators: 13-17 years. Compressors often outlast the electronics.
- Washers: 10-14 years top-load, 12-16 years front-load (if maintained).
- Dryers: 13-15 years. Electric dryers outlast gas dryers on average.
- Dishwashers: 9-13 years. Heating elements and door seals go first.
- Ovens/ranges: 15-20 years. Gas ranges last longer than electric on average.
- Microwaves (countertop): 7-10 years. Built-in last longer.

REPAIR VS REPLACE RULE OF THUMB:
- The 50% rule: if repair costs more than 50% of a new comparable unit, replace.
- But age matters more: a 12-year-old fridge that needs a $400 compressor is a bad
  bet even if a new one costs $1,000.

REAL PART COSTS (ballpark, installed with labor):
- Dryer thermal fuse: $60-90 total
- Washer lid switch: $75-110 total
- Refrigerator start relay: $80-120 total
- Dishwasher heating element: $120-180 total
- Oven igniter (gas): $100-160 total
- Control board (any appliance): $180-450+ depending on brand/model
- Washing machine pump: $130-200 total

KNOWN BRAND FAILURE PATTERNS (can reference these as observations, not absolutes):
- Samsung refrigerators (French door, 2015-2022): ice maker and ice maker
  control board failures are very common around years 4-7.
- LG washing machines (front-load, 2010-2016): stator/rotor assembly and
  drum bearing failures show up around year 6-9.
- Whirlpool/Maytag dryers (many models): thermal fuse failure is the single most
  common repair, usually from a clogged vent line.
- GE/Profile dishwashers (2009-2015): control board failures common, parts
  expensive relative to machine value by year 10.
- Bosch dishwashers: door latch and control panel issues, but generally
  one of the longer-lasting brands.

ENERGY FACTS:
- A refrigerator from 2005 uses roughly 2-3x the electricity of a 2023
  Energy Star model.
- Leaving a refrigerator door seal leaking for a year can add $50-100 to
  annual electric bills depending on your rate.
- Dryer vent clogged with lint increases drying time and can add $80-150/year
  in wasted electricity. It's also a fire hazard.
- Water heater is the second biggest energy user in most homes after HVAC.
  Average dishwasher uses about 3-4 gallons per cycle (modern); older models
  used 10-15 gallons.

SAFETY FACTS:
- NFPA data: dryers cause about 15,000 home fires a year in the US, mostly
  from lint buildup.
- Gas oven igniter that glows but won't light often means it's drawing too
  much current and needs replacement (not cleaning).
- Never run a washer or dryer while asleep or away from home."""

STYLE_RULES = """HARD STYLE RULES (violating any of these ruins the post):

BANNED punctuation and typography:
- NO em dashes (---, —, &#8212;). Not ever. Replace with a comma, a period,
  or parentheses.
- NO en dashes (–, &#8211;). Same rule.
- No double hyphens (--) used as dashes.
- No semicolons.
- No bold inside paragraphs (bold headings only).
- No curly/smart quotes. Use straight quotes only.

BANNED phrases (or close variants of):
- "it's not just X, it's Y" / "more than just"
- "whether you're X or Y"
- "In today's world" / "When it comes to" / "At the end of the day"
- "it's worth noting" / "it's important to note" / "keep in mind"
- "Additionally" / "Moreover" / "Furthermore" / "In conclusion" / "To summarize"
- "game-changer" / "peace of mind" / "seamless" / "elevate" / "streamline"
- "look no further" / "think again" / "you might be surprised"
- "The Bottom Line" / "Final Thoughts" / "Wrapping Up" as headings
- Rule-of-three adjective lists ("fast, reliable, and affordable"). Two max.
- "dive into" / "delve into" / "unpack" / "explore"
- Any phrase that sounds like it belongs in a press release

RHYTHM AND HUMANIZER PATTERNS:
- Vary paragraph length dramatically. Some paragraphs are one sentence. One
  might be six. This is intentional, not sloppy.
- Vary sentence length the same way. Mix fragments with longer sentences.
  Like this. Then occasionally write one that runs a bit longer to explain
  something nuanced that needs the extra space to land properly.
- Contractions everywhere: it's, don't, you'll, won't, can't, that's, I've.
- Fine to start sentences with And, But, or So.
- Occasional parenthetical aside (like this) to add texture. Not overdone.
- Use specific non-round numbers: "$47" not "$50", "about 8 years" not "a decade".
- Hedge exactly once when genuinely uncertain: "I'd guess around..." or
  "In my experience, usually..." Don't hedge on things you know cold.
- Include one opinion stated plainly. Not "some might say" or "many feel."
  Just: "Honestly, I'd skip the extended warranty."
- Don't answer everything perfectly. One small detail can be "I don't remember
  exactly which model, but..." This is human.

WEB-FRIENDLY WRITING RULES:
- The first sentence of every section must be the most important thing in that
  section. Don't bury the lead.
- Paragraphs are 1-4 sentences. If you find yourself writing five sentences in
  a row, break it up.
- Write for someone who is skimming. They should still get the key point from
  just the first sentence of each paragraph.
- Use plain, common words. "Use" not "utilize." "Show" not "demonstrate."
  "Help" not "facilitate."
- No section heading should need the previous heading to make sense.
- Transitions should feel spoken, not written. "So here's the thing." or
  "That said..." or "Which brings up something most people don't think about."

STRUCTURE:
- Headings must NOT be parallel or formulaic.
  Bad: "Understanding the Problem" / "Why It Matters" / "The Solution"
  Good: "The noise usually means the fan" / "One thing people always skip"
- Don't open with a rhetorical question or a dictionary definition. Open
  mid-thought, like a person launching into a story or complaint or fact.
- Don't summarize at the end. End on advice, a strong opinion, or the CTA.
- Sections don't need equal length. One section can be two sentences.
- At most ONE <ul> list in the whole post, only if a list genuinely helps
  comprehension. Prefer prose.
- Mention Connecticut at most once in the body text, if at all."""

VOICE_SAMPLE = """Example of the target voice (copy the feel and technical grounding, not the content):

<p>The start relay on a compressor is a $15 part. I've replaced hundreds of them.
The symptom is almost always the same: fridge runs warm, you hear a click every
few minutes but the compressor never actually starts. Shake the relay off the
compressor side and you'll hear a rattle if it's failed. Most people don't know
this is even a part you can check yourself.</p>
<p>We charged a woman in Hamden $95 last month for that fix, including the service
call. She'd already called a big-box repair service that quoted her $340 and a
two-week wait. Same part, same 20 minutes of labor.</p>
<p>I'm not saying we're the only ones who are fair. But get a second opinion before
you spend serious money or replace the machine.</p>"""


TITLE_RULES = """TITLE RULES:
- NO colons. No "Main Title: Subtitle" structure, ever.
- Do NOT start with "Why Your". No "A Guide to", "Survival Guide",
  "Everything You Need to Know", "The Hidden Cost of", or "The Ultimate".
- Do NOT put "Connecticut" or "CT" in the title unless the post is specifically
  about a state regulation, utility rebate program, or Connecticut-specific topic.
  Seasonal weather topics don't count.
- Aim for under 60 characters.
- The title should read like something a person typed, not an SEO template.
- Rotate between these formats (pick a DIFFERENT format than the recent titles below):
  a plain statement of fact ("Hard water is quietly wrecking your dishwasher"),
  a direct question ("Ice maker died again?"),
  an imperative ("Stop rinsing your dishes before the dishwasher"),
  a mild observation ("Your fridge hates July as much as you do"),
  a specific technical finding ("That clicking noise is almost always the start relay"),
  a counterintuitive claim ("Newer isn't always better for washing machines")."""


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
    # Em dashes and en dashes — every possible encoding
    (r"—", ", "),                           # em dash (unicode)
    (r"–", ", "),                           # en dash (unicode)
    (r"&#8212;", ", "),                          # em dash (HTML entity)
    (r"&#8211;", ", "),                          # en dash (HTML entity)
    (r"&mdash;", ", "),                          # em dash (named entity)
    (r"&ndash;", ", "),                          # en dash (named entity)
    (r"\s*---+\s*", ", "),                       # triple+ hyphen dash
    (r"\s+--\s+", ", "),                         # double hyphen used as dash
    # Semicolons in prose
    (r";\s+", ", "),
    # Banned AI filler phrases
    (r"(?i)\bit'?s (?:also )?worth noting that\s*", ""),
    (r"(?i)\bit'?s important to (?:note|remember|understand) that\s*", ""),
    (r"(?i)\bkeep in mind that\s*", ""),
    (r"(?i)\bin today'?s (?:world|fast-paced world|market),?\s*", ""),
    (r"(?i)\bwhen it comes to\b", "with"),
    (r"(?i)\bat the end of the day,?\s*", ""),
    (r"(?i)(<p>)(?:Additionally|Moreover|Furthermore|In conclusion|To summarize),\s*", r"\1"),
    (r"(?i)\. (?:Additionally|Moreover|Furthermore),\s*", ". "),
    # Curly quotes -> straight
    (r"[“”]", '"'),
    (r"[‘’]", "'"),
]


def sanitize(text: str) -> str:
    for pattern, repl in BANNED_REPLACEMENTS:
        text = re.sub(pattern, repl, text)
    # Capitalize first letter after <p> tag if it slipped through lowercase
    text = re.sub(r"(<p>)([a-z])", lambda m: m.group(1) + m.group(2).upper(), text)
    # Clean up double commas left by replacements
    text = re.sub(r",\s*,", ",", text)
    text = re.sub(r"  +", " ", text)
    return text.strip()


def sanitize_title(title: str) -> str:
    title = sanitize(title)
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
    lines = ["Recent news and data from the web (paraphrase, never quote directly):"]
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

All existing post titles (do NOT duplicate any of these topics):
{existing_list}

Requirements for the new topic:
- Genuinely useful to homeowners: appliance repair, maintenance, energy savings,
  buying advice, troubleshooting, seasonal issues, or smart home appliances
- Must not duplicate anything already covered above
- Must be grounded in real patterns from service calls, not generic advice

{TITLE_RULES}

The 5 most recent titles are below. Your new title must NOT resemble any of
their structures or opening words:
{recent_titles}

The EXCERPT must sound human: no colons, no em dashes, no "Learn how to",
no "Discover", no "In this post". Write it like the first thing you'd say
to a customer. Don't mention Connecticut in the excerpt.

For the RESEARCH SUMMARY, include:
- The main angle and what makes this post different from generic advice
- At least one specific fact, stat, or part cost that will appear in the post
- At least one brand or model pattern to reference (can be a common one you see)
- 4-6 loose section ideas with concrete details, not just headings
- One anecdote seed from a real-feeling service call
- Any seasonal or regional context if it fits naturally

Format your response EXACTLY like this:
TITLE: [title following all the rules above]
SLUG: [kebab-case-url-slug]
CATEGORY: [one of: Refrigerators, Dishwashers, Maintenance, Tips & Advice, Smart Home, Technology, Washers & Dryers, Ovens & Ranges, Energy Savings, Safety]
EXCERPT: [casual one-or-two sentence hook, max 155 characters, no em dashes]
RESEARCH SUMMARY:
[outline as described above]"""

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
    target_words = random.randrange(500, 1100, 50)

    link_options = [
        '<a href="/#booking" style="color:#1e3a5f;font-weight:600;">book a service call</a>',
        '<a href="/#contact" style="color:#1e3a5f;font-weight:600;">contact our team</a>',
        '<a href="/#services" style="color:#1e3a5f;font-weight:600;">our appliance repair services</a>',
    ]
    chosen_links = random.sample(link_options, k=2)

    prompt = f"""{WRITER_PERSONA}

{STYLE_RULES}

{TECHNICAL_GROUNDING}

{VOICE_SAMPLE}
{context_block}
Write the blog post now.

Title (already rendered by the site — do NOT repeat it in the content): {research["title"]}
Category: {research["category"]}
Target length: roughly {target_words} words. If you're done saying what you have
to say before that, stop. Don't pad to hit a number.

Outline (deviate freely if your own train of thought goes somewhere better):
{research["research_summary"]}

WHAT MAKES THIS POST TECHNICALLY AUTHORITATIVE:
- Use at least two specific numbers from the Technical Grounding block (costs,
  years, stats) that are relevant to this topic. Cite them naturally in prose.
- Name at least one specific part by its function (thermal fuse, start relay,
  control board, circulation pump, door latch, etc.). Explain in one sentence
  what it does and what it costs to fix, roughly.
- Name at least one brand or model pattern if it's honest and relevant.
- State at least one thing confidently that the reader probably doesn't know
  and that will change how they think about this appliance.

HUMANIZER CHECKLIST (all of these must appear somewhere in the post):
- One anecdote or reference to a specific service call (city, symptom, outcome)
- One opinion stated directly, not hedged ("I'd skip the warranty", "Don't bother")
- At least two very short paragraphs (1 sentence each)
- One longer paragraph (4-5 sentences) that builds to a point
- One sentence that starts with And, But, or So

Branding, kept light:
- Mention "{COMPANY_NAME}" once or twice, naturally, in first person ("we").
- Work these two links into mid-paragraph sentences (not in a standalone CTA block):
  {chosen_links[0]}
  {chosen_links[1]}
- End with ONE short, casual closing paragraph (two sentences max) that includes
  <a href="/#booking" style="color:#1e3a5f;font-weight:600;">schedule a repair</a>.
  No hype. No "Don't hesitate to." Just practical.

Output ONLY the HTML body content using <p>, <h2>, <h3>, and at most one <ul>.
No <h1>. No code fences. No preamble. No postamble."""

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
            new_posts.insert(0, post)
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

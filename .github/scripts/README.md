# Automated Blog Post Generator

`generate_posts.py` generates 2 new blog posts per day for the MY APPLIANCE Repair site using the Claude API with web search. Each run:

1. Reads existing posts from `content/posts.json` to avoid duplicate topics
2. Makes a **research call** (Claude + web search) to pick a fresh topic and gather current data
3. Makes a **writing call** to produce a complete 700–900 word HTML blog post
4. Prepends the new posts to `content/posts.json` (newest first)

The GitHub Actions workflow then commits and pushes any changes automatically.

## Setup

### 1. Add the API key secret

In your GitHub repository, go to **Settings → Secrets and variables → Actions** and add:

| Secret name         | Value                          |
|---------------------|--------------------------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key         |

### 2. That's it

The workflow runs automatically at 9 AM UTC (~5 AM ET) every day. No other configuration is required.

## Manual trigger

To run the workflow on demand:

1. Go to the **Actions** tab in your GitHub repository
2. Select **Generate Daily Blog Posts** from the left sidebar
3. Click **Run workflow** → **Run workflow**

Useful for testing or backfilling posts without waiting for the daily schedule.

## Adjusting the schedule

Edit the `cron` expression in `.github/workflows/generate-blog-posts.yml`:

```yaml
on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM UTC daily
```

Examples:
- `'0 12 * * *'` — noon UTC daily
- `'0 9 * * 1'` — 9 AM UTC every Monday only
- `'0 9 * * 1,3,5'` — 9 AM UTC Mon/Wed/Fri

See [crontab.guru](https://crontab.guru) for help with cron syntax.

## Adjusting the number of posts per run

Change `POSTS_PER_RUN` at the top of `generate_posts.py`:

```python
POSTS_PER_RUN = 2  # set to 1 to halve API usage
```

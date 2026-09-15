# Tadado Landing

Marketing site for [Tadado](https://tadado.app) — Taboo & Heads Up party word game with AI decks.

## Stack

- Next.js 16.3 (App Router)
- Tailwind CSS 4
- 17 locales (`/en`, `/tr`, …)
- EN/TR SEO blog (`/en/blog`, `/tr/blog`)
- Static export-ready legal pages (`/terms-of-use`, `/privacy-policy`)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — root redirects to your browser locale.

## Environment

Copy `.env.example` to `.env.local` and set:

- `APPLE_TEAM_ID` — for Universal Links
- `ANDROID_SHA256_FINGERPRINT` — for Android App Links

## Deploy

Target domain: **tadado.app** (Vercel recommended).

```bash
npm run build
npm start
```

## Support

tadado.ai@gmail.com

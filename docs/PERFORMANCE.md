# Performance and browser console

## `contentscript.js` / `ObjectMultiplex` warnings

If DevTools shows errors such as:

- `MaxListenersExceededWarning` (many `close` / `end` listeners)
- `ObjectMultiplex - orphaned data for stream "app-init-liveness"` or `"background-liveness"`

they usually come from a **browser extension** (often a crypto wallet), not from this repository. There is no `contentscript.js` or `ObjectMultiplex` in the Tadado landing source.

**Verify:** open the site in a **private window with extensions disabled** and reload. If the warnings disappear, no app fix is required.

## Lighthouse

Measure production builds with extensions off:

```bash
npm run build && npm start
npx lighthouse http://localhost:3000/en --only-categories=performance,seo,accessibility,best-practices --preset=desktop
```

Client-side PostHog is disabled to reduce JavaScript and third-party work. GA4 remains enabled when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

### Baseline (local production, `npm run start`, `/en`)

| Category | Desktop | Mobile |
| --- | --- | --- |
| Performance | ~61 | ~47 |
| SEO | ~92 | 100 |
| Accessibility | ~90 | ~93 |
| Best practices | 100 | ~79 |

Scores vary with network, GA/Meta env vars, and YouTube hero thumbnail. Use `npm run lighthouse:en` and `npm run lighthouse:en:mobile` after starting the server.

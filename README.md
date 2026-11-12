# nexthype.local

Website for Nexthype Digital Agency (Rawai, Phuket). pnpm workspace, ready for a NestJS API next to the site.

```
nexthype.local/
├─ web/                     Next.js 16 · TypeScript · App Router · Tailwind 4 (no preflight)
│  ├─ app/[lang]/           one prerendered page per language: /en /th /zh /ru
│  ├─ app/components/       sections; Behaviours.tsx holds the scroll motion, ChatPanel.tsx the chat
│  ├─ content/              copy and prices: translations.ts, plans.ts, priceList.ts, chat.ts
│  ├─ lib/                  env.ts (every env value), i18n.ts, chat.ts, locales.ts
│  ├─ proxy.ts              "/" → visitor's language (last choice, then browser language)
│  └─ public/assets/        logo, posters and marble, taken from the Facebook page and @nexthype_th
└─ server/                  (later) NestJS API
```

## Run

```bash
pnpm install
pnpm dev        # http://localhost:4070
pnpm build      # production build, type-checks every translation key
pnpm start      # serve the build on 4070
```

## Environment

Copy `web/.env.example` to `web/.env.local`. Every key is explained in that file.
Chat apps (LINE, WhatsApp, Telegram, WeChat) appear as soon as their ID is filled in; empty ones stay hidden.
`NEXT_PUBLIC_NOINDEX` stays `true` until the real launch.

## Editing content

- Text: English is the key in `web/content/translations.ts`; add the Thai, Chinese and Russian next to it.
  A key typed wrong in a component fails the build.
- Prices: `web/content/plans.ts` (monthly plans) and `web/content/priceList.ts` (single projects).

## Adding the API later

```bash
pnpm dlx @nestjs/cli new server --package-manager pnpm --skip-git
```

Then uncomment `server` in `pnpm-workspace.yaml`, give it port 4071 and set `API_URL` in `web/.env.local`.

## Deploy (Vercel)

Import the GitHub repo, set **Root Directory** to `web`, and copy the keys from `web/.env.example` into the project's
environment variables. Vercel's free Hobby plan is for non-commercial use: fine for the demo, use Pro (or the usual
GitLab CI + PM2 server) for the live client site.

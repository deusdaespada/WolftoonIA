# Aichiow — Manhwa & AI

A trimmed version of Aichiow focused on two features:

- **Manhwa** — Browse, search, filter by genre, and read manhwa chapters via MangaDex
- **Aichixia AI** — AI assistant for manhwa/anime recommendations and screenshot scanning via trace.moe

---

## Tech Stack
- **Next.js 14** + TypeScript
- **Tailwind CSS** + Framer Motion
- **Supabase** (auth + favorites)
- **AniList API** (manhwa data)
- **MangaDex API** (chapter reading)
- **Aichixia API** (AI chat proxy)
- **trace.moe API** (anime screenshot scan)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/manhwa` | Browse manhwa list with genre filters |
| `/manhwa/[id]` | Manhwa detail + MangaDex chapters |
| `/manhwa/genre/[name]` | Filter manhwa by genre |
| `/read/[chapterId]` | Chapter reader |
| `/aichixia` | AI assistant chat |
| `/auth/login` | Login |
| `/auth/register` | Register |
| `/profile` | User profile & favorites |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Fill in your Supabase credentials in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 4. Run dev server
npm run dev
```

---

## What was removed vs original Aichiow
- Anime section (home, explore, schedule, trailers, characters)
- Manga (MangaDex standalone manga section)
- Light Novels
- Community page
- Watch page

What remains: **Manhwa + Aichixia AI + Auth + Profile**

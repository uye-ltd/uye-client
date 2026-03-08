# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**uye-client** is the Next.js 14 frontend for UYEBAR RADIO — a web radio platform that streams music via Icecast/Liquidsoap. This is a standalone static SPA (`output: 'export'`) served by nginx. All pages are client components; there is no SSR.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # static export → out/
npm run lint     # ESLint
```

> The Dockerfile uses **pnpm** (not npm). Local development uses npm.

## Architecture

Follows **Feature-Sliced Design**:

```
src/
  shared/       # config (env, channel definitions), API client, global styles
  entities/     # TypeScript types only: Channel, NowPlaying, User, Track
  features/     # business logic slices
    auth/         # Zustand store (persisted to localStorage as 'uyebar-auth') + auth API
    audio-player/ # useAudioPlayer hook (HTMLAudioElement ref)
    now-playing/  # nowPlayingApi + useNowPlaying hook
    track-library/# trackApi (save/list/delete tracks)
    profile/      # profileApi (get user, update profile/avatar)
  widgets/      # Sidebar, Footer, MainLayout (composites used across pages)
  app/          # Next.js App Router pages
```

### Path alias
`@/` maps to `./src/`.

### API layer
`src/shared/api/client.ts` — thin `fetch` wrapper. All requests use `credentials: 'include'` (session cookies). The `profileApi` uses raw `fetch` directly (multipart/form-data for avatar upload).

### Key API endpoints (backend)
- `GET /api/now-playing/<number>` — current track on channel
- `GET /api/background-save/<number>` — save current track to user's library
- `GET /api/users/<username>` — user profile
- `GET /api/users/<username>/tracks` — user track history
- `DELETE /api/tracks/<id>` — delete saved track
- `POST /api/profile` — update bio/avatar (multipart)
- `GET /uploads/<username>/<layer>` — avatar image (layer 1/2/3)
- `GET /covers/cover-<channelId>-<layer>.jpg` — channel cover art

### Environment variables
Copy `.env.example` to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8092      # Flask backend / nginx proxy
NEXT_PUBLIC_ICECAST_URL=http://localhost:8090  # Icecast (audio streams + cover art)
```

`NEXT_PUBLIC_*` vars are baked in at build time. Pass them as Docker build args when building the image.

### Docker (production)
```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_ICECAST_URL=https://icecast.example.com \
  -t uyebar-client .
```
Builds a 3-stage image: deps (pnpm install) → builder (next build) → nginx (serves `out/`).

## Data flow notes

- Auth state is persisted in localStorage via Zustand `persist` middleware. Check `useAuthStore` before making authenticated requests.
- React Query wraps all API calls (staleTime: 5s, retry: 1). Use `useQuery`/`useMutation` in page components; keep raw API functions in `features/<name>/api/`.
- The two channels are statically defined in `src/shared/config/channels.ts` — there is no channels list endpoint.

# uye-client

Frontend for **UYEBAR RADIO** — a web radio platform that streams music via Icecast/Liquidsoap.

Built with Next.js 14 as a fully static SPA (`output: 'export'`), served by nginx. All pages are client components; there is no SSR.

## Stack

- **Next.js 14** (static export)
- **React Query** — data fetching
- **Zustand** — auth state (persisted to localStorage)
- **React Hook Form** — forms
- **TypeScript**

## Local Development

```bash
cp .env.example .env.local   # configure env vars
npm install
npm run dev                  # http://localhost:3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Flask backend / nginx proxy (e.g. `http://localhost:8092`) |
| `NEXT_PUBLIC_ICECAST_URL` | Icecast server for audio streams and cover art (e.g. `http://localhost:8090`) |

These are baked in at build time. For production, pass them as Docker build args.

## Commands

```bash
npm run dev      # start dev server
npm run build    # static export → out/
npm run lint     # ESLint
```

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_ICECAST_URL=https://icecast.example.com \
  -t uye-client .
```

3-stage build: `deps` (pnpm install) → `builder` (next build) → `nginx` (serves `out/`).

> The Dockerfile uses **pnpm**. Local development uses npm.

## Project Structure

Follows [Feature-Sliced Design](https://feature-sliced.design/):

```
src/
  shared/         # config (env, channels), API client, global styles
  entities/       # TypeScript types: Channel, NowPlaying, User, Track
  features/
    auth/           # Zustand store + auth API
    audio-player/   # useAudioPlayer hook (HTMLAudioElement)
    now-playing/    # nowPlayingApi + useNowPlaying hook
    track-library/  # trackApi (save/list/delete tracks)
    profile/        # profileApi (get user, update profile/avatar)
  widgets/        # Sidebar, Footer, MainLayout
  app/            # Next.js App Router pages
```

Path alias: `@/` → `./src/`

## CI/CD

On every push to `master`, GitHub Actions builds the Docker image and pushes it to the GitHub Container Registry:

```
ghcr.io/uye-ltd/uye-client:latest
```

The workflow runs on the self-hosted `uye-runner` runner. Required repository secrets:

| Secret | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Production API URL |
| `NEXT_PUBLIC_ICECAST_URL` | Production Icecast URL |

Apps pull the updated image and restart themselves independently (e.g. via [Watchtower](https://containrrr.dev/watchtower/)).

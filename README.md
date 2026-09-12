# IMDB Stream

An IMDb-inspired movie and TV show discovery platform built with Next.js (App Router). Browse popular movies, TV shows, and people with rich detail pages, multi-criteria filtering, full-text search, an AI recommendation assistant, Firebase authentication, bilingual (English / Arabic) support, and PWA offline support.

> **Note on naming:** the project is registered in `package.json` as `IMDB stream`; the browser metadata title is `IMDb`; the PWA manifest uses `IMDB-Stream`; and the in-app AI assistant brands itself as **SmartStream AI** in its system prompt. This README uses the package name throughout.

---

## Core Features

- **Home page** — hero banner (`trending/movie/week`) plus curated rows: Popular Movies, Top Rated, Now Playing, Trending TV, Popular TV, Airing Today, and Popular Actors.
- **Movies & TV catalogs** — filterable listings driven by URL search params (genre, country, language, year, rating, sort, adult toggle) with responsive grids and pagination.
- **Rich detail pages** — movies, TV shows, seasons, episodes, people, collections, production companies, and TMDB lists.
- **Search** — debounced header search via TMDB `search/multi` with a results dropdown.
- **AI Assistant** — a slide-over chat (floating action button) powered by the Groq API that returns structured recommendations rendered as clickable TV/movie cards.
- **Favorites & Watchlist** — Firestore-backed, per-user collections with add/remove and "delete all".
- **Authentication** — Firebase email/password, Google, phone (reCAPTCHA + OTP), and anonymous guest sign-in, plus forgot/reset password flows.
- **Internationalization** — English and Arabic with full RTL layout via `next-intl`.
- **Theming** — light / dark / system with an OKLCH design token system.
- **PWA / Offline** — service worker via Serwist with precaching, TMDB image caching, and an offline fallback page.

---

## Tech Stack

| Category                 | Technology                                               |
| ------------------------ | -------------------------------------------------------- |
| **Framework**            | Next.js 16.2.9 (App Router, React Compiler enabled)      |
| **Language**             | TypeScript 5 (strict)                                    |
| **Rendering**            | Server Components + Client Components, ISR (`revalidate`) |
| **Styling**              | Tailwind CSS v4 + `tw-animate-css`                       |
| **UI Primitives**        | shadcn/ui (radix-nova style) + Radix UI 1.6              |
| **State Management**     | URL search params + React Context (auth via `AuthProvider`) |
| **Internationalization** | next-intl 4 (English / Arabic, RTL)                      |
| **Authentication**       | Firebase Auth 12 (email, Google, phone, anonymous)       |
| **Database**             | Firebase Firestore (favorites, watchlist)                |
| **Data Fetching**        | Native `fetch` (server) + Axios (client)                 |
| **HTTP Client**          | Axios                                                    |
| **Carousels**            | Swiper 12                                                |
| **Animations**           | Motion (formerly Framer Motion)                          |
| **Forms**                | react-hook-form                                          |
| **Icons**                | lucide-react                                             |
| **Toasts**               | react-hot-toast                                          |
| **Phone Input**          | react-phone-number-input                                 |
| **Theme**                | next-themes                                              |
| **PWA / Service Worker** | Serwist 9 (`@serwist/turbopack`)                         |
| **CSS Utilities**        | clsx, tailwind-merge, class-variance-authority           |
| **Fonts**                | Roboto (`next/font/google`)                              |
| **Linting**              | ESLint 9 (flat config) with `eslint-config-next`         |
| **Formatting**           | Prettier 3                                               |
| **Package Manager**      | npm                                                      |

### Installed but not currently used

The following dependencies exist in `package.json` but have **no imports in `src/`**:

| Dependency              | Purpose (potential)                          |
| ----------------------- | -------------------------------------------- |
| `@tanstack/react-query` | Client-side data fetching / caching          |
| `zustand`               | Global state store                           |
| `react-player`          | Media playback                               |
| `hookli`                | Streaming data-hook utilities                |

`jest` is installed as a devDependency but no test files or scripts are configured yet (see Roadmap).

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Localized routes (en, ar)
│   │   ├── layout.tsx            # Root layout (Header, Footer, providers, AI chat)
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles & OKLCH design tokens
│   │   ├── loading.tsx           # Root loading skeleton
│   │   ├── global-not-found.tsx  # 404 page
│   │   ├── about|careers|contact|cookies|faq|feedback|guidelines|help|press|privacy|terms/
│   │   ├── auth/                 # signin, signup, phone, forgot-password, reset-password
│   │   ├── collection/[slug]/[id]/   # Movie collection detail
│   │   ├── company/[slug]/[id]/      # Production company detail
│   │   ├── favorites/            # Firestore favorites
│   │   ├── item/[mediaType]/[slug]/[id]/  # Universal movie/TV detail route
│   │   ├── list/[slug]/[id]/     # TMDB list detail
│   │   ├── movies/               # Listing + [slug]/[id] detail (grids)
│   │   ├── people/               # Listing grid + [slug]/[id] detail
│   │   ├── profile/              # Signed-in user profile
│   │   ├── settings/             # Settings sections
│   │   ├── subscription/         # Pricing pages (static/marketing)
│   │   ├── tv-shows/             # Listing + [slug]/[id] detail + season/[n] + season/[n]/episode/[m]
│   │   └── watchlist/            # Firestore watchlist
│   ├── ~offline/page.tsx         # Offline fallback (PWA)
│   ├── serwist/[path]/route.ts   # Service worker route
│   ├── manifest.json             # Web app manifest
│   ├── sw.ts                     # Service worker script
│   └── favicon.ico
│
├── components/ui/                # Small dedicated UI kit (message primitives used by AI chat)
│
├── features/                     # Feature-based modules
│   ├── auth/                     # Auth UI + hooks/services (login, register, Google, phone, guest, reset)
│   ├── movies/                   # Listing (cards, hero, rows) + detail + filters + services (GetMovies)
│   ├── tv/                       # TV detail, season, episode + filters + services (GetTvShows)
│   ├── person/                   # Person detail components + services (GetPeople)
│   ├── collection/               # Collection detail components
│   ├── company/                  # Company detail components
│   ├── list/                     # TMDB list detail components
│   ├── multiSearch/              # Search dropdown + service (search/multi)
│   ├── aiAssistant/              # Chat sheet, bubble, system prompt, Groq service
│   ├── favorites/                # Favorites list + Firestore hooks
│   ├── watchlist/                # Watchlist list + Firestore hooks
│   ├── settings/                 # Settings sections (account, preferences, playback, …)
│   └── profile/                  # Profile components
│
├── i18n/                         # next-intl config (routing, request, navigation)
├── lib/firebase.ts               # Firebase app initialization (auth, Firestore)
├── messages/                     # en.json, ar.json (translation namespaces)
├── proxy.ts                      # next-intl middleware (locale routing)
└── shared/
    ├── components/               # Layout (Header, Footer, SearchBar, UserMenu), UI kit, error/empty states, pagination, lazy sections
    ├── hooks/                    # useChangePage, useResetFilters
    ├── provider/authProvider.tsx # Auth context (user, loading, logout)
    ├── services/fetchApi.ts      # Server-side TMDB fetch helper with ISR
    ├── types/tmdb.ts             # TMDB type definitions
    └── utils/                    # cn, slugify, pagination helpers
```

---

## Getting Started

### Prerequisites

- Node.js 20 or later (Next.js 16 requirement)
- npm
- A TMDB API key (https://www.themoviedb.org/settings/api)
- A Firebase project with Authentication and Firestore enabled
- A Groq API key (https://console.groq.com)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root (see Environment Variables below) and fill in your credentials.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

### Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start the Next.js development server     |
| `npm run build`  | Production build                         |
| `npm run start`  | Start the production server              |
| `npm run lint`   | Run ESLint                               |
| `npm run format` | Format the codebase with Prettier        |

---

## Environment Variables

There is no `.env.example` file; create `.env.local` from the table below. All `.env*` files are gitignored.

| Variable                                     | Required | Description                                                        |
| -------------------------------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_FIREBASE_API_KEY`              | Yes      | Firebase Web API key                                               |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`          | Yes      | Firebase auth domain (e.g. `your-app.firebaseapp.com`)            |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`           | Yes      | Firebase project ID                                                |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`       | No       | Firebase storage bucket                                            |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`  | No       | Firebase messaging sender ID                                       |
| `NEXT_PUBLIC_FIREBASE_APP_ID`               | No       | Firebase app ID                                                    |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`       | No       | Firebase Analytics measurement ID                                  |
| `NEXT_PUBLIC_TMDB_API_KEY`                  | Yes      | TMDB API key (Authorization v4 / query param)                      |
| `TMDB_BASE_URL`                             | Yes      | TMDB base URL (e.g. `https://api.themoviedb.org/3`)               |
| `NEXT_PUBLIC_GROQ_KEY`                      | Yes*     | Groq API key for the AI assistant (see Security Notes)            |

> \* The AI chat button degrades gracefully with an error message if the Groq key is missing, but the feature requires it to function.

---

## Feature Inventory

Status legend: **Implemented** (in `src`), **Partial** (UI only / not persisted), **Planned** (on the roadmap).

| Feature                 | Status                | Main Files                                                                                 | Notes                                                            |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Home page               | ✅ Implemented        | `src/app/[locale]/page.tsx`, `src/features/movies/components/listing/`                     | Hero + curated rows from TMDB                                  |
| Movies listing          | ✅ Implemented        | `src/app/[locale]/movies/page.tsx`, `src/features/movies/components/filters/`              | Filters + pagination via URL params                             |
| Movie detail            | ✅ Implemented        | `src/app/[locale]/movies/[slug]/[id]/`, `src/app/[locale]/item/…`, `features/movies/components/detail/` | YouTube trailer playback in hero, video gallery, credits, reviews, watch providers, similar, lists |
| TV shows listing        | ✅ Implemented        | `src/app/[locale]/tv-shows/page.tsx`, `src/features/tv/components/filters/`                | Filters + pagination via URL params                             |
| TV show detail          | ✅ Implemented        | `src/app/[locale]/tv-shows/[slug]/[id]/`, `features/tv/components/detail/`                 | Seasons, content ratings, creators, similar                    |
| Season detail           | ✅ Implemented        | `…/season/[seasonNumber]/`                                                                 | Episode list per season                                          |
| Episode detail          | ✅ Implemented        | `…/season/[seasonNumber]/episode/[episodeNumber]/`                                         | Episode overview, cast/credits, navigation between episodes      |
| People directory        | ✅ Implemented        | `src/app/[locale]/people/page.tsx`, `GetPeople`                                             | Responsive grid + pagination                                     |
| Person detail           | ✅ Implemented        | `src/app/[locale]/people/[slug]/[id]/`, `features/person/components/`                      | Biography, known-for, credits, photos, career stats             |
| Search                  | ✅ Implemented        | `src/features/multiSearch/`, `src/shared/components/layout/SearchBar.tsx`                  | Debounced header dropdown (no dedicated results page yet)        |
| AI Assistant            | ✅ Implemented        | `src/features/aiAssistant/`                                                                | Groq chat, structured recommendation cards, floating button     |
| Authentication          | ✅ Implemented        | `src/app/[locale]/auth/`, `src/features/auth/`                                             | Email/password, Google, phone, guest, forgot/reset              |
| Favorites               | ✅ Implemented        | `src/features/favorites/`                                                                  | Firestore per user, add/remove, delete all                       |
| Watchlist               | ✅ Implemented        | `src/features/watchlist/`                                                                  | Firestore per user, add/remove, delete all                       |
| Collection detail       | ✅ Implemented        | `src/app/[locale]/collection/[slug]/[id]/`, `features/collection/`                         | Overview + content list                                          |
| Company detail          | ✅ Implemented        | `src/app/[locale]/company/[slug]/[id]/`, `features/company/`                               | Overview, portfolio, media/logos, external links                 |
| TMDB list detail        | ✅ Implemented        | `src/app/[locale]/list/[slug]/[id]/`, `features/list/`                                     | List hero + item grid                                            |
| Profile                 | ✅ Implemented        | `src/app/[locale]/profile/page.tsx`                                                        | Reads real Firebase user, member stats, providers (read-only)    |
| Settings                | ⚠️ Partial            | `src/features/settings/`                                                                   | Theme works; account/preferences/playback/notifications/privacy are UI-only (local state, not persisted) |
| Subscription            | ⚠️ Partial            | `src/app/[locale]/subscription/page.tsx`                                                   | Static pricing/plans; CTA buttons are placeholders (`href="#"`)  |
| Static pages            | ✅ Implemented        | `src/app/[locale]/{about,careers,contact,cookies,faq,feedback,guidelines,help,press,privacy,terms}/` | Company info, legal, support content                            |
| Internationalization    | ✅ Implemented        | `src/i18n/`, `src/messages/en.json`, `src/messages/ar.json`                                | en/ar with RTL (dir switch on `<html>`)                          |
| Theme system            | ✅ Implemented        | `src/shared/components/theme/`, `globals.css`                                              | light/dark/system via next-themes, OKLCH tokens                 |
| PWA / Offline           | ✅ Implemented        | `src/app/sw.ts`, `src/app/serwist/[path]/route.ts`, `src/app/manifest.json`, `src/app/~offline/` | Precache + runtime caching (TMDB images, Google avatars) + offline page |

---

## Architecture Highlights

- **Hybrid rendering** — Most content pages are server components that fetch TMDB data through `fetchApi` (`src/shared/services/fetchApi.ts`) with per-endpoint ISR `revalidate` values (3600s for most content, 86400s for genres/companies). Interactive surfaces (search, filters, chat, auth, favorites) are client components.
- **Feature-based organization** — Each domain (auth, movies, tv, person, favorites, watchlist, settings, …) is self-contained under `src/features/`, sharing `src/shared/` utilities, types, and UI primitives.
- **Client fetching via Axios** — Listing pages and search use Axios wrappers (`GetMovies`, `GetTvShows`, `GetPeople`, `MultiSearch`) that proxy the same TMDB endpoints with locale-aware language params.
- **Auth + persistence** — `AuthProvider` (React context) listens to Firebase `onAuthStateChanged`; Favorites and Watchlist are stored at `users/{uid}/favorites` and `users/{uid}/watchlist` as documents keyed by TMDB media ID, mapped through `mapper.ts` (`toTMDBMovie` / `toTMDBTV`).
- **AI Assistant** — `aiChat` (`src/features/aiAssistant/services/aiChat.ts`) calls Groq (`openai/gpt-oss-120b`) with a system prompt that instructs a JSON-only response (`message` + `recommendations`); the chat parses it and renders link cards with slugged TMDB URLs.
- **Middleware** — `src/proxy.ts` runs `next-intl/middleware` for locale detection/redirect; valid locales are `en` / `ar` with `en` as default.
- **i18n** — All UI text lives in `src/messages/en.json` / `ar.json` (37 namespaces); `next-intl` `<Link>`/`useRouter` helpers prefix locale paths, and switching locale performs a full page navigation.

---

## Security Notes

- **`NEXT_PUBLIC_*` keys are exposed to the browser.** The Firebase config and TMDB API key are public by design (Firebase Security Rules should restrict access; TMDB has its own quota/rate limits). Before going public, enable Firestore Security Rules so `users/{uid}/...` documents are only readable/writable by the owning user.
- **The Groq API key is exposed client-side.** `aiChat.ts` reads `NEXT_PUBLIC_GROQ_KEY` on the client, so the key ships in the JS bundle. This is acceptable for prototyping but should be moved behind a server route (e.g. a Route Handler that calls Groq and only returns content) before production.
- **Phone auth** uses `signInWithPhoneNumber` with the invisible reCAPTCHA verifier.
- **Image sources are allowlisted** in `next.config.ts` (`image.tmdb.org`, `img.youtube.com`, `lh3.googleusercontent.com`) and images are served unoptimized.
- **Secrets are gitignored** (`.env*`). Never commit `.env.local`.
- Consumer of Firebase email/password, Google, phone, and anonymous flows should confirm that the Firebase Auth sign-in methods you intend to expose are enabled in the Firebase Console.

---

## Deployment

The app is a standard Next.js deployment that requires a Node.js server (the `proxy.ts` middleware and the Serwist service-worker route need a running server; there is no static export).

### Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the Environment Variables from the table above (both preview & production).
4. Deploy — `npm run build` is used automatically.

### Any Node host (self-managed / Railway / Render / etc.)

```bash
npm ci
npm run build
npm run start
```

Build and runtime notes:

- `next.config.ts` enables the React Compiler and the Serwist PWA plugin.
- Images are served unoptimized (`images.unoptimized = true`), so no image optimizer needs to be configured on the host.
- After deploy, verify the service worker registers (`/serwist/sw.js`) and the offline page (`/~offline`) loads without a network connection.

---

## Roadmap / Planned Features

1. **Unit / integration tests** — `jest` is already installed; no test script or test files exist yet. Add tests for services, hooks, and key components.
2. **Dedicated search results page** — header search currently shows a dropdown; a full results route is planned.
3. **Persist Settings & Profile edits** — Settings are UI-only today (theme excepted); wire them to Firebase/Firestore and add profile editing.
4. **Subscription checkout** — the pricing page is informational; integrate a real payment/plan provider and remove the placeholder CTAs.
5. **Server-side Groq proxy** — move the AI call behind a Route Handler to keep the API key off the client.
6. **Error boundaries** — add React error boundaries for client components.
7. **Accessibility audit** — review ARIA attributes and keyboard navigation (some interactive elements rely on Radix defaults only).
8. **Code-base cleanup** — remove unused deps (`zustand`, `@tanstack/react-query`, `react-player`, `hookli`, and the duplicate `src/components/ui/button.tsx`), and replace remaining `any` typings (e.g. `people/page.tsx`) with TMDB types.
9. **Film playback** — `react-player` is installed but unused; streaming/playback is not yet implemented.

---

## License

This project is private (`"private": true` in `package.json`) and currently has no license file. Data comes from **The Movie Database (TMDb)** — API usage must comply with TMDb's terms of service, which require attribution. If this project ships publicly, ensure TMDb attribution is displayed.

---

## Community & Contributing

This is a personal/portfolio project, so there is no formal contributor workflow yet. That said:

- Report bugs or request features by opening an issue on the repository.
- For local development, keep changes within the feature-based structure described above, run `npm run lint` and a `tsc --noEmit` type-check before submitting, and format with `npm run format` to match the codebase style (Prettier, single quotes).

---

## Conclusion

IMDB Stream is a production-shaped, feature-rich entertainment discovery platform. It demonstrates a **hybrid rendering architecture** (server-rendered content with ISR + client interactivity), a **feature-first codebase**, full **English/Arabic internationalization with RTL**, multiple **Firebase authentication providers**, Firestore-backed **favorites and watchlists**, a **Groq-powered AI recommendation assistant**, and **PWA offline support**.

The browsing experience — from home carousels to filterable catalogs, detail pages, people directories, collections, companies, and lists — is fully implemented against live TMDb data. Remaining work is concentrated in persistence of user preferences (settings/profile editing), test coverage, subscription checkout, and hardening (server-side AI proxy, error boundaries).
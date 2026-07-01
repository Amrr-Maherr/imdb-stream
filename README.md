# SmartStream

An IMDb-inspired movie and TV show discovery platform built with Next.js. Browse thousands of movies, TV shows, and actors with rich detail pages, filtering, internationalization, and Firebase authentication.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + `tw-animate-css` |
| **UI Primitives** | shadcn/ui (radix-nova style) + Radix UI |
| **State Management** | URL search params + React Context (auth) |
| **Internationalization** | next-intl (English / Arabic) |
| **Authentication** | Firebase Auth (email/password, Google, phone, anonymous) |
| **Data Fetching** | Native `fetch` (Server Components) + Axios (client) |
| **HTTP Client** | Axios |
| **Carousels** | Swiper 12 |
| **Animations** | Motion (Framer Motion) |
| **Forms** | react-hook-form |
| **Icons** | Lucide React |
| **Toasts** | react-hot-toast |
| **Phone Input** | react-phone-number-input |
| **Theme** | next-themes |
| **PWA / Service Worker** | Serwist |
| **CSS Utilities** | clsx, tailwind-merge, class-variance-authority |
| **Fonts** | Roboto (Google Fonts via `next/font`) |
| **Linting** | ESLint 9 (flat config) with `eslint-config-next` |
| **Package Manager** | npm |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages & layouts
│   ├── [locale]/                 # Localized routes (en, ar)
│   │   ├── layout.tsx            # Root layout (Header, Footer, providers)
│   │   ├── page.tsx              # Home page
│   │   ├── loading.tsx           # Root loading state
│   │   ├── not-found.tsx         # 404 page
│   │   ├── globals.css           # Global styles, design tokens, Tailwind config
│   │   ├── about/                # About page
│   │   ├── auth/                 # Auth pages (signin, signup, forgot-password, reset-password, phone)
│   │   ├── bookmarks/            # Bookmarks page
│   │   ├── careers/              # Careers page
│   │   ├── collection/           # Movie collection detail page (has [slug]/)
│   │   ├── company/              # Production company detail page
│   │   ├── contact/              # Contact page
│   │   ├── cookies/              # Cookies policy
│   │   ├── faq/                  # FAQ page
│   │   ├── favorites/            # Favorites page (Firestore)
│   │   ├── feedback/             # Feedback page
│   │   ├── guidelines/           # Community guidelines
│   │   ├── help/                 # Help center
│   │   ├── item/                 # Universal detail route: [mediaType]/[slug]/[id]
│   │   ├── list/                 # User lists (has [slug]/[id]/)
│   │   ├── movies/               # Movies listing + detail pages
│   │   ├── people/               # People listing (grid) + detail
│   │   ├── press/                # Press page
│   │   ├── privacy/              # Privacy policy
│   │   ├── profile/              # User profile
│   │   ├── settings/             # User settings
│   │   ├── subscription/         # Subscription/pricing page
│   │   ├── terms/                # Terms of service
│   │   ├── tv-shows/             # TV shows listing + detail + season + episode pages
│   │   └── watchlist/            # Watchlist page (Firestore)
│   └── favicon.ico
│
├── features/                     # Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth UI (auth-providers, forms, layouts)
│   │   ├── hooks/                # Auth hooks (login, register, Google, phone, guest, etc.)
│   │   └── services/             # Firebase Auth re-exports from lib
│   │
│   ├── movies/                   # Movies feature
│   │   ├── components/
│   │   │   ├── listing/          # Home page sections, cards, hero banner
│   │   │   ├── detail/           # Movie detail components (hero, info, cast, etc.)
│   │   │   └── filters/          # Movie search filters (genre, language, year, etc.)
│   │   ├── hooks/                # Movie-specific hooks (useAddToWatchlist)
│   │   └── services/             # Axios-based TMDB movie fetch
│   │
│   ├── tv/                       # TV show detail + listing components
│   │   ├── components/
│   │   │   ├── detail/           # TV show detail (header, seasons, sidebar)
│   │   │   ├── episode/          # Episode detail components
│   │   │   ├── filters/          # TV listing filters (genre, year, etc.)
│   │   │   └── season/           # Season detail components
│   │   └── services/             # Axios-based TMDB TV fetch (getTvShows)
│   │
│   ├── person/                   # Person/actor feature
│   │   ├── components/           # Person hero, credits, photos, sidebar
│   │   └── services/             # Axios-based TMDB people fetch (getPeople)
│   │
│   ├── collection/               # Movie collection components
│   │   └── components/           # Collection hero, content, sidebar
│   │
│   ├── company/                  # Production company components
│   │   └── components/           # Company hero, overview, portfolio, media, links
│   │
│   ├── multiSearch/              # Global search feature
│   │   ├── components/           # SearchDropdown, SearchResultItem
│   │   └── services/             # TMDB multi-search endpoint
│   │
│   ├── settings/                 # User settings feature
│   │   └── components/           # Settings sections (account, preferences, playback, etc.)
│   │
│   ├── favorites/                # Favorites feature
│   │   ├── components/           # Favorites grid with shared EmptyState + DeleteAllButton
│   │   └── hooks/                # Firestore fetch, delete all
│   │
│   ├── watchlist/                # Watchlist feature
│   │   ├── components/           # Watchlist grid with shared EmptyState + DeleteAllButton
│   │   └── hooks/                # Firestore fetch, delete all
│   │
│   └── episode/                  # (empty - removed; episode UI lives in tv/)
│
├── lib/                          # Infrastructure / initialization
│   └── firebase.ts               # Firebase app initialization
│
├── shared/                       # Shared resources
│   ├── components/
│   │   ├── layout/               # Header, Footer, NavLinks, SearchBar, UserMenu, Logo, Copyright
│   │   ├── ui/                   # shadcn/ui components (Button, Card, Input, Select, etc.)
│   │   ├── skeletons/            # Loading skeletons for movies, TV, people, sections, grids
│   │   ├── pagination/           # PaginationDemo component
│   │   └── theme/                # next-themes ThemeProvider wrapper
│   │   ├── delete-all-button.tsx # Shared "Delete All" button
│   │   ├── empty-state.tsx       # Shared empty state with animation
│   │   ├── error-state.tsx       # Shared error/not-found state
│   │   ├── lazy-section.tsx      # Lazy-loaded section wrapper
│   │   └── ToasterProvider.tsx   # react-hot-toast provider
│   │
│   ├── hooks/                    # Shared hooks
│   │   ├── useChangePage.ts      # URL-based pagination hook
│   │   └── useResetFilters.ts    # Filter reset hook
│   │
│   ├── provider/                 # React providers
│   │   └── authProvider.tsx      # Firebase Auth context provider
│   │
│   ├── services/                 # Shared API services
│   │   └── fetchApi.ts           # Generic TMDB fetch function (Server Components)
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── tmdb.ts               # Complete TMDB API type definitions
│   │
│   └── utils/                    # Utility functions
│       ├── utils.ts              # cn() class merging utility
│       ├── slugify.ts            # URL slug generation
│       └── pagination.ts         # Page number calculation
│
├── i18n/                         # Internationalization
│   ├── routing.ts                # Locale routing config (en, ar)
│   ├── request.ts                # Message loader by locale
│   └── navigation.ts             # i18n-aware navigation helpers
│
├── messages/                     # Translation files
│   ├── en.json                   # English translations
│   └── ar.json                   # Arabic translations
│
└── proxy.ts                      # next-intl middleware (matcher config)
```

---

## Architecture

### Pattern: Hybrid Server & Client Components

SmartStream uses Next.js App Router with a **hybrid rendering architecture**:

```
┌─────────────────────────────────────────────────────┐
│                    NEXT.JS 16                        │
│                                                      │
│  ┌─────────────────┐      ┌──────────────────────┐  │
│  │ Server Components│ ───► │  Client Components   │  │
│  │ (RSC)            │      │  ("use client")      │  │
│  │                  │      │                      │  │
│  │ • Data fetching  │      │ • Interactivity      │  │
│  │ • SEO metadata   │      │ • Event handlers     │  │
│  │ • Initial render │      │ • State/effects      │  │
│  │ • Loading UI     │      │ • Animations         │  │
│  └──────┬───────────┘      └──────────┬───────────┘  │
│         │                             │              │
│         ▼                             ▼              │
│  ┌──────────────────────────────────────────────┐   │
│  │              TMDB API (external)              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │              Firebase Auth                     │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Feature-based folder structure** — Each feature (auth, movies, tv, etc.) encapsulates its own components, hooks, and services, keeping the codebase modular and scalable.

2. **Server Components for data fetching** — TMDB data is fetched in Server Components using `fetchApi()` and passed as props to Client Components, improving performance and SEO.

3. **Client Components only when needed** — Interactive elements (forms, animations, carousels, theme toggle) use the `"use client"` directive. Static content remains as Server Components.

4. **Centralized API layer** — `fetchApi()` in `shared/services` provides a consistent interface for all TMDB API calls with caching and revalidation support. Client-side listing pages use Axios with URL search params.

5. **Internationalization-first routing** — All routes are under `[locale]` with next-intl handling locale detection, redirection, and message loading.

6. **Design token system** — All visual properties are CSS variables using OKLCH color space, enabling seamless light/dark mode switching.

7. **auth via React Context** — Firebase Auth state is managed through a React Context provider (`AuthProvider`), not a global state library.

---

## Features

### Authentication

| Aspect | Details |
|--------|---------|
| **Purpose** | User registration, login, and account management |
| **Pages** | `/auth/signin`, `/auth/signup`, `/auth/forgot-password`, `/auth/phone`, `/auth/reset-password` |
| **Components** | `SignInForm`, `SignUpForm`, `ForgotPasswordForm`, `ResetPasswordForm`, `PhoneAuth`, `GoogleAuth`, `GuestAuth`, `EmailPasswordAuth`, `AuthProviders`, `AuthLayout`, `AuthDivider`, `AuthStatusMessage` |
| **Services** | `lib/firebase.ts` — Firebase app initialization with config from env vars; `features/auth/services/firebase.ts` re-exports auth SDK |
| **Hooks** | `useLogin`, `useRegister`, `useGoogleAuth`, `usePhoneAuth`, `useGuestLogin`, `useForgotPassword`, `useResetPassword` |
| **State** | React Context (`AuthProvider`) — provides `user` object and `loading` state |
| **API** | Firebase Auth SDK (no custom backend) |

**Auth Flow:**
```
User → Auth Page → Firebase SDK → AuthContext → Components consume useAuth()
```

Authentication methods:
- Email/Password registration and login
- Google OAuth (popup)
- Phone number (OTP via SMS with reCAPTCHA)
- Anonymous/guest login

### Home Page

| Aspect | Details |
|--------|---------|
| **Purpose** | Content discovery landing page |
| **Pages** | `/` |
| **Components** | `HeroSection`, `HomeSections`, `HeroBanner`, `HeroSlide`, `FeaturedRow`, `PremiumRow`, `BannerSection`, `MediaRow`, `MovieCard`, `TvCard`, `PersonCard`, `SectionHeader` |
| **Services** | `fetchApi` — fetches trending/popular/top-rated movies, TV shows, and people |
| **State** | None (server-rendered data) |

The home page displays multiple curated sections:
1. **Hero Banner** — Trending movies with auto-rotating full-screen backdrop
2. **Popular Movies** — Featured spotlight + carousel
3. **Top Rated Movies** — Premium editorial row
4. **Now Playing** — Banner section
5. **Production Companies** — Static company/showcase section
6. **Trending TV** — Carousel
7. **Popular TV** — Carousel
8. **Airing Today** — Banner section
9. **Popular Actors** — Person card carousel

### Movies Listing

| Aspect | Details |
|--------|---------|
| **Purpose** | Browse and filter movie catalog |
| **Pages** | `/movies` |
| **Components** | `DesktopFilters`, `MobileBar`, `MovieCard`, `PaginationDemo` |
| **Services** | `GetMovies` — Axios-based TMDB discover endpoint with filter params |
| **Hooks** | `useChangePage`, `useResetFilters` |
| **State** | URL search params |

Filters: Genre, Language, Year, Rating, Country, Sort (popularity, rating, release date, revenue), Adult content toggle.

### Movie Detail

| Aspect | Details |
|--------|---------|
| **Purpose** | Comprehensive movie information page |
| **Pages** | `/item/movie/[slug]/[id]` |
| **Components** | `MovieHero`, `MovieInfo`, `MovieActions`, `MovieBackground`, `MovieCollection`, `MovieMainContent`, `MovieSidebarColumn`, `MovieCast`, `MovieCrew`, `MovieReviews`, `MovieVideos`, `MovieRating`, `MoviePhotos`, `MovieOverview`, `MovieProductionCompanies`, `MovieReleaseDates`, `MovieAlternativeTitles`, `MovieExternalLinks`, `MovieWatchProviders`, `MovieLists`, `RelatedMovies`, `FullCastSlider`, `CastCard`, `CrewCard`, `FadeIn`, `GenreTags`, `MovieDetailSkeleton` |
| **Services** | `fetchApi` with `append_to_response` (14 included endpoints) |

The movie detail page fetches the movie with all related data in a single TMDB API call using the `append_to_response` parameter, including: credits, videos, reviews, images, recommendations, similar movies, watch providers, release dates, translations, external IDs, keywords, lists, account states, and alternative titles.

### TV Shows Detail

| Aspect | Details |
|--------|---------|
| **Purpose** | TV show detail, season, and episode pages |
| **Pages** | `/item/tv/[slug]/[id]`, `/item/tv/[...]/season/[seasonNumber]`, `/item/tv/[...]/episode/[episodeNumber]` |
| **Components** | `TvMainContent`, `TvSidebarColumn`, `TvSeasons`, `TvContentRatings`, `SeasonCard`, `RelatedTvShows`, `TvDetailSkeleton` |
| **Services** | `fetchApi` with `append_to_response` (13 endpoints) |

Supports TV show details, season overview with episode lists, and individual episode detail pages.

### TV Shows Listing

| Aspect | Details |
|--------|---------|
| **Purpose** | Browse and filter TV show catalog |
| **Pages** | `/tv-shows` |
| **Components** | `DesktopFilters`, `MobileBar`, `TvCard`, `PaginationDemo` |
| **Services** | `GetTvShows` — Axios-based TMDB discover endpoint with filter params |
| **Hooks** | `useChangePage`, `useResetFilters` |

Filters: Genre, Language, Year, Rating, Country, Sort (popularity, rating, first air date), Status (returning, ended), Type (scripted, reality, etc.).

### People/Actors

| Aspect | Details |
|--------|---------|
| **Purpose** | Browse actor/crew directory and view biographies |
| **Pages** | `/people` (grid listing), `/people/[slug]/[id]` (detail) |
| **Components** | **Listing:** `PersonCard`, `PaginationDemo` **Detail:** `PersonHero`, `PersonMainContent`, `PersonSidebarColumn`, `PersonCredits`, `PersonKnownFor`, `PersonPhotos`, `BiographySection`, `CareerStats`, `PersonDetailSkeleton` |
| **Services** | `GetPeople` — Axios-based TMDB popular people endpoint with pagination |

The people listing page displays a responsive CSS grid (`grid-cols-3` through `xl:grid-cols-8`) of person cards with thumbnail photos and names.

### Search

| Aspect | Details |
|--------|---------|
| **Purpose** | Global search across movies, TV shows, and people |
| **Components** | `SearchBar` (header), `SearchDropdown`, `SearchResultItem` |
| **Services** | `multiSearch` — TMDB `/3/search/multi` endpoint |
| **State** | Component-local state with debounced input |

The search bar in the header expands on click, queries the TMDB multi-search endpoint with a debounced input, and displays results in a dropdown panel. Results link directly to the corresponding detail page via `/item/[mediaType]/[slug]/[id]`.

### Settings

| Aspect | Details |
|--------|---------|
| **Purpose** | User preference management |
| **Pages** | `/settings` |
| **Components** | `SettingsLayout`, `AccountSettings`, `PreferencesSettings`, `PlaybackSettings`, `NotificationsSettings`, `PrivacySettings`, `AppSettings` |

Sections: Account, Preferences (theme, language), Playback, Notifications, Privacy & Security, App Info.

### Subscription / Pricing

| Aspect | Details |
|--------|---------|
| **Purpose** | Display subscription plans |
| **Pages** | `/subscription` |
| **Components** | Inline page components |

Three tiers: Free, Pro, Enterprise with feature comparison table.

### Favorites

| Aspect | Details |
|--------|---------|
| **Purpose** | View and manage user's favorite movies and TV shows |
| **Pages** | `/favorites` |
| **Components** | `FavoritesList` — renders grid of MovieCard/TvCard with shared `DeleteAllButton` and `EmptyState` |
| **Hooks** | `useFavorites` — fetches from `users/{userId}/favorites` via `getDocs`, provides `deleteAll` via `writeBatch` |
| **Services** | `mapper.ts` — shared `toTMDBMovie`/`toTMDBTV` mappers for partial stored data |
| **API** | Firebase Firestore (collection group: `users/{userId}/favorites`) |

Uses `useAuth()` context to get user ID, fetches favorites from Firestore, and renders them using existing `MovieCard` and `TvCard` components. Includes a "Delete All" button that batch-deletes all documents.

### Watchlist

| Aspect | Details |
|--------|---------|
| **Purpose** | View and manage user's watchlist items |
| **Pages** | `/watchlist` |
| **Components** | `WatchlistList` — renders grid of MovieCard/TvCard with shared `DeleteAllButton` and `EmptyState` |
| **Hooks** | `useWatchlist` — fetches from `users/{userId}/watchlist` via `getDocs`, provides `deleteAll` via `writeBatch` |
| **Services** | `mapper.ts` — shared `toTMDBMovie`/`toTMDBTV` mappers for partial stored data |
| **API** | Firebase Firestore (collection group: `users/{userId}/watchlist`) |

Same pattern as favorites: uses `useAuth()` to get user ID, fetches the watchlist collection from Firestore, and renders items using `MovieCard`/`TvCard`.

### Static Pages

| Page | Purpose |
|------|---------|
| `/about` | Company story, mission, vision, timeline |
| `/careers` | Job openings, culture, benefits |
| `/contact` | Contact form and support methods |
| `/cookies` | Cookie policy |
| `/faq` | Searchable FAQ with category filtering |
| `/feedback` | User feedback submission |
| `/guidelines` | Community guidelines |
| `/help` | Help center with topic cards |
| `/press` | Press and media information |
| `/privacy` | Privacy policy with sticky TOC |
| `/terms` | Terms of service with sticky TOC |
| `/bookmarks` | Bookmarks page |

---

## Routing

```
/ [locale]
├── / (Home)
├── /auth/signin
├── /auth/signup
├── /auth/forgot-password
├── /auth/phone
├── /auth/reset-password
├── /movies
├── /item/movie/[slug]/[id]
├── /item/tv/[slug]/[id]
├── /item/tv/[slug]/[id]/season/[seasonNumber]
├── /item/tv/[slug]/[id]/season/[seasonNumber]/episode/[episodeNumber]
├── /tv-shows
├── /people
├── /people/[slug]/[id]
├── /collection/[slug]
├── /company/[slug]/[id]
├── /list/[slug]/[id]
├── /favorites
├── /watchlist
├── /settings
├── /profile
├── /subscription
├── /bookmarks
└── /about, /contact, /faq, /help, /careers, /press, /privacy, /terms, /cookies, /guidelines, /feedback
```

Locale prefix `[locale]` supports `en` (English) and `ar` (Arabic). The middleware in `src/proxy.ts` handles locale detection and redirection. Each major route has a corresponding `loading.tsx` for Suspense fallback UI.

---

## API Layer

### Architecture

SmartStream uses **two data fetching approaches**:

1. **Server Components** (`shared/services/fetchApi.ts`) — Uses native `fetch` with caching and revalidation for TMDB API calls in Server Components (home page, detail pages).

2. **Client-side** (`features/*/services/`) — Uses Axios for listing pages with dynamic filter parameters from URL search params (movies, TV shows, people).

### Server Component Fetch (`fetchApi`)

```typescript
// src/shared/services/fetchApi.ts
export async function fetchApi<T = any>({
    endpoint,
    cache = "force-cache",
    revalidate,
}: FetchApiOptions): Promise<T> {
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${process.env.TMDB_BASE_URL}/${endpoint}${separator}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=true`;

    const res = await fetch(url, {
        cache,
        next: revalidate ? { revalidate } : undefined,
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${endpoint}`);
    }

    return res.json();
}
```

### Client-side Fetch (`GetMovies` / `GetTvShows` / `GetPeople`)

```typescript
// src/features/movies/services/getMovies.ts
export default async function GetMovies({ page, with_genres, with_original_language, ... }: MovieFilters) {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/discover/movie`, {
        params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, ... }
    });
    return response.data;
}
```

### Request Flow

```
Browser/Client
    │
    ├── Server Component (RSC) ──► fetchApi() ──► TMDB API ──► HTML response
    │     (home, detail pages)       (cached)
    │
    └── Client Component ──► GetMovies/GetTvShows/GetPeople ──► TMDB API ──► JSON response
          (listing pages)        (Axios, no cache)
```

### Error Handling

- Server Components use try/catch blocks and render `ErrorState` or `null` fallback UI
- `fetchApi` throws on non-OK responses
- Axios-based services log errors and re-throw
- Firebase auth hooks wrap errors in try/catch and return `null` on failure

### Caching

- **Server Components**: Default `force-cache` with `revalidate` set per endpoint (3600s for most, 86400s for genre lists)
- **Client-side**: No caching (Axios calls are not cached)

---

## Shared Components

### UI Components (shadcn/ui)

| Component | File | Purpose |
|-----------|------|---------|
| `Button` | `shared/components/ui/button.tsx` | Variants: default, outline, secondary, ghost, destructive, link. Sizes: xs, sm, default, lg, icon |
| `Card` | `shared/components/ui/card.tsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `Badge` | `shared/components/ui/badge.tsx` | Variants: default, secondary, destructive, outline, brand |
| `Input` | `shared/components/ui/input.tsx` | Styled input with focus ring, error states |
| `Label` | `shared/components/ui/label.tsx` | Form label with peer-disabled state |
| `Select` | `shared/components/ui/select.tsx` | Radix UI select with trigger, content, item, group |
| `Switch` | `shared/components/ui/switch.tsx` | Toggle switch with brand coloring |
| `Slider` | `shared/components/ui/slider.tsx` | Swiper-based carousel with autoplay, navigation, effects |
| `Sheet` | `shared/components/ui/sheet.tsx` | Radix Dialog-based slide-out panel (top/bottom/left/right) |
| `Separator` | `shared/components/ui/separator.tsx` | Radix UI horizontal/vertical separator |
| `DropdownMenu` | `shared/components/ui/dropdown-menu.tsx` | Full Radix dropdown with items, checkboxes, radio groups, submenus |
| `Pagination` | `shared/components/ui/pagination.tsx` | Page navigation with previous/next/ellipsis |
| `ThemeToggle` | `shared/components/ui/theme-toggle.tsx` | Sun/Moon toggle with animation |
| `LanguageSwitcher` | `shared/components/ui/language-switcher.tsx` | Dropdown to switch between English/Arabic |
| `AnimatedSection` | `shared/components/ui/animated-section.tsx` | Scroll-triggered fade-in animation wrapper |
| `FaqAccordion` | `shared/components/ui/faq-accordion.tsx` | Searchable FAQ with category filtering |

### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| `Header` | `shared/components/layout/Header.tsx` | Fixed top header with scroll effect, mobile menu, search, auth state |
| `Footer` | `shared/components/layout/Footer.tsx` | Page footer with link columns and copyright |
| `NavLinks` | `shared/components/layout/NavLinks.tsx` | Navigation links (Home, Movies, TV Shows, People) with active state |
| `Logo` | `shared/components/layout/Logo.tsx` | SmartStream logo linking to home |
| `SearchBar` | `shared/components/layout/SearchBar.tsx` | Expandable search input with dropdown results |
| `UserMenu` | `shared/components/layout/UserMenu.tsx` | Dropdown menu for authenticated users |
| `FooterLinks` | `shared/components/layout/FooterLinks.tsx` | Footer link columns (About, Help, Legal, Social) |
| `FooterColumn` | `shared/components/layout/FooterColumn.tsx` | Single footer link column |
| `Copyright` | `shared/components/layout/Copyright.tsx` | Dynamic year copyright notice |

### Shared Domain Components

| Component | File | Purpose |
|-----------|------|---------|
| `EmptyState` | `shared/components/empty-state.tsx` | Animated empty state with icon, title, description, CTA button |
| `DeleteAllButton` | `shared/components/delete-all-button.tsx` | Destructive "Delete All" confirmation button |
| `ErrorState` | `shared/components/error-state.tsx` | Error/not-found fallback with retry and home link |

### Skeleton Components

| Component | Purpose |
|-----------|---------|
| `MovieCardSkeleton` | Loading placeholder for movie cards |
| `MovieRowSkeleton` | Loading placeholder for movie rows |
| `TvCardSkeleton` | Loading placeholder for TV cards |
| `TvRowSkeleton` | Loading placeholder for TV rows |
| `PersonCardSkeleton` | Loading placeholder for person cards |
| `PersonRowSkeleton` | Loading placeholder for person rows |
| `MediaGridSkeleton` | Generic grid skeleton |
| `SectionSkeleton` | Section-level loading skeleton |
| `ProfileSkeleton` | Profile page loading placeholder |

### Theme Provider

Uses `next-themes` (`ThemeProvider` wrapper in `shared/components/theme/theme-provider.tsx`) managing light/dark/system theme modes with `class` strategy. Individual components use `useTheme` from `next-themes`.

---

## Utilities

| Utility | File | Purpose |
|---------|------|---------|
| `cn()` | `shared/utils/utils.ts` | Merges Tailwind classes using `clsx` + `tailwind-merge` |
| `slugify()` | `shared/utils/slugify.ts` | Converts text to URL-safe slugs |
| `getPageNumbers()` | `shared/utils/pagination.ts` | Generates pagination page array with ellipsis |

---

## Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useChangePage()` | `shared/hooks/useChangePage.ts` | Updates URL `page` param for pagination |
| `useResetFilters()` | `shared/hooks/useResetFilters.ts` | Detects active filters and provides reset handler |
| `useLogin()` | `features/auth/hooks/useLogin.ts` | Firebase email/password sign-in |
| `useRegister()` | `features/auth/hooks/useRegister.ts` | Firebase email/password registration with display name |
| `useGoogleAuth()` | `features/auth/hooks/useGoogleAuth.ts` | Firebase Google OAuth popup |
| `usePhoneAuth()` | `features/auth/hooks/usePhoneAuth.ts` | Phone auth with OTP (reCAPTCHA, send OTP, verify OTP) |
| `useGuestLogin()` | `features/auth/hooks/useGuestLogin.ts` | Firebase anonymous sign-in |
| `useForgotPassword()` | `features/auth/hooks/useForgotPassword.ts` | Send password reset email |
| `useResetPassword()` | `features/auth/hooks/useResetPassword.ts` | Confirm password reset with OOB code |
| `useAuth()` | `shared/provider/authProvider.tsx` | Firebase Auth context consumer |

---

## Configuration

### Environment Variables

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### ESLint

Flat config (`eslint.config.mjs`) using `eslint-config-next` with core-web-vitals and TypeScript rules.

### TypeScript

- `target`: ES2017
- `strict`: true
- `moduleResolution`: bundler
- Path alias: `@/*` → `./src/*`
- Next.js plugin enabled

### Tailwind CSS v4

- Configured via `@tailwindcss/postcss` plugin
- Design tokens defined in `globals.css` using `@theme inline`
- All colors use OKLCH color space
- Custom utilities: `app-container` for max-width content wrapper
- Dark mode via `.dark` class on `<html>`
- RTL support with logical properties

### Next.js Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "image.tmdb.org" },
      { hostname: "img.youtube.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};
```

---

## Development Guide

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

### Format

No formatter is configured. Prettier is not installed.

### Test

`jest` is installed as a devDependency but no test files exist in the project.

---

## Data Flow

```mermaid
sequenceDiagram
    participant User as User/Browser
    participant RSC as Server Component
    participant CC as Client Component
    participant TMDB as TMDB API
    participant FA as Firebase Auth
    participant AC as AuthContext

    Note over User,AC: Page Load (Home/Detail)
    User->>RSC: Navigate to page
    RSC->>TMDB: fetchApi(endpoint)
    TMDB-->>RSC: JSON response
    RSC-->>CC: Props (data)
    CC-->>User: Rendered UI

    Note over User,AC: Listing (with filters)
    User->>CC: Set filter (URL param)
    CC->>RSC: Server re-renders
    RSC->>TMDB: Axios request
    TMDB-->>RSC: Filtered results
    RSC-->>User: Updated page

    Note over User,AC: Authentication
    User->>CC: Submit credentials
    CC->>FA: Firebase Auth SDK
    FA-->>CC: UserCredential
    CC->>AC: setUser(user)
    CC->>User: Redirect to home

    Note over User,AC: Theme & Language
    User->>CC: Toggle theme/language
    CC->>User: Update UI
```

---

## Coding Conventions

### Naming Conventions

- **Files**: kebab-case for all files (`movie-card.tsx`, `hero-section.tsx`)
- **Components**: PascalCase (`MovieCard`, `HeroSection`, `TvMainContent`)
- **Functions**: camelCase (`fetchApi`, `getPageNumbers`, `useLogin`)
- **Types/Interfaces**: PascalCase with `TMDB` prefix for API types (`TMDBMovie`, `TMDBTVDetails`)
- **Hooks**: camelCase with `use` prefix (`useLogin`, `useChangePage`)
- **Constants**: UPPER_SNAKE_CASE for magic values, PascalCase for option arrays
- **Environment variables**:
  - Public: `NEXT_PUBLIC_*` prefix
  - Server-only: No prefix

### Folder Organization

- **Feature-based** — Each feature has its own folder under `src/features/`
- **Feature sub-folders** — `components/`, `hooks/`, `services/` (no store/types unless needed)
- **Shared code** — Under `src/shared/` organized by type: `components/`, `hooks/`, `services/`, `types/`, `utils/`
- **Pages** — Mirror URL structure under `src/app/[locale]/`

### Component Structure

```typescript
// Server Component pattern
import { fetchApi } from "@/shared/services/fetchApi";
import { ClientComponent } from "./client-component";

export async function ServerComponent() {
  const data = await fetchApi({ endpoint: "..." });
  return <ClientComponent data={data} />;
}
```

```typescript
// Client Component pattern
"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function ClientComponent({ data }: { data: SomeType }) {
  const t = useTranslations("Namespace");
  // ...
}
```

### File Organization

- One component per file (with exceptions for tightly coupled sub-components in the same file)
- Index files for barrel exports where helpful
- Types in dedicated `.ts` files under `types/`

### Import Order

1. React/Next.js imports
2. Third-party library imports
3. Internal shared imports (`@/shared/...`)
4. Internal feature imports (`@/features/...`)
5. Relative imports

### TypeScript Patterns

- `type` over `interface` for most definitions
- Strict mode enabled
- `any` occasionally used (types not fully strict in some places)
- `as` casting used sparingly
- Optional chaining (`?.`) and nullish coalescing (`??`) used throughout

### Styling Conventions

- Tailwind CSS classes only (no CSS modules or styled-components)
- `cn()` utility for conditional class merging
- CSS variables for all colors (no hardcoded hex/rgb values)
- RTL support via logical properties (`margin-inline`, `padding-inline`, `start-*`, `end-*`)
- Dark mode via `dark:` variants (automatic through `.dark` class)

---

## Future Improvements

1. **Add missing type safety** — Some components use `any` types (movies listing page)
2. **Unit tests** — Jest is installed but no tests written
3. **Prettier configuration** — No formatter configured
4. **React Query / Zustand usage** — Both installed but unused; could simplify client data fetching and global state
5. **Error boundaries** — Not implemented for Client Components
6. **Accessibility audit** — Some interactive elements may need better ARIA attributes
7. **Firebase session persistence** — Auth state is not validated on page load; user not restored on refresh without re-login
8. **Profile page** — Reads directly from localStorage; needs proper hooks/services
9. **Search results page** — Multi-search works in header dropdown but there's no dedicated search results page
10. **Home page loading states** — Could benefit from Suspense boundaries around individual sections

---

## Feature Inventory

| Feature | Status | Main Files | Description |
|---------|--------|------------|-------------|
| Home Page | ✅ Complete | `src/app/[locale]/page.tsx`, `features/movies/components/listing/` | Content discovery with hero banner and curated rows |
| Movies Listing | ✅ Complete | `src/app/[locale]/movies/page.tsx`, `features/movies/components/filters/` | Filterable movie catalog with pagination |
| Movie Detail | ✅ Complete | `src/app/[locale]/item/movie/[slug]/[id]/page.tsx`, `features/movies/components/detail/` | Full movie details with cast, reviews, videos, etc. |
| TV Shows Listing | ✅ Complete | `src/app/[locale]/tv-shows/page.tsx`, `features/tv/components/filters/` | Filterable TV catalog with pagination |
| TV Show Detail | ✅ Complete | `src/app/[locale]/item/tv/[slug]/[id]/page.tsx`, `features/tv/components/detail/` | TV show details with seasons, ratings |
| Season Detail | ✅ Complete | `src/app/[locale]/item/tv/[...]/season/[seasonNumber]/page.tsx` | Season episode list |
| Episode Detail | ✅ Complete | `src/app/[locale]/item/tv/[...]/episode/[episodeNumber]/page.tsx` | Individual episode details |
| People Directory | ✅ Complete | `src/app/[locale]/people/page.tsx`, `features/person/services/` | Responsive grid of popular people with pagination |
| Person Detail | ✅ Complete | `src/app/[locale]/people/[slug]/[id]/page.tsx`, `features/person/components/` | Actor/crew biography and filmography |
| Search | ✅ Complete | `features/multiSearch/`, `shared/components/layout/SearchBar.tsx` | Header search dropdown with TMDB multi-search |
| Authentication | ✅ Complete | `src/app/[locale]/auth/`, `features/auth/` | Firebase auth with email, Google, phone, guest modes |
| Collection Detail | ✅ Complete | `src/app/[locale]/collection/[slug]/page.tsx`, `features/collection/components/` | Movie collection/trilogy overview |
| Company Detail | ✅ Complete | `src/app/[locale]/company/[slug]/[id]/page.tsx`, `features/company/components/` | Production company profile |
| User Settings | ✅ Complete | `src/app/[locale]/settings/page.tsx`, `features/settings/` | Account, preferences, playback, notifications, privacy |
| User Profile | ⚠️ Partial | `src/app/[locale]/profile/page.tsx` | Reads from localStorage, edit features not fully implemented |
| Watchlist | ✅ Complete | `src/app/[locale]/watchlist/page.tsx`, `features/watchlist/` | Firestore-backed collection with MovieCard/TvCard, delete all |
| Favorites | ✅ Complete | `src/app/[locale]/favorites/page.tsx`, `features/favorites/` | Firestore-backed collection with MovieCard/TvCard, delete all |
| Subscription | ✅ Complete | `src/app/[locale]/subscription/page.tsx` | Pricing page with tier comparison |
| Static Pages | ✅ Complete | `src/app/[locale]/{about,careers,contact,cookies,faq,feedback,guidelines,help,press,privacy,terms,bookmarks}/` | Company info, legal, support pages |
| Internationalization | ✅ Complete | `src/i18n/`, `src/messages/` | English (en) and Arabic (ar) with RTL support |
| Theme System | ✅ Complete | `src/shared/components/theme/`, `globals.css` | Light/dark/system via next-themes with OKLCH tokens |
| PWA / Service Worker | ✅ Complete | Serwist configuration | Offline support with precaching and runtime caching |

---

## Dependency Overview

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `next` | 16.2.9 | React framework with App Router, Server Components, SSR |
| `react` / `react-dom` | 19.2.4 | UI library |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4 | Tailwind CSS PostCSS plugin |
| `tw-animate-css` | ^1.4 | Tailwind animation utilities |
| `shadcn` | ^4.11 | UI component library (radix-nova style) |
| `radix-ui` | ^1.6 | Accessible UI primitives (Dialog, DropdownMenu, Select, Separator, Slot) |
| `class-variance-authority` | ^0.7.1 | Component variant management |
| `clsx` | ^2.1.1 | Conditional class name construction |
| `tailwind-merge` | ^3.6 | Tailwind class conflict resolution (used in `cn()`) |
| `lucide-react` | ^1.21 | Icon library |
| `motion` | ^12.40 | Framer Motion animations (successor to `framer-motion`) |
| `swiper` | ^12.2 | Touch-enabled carousel/slider |
| `next-intl` | ^4.13 | Internationalization (routing, messages, navigation) |
| `next-themes` | ^0.4.6 | Theme provider (light/dark/system) |
| `firebase` | ^12.15 | Firebase Authentication SDK + Firestore |
| `axios` | ^1.18 | HTTP client for TMDB API (client-side listing pages) |
| `react-hook-form` | ^7.80 | Form validation (sign-up form) |
| `react-hot-toast` | ^2.6 | Toast notification system |
| `react-phone-number-input` | ^3.4 | Phone number input with country codes |
| `@serwist/*` | ^9.5 | PWA / service worker (precaching, routing, strategies, expiration) |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.2.9 | Next.js ESLint configuration |
| `jest` | ^30.4.2 | Installed, not configured |
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler Babel plugin (enabled in next.config) |
| `zustand` | ^5.0 | Installed, not currently used |
| `@tanstack/react-query` | ^5.101 | Installed, not currently used |
| `react-player` | ^3.4 | Installed, not currently used |

---

## Summary

SmartStream is an IMDb-inspired entertainment discovery platform built with Next.js. It provides a rich browsing experience for movies, TV shows, and actors using data from The TMDB API.

The application demonstrates a **hybrid rendering architecture** leveraging Next.js Server Components for data fetching and SEO optimizations, while Client Components handle interactivity. The codebase follows a **feature-based organization** with shared utilities and components.

Key architectural highlights:
- **Internationalization-first**: All routes are localized for English and Arabic with RTL support
- **Server-rendered dynamic content**: TMDB data is fetched on the server with configurable caching
- **Feature modules**: Each domain (auth, movies, tv, settings, etc.) is self-contained
- **Design token system**: Complete OKLCH-based design system with light/dark mode via next-themes
- **Multiple auth providers**: Email/password, Google, phone (SMS), and anonymous login via Firebase Auth with React Context
- **PWA ready**: Service worker via Serwist for offline support and caching

The project is production-ready for content browsing with Firebase Firestore integration for favorites and watchlist features, full filtering and pagination on all listing pages, and a responsive grid-based people directory.

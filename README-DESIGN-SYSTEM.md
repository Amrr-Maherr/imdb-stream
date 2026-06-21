# SmartStream Design System

> An IMDb-inspired design system for a modern streaming platform.
> Built with Tailwind CSS v4, powered by OKLCH color space, and fully theme-aware (light/dark).

---

## Design Philosophy

1. **Content-first** — The UI recedes so the content (movie posters, ratings, metadata) leads the experience.
2. **Dark-ready** — Dark mode is the primary cinematic experience; light mode is a secondary, fully supported variant.
3. **Scalable tokens** — Every visual property is a CSS variable. No hardcoded values anywhere.
4. **IMDb-inspired** — Warm yellow accents for ratings and calls-to-action, rich contrast ratios, and smooth hover interactions.
5. **Accessible** — All color pairs meet WCAG contrast requirements in both themes.

---

## 1. Color System

All colors use the OKLCH color space for perceptual uniformity and smooth dark-mode interpolation.

### Brand Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--brand` | `oklch(0.82 0.15 85)` | same | Primary accent, IMDb-style yellow |
| `--brand-foreground` | `oklch(0.145 0 0)` | same | Text on brand backgrounds |

### Neutral Palette

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Primary text |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card surface |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text on card |
| `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Dropdown/modal surface |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text in popover |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Subtle background |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Secondary/muted text |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Secondary surface |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on secondary |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Interactive hover bg |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on accent |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Borders, dividers |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Input borders |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus ring |
| `--overlay` | `oklch(0 0 0 / 50%)` | `oklch(0 0 0 / 70%)` | Modal backdrop |

### Semantic Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Primary buttons, CTA text |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Text on primary |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Delete, errors |
| `--info` | `oklch(0.6 0.15 250)` | same | Informational badges |
| `--info-foreground` | `oklch(0.985 0 0)` | same | Text on info |

### Rating Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--rating-imdb` | `oklch(0.82 0.15 85)` | IMDb rating badge |
| `--rating-star` | `oklch(0.82 0.15 85)` | Star ratings |
| `--rating-tomato` | `oklch(0.6 0.2 30)` | Rotten Tomatoes certified fresh |
| `--rating-audience` | `oklch(0.6 0.15 145)` | Audience score |

### Chart Colors

| Token | Usage |
|-------|-------|
| `--chart-1` through `--chart-5` | Data visualization, activity graphs |

### Tailwind Usage

```tsx
// Brand accent
<div className="bg-brand text-brand-foreground">IMDb Rating</div>

// Rating stars
<Star className="text-rating-star" />

// Overlay
<div className="bg-overlay" /> // modal backdrop

// Info badge
<span className="bg-info text-info-foreground">Info</span>
```

---

## 2. Typography System

### Font Family

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `Geist`, sans-serif | Body text, headings |
| `--font-mono` | `Geist Mono`, monospace | Code, numbers |
| `--font-heading` | `Geist`, sans-serif | Section headings |

### Type Scale

Use Tailwind's built-in type scale. Recommended semantic mapping:

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-display` | `4xl` (2.25rem) | `font-bold` | Hero titles |
| `text-h1` | `3xl` (1.875rem) | `font-semibold` | Page titles |
| `text-h2` | `2xl` (1.5rem) | `font-semibold` | Section headers |
| `text-h3` | `xl` (1.25rem) | `font-medium` | Card titles |
| `text-body` | `base` (1rem) | `font-normal` | Descriptions |
| `text-sm` | `sm` (0.875rem) | `font-normal` | Metadata |
| `text-xs` | `xs` (0.75rem) | `font-medium` | Badges, captions |

### Line Heights

| Token | Value |
|-------|-------|
| `--leading-tight` | 1.15 |
| `--leading-normal` | 1.5 |
| `--leading-relaxed` | 1.625 |

### Font Weights

Use Tailwind utilities: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).

---

## 3. Spacing System

Tailwind's default spacing scale (0.25rem increments) covers most needs.
Add these semantic gap tokens for media layouts:

| Token | Value | Usage |
|-------|-------|-------|
| `--gap-grid` | `1rem` (16px) | Grid gutter between cards |
| `--gap-card` | `0.75rem` (12px) | Inner card spacing |
| `--gap-section` | `2rem` (32px) | Between sections |

```tsx
<div className="gap-grid">   {/* grid gap */}
<div className="gap-card">   {/* card content gap */}
<div className="gap-section">{/* section spacing */}
```

---

## 4. Radius System

| Token | Calculation | Value | Usage |
|-------|-------------|-------|-------|
| `--radius-xs` | — | `0.3125rem` (5px) | Checkbox, small elements |
| `--radius-sm` | `--radius * 0.6` | `0.375rem` (6px) | Buttons, inputs |
| `--radius-md` | `--radius * 0.8` | `0.5rem` (8px) | Cards, dropdowns |
| `--radius-lg` | `--radius` | `0.625rem` (10px) | Modals, large cards |
| `--radius-xl` | `--radius * 1.4` | `0.875rem` (14px) | Poster cards |
| `--radius-2xl` | `--radius * 1.8` | `1.125rem` (18px) | Hero sections |
| `--radius-3xl` | `--radius * 2.2` | `1.375rem` (22px) | Large containers |
| `--radius-4xl` | `--radius * 2.6` | `1.625rem` (26px) | Extreme rounding |

Base `--radius`: `0.625rem` (10px).

---

## 5. Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 oklch(0 0 0 / 0.05)` | Subtle card elevation |
| `--shadow-md` | `0 4px 6px -1px oklch(...)` | Default card shadow |
| `--shadow-lg` | `0 10px 15px -3px oklch(...)` | Dropdowns, popovers |
| `--shadow-xl` | `0 20px 25px -5px oklch(...)` | Modals, toasts |
| `--shadow-glow` | `0 0 20px oklch(0.82 0.15 85 / 0.3)` | IMDb yellow hover glow (dark mode) |

```tsx
<Card className="shadow-md hover:shadow-lg transition-shadow" />
<Button className="hover:shadow-glow" />
```

---

## 6. Layout System

### Container

Content is constrained to `max-w-7xl` (1280px) for standard pages, full-width for hero sections.

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Wide screens |

### Grid Templates

```tsx
// Movie poster grid — responsive columns
<div className="grid grid-cols-2 gap-grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {movies.map(m => <MovieCard key={m.id} movie={m} />)}
</div>

// People grid — smaller items
<div className="grid grid-cols-3 gap-grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
  {people.map(p => <PersonCard key={p.id} person={p} />)}
</div>

// Footer columns
<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
```

---

## 7. Component Visual Rules

### Buttons
- `rounded-sm` radius
- Font weight `font-medium`
- Consistent height via `h-8` (default), `h-9` (lg), `h-7` (sm)
- Hover: background opacity shift (`hover:bg-primary/80`)
- Focus: visible ring (`focus-visible:ring-ring`)

### Movie Cards
- `aspect-[2/3]` poster container
- `rounded-xl` corners
- Hover: `scale-[1.02]` + `shadow-glow` (dark) or `shadow-lg` (light)
- Content gap: `gap-card`

### Navigation
- Fixed, z-50
- Scrolled state: `bg-background/80 backdrop-blur-md`
- Active link: `text-foreground bg-accent`
- Inactive link: `text-muted-foreground hover:text-foreground`

### Inputs
- `border border-input` default
- `rounded-md` corners
- Focus: `ring-ring` outline
- Placeholder: `placeholder:text-muted-foreground`

### Modals
- `bg-popover` surface
- `rounded-lg` corners
- `shadow-xl` elevation
- `bg-overlay` backdrop
- Slide/fade entry animation

---

## 8. Tailwind Integration

All design tokens are mapped to Tailwind utilities via `@theme inline` in `globals.css`:

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-geist-sans);
  --color-brand: var(--brand);
  --color-rating-star: var(--rating-star);
  --shadow-glow: var(--shadow-glow);
  --gap-grid: 1rem;
}
```

Use them as standard Tailwind classes:

```tsx
<button className="bg-brand text-brand-foreground font-medium px-4 py-2 rounded-sm">
  Rate
</button>

<div className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-card p-4">
  <div className="flex items-center gap-card">
    <Star className="text-rating-star size-4" />
    <span className="text-sm font-medium">8.4 / 10</span>
  </div>
</div>
```

---

## 9. Best Practices

1. **Never hardcode colors** — Always use Tailwind semantic classes (`bg-background`, `text-foreground`, `border-border`).
2. **Dark mode is automatic** — `dark:` variants apply via the `.dark` class on `<html>`. No manual color switching.
3. **Use gap tokens** — `gap-grid` for grid layouts, `gap-card` for card content, `gap-section` for sections.
4. **Prefer `shadow-md` as default** — Cards get `shadow-md`, hover promotes to `shadow-lg`.
5. **Rating colors are semantic** — Use `text-rating-star` for star icons, `text-rating-imdb` for IMDb scores, `text-rating-tomato` for Rotten Tomatoes.
6. **Keep radius consistent** — Buttons `rounded-sm`, cards `rounded-lg`, posters `rounded-xl`.
7. **Respect the overlay** — Modal backdrops use `bg-overlay`, no custom opacity.

---

## 10. Developer Rules

| Rule | Reason |
|------|--------|
| All colors must be CSS variables | Enables theme switching, prevents drift |
| No hex/rgb/hsl literals in components | Breaks theme adaptation |
| Use `cn()` utility for class merging | Prevents Tailwind class conflicts |
| Define new tokens in all 3 places | `:root` → `.dark` → `@theme inline` |
| Keep OKLCH color space | Perceptual uniformity, smooth dark mode |
| Document new tokens in this README | Keeps the system discoverable |

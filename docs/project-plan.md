# Summarist — Full Implementation Roadmap

## Overview

**TL;DR:** 8-phase build of a production-quality book summary app. Next.js 15 + TypeScript + CSS Modules + Redux Toolkit + React Context + Firebase + Stripe. Each phase delivers a deployable increment and includes: implementation steps, testing (Vitest + React Testing Library), accessibility checkpoints, performance considerations, learning goals, and interview-relevant concepts. You build — I guide.

## Tech Stack

| Tech | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework, routing, SSR/SSG |
| TypeScript (strict) | Type safety |
| CSS Modules (`.module.css`) | Scoped styling, real CSS mastery |
| Redux Toolkit | Global state: auth, modals, audio player |
| React Context | Simple state: dark mode theme, sidebar toggle |
| Firebase (Auth + Firestore) | Authentication + database |
| Stripe (`@stripe/stripe-js`) | Payment integration |
| clsx | Conditional CSS Module class names |
| sonner | Toast notifications |
| react-icons | Icons |
| Vitest | Test runner |
| React Testing Library | Component testing |
| @testing-library/user-event | User interaction simulation |
| Prettier | Code formatting |
| ESLint | Code quality |
| Husky + lint-staged | Pre-commit checks |
| GitHub Actions | CI pipeline (lint + typecheck + test) |
| Vercel | Deployment |

## State Management Strategy

| State | Tool | Why |
|---|---|---|
| Auth state (user, loading, errors) | **Redux** | Complex, global, multiple consumers, async flows |
| Modal state (open/close, current view) | **Redux** | Global — triggered from sidebar, home page, book page, protected routes |
| Audio player state (if needed globally) | **Redux** | Could be accessed from multiple components |
| Dark mode theme | **React Context** | Simple boolean, perfect Context use case |
| Sidebar open/close (mobile) | **React Context** | Local UI state, scoped to layout |

## API Endpoints

| Endpoint | Returns | Used For |
|---|---|---|
| `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected` | Single book object | Selected book on For You page |
| `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended` | Array of book objects | Recommended books on For You page |
| `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested` | Array of book objects | Suggested books on For You page |
| `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}` | Single book object by ID | Book detail page & player page |
| `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}` | Array of matching books | Search bar results |

## Book Object Shape

```
{
  id: string
  author: string
  title: string
  subTitle: string
  imageLink: string
  audioLink: string
  totalRating: number
  averageRating: number
  keyIdeas: number
  type: string
  status: string
  subscriptionRequired: boolean
  summary: string
  tags: string[]
  bookDescription: string
  authorDescription: string
}
```

## Git Workflow

| Phase | Branch | Merges Into |
|-------|--------|-------------|
| 0 | `main` | — |
| 1 | `feature/home-page` | `main` |
| 2 | `feature/auth` | `main` |
| 3 | `feature/for-you` | `main` |
| 4 | `feature/book-detail` | `main` |
| 5 | `feature/audio-player` | `main` |
| 6 | `feature/search-and-payments` | `main` |
| 7 | `feature/settings`, `feature/library`, `feature/dark-mode`, `feature/polish` | `main` |

---

## Phase 0: Project Scaffolding & Foundation

**What you're building:** Empty folder → running Next.js 15 app deployed to Vercel with testing infrastructure ready.

### Steps

1. (DONE) Run `npx create-next-app@latest` — select TypeScript, ESLint, App Router, `src/` directory. **Decline Tailwind.**
2. (DONE) Create folder structure inside `src/`:
   - `app/` — routes
   - `components/` — split into `auth/`, `layout/`, `book/`, `player/`, `ui/`, `home/`
   - `store/` — Redux store + slices
   - `context/` — React Context providers
   - `lib/` — Firebase config, API helpers, utilities
   - `types/` — shared TypeScript interfaces
   - `hooks/` — custom hooks
3. (DONE) Install runtime deps: `@reduxjs/toolkit react-redux clsx sonner react-icons @stripe/stripe-js firebase`
4. (DONE) Install dev deps for testing: `vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom`
5. (DONE) Configure Vitest: create `vitest.config.ts` with React plugin, jsdom environment, and path aliases matching your `tsconfig.json`
6. (DONE) Add a `test` script to `package.json`: `"test": "vitest"`, `"test:run": "vitest run"`
7. (DONE) Set up Redux Toolkit: `store/store.ts` with `configureStore`, export `RootState` and `AppDispatch` types, create typed `useAppSelector` / `useAppDispatch` hooks in `hooks/redux.ts`, create a `"use client"` `Providers.tsx` that wraps children in `<Provider store={store}>`
8. (DONE) Set up Firebase: create project in Firebase Console (enable Auth + Firestore), create `lib/firebase.ts` with config, add keys to `.env.local`
9. (DONE) Define `Book` interface in `types/book.ts` — all 16 fields from the API
10. (DONE) Create `lib/api.ts` — typed fetch helpers for the 5 Summarist endpoints
11. (DONE) Set up global styles in `app/globals.css` — CSS reset, CSS custom properties for theming (`--color-bg`, `--color-text`, `--color-primary`, `--color-secondary`, `--color-border`, etc.), base font styles
12. (DONE) Write a sanity test: test one of your API helper functions or a simple utility to verify the testing setup works
13. (DONE) Set up Prettier: install `prettier eslint-config-prettier` (dev deps), create `.prettierrc`, add `eslint-config-prettier` to ESLint config, add `"format": "prettier --write ."` script, configure VS Code format-on-save
14. (SKIP) Set up Husky + lint-staged: install `husky lint-staged` (dev deps), run `npx husky init`, configure `lint-staged` in `package.json` to run Prettier + ESLint + type-check on staged files
15. (DONE) Set up GitHub Actions: create `.github/workflows/ci.yml` — triggers on push to `main` and PRs to `main`, steps: checkout → install Node → install deps → `tsc --noEmit` → `npm run lint` → `npm run test:run`
16. (DONE) Create error handling files:
    - `app/not-found.tsx` — global 404 page ("Page not found" + link to home), styled with CSS Modules
    - (SKIP) `app/global-error.tsx` — `"use client"`, includes `<html>` and `<body>`, receives `error` and `reset` props, shows "Something went wrong" + "Try again" button
    - `components/ui/ErrorFallback.tsx` — reusable error UI component (accepts `error` + `reset` props), used inside every route-level `error.tsx`
17. Init Git, `.gitignore` (include `.env.local`), initial commit, push to GitHub
18. Connect to Vercel, verify deployment

### Testing

- Verify Vitest runs with `npm test`
- Write 1 sanity test (e.g., test that `formatTime(125)` returns `"2:05"`)

### Accessibility

- Set up an accessible base: `html` lang attribute set in root layout, viewport meta tag, base font size in `rem` not `px`

### Performance

- CSS custom properties centralized (no scattered hardcoded colors to refactor later)
- `next/image` import ready (Next.js provides this out of the box)

### 🎯 Learning Goals

- **Project architecture** — separation of concerns, scalable folder structure. Interview question: *"How do you structure a React project?"*
- **TypeScript interfaces** — defining data contracts before writing UI. Production workflow.
- **Environment variables** — secrets management, `.env.local` vs `.env`
- **Redux setup pattern** — `configureStore` → typed hooks → Provider. Universal pattern.
- **Testing infrastructure** — setting up a test runner. Tests are part of the project from day 1, not an afterthought.
- **CSS custom properties** — design token system. Foundation for theming and consistency.
- **CI/CD** — GitHub Actions runs lint + typecheck + tests on every push. Standard in every company.
- **Error boundaries** — `error.tsx` and `not-found.tsx` file conventions. Understanding how errors propagate in Next.js App Router.

### Verification

`npm run dev` works locally. `npm test` runs and passes. `npm run lint` passes. Deployed to Vercel. Redux DevTools show empty store. No TypeScript errors. GitHub Actions pipeline runs on push.

### Branch: `main`

---

## Phase 1: Home Page + Global Layout Shell

**What you're building:** The landing page (converted from provided HTML/CSS) and the layout structure that controls which pages show sidebar/search.

### Steps

1. Reference the [provided home page HTML/CSS](https://github.com/hannamitri/summarist-home-page) — study the structure, class names, sections
2. Convert each section into React components under `components/home/` with co-located `.module.css` files
3. Build `app/page.tsx` composing the home sections
4. Use `next/image` for all images (proper `alt` text, `width`/`height` or `fill`)
5. Use `next/font` for custom fonts if the design uses them
6. Write responsive styles yourself — `@media` queries in `.module.css`, mobile-first
7. Create root `app/layout.tsx` with conditional logic: sidebar + search shell on app pages (`/for-you`, `/book/*`, `/player/*`, `/settings`, `/library`), no shell on `/` and `/choose-plan`. Render placeholder `<div>`s for Sidebar/SearchBar for now.
8. Create `components/ui/Skeleton.tsx` + `Skeleton.module.css` — reusable animated placeholder component
9. Practice `clsx` for the first time: use it for any conditional class names on home page components (e.g., `clsx(styles.section, styles.dark)` for alternating section backgrounds)

### Testing

- Test that home page components render without crashing (basic smoke tests with RTL's `render()`)
- Test that the `Skeleton` component renders with different size props

### Accessibility

- Semantic HTML throughout: `<header>`, `<main>`, `<footer>`, `<section>`, proper heading hierarchy (`h1` → `h2` → `h3`, no skipping)
- All `next/image` instances have descriptive `alt` text
- Links have meaningful text (no "click here")
- Verify heading order with a browser extension or manual check
- Color contrast: verify text against backgrounds meets WCAG AA (4.5:1 ratio)
- When using `clsx` for conditional styles, ensure visual changes aren't the *only* way info is conveyed

### Performance

- `next/image` handles lazy loading, format conversion, responsive sizing automatically
- No unnecessary client-side JavaScript on the home page — keep components as Server Components where possible (no `"use client"` unless needed)

### 🎯 Learning Goals

- **HTML → React conversion** — where to split components, what becomes reusable. *"How do you decide component boundaries?"*
- **CSS Modules scoping** — `.module.css` generates unique class names. No name collisions. Compare to global CSS, BEM, CSS-in-JS.
- **`next/image`** — why it exists (Core Web Vitals: LCP, CLS). Performance interview topic.
- **Responsive design** — writing real `@media` queries. Mobile-first means styles default to mobile, then layer on complexity for larger screens.
- **Semantic HTML** — the foundation of accessibility. Not just `<div>` soup.
- **`clsx` basics** — first hands-on use. Pattern: `clsx(styles.base, condition && styles.modifier)`.
- **Server vs Client Components** — understanding which components need `"use client"` and which don't. Key Next.js concept.

### Verification

Home page matches the reference visually. Responsive at 375px, 768px, 1024px+. `npm test` passes. Lighthouse a11y score > 90. Deployed to Vercel.

### Branch: `feature/home-page`

---

## Phase 2: Authentication System

**What you're building:** Full auth flow — modal UI, Firebase Auth, Redux state management, form handling with validation, and protected route logic.

### Steps

1. Create `store/authSlice.ts` — state: `{ user: User | null, isLoading: boolean, error: string | null }`. Reducers: `setUser`, `setLoading`, `setError`, `clearError`. Define `User` type in `types/user.ts`.
2. Create `store/modalSlice.ts` — state: `{ isOpen: boolean, view: "login" | "register" | "forgotPassword" }`. Reducers: `openModal(view)`, `closeModal`.
3. Register both slices in `store/store.ts`
4. Build `components/auth/AuthModal.tsx` (`"use client"`) — reads `modalSlice` state from Redux:
   - Login form: email + password (controlled inputs via `useState`)
   - Register form: email + password
   - Guest login button (hardcoded credentials)
   - Forgot password form: email input → Firebase `sendPasswordResetEmail`
   - View toggle: "Don't have an account?" / "Already have one?"
   - Error display: inline on form from `authSlice.error`
   - `sonner` toasts on success
   - `AuthModal.module.css` for styling
5. Build `AuthListener` client component — `onAuthStateChanged` → dispatches `setUser`. Place in `Providers.tsx`.
6. Manual form validation: empty fields, email format (regex or simple check), password length >= 6. Show errors *before* calling Firebase.
7. Redirect on success: `router.push("/for-you")`
8. Build `useRequireAuth` hook — checks auth, opens modal if not authenticated. Use on protected pages.
9. Wire auth modal trigger to home page CTAs
10. Auth loading state: show spinner/skeleton while `onAuthStateChanged` initializes
11. Google OAuth: configure in Firebase, add "Sign in with Google" button, use `signInWithPopup`
12. Use `clsx` for conditional form styles (e.g., `clsx(styles.input, error && styles.inputError)` to show red border on invalid fields)

### Testing

- Test `authSlice` reducer: dispatch `setUser` → state updates correctly, dispatch `setError` → error state updates, dispatch `clearError` → error clears
- Test `modalSlice` reducer: dispatch `openModal("login")` → `isOpen: true, view: "login"`, dispatch `closeModal` → `isOpen: false`
- Test form validation logic: empty email returns error, short password returns error, valid input passes
- Test `AuthModal` component: renders login form by default, toggles to register form when link clicked

### Accessibility

- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title
- **Focus trap**: when modal opens, focus moves into the modal and Tab cycles only within it. When it closes, focus returns to the element that triggered it.
- Escape key closes the modal
- Click on backdrop closes the modal
- Form inputs have associated `<label>` elements (not just placeholder text)
- Error messages linked to inputs via `aria-describedby`
- Submit button has clear text ("Log In", "Create Account" — not just "Submit")
- Live region or `aria-live="polite"` for error messages so screen readers announce them
- Visible focus indicators on all focusable elements (style `:focus-visible` in CSS)

### Performance

- Firebase SDK: import only the methods you need (`import { signInWithEmailAndPassword } from "firebase/auth"`) — tree-shakeable
- Auth listener runs once, not on every render

### 🎯 Learning Goals

- **Redux actions/reducers/selectors** — dispatching actions, state transitions, reading state. The pattern that carries to Zustand/Context+useReducer.
- **Controlled inputs** — `useState` + `onChange` + `value`. Fundamental React. Interviewers test this.
- **Manual validation** — you understand what form libraries abstract. You can articulate trade-offs.
- **`onAuthStateChanged` as a subscription** — observer/listener pattern. Appears in WebSockets, real-time DBs, event buses.
- **Custom hooks** — `useRequireAuth` encapsulates cross-cutting logic. *"When would you extract a custom hook?"*
- **Focus management** — trapping focus in a modal is one of the most common a11y interview questions. You'll have done it by hand.
- **Testing reducers** — pure functions are the easiest thing to test. Great starting point for testing confidence.

### Verification

All auth flows work (register, login, guest, Google, logout, forgot password). Persists on refresh. Protected routes redirect. Errors display. Modal traps focus, closes on Escape. Redux DevTools show correct transitions. Tests pass. Toasts fire.

### Branch: `feature/auth`

---

## Phase 3: Sidebar + Search Bar UI + For You Page

**What you're building:** The authenticated app shell and the main "For You" content page with real API data.

### Steps

1. Create `context/SidebarContext.tsx` — `isOpen` boolean, `toggleSidebar`, `closeSidebar`. Wrap the app layout in `<SidebarProvider>`.
2. Build `components/layout/Sidebar.tsx` (`"use client"`):
   - 7 nav items with `react-icons` icons
   - Active route highlighting via `usePathname()`
   - Conditional Login/Logout (reads Redux auth state)
   - Disabled items with `cursor: not-allowed` + muted styling
   - Mobile: hamburger toggle using `SidebarContext`
   - CSS: positioning, transitions for mobile slide-in, overlay/backdrop on mobile
   - `Sidebar.module.css`
3. Build `components/layout/SearchBar.tsx` — visual only for now (input + icon). Full functionality in Phase 6.
4. Replace layout placeholders with real `<Sidebar />` and `<SearchBar />`
5. Build For You page (`app/for-you/page.tsx`):
   - Fetch Selected, Recommended, Suggested books from 3 API endpoints
   - Server Component fetch (recommended) or Client Component with `useEffect`
   - Book cards: `components/book/BookCard.tsx` with variants for selected (large) vs recommended/suggested (compact)
   - "Premium" pill badge when `subscriptionRequired === true`
   - Each card links to `/book/[id]`
   - Duration placeholder (filled in Phase 5)
6. Skeleton loading: `loading.tsx` file or per-section loading states with Suspense
7. Protect `/for-you` with `useRequireAuth`
8. `clsx` usage: active nav item (`clsx(styles.navItem, isActive && styles.active)`), premium badge conditionals, mobile sidebar open state
9. Create `app/for-you/error.tsx` — `"use client"`, renders `ErrorFallback` component. Catches API failures when fetching books.
10. In API fetch calls, if the response is not ok, `throw new Error("Failed to load books")` so the error boundary catches it.

### Testing

- Test `SidebarContext`: toggle changes `isOpen` state
- Test `BookCard` component: renders title, author, image. Shows premium badge when `subscriptionRequired: true`, hides it when `false`.
- Test that Sidebar renders all 7 nav items
- Test For You page: mock the API responses, verify all 3 sections render

### Accessibility

- Sidebar: use `<nav>` with `aria-label="Main navigation"`, `<ul>` / `<li>` for nav items
- Active item: not just visually highlighted — add `aria-current="page"` to the active nav link
- Disabled items: `aria-disabled="true"`, not just visual `cursor: not-allowed`
- Mobile sidebar: when open, trap focus within it (or use `inert` on the main content). Close on Escape.
- Mobile hamburger button: `aria-expanded="true/false"`, `aria-controls="sidebar"`, `aria-label="Toggle navigation"`
- Book cards: if the entire card is clickable, use `<a>` or `<Link>`. Don't nest interactive elements.
- Search bar: `<label>` or `aria-label` on the input. `role="search"` on the form/container.
- Book images: descriptive `alt` text (e.g., book title, not "book cover image")

### Performance

- Server Components for data fetching (no client-side `useEffect` waterfall)
- Skeleton loading prevents layout shift (CLS)
- Sidebar CSS transitions: use `transform: translateX()` (GPU-accelerated) not `left` or `width`

### 🎯 Learning Goals

- **Context vs Redux in the same app** — Sidebar = Context (simple, 2 consumers). Auth = Redux (complex, many consumers). You can articulate the difference with real experience.
- **Data fetching in Next.js App Router** — Server Components can `await fetch()`. This is a major Next.js interview topic.
- **Component variants** — same data, different layouts. Props-driven rendering.
- **`usePathname`** — reading the current route. Common pattern for active nav states.
- **`aria-current`, `aria-expanded`, `aria-controls`** — ARIA attributes you'll use constantly.
- **CSS transitions** — sidebar slide-in animation. Hardware-accelerated transforms vs paint-triggering properties.
- **Mocking in tests** — mocking API responses to test components in isolation.
- **Error boundaries** — `error.tsx` catches rendering errors in the route segment. Understanding error propagation.

### Verification

Sidebar renders correctly, toggles on mobile, highlights active route. For You page loads all 3 book sections. Skeletons show during loading. Premium badges appear. Error boundary catches API failures gracefully. Screen reader can navigate the sidebar. Tests pass.

### Branch: `feature/for-you`

---

## Phase 4: Book Detail Page + Subscription Gating

**What you're building:** Dynamic book pages with full detail and access control logic.

### Steps

1. Create `app/book/[id]/page.tsx` — dynamic route
2. Fetch book via `getBook?id=${id}`
3. Display: title, subtitle, author, image, description, rating (stars), key ideas, type, tags, author description
4. Subscription gating on "Read" / "Listen" button:
   - Not logged in → `dispatch(openModal("login"))`
   - Logged in + `subscriptionRequired` + no subscription → `router.push("/choose-plan")`
   - Logged in + free book or subscribed → `router.push(`/player/${id}`)`
5. Read subscription status from Firestore (via Redux or a direct query)
6. Create `app/book/[id]/loading.tsx` — skeleton state
7. Create `app/book/[id]/error.tsx` — catches fetch failures, renders `ErrorFallback`
8. Create `app/book/[id]/not-found.tsx` — contextual "Book not found" UI
9. In the page component: fetch book → if no data returned → call `notFound()` (from `next/navigation`)
10. Style with CSS Modules — image + text layout, responsive stacking
11. Protect with `useRequireAuth`
12. `clsx` usage: conditional styling on CTA button based on subscription state, premium badge

### Testing

- Test subscription gating logic as a standalone function: given (logged in, subscriptionRequired, hasSubscription) → returns correct action ("openModal" | "redirectChoosePlan" | "redirectPlayer")
- Test Book Detail component: renders book data correctly from mocked API
- Test that premium badge appears for premium books

### Accessibility

- Book rating: don't rely on star icons alone. Add text like "4.5 out of 5 stars" (visually hidden or beside icons). Use `aria-label` on the rating container.
- Tags: render as a `<ul>` list for semantic structure
- CTA button: clear action text ("Read this book" / "Subscribe to read"). If disabled, communicate why (`aria-disabled` + tooltip or visible text)
- Image: `alt` text = book title
- Heading hierarchy: `h1` for book title, `h2` for sections (Description, About Author)

### Performance

- Consider generating static pages for popular books with `generateStaticParams` (SSG). Good to understand even if you don't implement it.
- Image optimization via `next/image`
- Minimal client-side JS — gating logic can be a small client component, rest can be server-rendered

### 🎯 Learning Goals

- **Dynamic routing** — `[id]` params in App Router. How data flows from URL → component. Core Next.js concept.
- **Business logic in the UI** — multi-branch conditional navigation. This is what real apps do. Be ready to whiteboard this flow.
- **Firestore reads** — querying user documents. Understanding NoSQL document structure.
- **`loading.tsx`** — Next.js Suspense boundaries. How they work under the hood.
- **Testing business logic** — extracting gating logic into a testable pure function. Separating logic from UI = more testable code.
- **`notFound()` vs throwing errors** — expected missing data (invalid ID → `notFound()`) vs unexpected failures (API down → `throw` caught by `error.tsx`). Different tools for different situations.

### Verification

`/book/[any-valid-id]` renders correct data. Gating works for all 3 scenarios. Skeleton shows. `notFound()` triggers for invalid IDs. Error boundary catches API failures. Tests pass. Screen reader can navigate the page.

### Branch: `feature/book-detail`

---

## Phase 5: Audio Player + Duration Backfill

**What you're building:** Custom audio player with full controls, then backfilling book duration on earlier pages.

### Steps

1. Create `app/player/[id]/page.tsx`
2. Fetch book data
3. Display title + summary (`white-space: pre-line` in CSS)
4. Build `components/player/AudioPlayer.tsx` from scratch:
   - Hidden `<audio>` element controlled via `useRef`
   - Play/Pause toggle
   - Forward/Backward skip (10-15 seconds)
   - Current time + total duration display (`mm:ss` format)
   - Seekable progress bar (click/drag to seek)
   - `formatTime` utility in `lib/utils.ts`
5. Edge cases: audio loading spinner, error state, end-of-playback behavior
6. Consider: player state in Redux (global, persists across navigations like Spotify) vs local state (simpler, resets on navigation). Think through trade-offs, make a decision, be ready to explain it.
7. Mobile sidebar behavior on player page
8. Protect with `useRequireAuth` + subscription check
9. Create `app/player/[id]/error.tsx` — catches fetch or audio loading failures
10. Create `app/player/[id]/not-found.tsx` — "Book not found" for invalid player IDs
11. In page component: fetch → no data → `notFound()`
12. **Duration Backfill**: create `useAudioDuration(audioLink: string)` hook — loads audio metadata, returns duration. Add to `BookCard` and Book Detail components.
13. `clsx` for player controls: active/inactive states on play/pause button, disabled state on skip buttons at start/end

### Testing

- Test `formatTime` utility: `formatTime(0)` → `"0:00"`, `formatTime(65)` → `"1:05"`, `formatTime(3600)` → `"60:00"`
- Test `useAudioDuration` hook: mock `Audio` constructor, verify it returns duration
- Test AudioPlayer component: renders play button, renders time display, handles missing audio gracefully

### Accessibility

- Audio player: wrap in a `<div role="region" aria-label="Audio player">`
- Play/Pause button: `aria-label` updates dynamically (`"Play"` / `"Pause"`)
- Skip buttons: `aria-label="Skip forward 10 seconds"`, `aria-label="Skip back 10 seconds"`
- Progress bar: if using `<input type="range">`, it's natively accessible. Add `aria-label="Audio progress"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext="1 minute 30 seconds"` (human-readable time)
- If building a custom progress bar (div-based), add `role="slider"` with all the ARIA slider attributes + keyboard support (Arrow Left/Right to seek)
- Time displays: consider `aria-live="off"` to prevent screen readers from announcing every second update
- Keyboard: Space to play/pause, arrow keys to seek

### Performance

- Don't preload all audio for duration display — load metadata only (`new Audio()` with `preload: "metadata"`)
- `useRef` avoids unnecessary re-renders (DOM element reference, not state)
- Progress bar updates: use `requestAnimationFrame` if needed for smooth seeking, or rely on `timeupdate` event (~4x/second)

### 🎯 Learning Goals

- **`useRef`** — accessing DOM elements directly. *"What's the difference between state and ref?"* Classic interview question.
- **Browser APIs** — `HTMLAudioElement`, event listeners (`timeupdate`, `loadedmetadata`, `ended`). Working with native APIs is a key skill.
- **Event listener cleanup** — returning cleanup functions from `useEffect`. Prevents memory leaks.
- **Custom hooks** — `useAudioDuration`. Another reusable extraction example.
- **ARIA for custom widgets** — slider roles, dynamic labels. Advanced a11y that impresses interviewers.
- **Architectural decisions** — local vs global player state. Being able to explain trade-offs is senior-level thinking.

### Verification

Play/pause works. Skip buttons work. Progress bar updates in real-time and is seekable. Time displays correct. Duration shows on For You + Book pages. Error/not-found states work. Keyboard controls work. Tests pass.

### Branch: `feature/audio-player`

---

## Phase 6: Search + Sales Page + Stripe

**What you're building:** Full debounced search, sales page design, and Stripe payment integration.

### Steps

**Search:**

1. Create `useDebounce` hook in `hooks/` — generic hook: takes value + delay, returns debounced value
2. Upgrade `SearchBar.tsx`: controlled input → debounced value → fetch `getBooksByAuthorOrTitle?search=${query}` → display results dropdown
3. Results dropdown: each result links to `/book/[id]`
4. Handle: empty query (clear results), no matches, loading state, click outside to close
5. Style dropdown with CSS Modules — `position: absolute`, z-index, transitions
6. `clsx` for search states: `clsx(styles.dropdown, isOpen && styles.visible, isLoading && styles.loading)`

**Sales Page:**

7. Create `app/choose-plan/page.tsx` (no sidebar/search — already handled by layout)
8. Build: plan cards (Monthly vs Annual), toggle between them, accordion FAQ, CTA buttons
9. Build `components/ui/Accordion.tsx` + `Accordion.module.css` — animated open/close
10. `clsx` for active plan card: `clsx(styles.planCard, isSelected && styles.selected)`

**Stripe:**

11. Set up Stripe account, Firebase Stripe extension, create products (Monthly = `premium`, Annual = `premium-plus` with 7-day trial)
12. Checkout flow: click plan → create Stripe checkout session via Firestore → redirect to Stripe → handle return/success
13. On success: store subscription tier in user's Firestore document
14. Sync subscription status into Redux auth state
15. `sonner` toasts for payment success/failure

### Testing

- Test `useDebounce` hook: value updates only after delay period
- Test search results rendering: mock API, verify results display, verify "no results" message
- Test `Accordion` component: click toggles open/close state
- Test subscription gating function with updated subscription statuses

### Accessibility

- Search input: `role="combobox"`, `aria-expanded`, `aria-controls` pointing to results list, `aria-autocomplete="list"`
- Search results: `role="listbox"`, each result is `role="option"`. Arrow keys navigate results, Enter selects.
- Search: `aria-live="polite"` region announcing result count ("5 results found")
- Accordion: each trigger is a `<button>` inside a heading (`<h3>`). `aria-expanded="true/false"`, `aria-controls` linking to panel. Panel has `role="region"` and `aria-labelledby`.
- Plan cards: if selectable, use `role="radiogroup"` + `role="radio"` or visually distinct enough with text labels
- Stripe redirect: inform user they're leaving the site

### Performance

- Debounce prevents API spam — 300ms delay
- Search results: consider limiting displayed results (e.g., top 10)
- Accordion: CSS transitions on `max-height` or `grid-template-rows` for smooth animation (avoid animating `height` directly)

### 🎯 Learning Goals

- **Debouncing** — *"Explain the difference between debounce and throttle"* — classic interview question. You built the hook yourself.
- **`useDebounce` hook** — one of the most commonly asked "build this" interview questions.
- **Combobox pattern** — search + dropdown is one of the most complex a11y patterns. Implementing it shows deep understanding.
- **Accordion component** — another common interview "build this" challenge.
- **Third-party payment integration** — understanding checkout flows, webhooks, subscriptions.
- **CSS positioning** — `absolute` / `relative` for dropdowns, `z-index` stacking. Interviewers test CSS fundamentals.
- **`role="combobox"`, `role="listbox"`** — advanced ARIA. Few junior candidates know these.

### Verification

Search debounces (Network tab shows requests only after 300ms pause). Results display and navigate. No-results state works. Sales page renders plans and FAQ. Stripe checkout works in test mode. Subscription saves to Firestore. Tests pass. Keyboard can navigate search results.

### Branch: `feature/search-and-payments`

---

## Phase 7: Settings + Library + Dark Mode + Polish

**What you're building:** Remaining pages, all optional features, dark mode, final a11y/performance audit, portfolio-ready finish.

### Steps

**Settings Page:**

1. Create `app/settings/page.tsx`
2. Not-logged-in: prompt image + "Login" button → auth modal
3. Logged-in: email display, subscription tier, "Upgrade" button for basic
4. Skeleton loading, protect with `useRequireAuth`
5. Create `app/settings/error.tsx` — catches Firestore read failures

**Library Page:**

6. Create `app/library/page.tsx`
7. Saved Books + Finished Books sections
8. Firestore storage under user document
9. "Save to Library" button on Book Detail page
10. "Finished" tracking on AudioPlayer `ended` event
11. Skeleton loading

**Active Heading (Home Page):**

12. Scroll spy using `IntersectionObserver` — highlights current section in a nav indicator

**Dark Mode:**

13. Create `context/ThemeContext.tsx` — `theme: "light" | "dark"`, `toggleTheme`
14. On mount: check `localStorage`, fall back to `prefers-color-scheme`
15. Toggle `data-theme="dark"` on `<html>`
16. Update `globals.css`: light values as defaults, dark overrides in `[data-theme="dark"]`
17. Go through all `.module.css` files: replace hardcoded colors with `var(--color-*)` custom properties
18. Theme toggle button in Sidebar
19. Persist in `localStorage`

**Accessibility Final Audit:**

20. Run Lighthouse a11y on every page — target score > 95
21. Verify heading hierarchy across all pages
22. Test with keyboard only: can you use the entire app without a mouse?
23. Test focus management: modal focus trap, return focus on close, sidebar focus trap on mobile
24. Verify all images have `alt` text
25. Verify color contrast in both light and dark modes
26. Add skip-to-content link in root layout
27. Test with a screen reader if possible (VoiceOver, NVDA, or Orca)
28. Check `prefers-reduced-motion` — respect in CSS transitions/animations

**Responsive Final Pass:**

29. Test every page at 375px, 768px, 1024px, 1440px
30. Fix layout issues
31. Sidebar mobile behavior, player mobile layout

**Performance Final Pass:**

32. Run Lighthouse performance — target score > 90
33. Check bundle size, remove unused imports
34. Verify no layout shift (CLS)
35. Verify images optimized via `next/image`
36. Fix any TypeScript `any` types — strict mode clean

**Portfolio Finish:**

37. Clean up console warnings/errors
38. Write README: project description, screenshots, tech stack, architecture decisions (why Redux + Context, why CSS Modules, why not Tailwind), features list, setup instructions, live demo link
39. Full end-to-end walkthrough
40. Final Vercel deployment

### Testing

- Test `ThemeContext`: toggle switches theme, persists to localStorage
- Test Settings page: renders different UI for logged-in vs logged-out
- Test Library: shows saved books, shows empty state
- Run full test suite — all tests green

### Accessibility

- Dark mode: verify contrast ratios in dark theme
- Theme toggle button: `aria-label` updates dynamically ("Switch to dark mode" / "Switch to light mode")
- `prefers-reduced-motion`: respect in CSS transitions/animations
- Library empty states: announce "No saved books" to screen readers

### Performance

- `IntersectionObserver` for scroll spy — no scroll event listener (much more performant)
- `localStorage` access only in `useEffect` (not during SSR — prevents hydration mismatch)
- Theme flicker prevention: consider a blocking `<script>` in `<head>` to set `data-theme` before first paint (advanced — optional)

### 🎯 Learning Goals

- **React Context from scratch** — two contexts total (Theme + Sidebar). After this, you can confidently explain Context vs Redux with real-world examples.
- **CSS custom properties for theming** — design tokens, cascading overrides. How real design systems work.
- **`localStorage` in Next.js** — client-only API in an SSR framework. Understanding hydration mismatches and how to avoid them.
- **`IntersectionObserver`** — powerful browser API. Used in lazy loading, infinite scroll, analytics, scroll-triggered animations.
- **Full a11y audit** — verification pass, not a retrofit. You built accessibly all along.
- **Portfolio presentation** — clean README, deployed demo, architectural explanation. This is what gets you interviews.

### Verification

All features work. Dark mode toggles and persists. Lighthouse a11y > 95, performance > 90. Responsive on all breakpoints. No console errors. README complete. Live on Vercel. Full test suite passes.

### Branch: `feature/settings`, `feature/library`, `feature/dark-mode`, `feature/polish`

---

## Error Handling Summary

| File | Location | Purpose | Phase |
|---|---|---|---|
| `app/not-found.tsx` | Root | Global 404 — any unmatched URL | 0 |
| `app/global-error.tsx` | Root | Last-resort catch for root layout crashes | 0 |
| `components/ui/ErrorFallback.tsx` | Shared | Reusable error UI (message + retry button) | 0 |
| `app/for-you/error.tsx` | For You route | API fetch failures | 3 |
| `app/book/[id]/error.tsx` | Book detail | Fetch failures for individual books | 4 |
| `app/book/[id]/not-found.tsx` | Book detail | Invalid book ID | 4 |
| `app/player/[id]/error.tsx` | Player | Fetch/audio failures | 5 |
| `app/player/[id]/not-found.tsx` | Player | Invalid player book ID | 5 |
| `app/settings/error.tsx` | Settings | Firestore read failures | 7 |

**Key rules:**
- `error.tsx` must be a Client Component (`"use client"`)
- `error.tsx` catches errors in `page.tsx` and children, NOT same-level `layout.tsx`
- `not-found.tsx` is a Server Component by default
- `notFound()` is for expected missing data (invalid ID). `throw` is for unexpected failures (API down).
- The `reset` function attempts re-rendering — use for "Try again" buttons

## Key Architectural Decisions (for README & Interviews)

- **Redux for auth/modals, Context for theme/sidebar** — chose the right tool per complexity level, not one-size-fits-all
- **Redux despite being overkill** — intentional learning choice; principles transfer to Zustand, Context + `useReducer`, and any flux-pattern state management
- **CSS Modules over Tailwind** — prioritized deep CSS understanding over utility shortcuts for stronger fundamentals
- **Plain controlled inputs over React Hook Form** — forms are simple; chose to learn the underlying mechanics
- **Next.js 15 App Router** — modern, stable, job-relevant; `loading.tsx` convention aligns with skeleton requirements
- **Vitest + RTL** — modern, fast test runner with component testing that mirrors user interactions
- **GitHub Actions CI** — lint + typecheck + test on every push. Industry standard practice.

## What You'll Be Able to Talk About in Interviews

After completing this project, you'll have hands-on experience with:

- Next.js App Router (routing, layouts, server/client components, data fetching, error boundaries)
- TypeScript in a real project (interfaces, generics, strict mode)
- Redux Toolkit (slices, typed hooks, middleware concepts)
- React Context (when to use it vs Redux — with real examples)
- CSS Modules + custom properties + responsive design + dark mode theming
- Firebase Auth + Firestore
- Stripe payments
- Custom hooks (`useDebounce`, `useAudioDuration`, `useRequireAuth`)
- Accessibility (ARIA, focus management, keyboard navigation, semantic HTML, combobox pattern)
- Testing (Vitest + RTL, testing reducers/hooks/components)
- CI/CD (GitHub Actions, Husky, lint-staged)
- Git feature branches
- Vercel deployment
- Performance optimization (Core Web Vitals, Lighthouse)
- Error handling (error boundaries, not-found pages, graceful degradation)
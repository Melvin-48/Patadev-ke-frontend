# PataDev Ke - Frontend

React + TypeScript + Vite. Talks to the NestJS backend for everything except
Realtime messaging, which uses Supabase's client directly.

## Getting started
```bash
npm install
cp .env.example .env      # fill in your backend URL + Supabase project details
npm run dev
```
Runs at `http://localhost:5173`.

## Why Vite + React Router, not Next.js
The team's confirmed decision was React, not Next.js specifically. Next.js's
`app/api/` routes invite quietly rebuilding backend logic on the frontend -
a real risk already hit once with the original prototype. Plain React removes
that path structurally: there is nowhere in this project to put a second
backend, on purpose.

## Structure
```
src/
  lib/           API client, Supabase client (Realtime only), utils
  contexts/      AuthContext - session, current user, role
  components/
    ui/          Button, Card, Input, Badge - shared primitives
    layout/      Navbar + one layout shell per role area
    common/      ProtectedRoute (role guard), loading/empty states
  features/      One folder per backend module - projects, bids, messages,
                 milestones, payments, notifications, admin, auth, users.
                 Mirrors the backend's module split on purpose, so each
                 folder maps directly to whoever already owns that module.
  types/         Shared TS interfaces matching backend entities
```

## Module ownership (mirrors the backend split)
| Person | Frontend features |
|---|---|
| Derrick | auth/, users/ (profile setup + edit) |
| Lawrence | messages/, payments/ (status views, not a wallet) |
| Melvin | projects/, bids/ |
| Peter | milestones/, notifications/ |
| Shared | admin/ |

## What's scaffolded vs. what's still a TODO
Every route, layout, and API service function exists and compiles. Page
components have real structure (headings, layout, role-aware branching where
relevant) but business logic - actual data fetching, form submission wired to
the real endpoints - is marked with TODO comments, the same convention the
backend scaffold used. This is a starting structure to build on, not a
finished app.

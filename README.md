# PataDev Ke

A marketplace connecting Kenyan businesses and individuals who need custom software with developers who build it. Think Upwork, but purpose-built for the software-project workflow: post a project, collect bids, fund an escrow, ship milestones, get paid.

## The Idea

Three kinds of people use this platform:

- **Clients** post a project, review developer bids, fund milestones, and approve deliverables.
- **Developers** browse open projects, submit bids, get matched, deliver work in milestones, and withdraw earnings.
- **Admins** referee — resolving disputes, moderating users, and overseeing payouts.

Everything in between — messaging, notifications, escrow — exists to make that handoff between client and developer safe and trackable.

## Core Flow

1. Client posts a project → developers browse and submit bids
2. Client picks a developer → project moves into an active state
3. Work is broken into milestones; client funds escrow per milestone
4. Developer submits a deliverable → client reviews and approves (or disputes)
5. Approved milestone releases payment to the developer's wallet
6. Messaging runs alongside the whole thing for client ↔ developer coordination
7. If something goes wrong, it lands with an admin to resolve

## Status

This is a **frontend scaffold**, not a finished app. Routing, layouts, role-based access, and the shared UI kit are in place. The actual feature logic — forms, API calls, real-time chat, payment integration — is stubbed out with `TODO` comments for the team to build against.

## Stack

React + TypeScript + Vite, React Router for routing, Tailwind for styling, React Hook Form + Zod for forms, Axios for API calls.

## Running It

```bash
npm install
npm run dev
```

Needs a `.env.local` pointing at the backend:
```
VITE_API_URL=http://localhost:3000/api
```

## Where Things Live

The app is organized by **feature**, not by file type — each domain (auth, projects, bids, messages, milestones, payments, notifications, users, admin) owns its own pages, components, services, and types. Shared pieces (buttons, layouts, the auth session) live outside `features/` so nothing gets duplicated across domains.

## Open Questions for the Team

- Payments: Stripe Connect is the assumed integration but nothing's wired up yet
- Messaging: real-time is intended (Socket.io), currently just a stub
- No 404 page or global error handling yet — worth deciding on early

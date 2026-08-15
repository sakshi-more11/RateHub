# RateHub — Role-Based Store Rating & Analytics Platform

A full-stack web application where users can discover and rate stores, store owners can track their performance, and admins manage the entire platform — all through a single login system with role-based access.

Built for the Xroxiler Systems Full Stack Intern Coding Challenge.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4, Recharts, Lucide Icons
- **Backend:** Express.js, Prisma ORM
- **Database:** MySQL
- **Auth:** JWT + bcrypt
- **Validation:** Zod (backend), custom validators (frontend)

## Features

### System Administrator
- Dashboard with total users, stores, and ratings
- Add users (any role) and stores
- Sortable, filterable user and store tables
- Click into any user for full details — store owners show their store's rating

### Normal User
- Sign up, log in, update password
- Browse/search stores by name and address (debounced search)
- Submit and modify ratings (1–5) — click the same star again to reduce/remove
- View top-rated stores

### Store Owner
- Average rating and total ratings at a glance
- Rating distribution chart (1–5 stars)
- Rating trend chart over time
- List of users who rated their store

## Architecture

**Backend** follows a layered structure:

- `middlewares/` — JWT auth guard, role-based access guard
- `validators/` — Zod schemas matching every spec validation rule
- `services/` — all business logic and database queries, framework-agnostic

**Key engineering decisions:**
- **Rating upsert via DB constraint** — `@@unique([userId, storeId])` on the `Rating` model makes "submit" and "modify" the same atomic operation (`prisma.rating.upsert`), preventing duplicate ratings at the database level rather than relying on application logic alone.
- **Indexes** on `name`, `email`, `role`, and `storeId` — since the spec requires sorting/filtering on these fields, they're indexed for query performance rather than relying on full table scans.
- **Debounced search** (300ms) on the frontend — avoids firing an API request on every keystroke.
- **Password security** — bcrypt hashing, never returned in any API response.
- **Role-based middleware** — routes are protected by both authentication and role checks, composable per-route.

## Getting Started

### Prerequisites
- Node.js, MySQL running locally

### Backend
```bash
cd backend
npm install
# Set DATABASE_URL and JWT_SECRET in .env (see .env.example)
npx prisma migrate dev
node prisma/seed.js
npx nodemon src/server.js
```

### Frontend
```bash
cd frontend
npm install
# Set VITE_API_URL in .env (see .env.example)
npm run dev
```

Visit `http://localhost:5173`

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@ratehub.com | Admin@123 |
| Store Owner | owner@ratehub.com | Owner@123 |
| Normal User | user@ratehub.com | User@123 |
| Normal User | priya@ratehub.com | User@123 |
| Normal User | aman@ratehub.com | User@123 |
| Normal User | sneha@ratehub.com | User@123 |
| Normal User | rohit@ratehub.com | User@123 |

*(Store owner `owner@ratehub.com` owns "Starbucks Coffee FC Road Branch" — log in as this account to see the full analytics dashboard.)*

## Database Schema

Three models: `User`, `Store`, `Rating`.
- `User.role` is an enum (`ADMIN`, `NORMAL_USER`, `STORE_OWNER`)
- `Store.ownerId` links a store to at most one `STORE_OWNER` user
- `Rating` enforces one rating per user per store via a composite unique constraint

## Validation Rules

- Name: 20–60 characters
- Address: max 400 characters
- Password: 8–16 characters, 1 uppercase, 1 special character
- Email: standard format

All rules are enforced on both frontend (immediate feedback) and backend (source of truth).
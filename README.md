<div>

# ⭐ RateHub : Role-Based Store Rating & Analytics Platform

</div>

A full-stack web application where users discover and rate stores, store owners track their performance with real analytics, and admins manage the entire platform — all through a single login system with role-based access control.

---

## 🚀 Live Highlights

- 🔐 **Single login, three experiences** — Admin, Normal User, and Store Owner, each with a purpose-built dashboard
- ⭐ **Smart rating system** — submit, modify, or remove a rating with a single click, backed by a database-level upsert constraint
- 📊 **Real analytics for store owners** — average rating, rating distribution, and rating trend over time, computed live from the database
- 🔍 **Debounced search** — store search waits for you to stop typing before hitting the API, not on every keystroke
- 🌓 **Light & dark theme** — fully themed with CSS custom properties, toggle persists across sessions
- 🏆 **Top Rated Stores** — live leaderboard powered by SQL aggregation
- 🎨 **Original, animated UI** — no generic admin-template look; custom design system, entrance animations, and a signature star motif

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS v4, Recharts, Lucide Icons |
| **Backend** | Express.js, layered architecture (routes → controllers → services) |
| **Database** | MySQL via Prisma ORM |
| **Auth** | JWT + bcrypt |
| **Validation** | Zod (backend) + custom validators (frontend), mirrored rules |

---

## 👥 Roles & Features

### 🛡️ System Administrator
- 📈 Dashboard with total users, total stores, and total ratings at a glance
- ➕ Add new users (any role) and new stores
- 🔎 Sortable, filterable tables for both users and stores (Name, Email, Address, Role/Rating)
- 👤 Click into any user for full details — store owners additionally show their store's live rating
- 🔑 Update password after login

### 🙋 Normal User
- 📝 Sign up and log in with full field validation
- 🔍 Browse and search stores by name and address, with **debounced search**
- ⭐ Submit a rating (1–5) — click the same star again to reduce or remove your rating
- 🏆 See the platform's **Top Rated Stores**
- 🔑 Update password after login

### 🏪 Store Owner
- 📊 Average rating and total ratings, front and center
- 📉 **Rating Distribution** chart — see exactly how many 1★ to 5★ ratings you've received
- 📈 **Rating Trend** chart — track how your average has moved over time
- 🕓 Recent Activity feed of the latest ratings
- 👥 Full list of users who rated your store
- 🔑 Update password after login

---

## 🏗️ Architecture & Engineering Decisions

```
Frontend (React)  ⇄  Backend (Express)  ⇄  Database (MySQL via Prisma)
```

**Backend** follows a clean layered structure:
```
routes → controllers → services → Prisma
```
- `middlewares/` — JWT auth guard + role-based access guard, composable per route
- `validators/` — Zod schemas enforcing every validation rule from the spec
- `services/` — all business logic and database queries, framework-agnostic and testable

**Why these choices matter:**

- 🔒 **Rating upsert via DB constraint** — a composite unique constraint (`@@unique([userId, storeId])`) on the `Rating` model makes "submit" and "modify" the *same atomic operation* (`prisma.rating.upsert`). Duplicate ratings are impossible at the database level, not just the application level.
- ⚡ **Indexed queries** — `name`, `email`, `role`, and `storeId` are indexed since the spec explicitly requires sorting and filtering on them, avoiding full table scans as data grows.
- ⏱️ **Debounced search (300ms)** — waits for the user to pause typing instead of firing a request per keystroke.
- 🔐 **Security by default** — bcrypt password hashing, JWT-based auth, role middleware, parameterized queries (Prisma prevents SQL injection by design), secrets kept in `.env` and never committed.
- 🎯 **SQL-level aggregation** — ratings distribution, trend, and averages are computed via grouped queries, not fetched-then-looped in JavaScript.

---

## 📦 Getting Started

### Prerequisites
- Node.js
- MySQL running locally

### 1️⃣ Backend

```bash
cd backend
npm install
# create .env with DATABASE_URL and JWT_SECRET (see .env.example)
npx prisma migrate dev
node prisma/seed.js
npx nodemon src/server.js
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
# create .env with VITE_API_URL (see .env.example)
npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| 🛡️ Admin | `admin@ratehub.com` | `Admin@123` |
| 🏪 Store Owner | `owner@ratehub.com` | `Owner@123` |
| 🙋 Normal User | `user@ratehub.com` | `User@123` |
| 🙋 Normal User | `priya@ratehub.com` | `User@123` |
| 🙋 Normal User | `aman@ratehub.com` | `User@123` |

> 💡 `owner@ratehub.com` owns **Starbucks Coffee FC Road Branch** — log in as this account to see the full analytics dashboard with charts.

---

## 🗄️ Database Schema

Three core models: **User**, **Store**, **Rating**.

- `User.role` is a strict enum: `ADMIN`, `NORMAL_USER`, `STORE_OWNER`
- `Store.ownerId` links a store to at most one `STORE_OWNER`
- `Rating` enforces **one rating per user per store** via a composite unique constraint — the foundation of the upsert-based rating logic

---

## ✅ Validation Rules

| Field | Rule |
|---|---|
| Name | 20–60 characters |
| Address | Max 400 characters |
| Password | 8–16 characters, ≥1 uppercase, ≥1 special character |
| Email | Standard email format |

All rules are enforced on **both** frontend (instant feedback) and backend (source of truth) — never trust the client alone.

---

## 📸 Screenshots

| Login | Admin Dashboard | Owner Analytics |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🙌 Developed by 

👩‍💻 **Sakshi More**

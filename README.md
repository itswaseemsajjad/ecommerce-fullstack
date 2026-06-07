# E-Commerce Fullstack

A production-ready e-commerce platform built with Next.js 14, Prisma, Stripe, and NextAuth.

## Features

- Product catalog with search and categories
- Persistent shopping cart (Zustand + localStorage)
- Stripe checkout integration
- Authentication (register/login with NextAuth)
- Order history dashboard
- Database seeding with sample products

## Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Auth**: NextAuth.js with credentials provider
- **Database**: Prisma ORM + SQLite
- **Payments**: Stripe
- **State**: Zustand

## Setup

```bash
git clone https://github.com/itswaseemsajjad/ecommerce-fullstack
cd ecommerce-fullstack
npm install
cp .env.example .env
# Fill in your .env values
npx prisma db push
npm run db:seed   # Seeds 8 products + admin user
npm run dev
```

Open http://localhost:3000

## Demo Credentials

- Email: admin@example.com
- Password: admin123

## Environment Variables

See `.env.example` for all required variables.

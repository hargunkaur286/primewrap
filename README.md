# Pinewrap

Pinewrap is a full‑stack web app for an eco‑friendly product storefront (Pinewrap bags) with account registration + OTP verification, login/logout, a server-synced cart, Stripe-based payments, basic order persistence, newsletter subscriptions, and an admin dashboard for operational views.

This README focuses on **what the app can do** (functionalities), based on the current code in this repo.

## Tech Stack

**Frontend**

- React + TypeScript + Vite
- Tailwind + shadcn-ui
- React Router
- Stripe Elements (`@stripe/react-stripe-js`)

**Backend**

- Node.js + Express
- MongoDB (Mongoose)
- JWT auth stored in an HTTP-only cookie
- Twilio (OTP via SMS)
- Nodemailer (password reset + newsletter email)
- Stripe (PaymentIntent)
- node-cron (cleanup job)

## High-Level User Roles

- **Visitor (not logged in)**: can browse the marketing site and product pages, subscribe to the newsletter, and send a contact message.
- **Authenticated user**: has a server-synced cart and can access the Profile page; can checkout via payment.
- **Admin**: access is enforced in the frontend by a hard-coded admin email (see below). Admin can view orders, users, newsletter subscribers, and contact messages.

## Frontend Functionality (Screens & Flows)

Routes are defined in [frontend/src/App.tsx](frontend/src/App.tsx).

### Public / Customer-Facing

- **Home** (`/`): marketing/landing page and **newsletter subscription** form.
  - Subscribes via `POST /api/v1/user/subscribe`.
- **Shop** (`/shop`): product listing (currently two products), add-to-cart.
- **Product detail** (`/product/:id`): product details, quantity selector, add multiple to cart.
- **About** (`/about`): informational page.
- **Contact** (`/contact`): contact form.
  - Sends message via `POST /api/v1/user/contact`.
- **Cart** (`/cart`): view cart items, update quantities, remove items, and proceed to payment.
- **Payment / Checkout** (`/payment`): Stripe Card Element checkout.
  - Creates a Stripe PaymentMethod client-side then calls `POST /api/v1/user/payment`.
  - On success, cart is cleared on the client.
  - Note: order creation API exists, but the current checkout flow does **not** create an order (there is commented code showing how).

### Authentication

- **Register** (`/register`): collects name, email, phone, password, and verification method.
  - Calls `POST /api/v1/user/register` which creates an unverified user and sends an OTP.
  - Redirects to OTP screen.
- **OTP verification** (`/otp-verification/:email/:phone`): submit 5‑digit code.
  - Calls `POST /api/v1/user/otp-verification`.
  - Also has a “resend OTP” button wired to `POST /api/v1/user/resend-otp` in the UI, but **the backend currently has no such route**.
- **Login** (`/login`): calls the AuthContext login method.
  - Backend sets an HTTP-only `token` cookie.
- **Forgot password** (`/password/forgot`): sends a reset link to email.
  - Calls `POST /api/v1/user/password/forgot`.
- **Reset password** (`/password/reset/:token`): sets a new password.
  - Calls `PUT /api/v1/user/password/reset/:token`.
- **Logout**: triggered from UI/header via `GET /api/v1/user/logout`.

### Authenticated User Pages

- **Profile** (`/profile`): account/profile UI (implemented in a component).
  - Access guarded: redirects to `/login` if not authenticated.

### Admin Dashboard (Frontend-Enforced)

Admin access is enforced in [frontend/src/App.tsx](frontend/src/App.tsx) by checking:

- user is authenticated AND
- user email equals `hargunkaur2863@gmail.com`

Admin routes:

- `/dashboard`: admin overview.
- `/dashboard/orders`: “OrderManagement” page (admin-style).
- `/dashboard/orders-admin`: “OrdersManagement” page that fetches orders from the backend.
- `/dashboard/users`: user directory (fetches users).
- `/dashboard/newsletter`: newsletter subscribers directory (fetches subscribers).
- `/dashboard/contact-queries`: contact queries UI.

Important: Backend endpoints for admin pages are currently protected only by `isAuthenticated` middleware; there is **no server-side admin role enforcement** in the backend code.

## Cart Functionality

Cart is stored on the **User document** in MongoDB and synced from the frontend.

- On login (or refresh) the frontend loads the cart from `GET /api/v1/user/cart`.
- Add/remove/update quantity triggers a sync to `POST /api/v1/user/cart` with `cartItems`.
- Backend overwrites the stored cart with the provided items.

## Backend Functionality (API)

All routes are mounted at `/api/v1/user` in [backend/app.js](backend/app.js).
Route definitions are in [backend/routes/userRouter.js](backend/routes/userRouter.js).

### Authentication & Account

- `POST /register`
  - Creates a new user (unverified) and sends OTP via:
    - email (via Nodemailer helper), or
    - phone SMS (via Twilio)
  - Rate-limits repeated unverified registrations per email/phone to 3 attempts.
- `POST /otp-verification`
  - Validates OTP (5-digit), checks expiry, marks user verified, and logs them in by setting `token` cookie.
- `POST /login`
  - Validates credentials for verified users, sets `token` cookie.
- `GET /logout` (requires auth)
  - Clears token cookie.
- `GET /me` (requires auth)
  - Returns the current user.

### Password Reset

- `POST /password/forgot`
  - Generates a reset token and emails a link.
- `PUT /password/reset/:token`
  - Validates token + expiry, updates password, logs user in.

### Payments (Stripe)

- `POST /payment`
  - Expects `paymentMethodId` and `amount`.
  - Calls Stripe PaymentIntent creation and confirmation.

### Newsletter

- `POST /subscribe`
  - Saves subscriber email.
  - Sends a styled welcome email to the subscriber.
- `GET /subscribers` (requires auth)
  - Returns all subscriber emails.

### Contact / Messages

- `POST /contact`
  - Saves a contact message (name, email, message).
- `GET /contact` (requires auth)
  - Returns all saved messages.

### Cart

- `GET /cart` (requires auth)
  - Returns user cart.
- `POST /cart` (requires auth)
  - Replaces user cart with the provided `cartItems` payload.

### Orders

- `POST /orders` (requires auth)
  - Creates an order for the authenticated user.
- `GET /orders` (requires auth)
  - If `req.user.role === 'admin'`, returns all orders.
  - Otherwise returns only orders for the current user.

Note: The current User schema does not define a `role` field, so the “admin gets all orders” branch will not be hit unless role is added.

## Background Jobs

- **Unverified account cleanup**: a cron job runs every 30 minutes and deletes accounts that are still unverified and older than 30 minutes.
  - Implemented in [backend/automation/removeUnverifiedAccounts.js](backend/automation/removeUnverifiedAccounts.js).

## Data Models (MongoDB)

- **User**: name, email, phone, hashed password, OTP code + expiry, reset token + expiry, and embedded cart items.
- **Order**: user ref, line items, totals, delivery address, payment method, tracking number, status.
- **Message**: contact form submissions.
- **Subscribers**: newsletter emails.

## What’s Implemented vs. Placeholder (Important Notes)

These are notable gaps/partials so you don’t assume features exist when they currently don’t:

- **Resend OTP**: the frontend calls `/api/v1/user/resend-otp`, but the backend does not define this route.
- **Admin authorization**: admin access is enforced only in the frontend by a fixed email check; backend endpoints do not enforce admin role.
- **Order creation during checkout**: payment succeeds, but the checkout flow currently does not call `POST /orders` (there is commented code showing the intended integration).
- **Product catalog**: products are currently hard-coded in the frontend; there is no Product model/API.

## Running the App Locally

### Backend

From the `backend` folder:

```bash
npm install
npm run dev
```

Backend starts on `process.env.PORT` (commonly `4000`).

Required backend environment variables (names as used in code):

- `PORT`
- `MONGO_URI`
- `JWT_SECRET_KEY`
- `JWT_EXPIRE`
- `COOKIE_EXPIRE`
- `FRONTEND_URL`
- `TWILIO_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE`
- `STRIPE_SECRET_KEY`
- `SMTP_HOST`, `SMTP_SERVICE`, `SMTP_PORT`, `SMTP_MAIL`, `SMTP_PASSWORD`

### Frontend

From the `frontend` folder:

```bash
npm install
npm run dev
```

Optional frontend environment variable:

- `VITE_API_URL` (defaults to `http://localhost:4000`)

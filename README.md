# U Dorm (MERN)

## Prerequisites
- Node 18+
- MongoDB running locally (or Atlas URI)

## Setup

1) Server
```
cd server
# If .env.example not present, create .env with the values below
npm install
npm run seed
npm run dev
```

Example .env
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/udorm
JWT_SECRET=replace_with_strong_secret
CLIENT_URL=http://localhost:5173
```

2) Client
```
cd client
npm install
npm run dev
```
Vite dev will proxy `/api` to the server.

## Accounts
- Sign up as Student or Property owner/manager (landlord) in the app
- Admin: register with role=admin via API or update DB manually

## API Highlights
- Auth: POST /api/auth/register, /api/auth/login
- Listings: GET /api/listings, GET /api/listings/:id, POST /api/listings (landlord/admin)
- Bookings: POST /api/bookings (tenant/admin), GET /api/bookings/mine, GET /api/bookings/received, PATCH /api/bookings/:id/status
- Reviews: GET /api/reviews/:listingId, POST /api/reviews (tenant/admin)
- Messages: POST /api/messages, GET /api/messages/inbox, GET /api/messages/sent
- Favorites: GET /api/favorites, POST /api/favorites, DELETE /api/favorites/:listingId

## UI
- Listings and details fetched from backend
- Tenant: favorites, booking inquiries, messaging, reviews
- Landlord: dashboard shows listings and received bookings with approve/decline
- Admin: summary page at /admin

## Deployment
- Server: deploy `server` to a Node host (Render, Railway, Heroku, VPS). Set env vars `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.
- Client: build with `npm run build` in `client` and host static files (Vercel/Netlify) or serve from Node. Set Vite proxy only for local dev; in production, point API calls to your server base URL or use a reverse proxy.
- CORS: `CLIENT_URL` must match your frontend origin.
- MongoDB: use Atlas connection string in `MONGODB_URI`.

## Final checks
- Start server: `cd server && npm run dev` (or `npm start` in prod)
- Start client: `cd client && npm run dev`
- Verify endpoints: `/api/health`, listings load, auth register/login, landlord can create listing, tenant can favorite, message, book, and review.

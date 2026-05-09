# Daksh Jewellers — Deployment Guide

---

## Step 1 — Deploy Backend to Render

1. Push the project to a GitHub repository
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect the GitHub repo
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node
5. Add all environment variables from `.env.example`:
   ```
   MONGODB_URI=mongodb+srv://...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   JWT_SECRET=...
   ADMIN_EMAIL=admin@dakshjewellers.com
   ADMIN_PASSWORD_HASH=...
   ```
6. Deploy → Copy the backend URL (e.g., `https://daksh-api.onrender.com`)

---

## Step 2 — Deploy Frontend to Vercel

1. Push Next.js project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   JWT_SECRET=...
   ADMIN_EMAIL=admin@dakshjewellers.com
   ADMIN_PASSWORD_HASH=...
   NEXT_PUBLIC_API_URL=https://daksh-api.onrender.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=919896424648
   ```
4. Deploy → Site live at `https://[project].vercel.app`

---

## Step 3 — Seed Demo Products (Optional)

```bash
node scripts/seed.js
```

Creates 3 demo products across different categories.

---

## Step 4 — Test Checklist

- [ ] Home page loads and hero animation plays
- [ ] Images load correctly
- [ ] Product page: scroll rotation works on desktop
- [ ] Product page: swipe carousel works on mobile
- [ ] WhatsApp button opens correct chat on mobile
- [ ] Checkout: place a test order
- [ ] MongoDB: order appears in Atlas dashboard
- [ ] Admin: login at `/daksh-manage-2024/login`
- [ ] Admin: add a product with images
- [ ] Admin: update order status
- [ ] Owner's WhatsApp: receives order notification

---

## Custom Domain (Optional)

1. In Vercel → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL is automatically provisioned

---

*Daksh Jewellers — Bhiwadi, Rajasthan*
*WhatsApp: +91 9896424648*

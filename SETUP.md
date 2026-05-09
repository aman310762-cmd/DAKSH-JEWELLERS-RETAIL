# Daksh Jewellers — Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git

---

## 1. MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → Create free account
2. Create new cluster (M0 free tier)
3. **Database Access**: Create user with username + password
4. **Network Access**: Allow from anywhere (`0.0.0.0/0`)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/daksh-jewellers`
6. Set as `MONGODB_URI` in `.env`

---

## 2. Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) → Create free account
2. Dashboard → Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Set as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `.env`

---

## 3. Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in all values:
```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
JWT_SECRET=your-very-long-random-secret-here
ADMIN_EMAIL=admin@dakshjewellers.com
ADMIN_PASSWORD_HASH=<generated hash>
NEXT_PUBLIC_WHATSAPP_NUMBER=919896424648
NEXT_PUBLIC_API_URL=
```

---

## 4. Generate Admin Password Hash

```bash
node scripts/generateHash.js YourSecurePassword123
```

Copy the output hash and paste it as `ADMIN_PASSWORD_HASH` in `.env`.

---

## 5. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/daksh-manage-2024/login](http://localhost:3000/daksh-manage-2024/login)

---

## 6. Seed Demo Products (Optional)

```bash
node scripts/seed.js
```

This creates 3 demo products so the site isn't empty.

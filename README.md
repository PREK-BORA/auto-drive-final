# Car Dealership Management System (AutoDrive)

A full-stack web application for managing a car dealership, built with React, Material UI, Tailwind CSS, and Firebase.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Firebase Setup](#firebase-setup)
7. [Firestore Database Structure](#firestore-database-structure)
8. [Firebase Security Rules](#firebase-security-rules)
9. [User Roles & Permissions](#user-roles--permissions)
10. [Demo Accounts](#demo-accounts)
11. [Deployment Guide](#deployment-guide)

---

## Overview

AutoDrive is a car dealership management system with two main parts:

- **Public Website** — browse vehicles, services, and contact the dealership
- **Dashboard System** — user dashboard for profile/favorites, admin dashboard for managing vehicles, services, users, and messages

The app works in two modes:
- **Mock Mode** (default): Uses sample data stored in localStorage. No Firebase project needed. Great for development and demos.
- **Firebase Mode**: Connects to a real Firebase project for authentication, Firestore, and Storage.

---

## Features

### Public Website
- Home page with hero banner, featured vehicles, services, testimonials, and latest vehicles
- About page with company info, mission, vision, and team
- Services page listing all dealership services
- Vehicles page with search, brand filter, price filter, and pagination
- Vehicle details page with image gallery, specs, features, and contact button
- Contact page with form (messages stored in Firestore)

### Authentication
- Register with email and password
- Login / Logout
- Forgot password (reset email)
- Protected routes (only logged-in users can access dashboard)
- Admin-only routes

### User Dashboard
- View and edit profile
- View favorite vehicles
- View bookings
- Change password

### Admin Dashboard
- Overview with statistics and charts
- Vehicle management (full CRUD with image upload)
- Service management (full CRUD with image upload)
- User management (view, change role, delete)
- Message management (view, delete)

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React.js (Vite) |
| Routing | React Router DOM |
| Styling | Tailwind CSS + Material UI (MUI) |
| Icons | React Icons + MUI Icons |
| State Management | Context API |
| HTTP Client | Axios |
| Backend | Google Firebase |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| File Storage | Firebase Storage |
| Hosting | Firebase Hosting (optional) |
| Charts | Recharts |

---

## Folder Structure

```
car-dealership-management-system/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── VehicleCard.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── pages/               # Page components
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── user/
│   │   │   ├── UserProfile.jsx
│   │   │   ├── UserFavorites.jsx
│   │   │   ├── UserBookings.jsx
│   │   │   └── UserChangePassword.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminVehicles.jsx
│   │   │   ├── AdminServices.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── AdminMessages.jsx
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── VehiclesPage.jsx
│   │   ├── VehicleDetailsPage.jsx
│   │   └── ContactPage.jsx
│   │
│   ├── layouts/             # Layout wrappers
│   │   ├── PublicLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── UserDashboardLayout.jsx
│   │   └── AdminDashboardLayout.jsx
│   │
│   ├── routes/              # Route guards
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── context/             # React Context
│   │   └── AuthContext.jsx
│   │
│   ├── firebase/            # Firebase configuration
│   │   └── config.js
│   │
│   ├── services/            # Backend service layer
│   │   ├── authService.js
│   │   ├── firestoreService.js
│   │   ├── storageService.js
│   │   └── mockData.js
│   │
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   ├── theme.js             # MUI theme
│   └── index.css            # Global styles
│
├── .env.example             # Environment variable template
├── firestore.rules          # Firestore security rules
├── storage.rules            # Firebase Storage security rules
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   The app runs at `http://localhost:5173`

> **Note**: Without Firebase configuration, the app runs in Mock Mode using sample data. You can use the demo accounts below to log in.

---

## Firebase Setup

To connect a real Firebase project:

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "autodrive-dealership")

### Step 2: Add a Web App
1. In the Firebase console, click the web icon (</>) to add a web app
2. Register the app with a nickname
3. Copy the Firebase config values (apiKey, authDomain, etc.)

### Step 3: Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. (Optional) Disable email verification for development

### Step 4: Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Start in **test mode** for development
3. Choose a location close to your users

### Step 5: Enable Storage
1. Go to **Storage** → **Get started**
2. Use the default settings

### Step 6: Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Step 7: Restart the dev server
```bash
npm run dev
```

### Step 8: Create an Admin User
1. Register a new account through the app
2. Go to Firebase Console → **Firestore Database** → **users**
3. Find your user document and change the `role` field from `user` to `admin`

---

## Firestore Database Structure

The database uses the following collections:

### `users` Collection
```
users/
  └── {uid}/
      ├── name: string
      ├── email: string
      ├── role: string ("admin" | "user")
      ├── phone: string
      └── createdAt: timestamp
```

### `vehicles` Collection
```
vehicles/
  └── {autoId}/
      ├── name: string
      ├── brand: string
      ├── model: string
      ├── year: number
      ├── price: number
      ├── fuelType: string ("Petrol" | "Diesel" | "Electric" | "Hybrid")
      ├── transmission: string ("Automatic" | "Manual")
      ├── description: string
      ├── features: string[]
      ├── images: string[] (URLs from Firebase Storage)
      ├── status: string ("available" | "sold" | "reserved")
      └── createdAt: timestamp
```

### `services` Collection
```
services/
  └── {autoId}/
      ├── title: string
      ├── description: string
      ├── image: string (URL from Firebase Storage)
      └── createdAt: timestamp
```

### `messages` Collection
```
messages/
  └── {autoId}/
      ├── name: string
      ├── email: string
      ├── phone: string
      ├── message: string
      ├── read: boolean
      └── createdAt: timestamp
```

### `favorites` Collection
```
favorites/
  └── {autoId}/
      ├── userId: string (reference to users collection)
      ├── vehicleId: string (reference to vehicles collection)
      └── createdAt: timestamp
```

---

## Firebase Security Rules

### Firestore Rules (`firestore.rules`)

See the `firestore.rules` file in the project root. These rules enforce:

- **Public read** for vehicles and services (anyone can browse)
- **Authenticated write** for messages (logged-in users can submit contact forms)
- **User-scoped** favorites (users can only read/write their own favorites)
- **Admin-only** write for vehicles, services, and users
- **Users can read and update their own profile**

### Storage Rules (`storage.rules`)

See the `storage.rules` file in the project root. These rules enforce:

- **Public read** for all images (anyone can view vehicle/service images)
- **Admin-only write** for uploading images

---

## User Roles & Permissions

| Feature | Admin | User | Anonymous |
|---------|-------|------|-----------|
| Browse website | ✅ | ✅ | ✅ |
| View vehicles | ✅ | ✅ | ✅ |
| View services | ✅ | ✅ | ✅ |
| Submit contact form | ✅ | ✅ | ✅ |
| Register / Login | ✅ | ✅ | ✅ |
| View profile | ✅ | ✅ | ❌ |
| Edit profile | ✅ | ✅ | ❌ |
| Favorite vehicles | ✅ | ✅ | ❌ |
| View bookings | ✅ | ✅ | ❌ |
| Change password | ✅ | ✅ | ❌ |
| Admin dashboard | ✅ | ❌ | ❌ |
| Manage vehicles (CRUD) | ✅ | ❌ | ❌ |
| Manage services (CRUD) | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| View messages | ✅ | ❌ | ❌ |

---

## Demo Accounts

When running in Mock Mode (no Firebase configured), use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@autodrive.com | admin123 |
| User | john@example.com | user123 |

---

## Deployment Guide

### Option 1: Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Public directory: `dist`
   - Single-page app: Yes
   - Set up automatic builds with GitHub: optional

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

6. Your app will be live at `https://your-project.web.app`

### Option 2: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Framework preset: Vite
4. Add environment variables in the Vercel dashboard
5. Deploy

### Option 3: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in the Netlify dashboard
6. Deploy

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## Key Concepts for Students

### Context API
The `AuthContext` provides authentication state to all components. Any component can call `useAuth()` to access the current user and auth functions.

### Protected Routes
`ProtectedRoute` checks if a user is logged in. `AdminRoute` checks if the user is an admin. If not, they redirect to the login page or user dashboard.

### Service Layer
The `services/` folder abstracts all backend operations. Components call functions like `getVehicles()` without knowing whether they're talking to Firebase or the mock backend.

### Mock Mode
When Firebase is not configured, the app uses localStorage with sample data. This lets you develop and test without a real Firebase project.

### Material UI Theme
The `theme.js` file defines the dark blue color scheme, typography, and component styling used across the app.

---

## License

This project is created for educational purposes as a university project.

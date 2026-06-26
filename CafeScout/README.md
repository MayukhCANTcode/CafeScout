# ☕ CafeScout

**CafeScout** is a premium, modern, production-ready location discovery web application. It allows users to search for cities, locate nearby cafes, bakeries, ice cream spots, and restaurants, and explore them interactively on a responsive map. It is built using **React**, **Vite**, **Tailwind CSS**, and integrates **MapLibre GL JS**, **Geoapify APIs**, and **Firebase Authentication**.

---

## ✨ Features

* **🔍 Smart Location Search**: Live location autocomplete using the **Geoapify Autocomplete API** with built-in 300ms input debouncing.
* **📍 Dynamic Map Integration**: Powered by **MapLibre GL JS** showing high-quality vector street maps.
* **🧭 Map Style Switcher**: Swap between 4 gorgeous maps in real time:
  * **Google Style**: Detailed street view (`osm-bright`).
  * **Clean Light**: Minimalist layout (`positron`).
  * **Dark Mode**: Sleek dark layout (`dark-matter`).
  * **Terrain Carto**: Classic topographical map layout (`osm-carto`).
* **📡 Custom Distance Queries**: Search places in custom radii of **2 km**, **5 km**, **10 km**, or **20 km**. Changing bounds automatically triggers new API requests.
* **🏷️ Sidebar Category Filtering**: Group locations into target categories (☕ Cafes, 🍽️ Restaurants, 🥐 Bakeries, 🍦 Ice Cream). Filter markers and lists instantly.
* **🔀 Bidirectional Syncing**:
  * **Marker click** ➜ Scroll the matching card in the sidebar panel into view.
  * **Card click** ➜ Pan map to location, zoom in, and trigger the marker popup bubble.
* **👤 Firebase Google Authentication**: Sign in securely using your Google Account with responsive navbar indicators showing profile pictures, names, and emails.
* **📱 Fully Responsive Design**: Perfectly optimized for Desktop, Tablet, and Mobile viewport layouts.

---

## 🛠️ Technology Stack

* **Front-end**: React 19, Vite, Tailwind CSS, Lucide React
* **Mapping**: MapLibre GL JS, Vector Tile OSM Styles
* **APIs**: Geoapify Geocoding & Places APIs, Browser Geolocation API
* **Backend & Auth**: Firebase Auth (Google Sign-In)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/MayukhCANTcode/CafeScout.git
cd CafeScout
npm install
```

### 2. Environment Variables Configuration
Create a `.env` file in the root folder (or rename `.env.example`) and populate the keys:
```env
VITE_GEOAPIFY_API_KEY=your_geoapify_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌎 Production Deployment

### Deploying to Vercel
1. Sign up on [Vercel](https://vercel.com/) and import your GitHub repository.
2. Under **Environment Variables**, paste all configuration keys from your local `.env`.
3. Click **Deploy**.
4. **Authorize Google Login**: In your Firebase Console ➜ **Authentication** ➜ **Settings** ➜ **Authorized domains**, click **Add domain** and enter your Vercel deployment URL (e.g., `cafescout.vercel.app`).

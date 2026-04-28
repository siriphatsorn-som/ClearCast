# ClearCast — Weather & Photo Challenge Platform

## Overview

ClearCast is a full-stack web application that provides real-time weather information, weather-related news, and a community-driven photo challenge system.

Users can explore live weather conditions, read weather news, upload photos based on weather conditions, and receive a Photo Score that evaluates how suitable the weather is for photography. The platform also includes a community feature where users can share and view photos and reviews from different locations.

## Key Features

### Real-time Weather Data
- Live weather data via external Weather API
- City-based weather search
- Displays temperature, humidity, cloud coverage, and condition

### Weather News
- Weather-related news via News API
- Location-based and trending weather updates

### Photo Challenge System
- Upload photos based on current weather conditions
- Automatic Photo Score (0–10) calculation
- Weather-based feedback:
  - "🌟 Perfect conditions! The light is magical right now. Go shoot!"
  - "🌧️ Tough conditions, but rain brings unique opportunities — try shooting through wet glass!"

### Community Gallery
- Users can upload and share photos
- Browse community posts by weather condition
- View photos from other users

### Place Reviews System
- Users can write reviews for each location (city-based)
- View community feedback per city
- Includes weather context with each review

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Axios

### Backend
- Node.js
- Express.js

### Database
Firebase Firestore (NoSQL cloud database)

### External APIs
- Weather API (weatherapi.com)
- News API (gnews.io)

# Project Architecture
Frontend (React) → Backend (Express API) → Firebase Firestore + External APIs

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/siriphatsorn-som/ClearCast.git
cd ClearCast
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

> Runs on: **http://localhost:5000**


### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Runs on: **http://localhost:5173**

### 4. Run Both Simultaneously

From the **root directory**, you can start both frontend and backend at once:

```bash
npm run dev
```

This will launch:
- ✅ Backend → http://localhost:5000
- ✅ Frontend → http://localhost:5173
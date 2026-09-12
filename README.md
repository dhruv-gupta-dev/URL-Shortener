# 🔗 URL Shortener

A full-stack URL shortener with real-time click analytics. Shorten any URL and track every click with timestamps.

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## ✨ Features

- 🔗 **Shorten URLs** — Paste any long URL and get a short, shareable link
- 📊 **Click Analytics** — Track total clicks and click history with timestamps
- ⚡ **Base62 Encoding** — Generates compact, URL-safe short codes
- 🔄 **Real-time Updates** — Newly shortened URLs appear instantly in the dashboard
- 📱 **Clean UI** — Minimal, responsive interface built with React

## 🛠️ Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| **Frontend** | React 19, Vite 8, Axios |
| **Backend**  | Express 5, Mongoose 9   |
| **Database** | MongoDB                 |
| **Runtime**  | Node.js 22              |

## 📂 Project Structure

```
URL-Shortener/
├── backend/
│   ├── Server.js                  # Express server entry point
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   └── urlController.js       # Shorten, redirect & analytics logic
│   ├── models/
│   │   ├── Counter.js             # Auto-increment counter for short codes
│   │   └── Url.js                 # URL document schema
│   ├── routes/
│   │   └── urlRoutes.js           # API route definitions
│   └── utils/
│       └── base62.js              # Base62 encoding utility
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main React component
│   │   ├── App.css                # Application styles
│   │   ├── components/
│   │   │   ├── ShortenForm.jsx    # URL input form component
│   │   │   └── AnalyticsTable.jsx # Click analytics dashboard
│   │   └── services/
│   │       └── api.js             # Axios API client
│   └── package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)

### 1. Clone the repository

```bash
git clone https://github.com/dhruv-gupta-dev/URL-Shortener.git
cd URL-Shortener
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/urlshortener?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
```

> Replace `MONGO_URI` with your actual MongoDB connection string.

Start the backend server:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## 📡 API Reference

### Shorten a URL

```http
POST /api/shorten
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/path"
}
```

**Response** `201 Created`:

```json
{
  "longUrl": "https://example.com/very/long/path",
  "shortCode": "2bK7gZ",
  "shortUrl": "http://localhost:5000/2bK7gZ",
  "clicks": 0,
  "createdAt": "2026-09-12T05:00:00.000Z"
}
```

### Get all URLs

```http
GET /api/urls
```

**Response** `200 OK`: Returns an array of all shortened URLs sorted by creation date (newest first).

### Redirect

```http
GET /:code
```

Redirects (302) to the original long URL and increments the click counter.

## ⚙️ How It Works

1. When a user submits a URL, the backend increments an atomic counter in MongoDB.
2. The counter value is added to a large offset (`916,132,832`) to produce a non-trivial number.
3. That number is encoded into a compact **Base62** string (using `0-9`, `a-z`, `A-Z`).
4. The short code, original URL, and metadata are stored in the database.
5. When someone visits the short link, the server looks up the code, increments the click counter, records a timestamp, and redirects to the original URL.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

Made by [Dhruv Gupta](https://github.com/dhruv-gupta-dev)

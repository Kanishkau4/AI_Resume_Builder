<div align="center">

# 🚀 AI Resume Builder

**Build stunning, professional resumes in minutes — powered by Gemini AI**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start) • [📁 Project Structure](#-project-structure) • [🔌 API Reference](#-api-reference)

</div>

---

## 📖 Overview

**AI Resume Builder** is a full-stack web application that reimagines the resume creation experience. Instead of staring at a blank page, users can upload an existing resume and let **Google Gemini AI** intelligently parse and populate all sections — then customize it with a live preview, multiple professional templates, and accent color selection.

Whether you're starting from scratch or polishing an existing resume, the AI-powered enhancements help craft compelling summaries and job descriptions that are optimized for **ATS (Applicant Tracking Systems)**.

---

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Resume Parsing** — Upload a PDF and Gemini AI extracts and structures all your information automatically
- **Professional Summary Enhancement** — AI refines your summary into a concise, compelling, ATS-friendly statement
- **Job Description Enhancement** — Transform plain bullet points into impactful, action-verb-driven descriptions

### 🎨 8 Professional Templates
| Template | Style |
|---|---|
| **Classic** | Clean, traditional layout — timeless and professional |
| **Modern** | Contemporary design with a fresh look |
| **Minimal** | Distraction-free, whitespace-focused layout |
| **Minimal Image** | Minimal design with profile photo support |
| **Creative** | Bold, expressive layout for creative roles |
| **Elegance** | Refined, sophisticated typography and layout |
| **Executive** | Authoritative layout for senior professionals |
| **Modern Sidebar** | Two-column layout with a highlighted sidebar |

### 📝 Comprehensive Resume Sections
- **Personal Information** — Name, profession, photo, email, phone, location, LinkedIn & website
- **Professional Summary** — With AI enhancement support
- **Work Experience** — Multiple entries with company, position, dates, and descriptions
- **Education** — Institution, degree, field, GPA, and graduation date
- **Projects** — Project name, type, and description
- **Skills** — Tag-based skill management

### 🖊️ Builder Features
- **Live Preview** — See changes instantly as you type
- **Accent Color Picker** — Personalize resume colors to match your style
- **Template Switcher** — Switch templates without losing data
- **Public Share Link** — Generate a shareable URL for your resume
- **Print / Download** — Export your resume directly from the browser

### 🔐 Authentication & Storage
- **JWT Authentication** — Secure login and registration
- **Persistent Storage** — All resumes saved to MongoDB
- **Dashboard** — Manage, view, and delete multiple resumes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Redux Toolkit** | Global state management |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **React Icons** | Extended icon set |
| **Goey Toast** | Notification toasts |
| **react-pdftotext** | Client-side PDF text extraction |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **OpenAI SDK** | Gemini AI integration (OpenAI-compatible) |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **Bcrypt** | Password hashing |
| **Multer** | File upload handling |
| **ImageKit** | Image storage & delivery |
| **dotenv** | Environment configuration |
| **CORS** | Cross-origin resource sharing |

---

## ⚡ Quick Start

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- An [ImageKit](https://imagekit.io/) account (for profile photo uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/Kanishkau4/AI_Resume_Builder.git
cd AI_Resume_Builder
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini AI (via OpenAI-compatible SDK)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_MODEL=gemini-2.0-flash

# ImageKit (for profile photo uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run server

# Production
npm start
```

The API will be running at `http://localhost:5000`

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Project Structure

```
AI_Resume_Builder/
├── backend/
│   ├── config/
│   │   ├── ai.js              # Gemini AI client configuration
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js    # AI enhancement & resume parsing
│   │   ├── resumeController.js# Resume CRUD operations
│   │   └── userController.js  # User auth (register/login)
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification middleware
│   ├── models/
│   │   ├── Resume.js          # Resume Mongoose schema
│   │   └── User.js            # User Mongoose schema
│   ├── routes/
│   │   ├── aiRoute.js         # /api/ai routes
│   │   ├── resumeRoute.js     # /api/resumes routes
│   │   └── userRoute.js       # /api/users routes
│   └── server.js              # Express app entry point
│
└── frontend/
    └── src/
        ├── app/
        │   └── features/
        │       ├── authSlice.js       # Auth state (Redux)
        │       └── resumeSlice.js     # Resume state (Redux)
        ├── components/
        │   ├── home/                  # Landing page sections
        │   │   ├── hero.jsx
        │   │   ├── features.jsx
        │   │   ├── testimonial.jsx
        │   │   ├── calltoAction.jsx
        │   │   ├── banner.jsx
        │   │   └── footer.jsx
        │   ├── templates/             # 8 resume templates
        │   │   ├── ClassicTemplate.jsx
        │   │   ├── ModernTemplate.jsx
        │   │   ├── MinimalTemplate.jsx
        │   │   ├── MinimalImageTemplate.jsx
        │   │   ├── CreativeTemplate.jsx
        │   │   ├── EleganceTemplate.jsx
        │   │   ├── ExecutiveTemplate.jsx
        │   │   └── ModernSidebarTemplate.jsx
        │   ├── colorPicker.jsx        # Accent color selector
        │   ├── educationForm.jsx      # Education section form
        │   ├── experienceForm.jsx     # Experience section form
        │   ├── personalinfoForm.jsx   # Personal info form
        │   ├── professionalSummaryForm.jsx
        │   ├── projectsForm.jsx       # Projects section form
        │   ├── resumePreview.jsx      # Live resume preview
        │   ├── skillsForm.jsx         # Skills section form
        │   ├── templateSelector.jsx   # Template switcher UI
        │   ├── navbar.jsx             # App navigation bar
        │   └── Loader.jsx             # Loading spinner
        ├── config/
        │   └── api.js                 # Axios instance with base URL
        └── pages/
            ├── home.jsx               # Landing page
            ├── login.jsx              # Login & register page
            ├── dashboard.jsx          # Resume management dashboard
            ├── resumeBuilder.jsx      # Main builder page
            ├── preview.jsx            # Public shareable preview
            └── layout.jsx             # Protected route layout
```

---

## 🔌 API Reference

### Authentication — `/api/users`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/users/register` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Login and receive JWT token |
| `GET` | `/api/users/data` | Private | Get current user data |

### Resumes — `/api/resumes`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/resumes` | Private | Create a new blank resume |
| `GET` | `/api/resumes` | Private | Get all resumes for the user |
| `GET` | `/api/resumes/:id` | Public/Private | Get a single resume by ID |
| `PUT` | `/api/resumes/:id` | Private | Update resume data |
| `DELETE` | `/api/resumes/:id` | Private | Delete a resume |

### AI — `/api/ai`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/ai/enhance-summary` | Private | AI-enhance professional summary |
| `POST` | `/api/ai/enhance-job-description` | Private | AI-enhance job description |
| `POST` | `/api/ai/upload-resume` | Private | Parse uploaded PDF resume text with AI |

---

## 🗺️ Application Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/login` | Login | Authentication page |
| `/app` | Dashboard | Resume management |
| `/app/builder/:resumeId` | Builder | Resume editor with live preview |
| `/view/:resumeId` | Preview | Public shareable resume view |

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Optional | Server port (default: `5000`) |
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `GEMINI_BASE_URL` | ✅ | Gemini OpenAI-compatible base URL |
| `GEMINI_MODEL` | ✅ | Gemini model name (e.g., `gemini-2.0-flash`) |
| `IMAGEKIT_PUBLIC_KEY` | ✅ | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ✅ | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ✅ | ImageKit URL endpoint |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Backend API base URL |

---

## 🚀 Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Deploy the /dist directory
```

### Backend (Render / Railway / VPS)

```bash
cd backend
npm start
```

> **Note:** Make sure to set all environment variables in your deployment platform's dashboard.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Kanishka](https://github.com/Kanishkau4)

⭐ **Star this repo if you find it useful!**

</div>

# GuruDev (The Blind Spot) 🧠
### AI-Powered Critical Thinking Companion & Decision Analysis Platform

> *"People often make decisions based on the information that is most visible to them. In the process, they may overlook important factors, rely on unstated assumptions, or fail to recognize conflicts within their own reasoning."*

**GuruDev** is a full-stack, AI-powered decision analysis platform engineered to help individuals and leaders uncover hidden blind spots, unexamined assumptions, latent trade-offs, and contrarian perspectives before making high-stakes decisions. 

**Core Principle:** GuruDev **never makes the decision for the user**. It serves as an impartial Socratic thinking companion, expanding the decision space, stress-testing premises, and empowering users to think with greater clarity and autonomy.

---

## 🌟 Key Features

1. **Cognitive Blind-Spot Auditing**:
   - Analyzes decisions across 6 cognitive bias dimensions (availability bias, confirmation bias, halo effect, status quo inertia, sunk-cost fallacy, and binary framing).
   - Unpacks unexamined premises and provides concrete **Socratic Falsification Tests**.

2. **Dialectic Balance Gauge**:
   - Calibrates the user's current stance between immediate short-term benefits vs long-term strategic compounding.

3. **Interactive Socratic Journal & Reflection Room**:
   - Prompts calibrated dialectic questions (e.g. *"What specific new information would make you walk away from this decision?"*).
   - Allows users to record, revise, and preserve their reflections over time.

4. **Multi-Option & Dilemma Matrix**:
   - Dissects false dichotomies ("Option A vs Option B") and proposes creative, non-obvious **Lateral Pathways** (e.g., hybrid trials, negotiated scopes).

5. **Strictly Private & Air-Gapped**:
   - User inputs and vectors are never used for commercial AI foundation training.
   - Database records are stored securely in **Neon PostgreSQL** with TLS 1.3 encryption and JWT token authentication.

---

## 🏗️ Architecture & Single-Vercel Deployment

GuruDev is deployed as a **single unified project on Vercel** utilizing one domain and zero CORS configuration issues:

```text
GuruDev/
│
├── frontend/ (Root React + Vite Project)
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/       # DashboardHome, NewAnalysisView, AnalysisResultView, SettingsView, TopBar, Sidebar
│   │   │   ├── AuthPage.jsx     # Split-screen Auth UI (Login & Sign-Up)
│   │   │   ├── Hero.jsx         # 3-Slide Carousel Hero Section
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js           # Centralized API service with relative '/api' URLs
│   │   ├── App.jsx              # Main router & state coordinator
│   │   └── index.css            # Tailwind CSS v4 design tokens
│   ├── package.json
│   └── vite.config.js           # Local proxy forwarding /api to http://127.0.0.1:8000
│
├── backend/ (FastAPI Application)
│   ├── app/
│   │   ├── config.py            # Environment configuration (Gemini, Neon, JWT)
│   │   ├── database.py          # SQLAlchemy engine with connection pooling & auto-init
│   │   ├── models/              # User, DecisionAnalysis, ReflectionMessage
│   │   ├── schemas/             # Pydantic validation schemas
│   │   ├── services/            # ai_service.py (Gemini SDK) & auth_service.py (bcrypt + JWT)
│   │   ├── routes/              # health, auth, analyses, reflections
│   │   └── main.py              # Dual-mounted FastAPI application
│   └── requirements.txt
│
├── api/
│   └── index.py                 # Vercel Serverless Function entry point
│
├── vercel.json                  # Routing: /api/* -> /api/index.py, /* -> /index.html
├── requirements.txt             # Pinned serverless Python dependencies
├── .env.example                 # Production & development environment template
└── README.md
```

---

## ⚡ Technology Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React icons.
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy ORM.
- **AI Engine**: Google Gemini API (`gemini-2.5-flash`) via the official `google-genai` Python SDK.
- **Database**: **Neon PostgreSQL** (serverless, autoscaling, SSL-enforced) with local SQLite fallback for offline development.
- **Authentication**: Direct `bcrypt` password hashing, stateless PyJWT bearer tokens.
- **Hosting & Serverless**: Single Vercel deployment with serverless Python functions (`api/index.py`).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory for local development, and configure these variables in **Vercel Project Settings > Environment Variables**:

| Variable | Description | Example / Required Format |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key | Get from [Google AI Studio](https://aistudio.google.com/) |
| `GEMINI_MODEL` | Gemini Model identifier | `gemini-2.5-flash` |
| `DATABASE_URL` | Neon PostgreSQL connection URI | `postgresql://<user>:<password>@<neon_host>/<db>?sslmode=require` |
| `JWT_SECRET` | 32+ character random secret | `python -c "import secrets; print(secrets.token_hex(32))"` |
| `JWT_ALGORITHM` | Signing algorithm (optional) | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime (optional) | `10080` (7 days) |

---

## 🐘 Neon PostgreSQL Setup (Hosted Database)

GuruDev is built to run on **Neon Serverless PostgreSQL**. Follow these quick steps to set up your database:

1. **Sign up or Log in**:
   - Navigate to [Neon Console](https://console.neon.tech/).
2. **Create a New Project**:
   - Name your project (e.g. `gurudev-db`).
   - Select your preferred cloud region (e.g., `AWS us-east-2`).
3. **Copy the Connection String**:
   - On your project dashboard, select the **Connection Details** dropdown.
   - Choose **PostgreSQL** or **SQLAlchemy**.
   - Your connection string will look like:
     ```text
     postgresql://neondb_owner:npg_xyz...@ep-cool-fog-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
4. **Set `DATABASE_URL`**:
   - In local `.env`: paste the connection string as `DATABASE_URL`.
   - In Vercel Environment Variables: add `DATABASE_URL`.
   *(Note: GuruDev automatically normalizes `postgres://` to `postgresql://` and ensures `sslmode=require` is present).*
5. **Automatic Schema Migration**:
   - Upon first startup or serverless invocation, `backend/app/database.py:init_db()` safely creates all required tables (`users`, `decision_analyses`, `reflection_messages`) using SQLAlchemy metadata.

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.11 or higher
- **npm** or **yarn**

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Setup Python Backend Virtual Environment
```bash
# On Windows (PowerShell):
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# On macOS/Linux:
python3 -m venv .venv
source .venv/bin/activate

# Install backend dependencies:
pip install -r requirements.txt
```

### 4. Configure Environment
```bash
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY and DATABASE_URL
```

### 5. Start Local Servers
Run the backend and frontend in separate terminals:

**Terminal 1 — FastAPI Backend:**
```bash
# Run from repository root:
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 — React / Vite Frontend:**
```bash
npm run dev
```

Open **`http://localhost:5173`** in your browser. All requests to `/api/*` are automatically proxied by Vite to `http://127.0.0.1:8000`.

---

## 🚀 Step-by-Step Vercel Deployment Guide

Deploying both frontend and FastAPI backend together on Vercel requires **zero special plugins**:

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete GuruDev full-stack integration with Neon and Gemini"
git push origin main
```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New > Project**.
3. Select your GitHub repository (`Promptwars` / `GuruDev`).
4. Keep the **Root Directory** as `./` (repository root).
5. Framework Preset: **Vite**.
6. Build Command: `npm run build` (detected automatically).
7. Output Directory: `dist` (detected automatically).

### Step 3: Configure Environment Variables
Under the **Environment Variables** section in Vercel, add:
- `GEMINI_API_KEY`: `your_real_gemini_api_key`
- `GEMINI_MODEL`: `gemini-2.5-flash`
- `DATABASE_URL`: `postgresql://...your_neon_url...?sslmode=require`
- `JWT_SECRET`: `your_generated_32_char_secret`

### Step 4: Deploy & Verify
1. Click **Deploy**.
2. Once the build finishes:
   - Test Health: visit `https://your-domain.vercel.app/api/health` — should return `{"status": "healthy", "database": "connected"}`.
   - Test Frontend: visit `https://your-domain.vercel.app/` — landing page and dashboard load smoothly.
   - Register an Account: go to `/signup` and create a user.
   - Run an Analysis: submit a decision (e.g. the 6-month internship dilemma).
   - Socratic Reflection: record a thought on any question card. All thoughts persist into Neon!

---

## 📡 API Endpoints Reference

All routes are available under `/api/*`:

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/health` | Service health, database connectivity & AI configuration status | No |
| `POST` | `/api/auth/register` | Register new user account with hashed password | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT access token | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Yes |
| `POST` | `/api/auth/logout` | Client session logout confirmation | No |
| `POST` | `/api/analyses` | Submit decision for structured Gemini AI cognitive audit | Optional/Yes |
| `GET` | `/api/analyses` | List all saved decision analyses for current user | Yes |
| `GET` | `/api/analyses/{id}` | Retrieve specific decision analysis and AI results | Yes |
| `PATCH` | `/api/analyses/{id}` | Update title or notes on an analysis | Yes |
| `DELETE` | `/api/analyses/{id}` | Delete a decision analysis and its reflections | Yes |
| `POST` | `/api/analyses/{id}/reflection` | Save a reflection message in the Socratic room | Yes |
| `GET` | `/api/analyses/{id}/reflection` | Retrieve all reflection messages for an analysis | Yes |

---

## 🧪 Local Testing & Verification

Run the comprehensive end-to-end backend verification script:
```bash
.\.venv\Scripts\python test_backend.py
```
This tests:
- `GET /health` and direct `/health` route registration
- `POST /auth/register` with unique email validation
- `POST /auth/login` and JWT token issuance
- `GET /auth/me` with Bearer authentication
- `POST /analyses` with structured AI blind-spot generation
- `GET /analyses` list retrieval and single-record retrieval
- `POST /analyses/{id}/reflection` and `GET /analyses/{id}/reflection` persistence

---

## 🛡️ Hackathon Evaluation Alignment

- **Code Quality**: Clean separation of concerns (`routes`, `services`, `models`, `schemas`, `components`).
- **Security**: Direct `bcrypt` hashing, 256-bit JWT authorization, SSL-enforced Neon PostgreSQL connection, sanitized inputs.
- **Efficiency**: Serverless connection pooling with `pool_pre_ping=True`, Vite single-bundle asset hashing, sub-second API responses.
- **Google Services**: Official `google-genai` SDK implementation with Socratic dialectic system prompts.
- **Problem Statement Alignment**: Refuses to make decisions for users; focuses squarely on exposing unexamined assumptions, hidden trade-offs, and critical blind spots.
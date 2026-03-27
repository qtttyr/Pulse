# 🧠 Pulse: AI-Powered Code Architecture Auditor

Pulse is a high-end architectural analysis engine that visualizes codebase structures in 3D/2D space and provides deep AI-driven audits. It helps developers understand complex repositories, track technical debt, and find "Gold Nuggets" of elegant code.

![Pulse Dashboard Mockup](frontend/public/og-image.png)

## 🚀 Features

- **X-Ray Analysis**: Deep scan of any Git repository.
- **Interactive Graph**: 2D/3D force-directed graph of project topology.
- **AI Audit Narratives**: Detailed feedback on modularity, scalability, and performance.
- **The Gold Nugget**: Automatic detection of the most elegant code snippets.
- **Architectural Alpha Reports**: Professional PDF export with folder tree visualization.
- **Real-time Metrics**: Pulse score, technical debt evaluation, and innovation index.

## 🛠 Tech Stack

### Frontend

- **React 18** (Vite)
- **TypeScript**
- **Zustand** (State management)
- **Tailwind CSS** + **Framer Motion** (Premium UI)
- **Lucide React** (Icons)
- **html2pdf.js** (Direct PDF generation)

### Backend

- **FastAPI** (Python 3.10+)
- **OpenRouter API** (LLM orchestrator)
- **GitPython** (Repo cloning)
- **Uvicorn** (ASGI server)

## 📦 Setup & Installation

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- OpenRouter API Key

### Backend Setup

1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. `pip install -r requirements.txt`
5. Create `.env` file:
   ```env
   OPENROUTER_API_KEY=your_key_here
   ```
6. `uvicorn app.main:app --reload`

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. `npm run dev`

### Backend (Google Cloud Run / Docker)

Pulse Backend is fully containerized. To deploy to **Google Cloud Run**:

1. **Build the image**:
   ```bash
   cd backend
   docker build -t gcr.io/[PROJECT_ID]/pulse-backend .
   ```
2. **Push to Container Registry**:
   ```bash
   docker push gcr.io/[PROJECT_ID]/pulse-backend
   ```
3. **Deploy to Cloud Run**:
   - Go to Cloud Run in Console.
   - Choose "Deploy from Container".
   - Set **Port to 8080**.
   - **Env Vars**:
     - `OPENROUTER_API_KEY`
     - `ALLOWED_ORIGINS` (Your Vercel URL)
   - Set Memory to at least **1GB** (for repo processing).

### Frontend (Vercel)

1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Env Vars**:
   - `VITE_API_URL`: Your Cloud Run service URL (e.g., `https://pulse-backend-xyz.a.run.app`)

## 📄 License

MIT

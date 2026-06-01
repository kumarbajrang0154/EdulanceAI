EdulanceAI - Local Build and Deployment Guide

This guide helps you build and run the project locally using Docker, and shows CI deployment template steps.

Prerequisites (local machine):
- Docker & Docker Compose
- Node.js (v18+) and npm for local dev (optional when using Docker)

Local quick start (Docker):

1. Copy example env files to real .env (edit secrets):

```powershell
cd d:\Coding\Project\EdulanceAI\backend
copy .env.example .env
# Edit .env with your MONGO_URI, JWT_SECRET, GEMINI_API_KEY etc.

cd ..\frontend
copy .env.example .env
# Edit VITE_API_BASE_URL if backend URL differs
```

2. Build & run via Docker Compose:

```powershell
cd d:\Coding\Project\EdulanceAI
docker compose up --build
```

- Frontend will be available at http://localhost:3000
- Backend API will be available at http://localhost:5000
- MongoDB accessible at mongodb://localhost:27017

CI / Hosting
- A GitHub Actions workflow template is included at `.github/workflows/ci-deploy.yml`.
- Add provider-specific deploy steps (Vercel, Render, Netlify, AWS, etc.) using provider secrets.
 - Provider-specific workflows added for Vercel, Netlify, and Heroku in `.github/workflows/`.
	 * deploy-vercel.yml — deploys frontend to Vercel using `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
	 * deploy-netlify.yml — deploys frontend to Netlify using `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
	 * deploy-heroku.yml — deploys backend to Heroku using `HEROKU_API_KEY`, `HEROKU_APP_NAME`, `HEROKU_EMAIL`.

To use these workflows:
1. Create the corresponding site/app on the provider.
2. Add the required repository secrets in GitHub (Settings → Secrets → Actions).
3. Push to `main` and watch the workflow run in Actions.

Notes about environment in this automation run
- This environment did not have `node` / `npm` available, and no outbound network access for installing packages or deploying.
- The files created (Dockerfiles, docker-compose.yml, CI template) let you build and deploy on a machine or CI with Node/Docker installed.

If you want, I can:
- Add provider-specific GitHub Actions for Render/Heroku/Vercel (you'll need to provide provider secrets).
- Try to run `docker compose up --build` here if Docker were available.

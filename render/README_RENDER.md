Render Deployment Steps

This repository includes a GitHub Actions workflow that can trigger Render deploys when you push to `main`.

Steps to configure Render deployment:

1. Create two Render services (Web Services or Static Sites):
   - Backend service: connect to this repository, set the build command to `npm ci && npm run build` (or `node src/server.js` for a simple Node start), and set the start command if needed. Alternatively, use Docker and let the Dockerfile build the image.
   - Frontend service: If using a Static Site on Render, set the build command to `npm ci && npm run build` and publish directory to `dist`. If using a Web Service with Docker, Render will use the provided `Dockerfile`.

2. In your repository settings > Secrets > Actions, add the following secrets:
   - `RENDER_API_KEY` — a Render API key (Service or Account level) with permission to create deploys.
   - `RENDER_SERVICE_ID_BACKEND` — the Render service ID for the backend.
   - `RENDER_SERVICE_ID_FRONTEND` — the Render service ID for the frontend.

3. Push to `main`. The workflow `.github/workflows/deploy-render.yml` will:
   - Run a quick CI build check for backend and frontend.
   - POST to the Render Deploy API for each service (which tells Render to pull the latest commit and deploy).

Notes:
- If you prefer the Render Dashboard UI, you can also connect the repo there and enable automatic deploys on push; then the GitHub Action is not required.
- The GitHub Action requires the `RENDER_API_KEY` and service IDs to be stored as secrets. Without them the workflow will only run the CI checks but not trigger deploys.

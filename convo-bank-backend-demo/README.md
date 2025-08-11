# Conversational Banking — Demo Backend (No Keys Needed)

This runs **without** an OpenAI key or a database. Set `DEMO_MODE=1` and you'll get mock AI replies, accounts and transactions.

## Run locally
```bash
cp .env.example .env
npm install
npm run build
npm start
# API at http://localhost:3000, docs at /docs, health at /ai/health
```

## Deploy to Render (no DB, no keys)
- Create a Web Service from this repo.
- Environment variables:
  - `DEMO_MODE=1`
  - `NODE_ENV=production`
  - (Optional) `CORS_ORIGINS=https://<your-gh-username>.github.io`
- Build: `npm ci && npm run build`
- Start: `node dist/main.js`
- Use the service URL as your Flutter `API_BASE_URL`.

# Tank Tracker

This repo contains source code for the tanktracker.benfasoli.com web app.

## Development

1. Create a Team within your GitHub Organization.
2. Within your organization, register a new OAuth application in _Developer settings > OAuth Apps_ directing callbacks to `http://localhost:3000`.
3. Set up local environment variables by copying [the template](./env.local.example) with `cp .env.local.example .env.local` and editing `.env.local`.
4. Run Next.js in development mode with:

```bash
npm install
npm run dev
```

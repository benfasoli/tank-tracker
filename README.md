# GitHub Team Authorization Example

This is an example of using GitHub Teams as an authorization mechanism for internal Next.js projects, using NextAuth.

## Development

1. Create a Team within your GitHub Organization.
2. Within your organization, register a new OAuth application in *Developer settings > OAuth Apps* directing callbacks to `http://localhost:3000`.
3. Set up local environment variables by copying [the template](./env.local.example) with `cp .env.local.example .env.local` and editing `.env.local`.
4. Run Next.js in development mode

```bash
npm install
npm run dev
```

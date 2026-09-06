# chatbot-frontend

A single-page chat UI built with [Vite](https://vite.dev), React, TypeScript, and
[`@assistant-ui/react`](https://www.npmjs.com/package/@assistant-ui/react). The entire
page is a chat window that talks to a separate backend API.

## Environment variables

Copy `.env.example` to `.env` and set:

- `VITE_BACKEND_URL` — base URL of the backend API (defaults to `http://localhost:3001`
  if unset).

## Running locally

```sh
npm install
npm run dev
```

This app expects the [`chatbot-backend`](https://github.com/KlajdiTolis/chatbot-backend)
repo to be running and reachable at `VITE_BACKEND_URL`.

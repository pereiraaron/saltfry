# SaltFry

Live Demo: https://saltfry-c9375.web.app/

An e-commerce furniture store built with React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **React 19** with React Compiler for automatic memoization
- **TypeScript** with strict mode
- **Tailwind CSS v4** (Vite plugin)
- **Zustand** for state management (persisted auth/cart)
- **React Router v7** for client-side routing
- **Vite** for dev server and production builds
- **Vitest** for unit testing
- **WebAuthn / Passkeys** via `@simplewebauthn/browser`

## Getting Started

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APP_TITLE` | App title |
| `VITE_API_URL` | Backend API base URL |
| `VITE_AUTH_BASE_URL` | Authentication service base URL |
| `VITE_API_KEY` | API key for the auth service |

All `VITE_` variables are validated at runtime — the app will throw if any required variable is missing.

### Development

```bash
npm start
```

### Build

```bash
npm run build
```

Output goes to the `build` folder.

### Testing

```bash
npm run test          # single run
npm run test:watch    # watch mode
```

### Linting & Formatting

```bash
npm run lint          # check for lint issues
npm run lint:fix      # auto-fix lint issues
npm run format        # format with Prettier
npm run format:check  # check formatting
npm run type-check    # TypeScript type check
```

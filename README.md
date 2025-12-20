# SaltFry

Live Demo : https://saltfry-c9375.web.app/

## Getting Started

This project has been migrated from Create React App to Vite for faster development and build times.

### Development

```bash
npm install
npm start
# or
npm run dev
```

The development server will start at http://localhost:3000

### Build

```bash
npm run build
```

The production build will be created in the `build` folder.

### Preview Production Build

```bash
npm run preview
```

### Code Formatting & Linting

This project uses Prettier with Airbnb style guide for code formatting and ESLint for linting.

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check

# Lint JavaScript/JSX files
npm run lint

# Lint and auto-fix issues
npm run lint:fix
```

## Environment Variables

Environment variables must be prefixed with `VITE_` instead of `REACT_APP_`:

- `VITE_BASE_URL` - Base URL for API calls

Create a `.env` file in the root directory:

```
VITE_BASE_URL=your_api_base_url_here
```

## Firebase Configuration

Copy `src/firebase.example.js` to `src/firebase.js` and add your Firebase configuration.

## React Compiler

This project uses the React Compiler (experimental) for automatic performance optimizations. The compiler automatically memoizes components and reduces unnecessary re-renders without manual optimization.

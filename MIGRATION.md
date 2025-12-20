# Migration from Create React App to Vite

This document outlines the changes made during the migration from Create React App to Vite.

## Changes Made

### 1. Dependencies

**Added:**
- `vite` - Fast build tool
- `@vitejs/plugin-react` - Official React plugin for Vite

**Removed:**
- `react-scripts` - No longer needed
- `react-app-polyfill` - Not needed with modern Vite setup

### 2. Configuration Files

**Added:**
- `vite.config.js` - Vite configuration with JSX support for .js files
- `index.html` - Moved from `public/` to root directory

**Modified:**
- `package.json` - Updated scripts to use Vite commands
  - `start` → `vite`
  - `build` → `vite build`
  - Added `preview` → `vite preview`
  - Removed CRA-specific eslintConfig and browserslist

### 3. File Changes

**Renamed:**
- `src/index.js` → `src/main.jsx` (Vite convention)

**Updated:**
- `index.html` - Changed `%PUBLIC_URL%` references to absolute paths
- Added `<script type="module" src="/src/main.jsx"></script>` to index.html
- Removed `react-app-polyfill` imports from entry file

### 4. Environment Variables

Environment variables must now be prefixed with `VITE_` instead of `REACT_APP_`:

**Before:**
```javascript
process.env.REACT_APP_BASE_URL
```

**After:**
```javascript
import.meta.env.VITE_BASE_URL
```

**Updated files:**
- `src/actions/productActions.js`
- `src/actions/cartActions.js`

### 5. Public Assets

In Vite, assets in the `public` folder are accessed directly without `process.env.PUBLIC_URL`:

**Before:**
```javascript
src={process.env.PUBLIC_URL + "/images/logo.svg"}
```

**After:**
```javascript
src="/images/logo.svg"
```

**Updated files:**
- `src/components/Navbar/Navbar.js`
- `src/components/Hero/Hero.js`
- `src/components/Sidebar/Sidebar.js`
- `src/screens/AboutScreen/AboutScreen.js`

### 6. Build Output

The build output directory remains `build` (configured in vite.config.js) for compatibility with existing deployment scripts.

## New Commands

```bash
# Development server
npm start
# or
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy (unchanged)
npm run deploy
```

## React Compiler

The React Compiler (experimental) is enabled in this project. It automatically optimizes React components by:
- Automatically memoizing components and values
- Reducing unnecessary re-renders
- Improving runtime performance

Configuration is in `vite.config.js` using `babel-plugin-react-compiler`.

## Benefits of Vite

1. **Faster startup** - Dev server starts instantly
2. **Hot Module Replacement (HMR)** - Lightning-fast updates during development
3. **Faster builds** - Production builds are significantly faster
4. **Modern tooling** - Built on native ES modules
5. **Better developer experience** - Improved error messages and debugging
6. **React Compiler** - Automatic React optimizations enabled

## Code Quality Tools

### Prettier & ESLint

Added Prettier with Airbnb style guide for consistent code formatting:

**Configuration files:**
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore
- `.eslintrc.json` - ESLint with Airbnb config

**New scripts:**
- `npm run format` - Format all files
- `npm run format:check` - Check formatting
- `npm run lint` - Lint JavaScript/JSX files
- `npm run lint:fix` - Lint and auto-fix issues

## Notes

- The old `public/index.html` file is no longer used (new one is in root)
- JSX in `.js` files is supported via esbuild configuration
- Firebase configuration template is available in `src/firebase.example.js`
- All code has been formatted with Prettier following Airbnb style guide


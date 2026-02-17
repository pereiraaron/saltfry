import { afterEach, vi } from 'vitest';

// Stub environment variables used by the app
vi.stubEnv('VITE_API_URL', 'http://test-api/');
vi.stubEnv('VITE_AUTH_BASE_URL', 'http://test-auth');
vi.stubEnv('VITE_API_KEY', 'test-api-key');

// Clear localStorage between tests to prevent state leakage from persist middleware
afterEach(() => {
  localStorage.clear();
});

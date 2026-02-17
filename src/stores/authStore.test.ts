import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const mockUserInfo = {
  id: 'user-1',
  username: 'TestUser',
  email: 'test@example.com',
  role: 'member',
  accessToken: 'access-123',
  refreshToken: 'refresh-456',
  refreshTokenExpiresAt: '2099-01-01T00:00:00.000Z',
};

const initialState = {
  userInfo: null,
  loading: false,
  error: undefined,
  registrationLoading: false,
  registrationError: undefined,
  passkeyLoading: false,
  passkeyError: undefined,
  passkeySetupRequired: false,
  registrationComplete: false,
};

beforeEach(() => {
  vi.clearAllMocks();
  useAuthStore.setState(initialState);
});

describe('login', () => {
  it('sets userInfo on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: 'user-1', username: 'TestUser', role: 'member' },
        accessToken: 'access-123',
        refreshToken: 'refresh-456',
        refreshTokenExpiresAt: '2099-01-01T00:00:00.000Z',
        passkeySetupRequired: false,
      }),
    });

    await useAuthStore.getState().login('test@example.com', 'password');

    const state = useAuthStore.getState();
    expect(state.userInfo).toEqual(mockUserInfo);
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  it('sets error on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    await useAuthStore.getState().login('bad@email.com', 'wrong');

    const state = useAuthStore.getState();
    expect(state.userInfo).toBeNull();
    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBe(false);
  });

  it('sets error on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await useAuthStore.getState().login('test@example.com', 'password');

    expect(useAuthStore.getState().error).toBe('Network error');
  });
});

describe('register', () => {
  it('registers then auto-logs in and sets registrationComplete', async () => {
    // Register call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Registered' }),
    });

    // Auto-login call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: 'user-1', username: 'TestUser', role: 'member' },
        accessToken: 'access-123',
        refreshToken: 'refresh-456',
        refreshTokenExpiresAt: '2099-01-01T00:00:00.000Z',
      }),
    });

    await useAuthStore.getState().register('Test', 'test@example.com', 'password');

    const state = useAuthStore.getState();
    expect(state.userInfo).toBeTruthy();
    expect(state.registrationComplete).toBe(true);
    expect(state.registrationLoading).toBe(false);
  });

  it('sets registrationError on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email already exists' }),
    });

    await useAuthStore.getState().register('Test', 'test@example.com', 'password');

    const state = useAuthStore.getState();
    expect(state.registrationError).toBe('Email already exists');
    expect(state.registrationLoading).toBe(false);
    expect(state.userInfo).toBeNull();
  });
});

describe('logout', () => {
  it('clears userInfo after server logout', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.userInfo).toBeNull();
    expect(state.passkeySetupRequired).toBe(false);
    expect(state.registrationComplete).toBe(false);
  });

  it('clears userInfo even if server call fails', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await useAuthStore.getState().logout();

    expect(useAuthStore.getState().userInfo).toBeNull();
  });

  it('does not call fetch when no user is logged in', async () => {
    await useAuthStore.getState().logout();

    expect(mockFetch).not.toHaveBeenCalled();
    expect(useAuthStore.getState().userInfo).toBeNull();
  });
});

describe('refreshAccessToken', () => {
  it('updates tokens on success', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
        refreshTokenExpiresAt: '2099-06-01T00:00:00.000Z',
      }),
    });

    await useAuthStore.getState().refreshAccessToken();

    const state = useAuthStore.getState();
    expect(state.userInfo?.accessToken).toBe('new-access');
    expect(state.userInfo?.refreshToken).toBe('new-refresh');
    expect(state.userInfo?.id).toBe('user-1'); // Preserved
  });

  it('force-logs out on refresh failure', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo, passkeySetupRequired: true });

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Token expired' }),
    });

    await useAuthStore.getState().refreshAccessToken();

    expect(useAuthStore.getState().userInfo).toBeNull();
    expect(useAuthStore.getState().passkeySetupRequired).toBe(false);
  });

  it('force-logs out on network error', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await useAuthStore.getState().refreshAccessToken();

    expect(useAuthStore.getState().userInfo).toBeNull();
  });

  it('returns early when no user is logged in', async () => {
    await useAuthStore.getState().refreshAccessToken();

    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe('clearError', () => {
  it('clears all error states', () => {
    useAuthStore.setState({
      error: 'login error',
      registrationError: 'reg error',
      passkeyError: 'passkey error',
    });

    useAuthStore.getState().clearError();

    const state = useAuthStore.getState();
    expect(state.error).toBeUndefined();
    expect(state.registrationError).toBeUndefined();
    expect(state.passkeyError).toBeUndefined();
  });
});

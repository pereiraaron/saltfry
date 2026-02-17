import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAuthToken, authHeaders, authFetch } from './authFetch';
import { useAuthStore } from '../stores/authStore';

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const mockUserInfo = {
  id: 'user-1',
  username: 'Test',
  email: 'test@example.com',
  role: 'member',
  accessToken: 'access-token-123',
  refreshToken: 'refresh-token-456',
  refreshTokenExpiresAt: '2099-01-01T00:00:00.000Z',
};

beforeEach(() => {
  vi.clearAllMocks();
  useAuthStore.setState({ userInfo: null });
});

describe('authHeaders', () => {
  it('returns Authorization and Content-Type headers', () => {
    const headers = authHeaders('my-token');
    expect(headers).toEqual({
      Authorization: 'Bearer my-token',
      'Content-Type': 'application/json',
    });
  });
});

describe('getAuthToken', () => {
  it('returns null when no user is logged in', () => {
    expect(getAuthToken()).toBeNull();
  });

  it('returns access token when user is logged in', () => {
    useAuthStore.setState({ userInfo: mockUserInfo });
    expect(getAuthToken()).toBe('access-token-123');
  });
});

describe('authFetch', () => {
  it('throws when not authenticated', async () => {
    await expect(authFetch('/test')).rejects.toThrow('Not authenticated');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('injects auth headers into request', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });
    mockFetch.mockResolvedValueOnce({ status: 200, ok: true });

    await authFetch('http://api/test', { method: 'POST' });

    expect(mockFetch).toHaveBeenCalledWith('http://api/test', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer access-token-123',
        'Content-Type': 'application/json',
      },
    });
  });

  it('retries with new token on 401', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    // First call returns 401
    mockFetch.mockResolvedValueOnce({ status: 401 });

    // Mock the refresh — update store with new token
    const refreshSpy = vi
      .spyOn(useAuthStore.getState(), 'refreshAccessToken')
      .mockImplementation(async () => {
        useAuthStore.setState({
          userInfo: { ...mockUserInfo, accessToken: 'new-access-token' },
        });
      });

    // Retry call succeeds
    mockFetch.mockResolvedValueOnce({ status: 200, ok: true });

    await authFetch('http://api/test');

    expect(refreshSpy).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[1][1]).toEqual(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer new-access-token',
        }),
      })
    );
  });

  it('throws when refresh fails and no new token is available', async () => {
    useAuthStore.setState({ userInfo: mockUserInfo });

    mockFetch.mockResolvedValueOnce({ status: 401 });

    vi.spyOn(useAuthStore.getState(), 'refreshAccessToken').mockImplementation(async () => {
      useAuthStore.setState({ userInfo: null });
    });

    await expect(authFetch('http://api/test')).rejects.toThrow('Session expired');
  });
});

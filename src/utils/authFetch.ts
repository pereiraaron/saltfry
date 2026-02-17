import { useAuthStore } from '../stores/authStore';

export const getAuthToken = (): string | null => {
  const { userInfo } = useAuthStore.getState();
  return userInfo?.accessToken ?? null;
};

export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Fetch wrapper that retries once on 401 after refreshing the access token.
 */
export const authFetch = async (url: string, init?: RequestInit): Promise<Response> => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(url, { ...init, headers: authHeaders(token) });

  if (res.status === 401) {
    await useAuthStore.getState().refreshAccessToken();
    const newToken = getAuthToken();
    if (!newToken) throw new Error('Session expired');
    return fetch(url, { ...init, headers: authHeaders(newToken) });
  }

  return res;
};

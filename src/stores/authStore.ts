import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { UserInfo } from '../types';

const AUTH_URL = import.meta.env.VITE_AUTH_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const publicHeaders = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | undefined;
  registrationLoading: boolean;
  registrationError: string | undefined;
  passkeyLoading: boolean;
  passkeyError: string | undefined;
  passkeySetupRequired: boolean;
  registrationComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  loginWithPasskey: (email?: string) => Promise<void>;
  registerPasskey: (name?: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userInfo: null,
      loading: false,
      error: undefined,
      registrationLoading: false,
      registrationError: undefined,
      passkeyLoading: false,
      passkeyError: undefined,
      passkeySetupRequired: false,
      registrationComplete: false,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: undefined });

          const res = await fetch(`${AUTH_URL}/auth/login`, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Login failed');
          }

          const userInfo: UserInfo = {
            id: data.user.id,
            username: data.user.username,
            email,
            role: data.user.role,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt,
          };

          set({
            loading: false,
            userInfo,
            passkeySetupRequired: data.passkeySetupRequired || false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      register: async (_name: string, email: string, password: string) => {
        try {
          set({ registrationLoading: true, registrationError: undefined });

          const res = await fetch(`${AUTH_URL}/auth/register`, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          // Auto-login silently to get token for passkey registration
          set({ registrationLoading: false });
          await get().login(email, password);
          set({ registrationComplete: true });
        } catch (error) {
          set({
            registrationLoading: false,
            registrationError: error instanceof Error ? error.message : 'Registration failed',
          });
        }
      },

      logout: async () => {
        const { userInfo } = get();
        if (userInfo) {
          try {
            await fetch(`${AUTH_URL}/auth/logout`, {
              method: 'POST',
              headers: authHeaders(userInfo.accessToken),
              body: JSON.stringify({ refreshToken: userInfo.refreshToken }),
            });
          } catch {
            // Logout locally even if server call fails
          }
        }
        set({ userInfo: null, passkeySetupRequired: false, registrationComplete: false });
      },

      refreshAccessToken: async () => {
        const { userInfo } = get();
        if (!userInfo) return;

        try {
          const res = await fetch(`${AUTH_URL}/auth/refresh`, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({ refreshToken: userInfo.refreshToken }),
          });

          const data = await res.json();

          if (!res.ok) {
            // Refresh failed — force logout
            set({ userInfo: null, passkeySetupRequired: false });
            return;
          }

          set({
            userInfo: {
              ...userInfo,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            },
          });
        } catch {
          set({ userInfo: null, passkeySetupRequired: false });
        }
      },

      loginWithPasskey: async (email?: string) => {
        try {
          set({ passkeyLoading: true, passkeyError: undefined });

          // 1. Get authentication options
          const optionsRes = await fetch(`${AUTH_URL}/auth/passkey/login/options`, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({ email }),
          });

          const optionsData = await optionsRes.json();

          if (!optionsRes.ok) {
            throw new Error(optionsData.message || 'Failed to get passkey options');
          }

          // 2. Prompt user for passkey
          const credential = await startAuthentication({ optionsJSON: optionsData.options });

          // 3. Verify with server
          const verifyRes = await fetch(`${AUTH_URL}/auth/passkey/login/verify`, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({
              challengeId: optionsData.challengeId,
              credential,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            throw new Error(verifyData.message || 'Passkey authentication failed');
          }

          const userInfo: UserInfo = {
            id: verifyData.user.id,
            username: verifyData.user.username,
            email: email || '',
            role: verifyData.user.role,
            accessToken: verifyData.accessToken,
            refreshToken: verifyData.refreshToken,
            refreshTokenExpiresAt: verifyData.refreshTokenExpiresAt,
          };

          set({ passkeyLoading: false, userInfo });
        } catch (error) {
          set({
            passkeyLoading: false,
            passkeyError: error instanceof Error ? error.message : 'Passkey login failed',
          });
        }
      },

      registerPasskey: async (name?: string) => {
        const { userInfo } = get();
        if (!userInfo) return;

        try {
          set({ passkeyLoading: true, passkeyError: undefined });

          // 1. Get registration options
          const optionsRes = await fetch(`${AUTH_URL}/auth/passkey/register/options`, {
            method: 'POST',
            headers: authHeaders(userInfo.accessToken),
          });

          const optionsData = await optionsRes.json();

          if (!optionsRes.ok) {
            throw new Error(optionsData.message || 'Failed to get passkey registration options');
          }

          // 2. Create credential via browser
          const credential = await startRegistration({ optionsJSON: optionsData.options });

          // 3. Verify with server
          const verifyRes = await fetch(`${AUTH_URL}/auth/passkey/register/verify`, {
            method: 'POST',
            headers: authHeaders(userInfo.accessToken),
            body: JSON.stringify({
              challengeId: optionsData.challengeId,
              credential,
              name: name || 'My Passkey',
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            throw new Error(verifyData.message || 'Passkey registration failed');
          }

          set({ passkeyLoading: false, passkeySetupRequired: false });
        } catch (error) {
          set({
            passkeyLoading: false,
            passkeyError: error instanceof Error ? error.message : 'Passkey registration failed',
          });
        }
      },

      clearError: () => {
        set({
          error: undefined,
          registrationError: undefined,
          passkeyError: undefined,
        });
      },
    }),
    {
      name: 'userInfo',
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);

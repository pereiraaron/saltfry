import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '../types';

interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | undefined;
  registrationLoading: boolean;
  registrationError: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      loading: false,
      error: undefined,
      registrationLoading: false,
      registrationError: undefined,

      login: async (email: string, _password: string) => {
        try {
          set({ loading: true, error: undefined });

          // TODO: Replace with actual authentication API call
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 500);
          });

          const data: UserInfo = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            token: `mock-token-${Date.now()}`,
          };

          set({ loading: false, userInfo: data });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      register: async (displayName: string, email: string, _password: string) => {
        try {
          set({ registrationLoading: true, registrationError: undefined });

          // TODO: Replace with actual registration API call
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 500);
          });

          const data: UserInfo = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: displayName,
            token: `mock-token-${Date.now()}`,
          };

          set({
            registrationLoading: false,
            userInfo: data,
          });
        } catch (error) {
          set({
            registrationLoading: false,
            registrationError: error instanceof Error ? error.message : 'Registration failed',
          });
        }
      },

      logout: () => {
        set({ userInfo: null });
      },

      clearError: () => {
        set({ error: undefined, registrationError: undefined });
      },
    }),
    {
      name: 'userInfo',
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);

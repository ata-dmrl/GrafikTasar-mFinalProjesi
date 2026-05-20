import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
      },
      updateUser: (updates) =>
        set(state => ({ user: state.user ? { ...state.user, ...updates } : null })),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'auth-storage', partialize: state => ({ user: state.user, token: state.token }) }
  )
);

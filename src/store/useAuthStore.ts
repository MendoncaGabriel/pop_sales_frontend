import { Company, User } from '@/types/api';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  company: Company | null;
  setAuth: (user: User, company: Company) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  company: null,
  setAuth: (user, company) => set({ user, company }),
  clearAuth: () => set({ user: null, company: null }),
}));


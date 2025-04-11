import { create } from 'zustand';
import { User } from '@/lib/types';
import { getProfile, updateProfile } from '@/lib/api';
import { handleLogin, handleLogout, handleRegister, isAuthenticated } from '@/lib/auth';

const isClient = typeof window !== 'undefined';

interface AuthStore {
  winWidth: number;
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setWindowWidth: (width: number) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: false,
  isLoggedIn: isClient ? isAuthenticated() : false,
  winWidth: isClient ? window.innerWidth : 0,

  setWindowWidth: (width) => set({ winWidth: width }),

  login: async (email, password) => {
    set({ loading: true });
    try {
      const success = await handleLogin(email, password);
      if (success) {
        await get().fetchProfile();
        set({ isLoggedIn: true });
      }
      set({ loading: false });
      return success;
    } catch (error) {
      set({ loading: false });
      console.error('Login error:', error);
      return false;
    }
  },
  
  register: async (email, password, name) => {
    set({ loading: true });
    try {
      const success = await handleRegister(email, password, name);
      if (success) {
        await get().fetchProfile();
        set({ isLoggedIn: true });
      }
      set({ loading: false });
      return success;
    } catch (error) {
      set({ loading: false });
      console.error('Registration error:', error);
      return false;
    }
  },
  
  logout: () => {
    handleLogout();
    set({ user: null, isLoggedIn: false });
  },
  
  fetchProfile: async () => {
    if (!isClient) return;
    
    set({ loading: true });
    try {
      const user = await getProfile();
      set({ user });
    } catch (error) {
      console.error('Fetch profile error:', error);
      set({ isLoggedIn: false });
    }
    set({ loading: false });
  },
  
  updateProfile: async (data) => {
    set({ loading: true });
    try {
      const updatedUser = await updateProfile(data);
      set({ user: updatedUser });
      set({ loading: false });
      return updatedUser;
    } catch (error) {
      set({ loading: false });
      console.error('Update profile error:', error);
      throw error;
    }
  }
}));
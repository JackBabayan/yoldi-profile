import { login, register } from './api';
import Cookies from 'js-cookie';
import { AuthResponse } from './types';

const TOKEN_KEY = 'token';
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const data: AuthResponse = await login(email, password);
    
    Cookies.set(TOKEN_KEY, data.value, {
      ...COOKIE_OPTIONS,
      expires: data.expires ? new Date(data.expires) : undefined
    });
    
    const savedToken = Cookies.get(TOKEN_KEY);
    
    if (!savedToken) {
      console.error('Токен не был сохранен в cookie!');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const handleRegister = async (email: string, password: string, name: string) => {
  try {
    const data: AuthResponse = await register(email, password, name);
    
    Cookies.set(TOKEN_KEY, data.value, {
      ...COOKIE_OPTIONS,
      expires: data.expires ? new Date(data.expires) : undefined
    });
    
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const handleLogout = () => {
  Cookies.remove(TOKEN_KEY);
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
  return !!Cookies.get(TOKEN_KEY);
};

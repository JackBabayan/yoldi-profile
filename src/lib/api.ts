import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse, User, ApiErrorResponse } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://frontend-test-api.yoldi.agency/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['X-API-KEY'] = token
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/sign-up', { 
      email, 
      password, 
      name 
    });
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};


export const getProfile = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/profile');
    return data;
  } catch (error) {
    console.error('Fetch profile error:', error);
    throw error;
  }
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await api.patch<User>('/profile', userData);
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};


export const uploadImage = async (file: File): Promise<{ id: string; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const getUsersList = async (): Promise<User[]> => {
  try {
    const { data } = await api.get<User[]>('/user');
    return data;
  } catch (error) {
    console.error('Fetch users list error:', error);
    throw error;
  }
};

export { api };
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from './types';

const API_URL = 'https://frontend-test-api.yoldi.agency/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'saro',  // Добавляем сюда ваш ключ API
    },
    withCredentials: true, 
  });
  
  api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    console.log('Токен из куки:', token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


  
// Добавляем интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Если получаем 401, значит токен истек или недействителен
    if (error.response && error.response.status === 401) {
      console.log('Токен недействителен, перенаправление на страницу входа');
      
      // Очищаем токен
      Cookies.remove('token');
      
      // Перенаправляем на страницу входа (только на клиенте)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.value;
  
    console.log('Получен токен:', token);
  
    Cookies.set('token', token, { expires: 7 });
  
    return response.data;
  };

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/auth/sign-up', { email, password, name });
  return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
  };

export const updateProfile = async (data: Partial<User>) => {
  const response = await api.patch('/profile', data);
  return response.data;
};

export const getUserBySlug = async (slug: string) => {
  const response = await api.get(`/user/${slug}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/user');
  return response.data;
};
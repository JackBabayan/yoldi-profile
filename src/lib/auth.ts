import { login, register } from './api';
import Cookies from 'js-cookie';
import { AuthResponse } from './types';

export const handleLogin = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await login(email, password);
      console.log('Получен токен:', data.value);
      
      // Сохраняем токен
      Cookies.set('token', data.value);
      
      // Добавляем задержку для гарантии сохранения куки
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Проверяем, что токен действительно сохранился
      const savedToken = Cookies.get('token');
      console.log('Токен в куки после сохранения:', savedToken);
      
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
    Cookies.set('token', data.value, { expires: new Date(data.expires) });
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const handleLogout = () => {
  Cookies.remove('token');
};

export const isAuthenticated = () => {
  return !!Cookies.get('token');
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Получаем токен из куки
  const token = request.cookies.get('token')?.value;
  
  // Проверяем, запрашивает ли пользователь защищенный маршрут
  if (request.nextUrl.pathname.startsWith('/account') || 
      request.nextUrl.pathname.startsWith('/accounts')) {
    // Если токена нет, перенаправляем на страницу входа
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Если пользователь аутентифицирован и пытается зайти на страницу входа,
  // перенаправляем его на страницу аккаунта
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return NextResponse.next();
}

// Указываем, какие пути мы обрабатываем с помощью middleware
export const config = {
  matcher: ['/account/:path*', '/accounts/:path*', '/login', '/register']
};
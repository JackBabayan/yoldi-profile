import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value;
  
  if (request.nextUrl.pathname.startsWith('/account') || 
      request.nextUrl.pathname.startsWith('/accounts')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/accounts/:path*', '/login', '/register']
};
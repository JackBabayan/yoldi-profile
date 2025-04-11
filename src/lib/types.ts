export interface User {
  id?: string;
  name: string;
  email: string;
  description?: string;
  slug?: string;
  cover?: {
    id: string,
    url: string,
    width: string,
    height: string
  };
  image?: {
    id: string,
    url: string,
    width: string,
    height: string
  }
}

export interface AuthResponse {
  value: string;
  expires: string;
  user?: User;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
export interface User {
    name: string;
    email: string;
    description?: string;
    slug?: string;
    cover?: {
      url: string;
    };
    image?: {
      url: string;
    };
  }
  
  export interface AuthResponse {
    value: string;
    expires: string;
  }
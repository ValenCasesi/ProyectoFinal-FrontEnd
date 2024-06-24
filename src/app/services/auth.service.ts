import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private nombre: string | null = null;
  constructor() {
    this.token = localStorage.getItem('token');
    this.nombre = localStorage.getItem('nombre');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

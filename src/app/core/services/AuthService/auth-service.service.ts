// src/app/services/AuthService/auth-service.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private userDataKey = 'userData';
  private baseUrl = 'http://localhost:3000/api'; // Замените это на ваш адрес сервера

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  setAuthToken(token: string) {
    this.cookieService.set(this.authTokenKey, token);
  }

  getAuthToken(): string {
    return this.cookieService.get(this.authTokenKey);
  }

  deleteAuthToken() {
    this.cookieService.delete(this.authTokenKey);
    localStorage.removeItem('userId'); // Удаление userId из localStorage при выходе

  }

  checkToken(): Observable<any> {
    const authToken = this.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<any>(`${this.baseUrl}/auth/check-token`, {}, { headers });
  }

  getUserDataFromToken(token: string): Observable<UserData | null> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<UserData>(`${this.baseUrl}/token/getdata`, {}, { headers });
    } catch (error) {
      console.error('Error decoding token:', error);
      return of(null);
    }
  }

  authorizeUser(userData: UserData) {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  getUserData(): UserData | null {
    const userDataString = localStorage.getItem(this.userDataKey);
    if (userDataString) {
      return JSON.parse(userDataString);
    } else {
      return null;
    }
  }

  logout() {
    this.cookieService.delete(this.authTokenKey);
    localStorage.removeItem(this.userDataKey);
  }
}

interface UserData {
  userId: string;
  username: string;
  isAdmin: boolean;
}

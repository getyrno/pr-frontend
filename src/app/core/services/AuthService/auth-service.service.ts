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

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}
  private baseUrl = 'http://localhost:3000/api'; // Замените это на ваш адрес сервера

  setAuthToken(token: string) {
    console.log(1);
    console.log("cookieService setAuthToken:", token)
    this.cookieService.set(this.authTokenKey, token);
  }

  getAuthToken() {
    return this.cookieService.get(this.authTokenKey);
  }

  deleteAuthToken() {
    this.cookieService.delete(this.authTokenKey); // Удаляем куку авторизации
  }

  checkToken(): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey); // Получаем токен из локального хранилища

    // Устанавливаем заголовки с токеном
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    // Отправляем запрос на сервер
    return this.http.post<any>(`${this.baseUrl}/auth/check-token`, {}, { headers });
  }

  getUserDataFromToken(token: string): Observable<UserData | null> {
    try {
      // Устанавливаем заголовки с токеном
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      // Отправляем запрос на сервер для получения данных пользователя по его идентификатору
      return this.http.post<UserData>(`${this.baseUrl}/token/getdata`, {}, { headers });
    } catch (error) {
      console.error('Error decoding token:', error);
      return of(null); // Возвращаем пустой Observable в случае ошибки
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
// Другие данные о пользователе
}

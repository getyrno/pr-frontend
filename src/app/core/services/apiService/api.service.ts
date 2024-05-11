import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api'; // Замените это на ваш адрес сервера
  router: any;

  constructor(private http: HttpClient) { }

  verificationCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-verification-code`, data);
  }

  checkCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-user`, data);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register-user`, data)
      .pipe(
        tap(() => {
          // После успешной регистрации перенаправляем пользователя на главную страницу
          this.router.navigate(['./main']);
        }),
        catchError(error => {
          // Обработка ошибок, если они есть
          return throwError(error);
        })
      );
  }

  verifyTokenData(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/token/verify`, data).pipe(
      catchError(error => {
        // Обработка ошибок, если они есть
        return throwError(error);
      })
    );
  }
}

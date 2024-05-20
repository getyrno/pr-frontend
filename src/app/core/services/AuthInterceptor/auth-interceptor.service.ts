// src/app/core/services/AuthInterceptor/auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthService/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    console.log("intercept authToken =>", authToken); // Логирование токена
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log("intercept authReq =>", authReq.headers.get('Authorization')); // Логирование заголовка
      return next.handle(authReq);
    }
    console.log("intercept req =>", req); // Логирование запроса без токена
    return next.handle(req);
  }
}

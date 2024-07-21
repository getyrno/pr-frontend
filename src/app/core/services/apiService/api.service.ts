// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../AuthService/auth-service.service';
import { Chat } from '../../models/chat.model';
import { GroupChat } from '../../models/group-chat.model';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Замените это на ваш адрес сервера

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  verificationCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-verification-code`, data);
  }

  checkCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-user`, data);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register-user`, data)
      .pipe(
        tap(() => { }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyTokenData(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/token/verify`, data).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/search-users`, { params: { query } }).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getUserInfo(): Observable<User> {
    console.log("ApiService getUserInfo called"); // Логирование вызова метода
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    console.log("getUserInfo headers =>", headers.get('Authorization')); // Логирование заголовка
    return this.http.get<User>(`${this.baseUrl}/protected/info`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getInfoAboutPerson(id: number): Observable<User> {
    console.log("ApiService getUserInfo called"); // Логирование вызова метода
    const authToken = this.authService.getAuthToken();
    const personId = id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    console.log("getUserInfo headers =>", headers.get('Authorization')); // Логирование заголовка
    return this.http.get<User>(`${this.baseUrl}/protected/info/${personId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  createChat(userIds: number[]): Observable<Chat> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.post<Chat>(`${this.baseUrl}/protected/chats/create`, { name, userIds }, { headers })
      .pipe(catchError(this.handleError));
  }

  getUserChats(): Observable<Chat[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<Chat[]>(`${this.baseUrl}/protected/chats/getUserChats`, { headers })
      .pipe(catchError(this.handleError));
  }

  getGroupChats(): Observable<GroupChat[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<GroupChat[]>(`${this.baseUrl}/protected/group-chats`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUsersByIds(ids: number[]): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.post<User[]>(`${this.baseUrl}/protected/users/getByIds`, { ids }, { headers })
      .pipe(catchError(this.handleError));
  }

  getUserById(userId: number): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<User>(`${this.baseUrl}/protected/users/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMessages(chatId: number): Observable<Message[]> {
    console.log("getmessage init in apiservice", chatId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<Message[]>(`${this.baseUrl}/protected/messages/${chatId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  sendMessage(chatId: number, userId: number, senderNickname: string, content: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.post(`${this.baseUrl}/protected/messages/send`,
      { chatId, senderId: userId, senderNickname, text: content },
      { headers }
    ).pipe(catchError(this.handleError));
  }
}

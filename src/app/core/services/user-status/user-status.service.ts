// src/app/services/user-status.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  private socket: Socket;
  private statusSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    this.socket.on('userStatus', (status: any) => {
      console.log('User status received:', status);
      this.statusSubject.next(status);
    });
  }

  getUserStatus(): Observable<any> {
    return this.statusSubject.asObservable();
  }

  updateUserStatus(userId: number, status: string) {
    this.socket.emit('updateUserStatus', { userId, status });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

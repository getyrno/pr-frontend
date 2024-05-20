// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private messageSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    this.socket.on('message', (message: any) => {
      console.log('Message received:', message);
      this.messageSubject.next(message);
    });
  }

  sendMessage(chatId: string, content: string, user_id: number, sender_nickname: string, sent_at: string) {
    const data = { chatId, content, user_id, sender_nickname, sent_at };
    console.log('Sending message:', data);
    this.socket.emit('message', data);
  }

  receiveMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  joinRoom(room: string) {
    console.log('Joining room:', room);
    this.socket.emit('joinRoom', room);
  }

  leaveRoom(room: string) {
    console.log('Leaving room:', room);
    this.socket.emit('leaveRoom', room);
  }

  disconnect() {
    console.log('Disconnecting socket');
    this.socket.disconnect();
  }
}

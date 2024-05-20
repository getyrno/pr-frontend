// src/app/services/message/message.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { SocketService } from '../../../../../services/socketService/socket.service';
import { ApiService } from '../../../../../services/apiService/api.service';
import { User } from '../../../../../models/user.model';
import { Message } from '../../../../../models/message.model';
import { CurrentUserService } from '../../../../../services/currentUserService/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private messages: Message[] = [];

  constructor(
    private socketService: SocketService,
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {
    this.socketService.receiveMessages().subscribe((message: Message) => {
      this.messages.push(message);
      this.messagesSubject.next(this.messages);
    });
  }

  loadMessages(chatId: number): Observable<Message[]> {
    return new Observable(observer => {
      this.apiService.getMessages(chatId).subscribe(
        (messages: Message[]) => {
          console.log("MessageService messages =>", messages);
          this.messages = messages
          this.messagesSubject.next([...this.messages]); // Используем spread оператор для создания нового массива
          observer.next(this.messages);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  sendMessage(content: string, chatId: number) {
    const user = this.currentUserService.getCurrentUser();
    console.log("user 3", user)

    if (user && chatId) {
      const message: Message = {
        id: Date.now().toString(), // временный идентификатор
        chatId,
        user_id: user.id,
        sender_nickname: user.nickname, // добавляем nickname
        content: content,
        sent_at: new Date().toISOString() // Отправляем текущее время в формате ISO 8601
      };
      console.log("MessageService message =>", message);

      this.messages.push(message);
      this.messagesSubject.next(this.messages);
      this.apiService.sendMessage(chatId, user.id, user.nickname, content).subscribe();
      this.socketService.sendMessage(chatId.toString(), content, user.id, user.nickname, new Date().toISOString());
    }
  }

  joinRoom(chatId: number) {
    this.socketService.joinRoom(chatId.toString());
  }

  getUserInfo(userId: number): Observable<User> {
    return this.apiService.getUserById(userId);
  }


  clearMessages() {
    console.log('Clearing messages');
    this.messages = [];
    this.messagesSubject.next([...this.messages]); // Используем spread оператор для создания нового массива
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { Chat } from '../../models/chat.model';
import { GroupChat } from '../../models/group-chat.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {
  private currentUserId: number | null = null;


  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  private currentChatIdSubject = new BehaviorSubject<number | null>(null);
  currentChatId$ = this.currentChatIdSubject.asObservable();
  private selectedChatSubject = new BehaviorSubject<Chat | GroupChat | null>(null);
  selectedChat$ = this.selectedChatSubject.asObservable();

  selectUser(user: User) {
    this.selectedUserSubject.next(user);
  }

  setCurrentChatId(chatId: number) {
    this.currentChatIdSubject.next(chatId);
  }

  selectChat(chat: Chat) {
    this.selectedChatSubject.next(chat);
  }

  getSelectedChat(): Chat | null {
    return this.selectedChatSubject.getValue();
  }

  getSelectedUser(): User | null {
    return this.selectedUserSubject.getValue();
  }

  getCurrentChatId(): number | null {
    return this.currentChatIdSubject.getValue();
  }

  setCurrentUserId(userId: number) {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  getCurrentUser(): User | null {
    return this.selectedUserSubject.getValue();
  }

  setCurrentUser(): User | null {
    return this.selectedUserSubject.getValue();
  }
}

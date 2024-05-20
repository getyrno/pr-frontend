import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService } from '../services/message/message.service';
import { Message } from '../../../../models/message.model';
import { Chat } from '../../../../models/chat.model';
import { User } from '../../../../models/user.model';
import { GroupChat } from '../../../../models/group-chat.model';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { CurrentUserService } from '../../../../services/currentUserService/current-user.service';

@Component({
  selector: 'app-message-main-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './message-main-view.component.html',
  styleUrls: ['./message-main-view.component.scss'],
  providers: [DatePipe]
})
export class MessageMainViewComponent implements OnInit, OnDestroy {
  messages$: Observable<Message[]>;
  private chatSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  selectedUser: User | null = null;
  selectedChat: Chat | GroupChat | null = null;
  loadedChatId: number | null = null;
  isLoading: boolean = false;
  currentUser: number | null = null;

  constructor(
    private messageService: MessageService,
    private selectedUserService: SelectedUserService,
    private currentUserService: CurrentUserService,
    private cdr: ChangeDetectorRef
  ) {
    this.messages$ = this.messageService.messages$;
  }

  ngOnInit() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.currentUser = parseInt(localStorage.getItem('userId') || '0', 10);
    console.log('Current user:', this.currentUser);

    this.userSubscription = this.selectedUserService.selectedUser$.subscribe({
      next: (user) => {
        console.log('Selected user:', user);
        if (user && Object.keys(user).length !== 0) {
          this.selectedUser = user;
          this.detectChanges();
        } else {
          this.selectedUser = null;
        }
      },
      error: (error) => {
        console.error('Error fetching selected user:', error);
      }
    });

    this.chatSubscription = this.selectedUserService.selectedChat$.subscribe({
      next: (chat) => {
        console.log('Selected chat:', chat);
        if (chat) {
          this.selectedChat = chat;
          if (chat.id !== this.loadedChatId) {
            console.log(`Chat changed from ${this.loadedChatId} to ${chat.id}`);
            this.loadedChatId = chat.id;
            this.isLoading = true;
            this.messageService.clearMessages();
            this.loadMessagesForChat(chat.id);
            this.messageService.joinRoom(chat.id);
            this.detectChanges();
          }
        } else {
          this.selectedChat = null;
          this.loadedChatId = null;
          this.messageService.clearMessages();
        }
      },
      error: (error) => {
        console.error('Error fetching selected chat:', error);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.chatSubscription?.unsubscribe();
  }

  loadMessagesForChat(chatId: number) {
    this.isLoading = true;
    this.messageService.loadMessages(chatId)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.detectChanges();
      }))
      .subscribe({
        next: (messages) => {
          console.log('Messages loaded:', messages);
        },
        error: (error) => {
          console.error('Error loading messages:', error);
        }
      });
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  isCurrentUser(message: any): boolean {
    const senderId = message.user_id;
    return !!this.currentUser && this.currentUser === senderId;
  }
}

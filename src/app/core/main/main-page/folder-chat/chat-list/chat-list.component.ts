import { Component, OnInit } from '@angular/core';
import { ChatListPatternComponent } from '../chat-list-pattern/chat-list-pattern.component';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { ApiService } from '../../../../services/apiService/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/AuthService/auth-service.service';
import { SocketService } from '../../../../services/socketService/socket.service';
import { User } from '../../../../models/user.model';
import { Chat } from '../../../../models/chat.model';
import { GroupChat } from '../../../../models/group-chat.model';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    ChatListPatternComponent,
    TuiScrollbarModule,
    CommonModule
  ],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  personalChats: Chat[] = [];
  groupChats: GroupChat[] = [];
  userId: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe(
      (user: User) => {
        this.userId = user.id;

        this.apiService.getUserChats().subscribe((personalChats: Chat[]) => {
          this.personalChats = personalChats;
          this.joinRooms(personalChats.map(chat => chat.id));
        });

        this.apiService.getGroupChats().subscribe((groupChats: GroupChat[]) => {
          this.groupChats = groupChats;
          this.joinRooms(groupChats.map(chat => chat.id));
        });
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  joinRooms(chatIds: number[]) {
    chatIds.forEach(chatId => this.socketService.joinRoom(chatId.toString()));
  }
}

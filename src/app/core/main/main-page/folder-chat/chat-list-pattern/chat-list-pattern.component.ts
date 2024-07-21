import { SocketService } from './../../../../services/socketService/socket.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiAutoColorModule, TuiAvatarModule, TuiAvatarStackModule } from '@taiga-ui/experimental';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { User } from '../../../../models/user.model';
import { Chat } from '../../../../models/chat.model';
import { ApiService } from '../../../../services/apiService/api.service';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { GroupChat } from '../../../../models/group-chat.model';

@Component({
  selector: 'app-chat-list-pattern',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiSvgModule,
    TuiAvatarStackModule,
    TuiAutoColorModule,
    TuiScrollbarModule
  ],
  templateUrl: './chat-list-pattern.component.html',
  styleUrls: ['./chat-list-pattern.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListPatternComponent implements OnChanges {
  @Input() personalChats: Chat[] = [];
  @Input() groupChats: GroupChat[] = [];
  users: { [chatId: number]: User } = {};
  usersList: User[] = [];

  userId: number | undefined;
  user: User | undefined;
  constructor(
    public selectedUserService: SelectedUserService,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private socketService: SocketService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['personalChats'] || changes['groupChats']) {
      this.loadUsersForChats();
      this.cdr.markForCheck();
    }
  }

  loadUsersForChats() {
    this.apiService.getUserInfo().subscribe(
      (user: User) => {
        this.userId = user.id;
        this.personalChats.forEach(chat => {
        const otherUserId = chat.user_ids.find(id => id !== this.userId);
        console.log("otherUserId =>", otherUserId);
        if (otherUserId) {
          this.apiService.getInfoAboutPerson(otherUserId).subscribe((user: User) => {
            console.log("loadUsersForChats user=>", user);
            this.usersList.push(user);
            this.socketService.getUserStatus(user.id).subscribe({
              next: (status) => {
                if (status.userId === user.id) {
                  user.status = status.status;
                  this.cdr.markForCheck();
                }
              },
              error: (error) => {
                console.error('Error fetching user status:', error);
              }
            });
            console.log("loadUsersForChats user=>", user.status);
            this.users[chat.id] = user;
            console.log("loadUsersForChats this.users[chat.id]=>", this.users[chat.id]);
            this.cdr.markForCheck();
        });
      }
    });
  })
  }

  selectChat(chat: Chat | GroupChat) {
    this.apiService.getUserInfo().subscribe(
      (currentUser: User) => {
        console.log("Current user =>", currentUser);
        console.log("Current Chat =>", chat);
        this.selectedUserService.selectChat(chat);

        if (chat.user_ids && chat.user_ids.length === 2) {
          const otherUserId = chat.user_ids.find(id => id !== currentUser.id);
          if (otherUserId) {
            const otherUser = this.usersList.find(user => user.id === otherUserId);
            if (otherUser) {
              this.selectedUserService.selectUser(otherUser);
            } else {
              this.apiService.getInfoAboutPerson(otherUserId).subscribe(
                (user: User) => {
                  this.usersList.push(user);
                  this.selectedUserService.selectUser(user);
                },
                error => {
                  console.error('Error fetching user info:', error);
                }
              );
            }
          }
        }
      },
      error => {
        console.error('Error fetching current user info:', error);
      }
    );
  }


  getChatName(chat: GroupChat): string {
    return chat.name;
  }

  getAvatarUrl(chat: Chat | GroupChat): string {
    if ('avatar_url' in chat) {
      return chat.avatar_url || 'default-group-avatar.png';
    }
    const otherUser = this.users[chat.id];
    return otherUser ? otherUser.avatar_url : 'default-user-avatar.png';
  }

  getUserNickname(chat: Chat): string {
    const otherUser = this.users[chat.id];
    return otherUser ? otherUser.nickname : 'User';
  }

  getUserStatus(chat: Chat): string {
    const otherUser = this.users[chat.id];
    return otherUser ? otherUser.status : 'User';
  }

  // getUserStatus(chat: Chat): string {
  //   const otherUser = this.users[chat.id];

  //   const userStatus = this.socketService.getUserStatus(otherUser.id);
  //   return userStatus ? otherUser.status : "offline";
  // }

  getChatInfo(chat: Chat) {
    const user = this.users[chat.id];
    console.log("Current chatuser =>", user);
    return user
  }

  private getInfoAboutPerson(id: number): void {
    this.apiService.getInfoAboutPerson(id).subscribe(
      user => {
        console.log(user); // Обработка полученных данных пользователя
        this.user = user;
      },
      error => {
        console.error('Error fetching user info:', error); // Обработка ошибок
      }
    );
  }

}

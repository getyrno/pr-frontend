import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../../../../models/user.model';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
import { ApiService } from '../../../../services/apiService/api.service';
import { AuthService } from '../../../../services/AuthService/auth-service.service';
import { Chat } from '../../../../models/chat.model';

@Component({
  selector: 'app-search-list-pattern',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule
  ],
  templateUrl: './search-list-pattern.component.html',
  styleUrls: ['./search-list-pattern.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchListPatternComponent {
  @Input() users: User[] = [];
  @Input() searchPanel!: SearchPanelComponent;

  constructor(
    public selectedUserService: SelectedUserService,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  selectUser(user: User) {
    this.apiService.getUserInfo().subscribe(
      (currentUser: User) => {
        console.log("Current user =>", currentUser);
        const userIds = [currentUser.id, user.id]; // Список пользователей для чата

        this.apiService.createChat(userIds).subscribe((chat: Chat) => {
          this.selectedUserService.selectUser(user);
          this.selectedUserService.selectChat(chat);
          this.searchPanel.clearSearch(); // Очистка поиска
        });
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}

// selectUser(user: User) {
//   const currentUserId = this.authService.getUserData()?.userId;
//   const userIds = [currentUserId, user.id];

//   if (userIds.length > 2) {
//     const groupName = `Group Chat with ${userIds.length} members`;
//     const avatarUrl = 'default-group-avatar.png'; // Замените на URL аватара группы, если доступен
//     this.apiService.createGroupChat(groupName, avatarUrl, userIds).subscribe((groupChat: GroupChat) => {
//       this.selectedUserService.selectChat(groupChat);
//       this.searchPanel.clearSearch();
//     });
//   } else {
//     this.apiService.createChat(userIds).subscribe((chat: Chat) => {
//       this.selectedUserService.selectChat(chat);
//       this.searchPanel.clearSearch();
//     });
//   }
// }
// }

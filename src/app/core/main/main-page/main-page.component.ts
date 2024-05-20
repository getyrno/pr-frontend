import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { SearchPanelComponent } from './search/search-panel/search-panel.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ChatListComponent } from './folder-chat/chat-list/chat-list.component';
import { ChatComponent } from './folder-chat/chat/chat.component';
import { ChatListPatternComponent } from './folder-chat/chat-list-pattern/chat-list-pattern.component';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search/search-list/search-list.component';
import { SelectedUserService } from '../../services/selectedUser/selected-user.service';
import { Observable } from 'rxjs';
import { Chat } from '../../models/chat.model';
import { GroupChat } from '../../models/group-chat.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [
    CommonModule,
    PanelComponent,
    SearchPanelComponent,
    TuiInputModule,
    TuiRootModule,
    ChatListComponent,
    TuiTextfieldControllerModule,
    ChatComponent,
    ChatListPatternComponent,
    SearchListComponent
  ],
  styleUrls: ['./main-page.component.scss'],
  standalone: true
})
export class MainPageComponent implements OnInit {
  isSearching = false;
  searchResults: User[] = [];
  selectedChat$: Observable<Chat | GroupChat | null>;

  @ViewChild(SearchPanelComponent) searchPanel!: SearchPanelComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    public selectedUserService: SelectedUserService
  ) {
    this.selectedChat$ = this.selectedUserService.selectedChat$;
  }

  ngOnInit() {
    this.selectedChat$ = this.selectedUserService.selectedChat$;
  }

  updateSearchResults(event: { users: User[], query: string }) {
    this.searchResults = event.users;
    this.isSearching = event.query.trim().length > 0;
    this.cdr.detectChanges();
  }

  onSearchFocus() {
    this.isSearching = true;
    this.cdr.detectChanges();
  }

  onSearchBlur() {
    // Если необходимо обработать, когда поле поиска теряет фокус
  }
}

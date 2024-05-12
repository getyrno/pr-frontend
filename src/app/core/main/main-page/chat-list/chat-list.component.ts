import { Component } from '@angular/core';
import { ChatListPatternComponent } from '../chat-list-pattern/chat-list-pattern.component';
import { TuiScrollbarModule } from '@taiga-ui/core';
@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    ChatListPatternComponent,
    TuiScrollbarModule,
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {

}

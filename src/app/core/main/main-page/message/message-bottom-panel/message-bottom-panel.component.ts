import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TuiTextfieldControllerModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAppearanceModule } from '@taiga-ui/experimental';
import { TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import { CustomTextareaComponent } from '../../../../lib/ui/components/custom-textarea/custom-textarea.component';
import { MessageMainViewComponent } from '../message-main-view/message-main-view.component';
import { MessageTopPanelComponent } from '../message-top-panel/message-top-panel.component';
import { MessageService } from '../services/message/message.service';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { ApiService } from '../../../../services/apiService/api.service';
import { CurrentUserService } from '../../../../services/currentUserService/current-user.service';

@Component({
  selector: 'app-message-bottom-panel',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTextareaModule,
    TuiAppearanceModule,
    CustomTextareaComponent,
    TuiSvgModule,
    MessageTopPanelComponent,
    MessageMainViewComponent,
  ],
  templateUrl: './message-bottom-panel.component.html',
  styleUrls: ['./message-bottom-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageBottomPanelComponent implements OnInit {
  userId: number | undefined;
  chatId: number | undefined;
  chatForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private selectedUserService: SelectedUserService,
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.apiService.getUserById(userId).subscribe(
      (user) => {
        this.currentUserService.setCurrentUser(user);
        this.currentUserService.setCurrentUserId(userId);
        console.log("MessageBottomPanelComponent user", user)
      })
  }

  onSubmit() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const selectedChat = this.selectedUserService.getSelectedChat();
    const chatId = selectedChat ? +selectedChat.id : null;
    const messageControl = this.chatForm.get('message');
    const message = messageControl?.value?.trim() || '';
    if (messageControl && messageControl.valid && message && chatId !== null && userId !== null) {
      const formattedMessage = this.formatMessageAsHtml(message);
      this.messageService.sendMessage(formattedMessage, chatId);
      this.chatForm.reset();
      messageControl.setValue('');
      this.resetTextareaHeight();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  resetTextareaHeight() {
    const textareaEl = document.querySelector('.custom-textarea') as HTMLTextAreaElement;
    if (textareaEl) {
      textareaEl.style.height = '0';
      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    }
  }

  formatMessageAsHtml(message: string): string {
    // Заменяем переводы строк на <br> теги для HTML формата
    return message.replace(/\n/g, '<br>');
  }
}

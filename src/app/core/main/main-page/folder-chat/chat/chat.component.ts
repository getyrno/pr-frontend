import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import {TuiAppearanceModule} from '@taiga-ui/experimental';
import { CustomTextareaComponent } from '../../../../lib/ui/components/custom-textarea/custom-textarea.component';
import { TuiSvgModule } from '@taiga-ui/core';
import { MessageTopPanelComponent } from '../../message/message-top-panel/message-top-panel.component';
import { MessageMainViewComponent } from '../../message/message-main-view/message-main-view.component';
import { MessageBottomPanelComponent } from '../../message/message-bottom-panel/message-bottom-panel.component';
import { User } from "../../../../models/user.model";
import { SelectedUserService } from "../../../../services/selectedUser/selected-user.service";
import { Subscription } from "rxjs";
import { ApiService } from "../../../../services/apiService/api.service";

@Component({
  selector: 'app-chat',
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
    MessageBottomPanelComponent
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatComponent implements OnInit {
  user: User | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private selectedUserService: SelectedUserService,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.selectedUserService.selectedUser$.subscribe({
      next: (user) => {
        console.log('Selected user:', user);
        if (user?.id){
          this.getInfoAboutPerson(user?.id)
        }
      },
      error: (error) => console.error('Error fetching selected user:', error)
    });
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

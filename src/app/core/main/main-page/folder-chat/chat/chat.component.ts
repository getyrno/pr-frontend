import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import {TuiAppearanceModule} from '@taiga-ui/experimental';
import { CustomTextareaComponent } from '../../../../lib/ui/components/custom-textarea/custom-textarea.component';
import { TuiSvgModule } from '@taiga-ui/core';
import { MessageTopPanelComponent } from '../../message/message-top-panel/message-top-panel.component';
import { MessageMainViewComponent } from '../../message/message-main-view/message-main-view.component';
import { MessageBottomPanelComponent } from '../../message/message-bottom-panel/message-bottom-panel.component';

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
export class ChatComponent {

}

import { Component } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ChatListComponent } from './chat-list/chat-list.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    imports: [
      PanelComponent,
      SearchPanelComponent,
      TuiInputModule,
      TuiRootModule,
      ChatListComponent,
      TuiTextfieldControllerModule
    ],
    styleUrl: './main-page.component.scss',
    standalone: true
})
export class MainPageComponent {

}

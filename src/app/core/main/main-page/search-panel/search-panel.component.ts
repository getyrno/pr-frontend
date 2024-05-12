import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule, TuiTextfieldSizeDirective } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    TuiSvgModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiTextfieldControllerModule,
    TuiPrimitiveTextfieldModule
  ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SearchPanelComponent {
  value = '';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { TuiRootModule } from '@taiga-ui/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    TuiSvgModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRootModule,
    BrowserAnimationsModule
  ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SearchPanelComponent {
  value = '';

}

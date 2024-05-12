import { Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    TuiSvgModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

}

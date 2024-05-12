import { Component } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    imports: [PanelComponent, SearchPanelComponent, TuiInputModule, TuiRootModule],
    styleUrl: './main-page.component.scss',
    standalone: true
})
export class MainPageComponent {

}

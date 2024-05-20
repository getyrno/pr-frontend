import { Component, Input } from '@angular/core';
import { SearchListPatternComponent } from '../search-list-pattern/search-list-pattern.component';
import { User } from '../../../../models/user.model';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
import { TuiScrollbarModule } from '@taiga-ui/core';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    SearchListPatternComponent,
    TuiScrollbarModule
  ],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  @Input() users: User[] = [];
  @Input() searchPanel!: SearchPanelComponent;
}

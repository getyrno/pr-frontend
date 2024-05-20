import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TuiSvgModule, TuiTextfieldControllerModule, TuiScrollbarModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../../../services/apiService/api.service';
import { User } from '../../../../models/user.model';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiTextfieldControllerModule,
    TuiScrollbarModule,
  ],
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPanelComponent {
  @Output() searchResults = new EventEmitter<{ users: User[], query: string }>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();
  searchForm: FormGroup;
  searchResults$: Observable<User[]> | undefined;

  constructor(private apiService: ApiService) {
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });

    this.searchResults$ = this.searchForm.get('query')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        const trimmedQuery = query ? query.trim() : '';
        if (trimmedQuery) {
          return this.apiService.searchUsers(trimmedQuery);
        } else {
          return of([]);
        }
      })
    );

    this.searchResults$.subscribe(users => {
      const query = this.searchForm.get('query')!.value ? this.searchForm.get('query')!.value.trim() : '';
      this.searchResults.emit({ users, query });
    });
  }

  onSearch() {
    const query = this.searchForm.get('query')!.value ? this.searchForm.get('query')!.value.trim() : '';
    if (query) {
      this.apiService.searchUsers(query).subscribe(users => {
        this.searchResults.emit({ users, query });
      });
    } else {
      this.searchResults.emit({ users: [], query });
    }
  }

  clearSearch() {
    this.searchForm.reset();
    this.searchResults.emit({ users: [], query: '' });
  }
}

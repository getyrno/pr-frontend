import { CommonModule } from '@angular/common';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TuiSvgModule } from '@taiga-ui/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-message-top-panel',
  standalone: true,
  imports: [CommonModule, TuiSvgModule],
  templateUrl: './message-top-panel.component.html',
  styleUrls: ['./message-top-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageTopPanelComponent implements OnInit, OnDestroy {
  selectedUser: User | null = null;
  aselect = true;
  private subscription: Subscription | undefined;

  constructor(
    private selectedUserService: SelectedUserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.selectedUserService.selectedUser$.subscribe({
      next: (user) => {
        console.log('Selected user:', user);  // Логирование
        if (user && Object.keys(user).length !== 0) {
          this.selectedUser = user;
          this.aselect = false;
          this.cdr.markForCheck();  // Уведомляем Angular о необходимости обновить шаблон
        } else {
          this.selectedUser = null;
          this.aselect = true;
        }
      },
      error: (error) => {
        console.error('Error fetching selected user:', error);
        this.aselect = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  selectUser(user: User) {
    this.selectedUserService.selectUser(user);
  }

  onBack() {
    // Логика для обработки нажатия на стрелочку назад
  }

  onSearch() {
    // Логика для обработки нажатия на кнопку поиска
  }

  onLayoutChange() {
    // Логика для обработки нажатия на кнопку смены раскладки
  }

  onMoreOptions() {
    // Логика для обработки нажатия на кнопку дополнительных опций
  }
}

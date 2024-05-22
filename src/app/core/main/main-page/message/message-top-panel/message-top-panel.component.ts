import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TuiSvgModule } from '@taiga-ui/core';
import { User } from '../../../../models/user.model';
import { SelectedUserService } from '../../../../services/selectedUser/selected-user.service';
import { UserStatusService } from '../../../../services/user-status/user-status.service';
import { SocketService } from '../../../../services/socketService/socket.service';

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
  userStatus: string | null = null;
  private subscription: Subscription | undefined;
  private statusSubscription: Subscription | undefined;
  private socketSubscription: Subscription | undefined;

  constructor(
    private selectedUserService: SelectedUserService,
    private userStatusService: UserStatusService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.subscription = this.selectedUserService.selectedUser$.subscribe({
      next: (user) => {
        console.log('Selected user:', user);
        if (user && Object.keys(user).length !== 0) {
          this.selectedUser = user;
          this.getStatusInfo(this.selectedUser);
          this.cdr.markForCheck();
        } else {
          this.selectedUser = null;
        }
      },
      error: (error) => {
        console.error('Error fetching selected user:', error);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.statusSubscription?.unsubscribe();
    this.socketSubscription?.unsubscribe();
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

  getStatusInfo(selecteduser: any) {
    this.socketService.getUserStatus(selecteduser.id).subscribe({
      next: (status) => {
        if (status.userId === this.selectedUser?.id) {
          this.userStatus = status.status;
          this.cdr.markForCheck();
        }
      },
      error: (error) => {
        console.error('Error fetching user status:', error);
      }
    });

    return this.userStatus;
  }
}

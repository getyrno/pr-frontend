// src/app/core/services/CurrentUserService/current-user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private currentUserId: number | null = null;

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  setCurrentUserId(userId: number) {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }
}


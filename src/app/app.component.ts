import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './core/services/AuthService/auth-service.service';
import { AuthInterceptor } from './core/services/AuthInterceptor/auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './core/services/apiService/api.service';
import { CurrentUserService } from './core/services/currentUserService/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TuiRootModule, RouterOutlet, RouterModule, HttpClientModule],
  providers: [
    AuthService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getAuthToken();
    console.log('token =>', token);
    this.authService.getUserDataFromToken(token).subscribe(
      (userdata: any) => {
        console.log('userdata =>', userdata);
        if (userdata !== null) {
          this.apiService.getUserById(userdata.userId).subscribe(
            (user) => {
              this.currentUserService.setCurrentUser(user);
              this.currentUserService.setCurrentUserId(userdata.userId);
              this.router.navigate(['/main']);
            },
            (error) => {
              console.error('Error fetching user data:', error);
              this.authService.deleteAuthToken();
              this.router.navigate(['/auth']);
            }
          );
        }
      },
      (error) => {
        console.error('Error getting user data:', error);
        if (error.message === "Http failure response for http://localhost:3000/api/token/getdata: 0 Unknown Error") {
          this.router.navigate(['/main']);
        } else {
          this.authService.deleteAuthToken();
          this.router.navigate(['/auth']);
        }
      }
    );
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Добавленный импорт
import { AuthService } from './core/services/AuthService/auth-service.service';
import { AuthInterceptor } from './core/services/AuthInterceptor/auth-interceptor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [TuiRootModule, RouterOutlet, RouterModule, HttpClientModule],
    providers: [
      AuthService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],

})
export class AppComponent {
  constructor(private router: Router,
    private authService: AuthService

  ) {}
  ngOnInit(): void {

    // попытка 1 токен

    const token = this.authService.getAuthToken();
    console.log('token =>', token);
    this.authService.getUserDataFromToken(token).subscribe(
      (userdata) => {
        console.log('userdata =>', userdata);
        // Здесь вы можете выполнить логику, которая зависит от данных пользователя
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );
    // Проверяем токен при загрузке приложения
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      // Если токен есть, перенаправляем на главную страницу
      this.router.navigate(['/main']);
    } else {
      // Если токен отсутствует, перенаправляем на страницу аутентификации
      this.router.navigate(['/auth']);
    }
  }
}

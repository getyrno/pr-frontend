import { ApiService } from '../../services/apiService/api.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MaskitoOptions} from '@maskito/core';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { TuiPrimitiveTextfieldModule, TuiAlertModule } from '@taiga-ui/core';
import { MaskitoModule } from '@maskito/angular';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/AuthService/auth-service.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrl: './verification.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        TuiSvgModule,
        ReactiveFormsModule,
        TuiInputModule,
        MaskitoModule,
        TuiPrimitiveTextfieldModule,
        TuiLoaderModule,
        TuiAlertModule,
        ProfileCreationComponent,
    ],
})
export class VerificationComponent implements OnInit {
  loading = false;
  errorMessages: string[] = [];
  show = false;
  success = false;
  errorCode = false;
  errorCodeFuck = false;
goBackToPhoneNumber() {
throw new Error('Method not implemented.');
}
  @Input() phoneNumber: string | undefined; // Declare phoneNumber input property
  CodeSubmitted = false;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService // Внедрите сервис аутентификации

  ) {}

  ngOnInit() {
    // Подписка на изменения в форме ввода кода
    this.CodeForm.get('code')?.valueChanges.subscribe((value: string | null) => {
      // Если введено 6 символов, отправляем запрос на сервер
      console.log("VALUE:",value);
      if (value?.length === 7) {
        this.submitVerificationCode(value);
      }
    });
  }
  goBackToAuthPage() {
    throw new Error('Method not implemented.');
  }

  CodeForm = new FormGroup({
    code: new FormControl(''),
});

maskCode: MaskitoOptions = {
    mask: [
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
    ],
};


submitVerificationCode(value: string) {
  const code = value;
  // Убедитесь, что верификационный код передается в теле запроса
  console.log("phoneNumber:", this.phoneNumber);
  console.log("code:", code);
  this.apiService.checkCode({ phoneNumber: this.phoneNumber, verifCode: code }).subscribe(
    response => {
      console.log(response);
      if (response.message === 'User registered successfully') {
        // Пользователь успешно зарегистрирован, выполните необходимые действия
        this.loading = true;
        console.log('User registered successfully!', response);

        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }, 3000);
        this.success = true
        this.cdr.detectChanges();
        this.CodeSubmitted = true;
        console.log('Code submitted!', this.CodeSubmitted);
        this.cdr.detectChanges();
      } else if (response.message === 'User already registered') {
        this.authService.setAuthToken(response.token);
        console.log('response.token =>', response.token);
        this.router.navigate(['/main']); // Или на другой маршрут
      } else if (response.message === 'User data incomplete'){
        // Пользователь успешно зарегистрирован, выполните необходимые действия
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }, 3000);
        this.success = true
        this.cdr.detectChanges();
        this.CodeSubmitted = true;
        console.log('Code submitted!', this.CodeSubmitted);
        this.cdr.detectChanges();
      }
    },
    error => {
      console.error(error);
      // Обработка ошибки
      if (error.status === 400) {
        // Ошибка неверного кода
        this.errorCode = true
        this.CodeForm.reset(); // Сбросить состояние ввода кода
      } else {
        // Другая ошибка|
        this.errorCodeFuck = true
        this.CodeForm.reset(); // Сбросить состояние ввода кода
      }
    }
  );

  }



}

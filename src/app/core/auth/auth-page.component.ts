import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertService, tuiCheckboxOptionsProvider, TuiRootModule, TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { ApiService } from '../services/apiService/api.service';
import { Router } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/AuthService/auth-service.service';

  @Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TuiDestroyService,
        tuiCheckboxOptionsProvider({
            appearances: {
                unchecked: 'color-test',
                checked: 'color-test',
                indeterminate: 'color-test',
            },
        }),
    ],
    standalone: true,
    imports: [
        TuiRootModule,
        NgIf,
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiButtonModule,
        TuiLoaderModule,
        VerificationComponent,
    ],
})
  export class AuthPageComponent implements OnInit {
    loading = false;
    formSubmitted = false;
    hideButton = false;

    constructor(
      private router: Router,
      private cdr: ChangeDetectorRef,
      private apiService: ApiService,
      private authService: AuthService
    ) {}

    ngOnInit(): void {
      console.log('Form', this.formSubmitted);

// попытка 1 токен

      const token = this.authService.getAuthToken();
      console.log('token =>', token);

    }

    PhoneForm = new FormGroup({
      phonenumber: new FormControl('+', [
        Validators.required,
        Validators.pattern(/^\+?\d+$/), // Регулярное выражение для проверки номера телефона
        Validators.minLength(12), // Минимальная длина номера телефона (включая символ '+')
      ]),
    });

    SignedIn = new FormGroup({
      signedin: new FormControl(true),

  });


  submitForm() {
    if (this.PhoneForm.valid) {
      this.loading = !this.loading;

      console.log('Form submitted!', this.PhoneForm.value);
      setTimeout(() => {
        this.formSubmitted = true;
        console.log('Form submitted!', this.formSubmitted);
        this.cdr.detectChanges(); // Trigger change detection in Angular


        const phoneNumber = this.PhoneForm.get('phonenumber')?.value;

        this.apiService.verificationCode({ phoneNumber }).subscribe(
          (response) => {
            console.log('Verification code sent successfully:', response);
          },
          (error) => {
            console.error('Failed to send verification code:', error);
          }
        );
      }, 1000);
    }
  }

  onPhoneNumberInput(): void {
    const phoneNumber = this.PhoneForm.get('phonenumber')?.value;
console.log("PHONE", phoneNumber);
    if (phoneNumber && phoneNumber.length > 11) {
      this.hideButton = false;
    } else {
      this.hideButton = true;
    }
    this.cdr.detectChanges(); // Заставляем Angular проверить изменения
  }
  }

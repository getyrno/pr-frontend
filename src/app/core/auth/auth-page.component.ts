import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertService, tuiCheckboxOptionsProvider, TuiRootModule, TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
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
  styleUrls: ['./auth-page.component.scss'],
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
  PhoneForm: FormGroup;
  SignedIn: FormGroup;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.PhoneForm = new FormGroup({
      phonenumber: new FormControl('+', [
        Validators.required,
        Validators.pattern(/^\+?\d+$/), // Регулярное выражение для проверки номера телефона
        Validators.minLength(12), // Минимальная длина номера телефона (включая символ '+')
      ]),
    });

    this.SignedIn = new FormGroup({
      signedin: new FormControl(true),
    });
  }

  ngOnInit(): void {
    console.log('Form', this.formSubmitted);

    const token = this.authService.getAuthToken();
    console.log('token =>', token);
  }

  submitForm(): void {
    if (this.PhoneForm.valid) {
      this.loading = true;
      console.log('Form submitted!', this.PhoneForm.value);

      const phoneNumber = this.PhoneForm.get('phonenumber')?.value;

      this.apiService.verificationCode({ phoneNumber }).subscribe(
        (response) => {
          console.log('Verification code sent successfully:', response);
          this.formSubmitted = true;
          this.loading = false;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Failed to send verification code:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      );
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
    this.cdr.detectChanges();
  }
}

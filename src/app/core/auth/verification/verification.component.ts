import { ApiService } from '../../services/apiService/api.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoOptions } from '@maskito/core';
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
  styleUrls: ['./verification.component.scss'],
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
  @Input() phoneNumber!: string; // Используем оператор утверждения non-null assertion
  CodeSubmitted = false;
  CodeForm: FormGroup;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.CodeForm = new FormGroup({
      code: new FormControl(''),
    });
  }

  ngOnInit() {
    // Подписка на изменения в форме ввода кода
    this.CodeForm.get('code')?.valueChanges.subscribe((value: string | null) => {
      // Если введено 7 символов, отправляем запрос на сервер
      if (value?.length === 7) {
        this.submitVerificationCode(value);
      }
    });
  }

  goBackToPhoneNumber() {
    throw new Error('Method not implemented.');
  }

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
    console.log("Submitting verification code:", code);
    console.log("Phone number:", this.phoneNumber);
    this.apiService.checkCode({ phoneNumber: this.phoneNumber, verifCode: code }).subscribe(
      response => {
        console.log("Server response:", response);
        if (response.message === 'User registered successfully') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 3000);
          this.success = true;
          this.CodeSubmitted = true;
          this.cdr.detectChanges();
        } else if (response.message === 'User already registered') {
          this.authService.setAuthToken(response.token);
          this.router.navigate(['/main']);
        } else if (response.message === 'User data incomplete') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 3000);
          this.success = true;
          this.CodeSubmitted = true;
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error("Error response from server:", error);
        if (error.status === 400) {
          this.errorCode = true;
          this.CodeForm.reset();
        } else {
          this.errorCodeFuck = true;
          this.CodeForm.reset();
        }
      }
    );
  }
}

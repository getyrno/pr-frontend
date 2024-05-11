import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/apiService/api.service';
import { Router } from '@angular/router';
import { TuiAlertService, TuiPrimitiveTextfieldModule, TuiButtonModule, TuiAlertModule } from '@taiga-ui/core';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { NgIf, NgFor } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { AuthService } from '../../services/AuthService/auth-service.service';

@Component({
    selector: 'app-profile-creation',
    templateUrl: './profile-creation.component.html',
    styleUrl: './profile-creation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiButtonModule,
        NgIf,
        TuiLoaderModule,
        TuiAlertModule,
        NgFor,
    ],
})
export class ProfileCreationComponent implements OnInit {
  @Input() phoneNumber!: string | undefined;
  ProfileForm!: FormGroup;
  loading = false;
  formSubmitted = false;
  errorMessages: string[] = [];
  show = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log("phoneNumber:", this.phoneNumber);
    this.initForm();
  }

  private initForm(): void {
    this.ProfileForm = this.fb.group({
      username: ['', Validators.required],
      phone: [{ value: this.phoneNumber, disabled: true }],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.ProfileForm.valid && this.passwordMatchValidator()) {
      this.loading = true;
      console.log('Form submitted!', this.ProfileForm.value);

      const userData = {
        username: this.ProfileForm.get('username')?.value,
        phone: this.ProfileForm.get('phone')?.value,
        email: this.ProfileForm.get('email')?.value,
        password: this.ProfileForm.get('password')?.value,
      };

      this.apiService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully!', response);
          this.loading = false;
          this.formSubmitted = true;
          this.cdr.detectChanges();
          this.authService.setAuthToken(response.token);
          console.log('response.token =>', response.token);
          this.router.navigate(['/main']); // Или на другой маршрут
        },
        error: (error) => {
          console.error('Failed to register user:', error);
          // Handle registration error
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.errorMessages = this.collectErrorMessages();
    }
  }

  private collectErrorMessages(): string[] {
    const messages: string[] = [];
    Object.keys(this.ProfileForm.controls).forEach((key: string) => {
      const control = this.ProfileForm.get(key);
      if (control?.errors) {
        console.log("error:", control?.errors);

        Object.keys(control.errors).forEach((errorKey: string) => {
          console.log("errorKey:", errorKey);
          this.show = true;
          messages.push(this.getErrorMessage(key, errorKey));
        });
      }
    });
    return messages;
  }

  getErrorMessage(controlName: string, errorKey: string): string {
    const errorMessages: { [key: string]: string } = {
      'username.required': 'Username is required.',
      'email.required': 'Email is required.',
      'email.email': 'Invalid email format.',
      'password.required': 'Password is required.',
      'confirmPassword.required': 'Confirm password is required.'
    };
    return errorMessages[`${controlName}.${errorKey}`];
  }

  private passwordMatchValidator(): boolean {
    const password = this.ProfileForm.get('password')?.value;
    const confirmPassword = this.ProfileForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  passwordStrengthValidator(control: FormControl) {
    if (control.value.match(/[a-zA-Z]/) && control.value.match(/[0-9]/)) {
      return null;
    } else {
      return { weakPassword: true };
    }
  }
}

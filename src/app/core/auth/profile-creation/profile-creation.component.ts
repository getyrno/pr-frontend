import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/apiService/api.service';
import { Router } from '@angular/router';
import { TuiAlertService, TuiPrimitiveTextfieldModule, TuiButtonModule, TuiAlertModule } from '@taiga-ui/core';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { NgIf, NgFor } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';

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
  @Input() phoneNumber!: string | undefined; // Declare phoneNumber input property
  ProfileForm!: FormGroup; // Declare ProfileForm property
  loading = false;
  formSubmitted = false;
  show = false;
  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
  ) {}



  ngOnInit(): void {
    console.log("phoneNumber:", this.phoneNumber);
    this.ProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      phone: new FormControl({value: this.phoneNumber, disabled: true}),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  submitForm(): void {
    if (this.ProfileForm.valid) {
      this.loading = true;
      console.log('Form submitted!', this.ProfileForm.value);

      const userData = {
        username: this.ProfileForm.get('username')?.value,
        phone: this.ProfileForm.get('phone')?.value,
        email: this.ProfileForm.get('email')?.value,
        password: this.ProfileForm.get('password')?.value
      };

      this.apiService.registerUser(userData).subscribe(
        (response) => {
          console.log('User registered successfully!', response);
          this.router.navigate(['/main']); // Или на другой маршрут
        },
        (error) => {
          console.error('Failed to register user:', error);
          // Можно обработать ошибку регистрации
        }
      );

      // Остальной код для симуляции API-вызова и обновления состояния компонента
      setTimeout(() => {
        this.loading = false;
        this.formSubmitted = true;
        this.cdr.detectChanges();
      }, 3000);
    } else {
      // Clear previous error messages
      this.errorMessages = [];

      // Collect error messages for each form control
      Object.keys(this.ProfileForm.controls).forEach((key: string) => {
        const control = this.ProfileForm.get(key);
        if (control?.errors) {
          Object.keys(control.errors).forEach((errorKey: string) => {
            this.errorMessages.push(this.getErrorMessage(key, errorKey));
          });
        }
      });
    }
  }


  getErrorMessage(controlName: string, errorKey: string): string {
    const errorMessages: { [key: string]: string } = {
      'username.required': 'Username is required.',
      'email.required': 'Email is required.',
      'email.email': 'Invalid email format.',
      'passwords.password.required': 'Password is required.',
      'passwords.confirmPassword.required': 'Confirm password is required.'
    };
    this.show = true
    return errorMessages[`${controlName}.${errorKey}`] || 'Unknown error.';
}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  passwordStrengthValidator(control: FormControl) {
    if (control.value.match(/[a-zA-Z]/) && control.value.match(/[0-9]/)) {
      return null;
    } else {
      return { weakPassword: true };
    }
  }




}

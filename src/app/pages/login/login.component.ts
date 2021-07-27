import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth/auth.service';
import { IMAGES_ROUTES } from '../../data/constants/routes/images.routes';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private isValidEmail = /\S+@\S+\.\S+/;

  public $imagesRoutes = IMAGES_ROUTES;
  public backgroundStyle: any;

  private destroy$ = new Subject<any>();

  hide = true;

  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.backgroundStyle = {
      backgroundImage: `url(${this.$imagesRoutes.BACKGROUND_LOGIN})`,
    };
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;

    this.authService
      .login(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('/incident');
        }
      });
  }

  getErrorMessage(field: string): string {
    let message: string = '';
    if (this.loginForm.get(field)?.hasError('required')) {
      message = 'Nesecitamos este dato para continuar';
    } else if (this.loginForm.get(field)?.hasError('pattern')) {
      message = 'Correo inválido';
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      message = 'Este campo requiere mínimo 8 caracteres';
    }
    return message;
  }

  isValidField(field: string): boolean | any {
    return (
      (this.loginForm.get(field)?.touched ||
        this.loginForm.get(field)?.dirty) &&
      !this.loginForm.get(field)?.valid
    );
  }
}

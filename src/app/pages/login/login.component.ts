import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { IMAGES_ROUTES } from '../../data/constants/routes/images.routes';
import { Subject } from 'rxjs';
import { UserFormTemplate } from '@app/shared/utils/user-form-template';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public $imagesRoutes = IMAGES_ROUTES;
  public backgroundStyle: any;

  private destroy$ = new Subject<any>();

  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    public loginForm: UserFormTemplate
  ) {
    this.backgroundStyle = {
      backgroundImage: `url(${this.$imagesRoutes.BACKGROUND_LOGIN})`,
    };
  }

  ngOnInit(): void {
    this.loginForm.baseForm.get('name')?.setValidators(null);
    this.loginForm.baseForm.get('name')?.updateValueAndValidity();
    this.loginForm.baseForm.get('lastName')?.setValidators(null);
    this.loginForm.baseForm.get('lastName')?.updateValueAndValidity();
    this.loginForm.baseForm.get('idType')?.setValidators(null);
    this.loginForm.baseForm.get('idType')?.updateValueAndValidity();
    this.loginForm.baseForm.get('idNumber')?.setValidators(null);
    this.loginForm.baseForm.get('idNumber')?.updateValueAndValidity();
    this.loginForm.baseForm.get('address')?.setValidators(null);
    this.loginForm.baseForm.get('address')?.updateValueAndValidity();
    this.loginForm.baseForm.get('phoneNumber')?.setValidators(null);
    this.loginForm.baseForm.get('phoneNumber')?.updateValueAndValidity();
    this.loginForm.baseForm.get('position')?.setValidators(null);
    this.loginForm.baseForm.get('position')?.updateValueAndValidity();
    this.loginForm.baseForm.get('role')?.setValidators(null);
    this.loginForm.baseForm.get('role')?.updateValueAndValidity();
    this.loginForm.baseForm.get('status')?.setValidators(null);
    this.loginForm.baseForm.get('status')?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }
    const formValue = this.loginForm.baseForm.value;

    this.authService
      .login(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('');
          //this.loginForm.baseForm.reset();
        }
        this.loginForm.baseForm.reset();
      });
  }



  getErrorMessage(field: string): string {
    return this.loginForm.getErrorMessage(field);
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}

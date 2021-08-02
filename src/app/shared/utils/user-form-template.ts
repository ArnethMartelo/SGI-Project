import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserFormTemplate {
  private isValidEmail = /\S+@\S+\.\S+/;
 
  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    idType: ['', [Validators.required]],
    idNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    position: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', [Validators.required]],
  });

  isValidField(field: string): boolean | any {
    return (
      (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty) &&
      !this.baseForm.get(field)?.valid
    );
  }

  getErrorMessage(field: string): string {
    let message: string = '';
    if (this.baseForm.get(field)?.hasError('required')) {
      message = 'Nesecitamos este dato para continuar';
    } else if (this.baseForm.get(field)?.hasError('pattern')) {
      message = 'Correo inválido';
    } else if (this.baseForm.get(field)?.hasError('minlength')) {
      message = 'Este campo requiere mínimo 8 caracteres';
    }
    return message;
  }
}

//const { errors } = this.baseForm.get(field);
// if (errors) {
//   const minlength = errors?.minlength?.requiredLength
//   const messages = {
//     required:'Nesecitamos este dato para continuar',
//     pattern:'Correo inválido',
//     minlength:'Este campo requiere mínimo 8 caracteres'
//   }
//   const errorKey = Object.keys(errors).find(Boolean)||{};
//   this.errorMessage = messages[errorKey];
//}

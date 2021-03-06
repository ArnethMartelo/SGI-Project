import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from '../users-service/users.service';
import { UserFormTemplate } from '@shared/utils/user-form-template';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

enum Action {
  UPDATE = 'update',
  CREATE = 'create',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  actionTODO = Action.CREATE;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: UserFormTemplate,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('_id')) {
      console.log('edit');
      this.actionTODO = Action.UPDATE;
      this.data.title = 'Actualizar usuario';
      this.data.icon = 'manage_accounts';
      this.showPasswordField = false;
      this.userForm.baseForm.get('password')?.setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.patchFormData();
    }
    this.userForm.baseForm.reset();
  }

  onSave() {
    const formValue = this.userForm.baseForm.value;
    if (this.actionTODO === Action.CREATE) {
      this.usersService
        .create(formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log('new ->', res);
        });
      this.userForm.baseForm.reset();
    } else {
      //edit
      const userId = this.data?.user?._id;
      this.usersService
        .update(userId, formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log('update ->', res);
        });
      this.userForm.baseForm.reset();
    }
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private patchFormData(): void {
    this.userForm.baseForm.patchValue({
      name: this.data?.user?.name,
      lastName: this.data?.user?.lastName,
      idType: this.data?.user?.idType,
      idNumber: this.data?.user?.idNumber,
      address: this.data?.user?.address,
      phoneNumber: this.data?.user?.phoneNumber,
      email: this.data?.user?.email,
      position: this.data?.user?.position,
      role: this.data?.user?.role,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

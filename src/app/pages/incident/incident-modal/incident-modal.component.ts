import { Subject } from 'rxjs';
import { AuthService } from '@app/pages/auth/auth-service/auth.service';
import { UsersService } from '@app/pages/admin/users/users-service/users.service';
import { IncidentService } from '../incident-service/incident.service';
import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

enum Action {
  UPDATE = 'update',
  CREATE = 'create',
}

interface IncidentType {
  value: string;
  viewValue: string;
}
interface IncidentSite {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-incident-modal',
  templateUrl: './incident-modal.component.html',
  styleUrls: ['./incident-modal.component.css'],
})
export class IncidentModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  actionToDo = Action.CREATE;
  consecutivo: number = 1;

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  types: IncidentType[] = [
    { value: 'Tránsito', viewValue: 'Tránsito' },
    { value: 'Deportivo', viewValue: 'Deportivo' },
    { value: 'Violencia', viewValue: 'Violencia' },
    { value: 'Doméstico', viewValue: 'Doméstico' },
    { value: 'Propio del trabajo', viewValue: 'Propio del trabajo' },
  ];

  sites: IncidentSite[] = [
    { value: 'Empresa', viewValue: 'Empresa' },
    { value: 'Calle', viewValue: 'Calle' },
    { value: 'Casa', viewValue: 'Casa' },
  ];
  private isValidEmail = /\S+@\S+\.\S+/;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private incidentService: IncidentService,
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  incidentForm = this.fb.group({
    victim_id: ['', [Validators.required]],
    name: [{ value: '', disabled: true }, Validators.required],
    lastName: [{ value: '', disabled: true }, Validators.required],
    idType: [{ value: '', disabled: true }, Validators.required],
    idNumber: ['', [Validators.required]],
    address: [{ value: '', disabled: true }, Validators.required],
    phoneNumber: [{ value: '', disabled: true }, Validators.required],
    email: [
      { value: '', disabled: true },
      Validators.required,
      Validators.pattern(this.isValidEmail),
    ],
    position: [{ value: '', disabled: true }, Validators.required],

    serial: ['', [Validators.nullValidator]],
    site: ['', [Validators.required]],
    type: ['', [Validators.required]],
    date: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(0)]],
    deadly: ['', [Validators.required]],

    informer_id: ['', [Validators.required]],
    informer_name: [{ value: '', disabled: true }, Validators.required],
    informer_idType: [{ value: '', disabled: true }, Validators.required],
    informer_lastName: [{ value: '', disabled: true }, Validators.required],
    informer_idNumber: [{ value: '', disabled: true }, Validators.required],
    informer_phoneNumber: [{ value: '', disabled: true }, Validators.required],
    informer_position: [{ value: '', disabled: true }, Validators.required],
  });

  ngOnInit(): void {
    if (this.data?.incident.hasOwnProperty('_id')) {
      this.actionToDo = Action.UPDATE;
      this.data.title = 'Actualizar incidente';
      this.data.icon = 'published_with_changes';
      this.patchFormData();
    } else {
      this.addSerial();
      this.patchDataInformer();
    }
  }

  onSave(): void {
    const formValue = this.incidentForm.value;
    if (this.actionToDo === Action.CREATE) {
      this.incidentService
        .create(formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log('new ->', res);
        });
    } else {
      //edit;
      const incidentId = this.data.incident._id;
      this.incidentService
        .update(incidentId, formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log('update->', res);
        });
    }
  }

  private addSerial(): void {
    this.incidentService
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (!data) {
          this.consecutivo = 1;
          this.incidentForm.patchValue({
            serial: this.consecutivo,
          });
        } else {
          const incidents = data;
          for (let incident of incidents) {
            if (this.consecutivo < incident.serial)
              this.consecutivo = incident.serial;
            this.consecutivo++;
          }
          this.incidentForm.patchValue({
            serial: this.consecutivo,
          });
        }
      });
  }

  private patchDataInformer(): void {
    this.usersService
      .search(this.authService.userValue.idNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.incidentForm.patchValue({
          informer_id: data._id,
          informer_name: data.name,
          informer_idType: data.idType,
          informer_lastName: data.lastName,
          informer_idNumber: data.idNumber,
          informer_phoneNumber: data.phoneNumber,
          informer_position: data.position,
        });
      });
  }

  private patchFormData(): void {

    this.incidentForm.patchValue({

      victim_id: this.data?.incident?.victim_id?._id,
      name: this.data?.incident?.victim_id?.name,
      lastName: this.data?.incident?.victim_id?.lastName,
      idType: this.data?.incident?.victim_id?.idType,
      idNumber: this.data?.incident?.victim_id?.idNumber,
      address: this.data?.incident?.victim_id?.address,
      phoneNumber: this.data?.incident?.victim_id?.phoneNumber,
      email: this.data?.incident?.victim_id?.email,
      position: this.data?.incident?.victim_id?.position,
      serial: this.data?.incident?.serial,
      site: this.data?.incident?.site,
      type: this.data?.incident?.type,
      date: this.data?.incident?.date,
      description: this.data?.incident?.description,
      deadly: this.data?.incident?.deadly,
      informer_id: this.data?.incident?.informer_id?._id,
      informer_name: this.data?.incident?.informer_id?.name,
      informer_idType: this.data?.incident?.informer_id?.idType,
      informer_lastName: this.data?.incident?.informer_id?.lastName,
      informer_idNumber: this.data?.incident?.informer_id?.idNumber,
      informer_phoneNumber: this.data?.incident?.informer_id?.phoneNumber,
      informer_position: this.data?.incident?.informer_id?.position,
    });
  }

  checkField(field: string): boolean | any {
    return (
      (this.incidentForm.get(field)?.touched ||
        this.incidentForm.get(field)?.dirty) &&
      !this.incidentForm.get(field)?.valid
    );
  }

  getErrorMessage(field: string): string {
    let message: string = '';
    if (this.incidentForm.get(field)?.hasError('required')) {
      message = 'Nesecitamos este dato para continuar';
    } else if (this.incidentForm.get(field)?.hasError('pattern')) {
      message = 'Correo inválido';
    } else if (this.incidentForm.get(field)?.hasError('minlength')) {
      message = 'Este campo requiere mínimo 200 caracteres';
    }
    return message;
  }

  search() {
    this.usersService
      .search(this.incidentForm.controls.idNumber.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);

        this.incidentForm.patchValue({
          victim_id: data._id,
          name: data.name,
          lastName: data.lastName,
          idType: data.idType,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          position: data.position,
        });
      });
  }

  ngOnDestroy(): void {


  }
}

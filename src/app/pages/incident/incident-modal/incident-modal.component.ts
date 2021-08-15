import { UserFormTemplate } from './../../../shared/utils/user-form-template';
import { UsersService } from './../../../shared/services/users.service';
import { IncidentService } from '../incident-service/incident.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

enum Action {
  UPDATE = 'update',
  CREATE = 'create',
}

interface IncidentType {
  value: string;
  viewValue: string;
}
interface Site {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-incident-modal',
  templateUrl: './incident-modal.component.html',
  styleUrls: ['./incident-modal.component.css'],
})
export class IncidentModalComponent implements OnInit {
  actionToDo = Action.CREATE;

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
  incidentTypes: IncidentType[] = [
    { value: 'transito-0', viewValue: 'Tránsito' },
    { value: 'deportivo-1', viewValue: 'Deportivo' },
    { value: 'violencia-2', viewValue: 'Violencia' },
    { value: 'trabajo-4', viewValue: 'Propio del trabajo' },
  ];

  sites: Site[] = [
    { value: 'empresa-0', viewValue: 'Empresa' },
    { value: 'calle-1', viewValue: 'Calle' },
    { value: 'casa-2', viewValue: 'Casa' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private incidentService: IncidentService,
    private fb: FormBuilder
  ) {}

  incidentForm = this.fb.group({
    serial: ['', [Validators.required]],
    site: ['', [Validators.required]],
    type: ['', [Validators.required]],
    date: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(200)]],
    deadly: ['', [Validators.required]],
  });
  site = new FormControl();
  siteOptions: string[] = [
    'Cédula de ciudadanía',
    'Pasaporte',
    'Tarjeta de identidad',
    'Cédula de extranjería',
  ];
  type = new FormControl();
  typeOptions: string[] = [
    'Cédula de ciudadanía',
    'Pasaporte',
    'Tarjeta de identidad',
    'Cédula de extranjería',
  ];
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this._filter(this.site, this.siteOptions);
  }

  private _filter(field: FormControl, options:string[]): void {
    this.filteredOptions = field.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const filterValue = value.toLowerCase();
        return options.filter((option) =>
          option.toLowerCase().includes(filterValue)
        );
      })
    );
  }


  onSave(): void {
    const formValue = this.incidentForm.value;
    if (this.actionToDo === Action.CREATE) {
      this.incidentService.create(formValue).subscribe((res) => {
        console.log('new', res);
      });
      // }
      // else {
      //   //edit
      //   const incidentId = this.data.?incident?._id;
      //   this.incidentService.update(incidentId, formValue).subscribe((res) => {
      //     console.log('update', res);
      //   });
    }
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

  onSearch() {
    // this.usersService.search(this.idNumber.value).subscribe((data) => {
    //   console.log(this.idNumber.value)
    //   this.userForm.baseForm.patchValue({
    //     name: data.name,
    //     lastName: data.lastName,
    //     idType: data.idType,
    //     address: data.address,
    //     phoneNumber: data.phoneNumber,
    //     email: data.email,
    //     position: data.position,
    // });
    // });
  }
}

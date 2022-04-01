import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { citas } from 'app/shared/config/routeApi.config';
import { IResponseModel } from 'app/shared/models/response/response.model';
import { AppNotificationsService } from 'app/shared/services/app-notifications.service';
import { BackService } from 'app/shared/services/back.service';
import { UserService } from 'app/core/user/user.service';
import { citaModel } from 'app/shared/models/citas/citas.model';
import { mapperCita } from 'app/shared/mappers/cita.mappers';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-update-cita',
  templateUrl: './update-cita.component.html',
  styleUrls: ['./update-cita.component.scss']
})
export class UpdateCitaComponent implements OnInit {
  citaForm: FormGroup;
  tipoCita: citaModel;
  private id;
  private user:User;
  textoEstado: string = 'Activo';

  constructor(
    private _matDialogref: MatDialogRef<UpdateCitaComponent>,
    private _formBuilder: FormBuilder,
    private _appNotificationsService: AppNotificationsService,
    private _backService: BackService,
    private _userService: UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.tipoCita = mapperCita(data);
    this.buildForm();
  }

  ngOnInit(): void {
    this._userService.user$
    .subscribe((user: User) => {
        this.user = user;
    });
  }

  buildForm() {
    this.textoEstado = this.tipoCita.estado ? 'Activo':'Inactivo';
    this.citaForm = this._formBuilder.group({
      nombre: [this.tipoCita.nombre, [Validators.required]],
      descripcion: [this.tipoCita.descripcion],
      duracion: [this.tipoCita.duracion, [Validators.required]],
      color: [this.tipoCita.color, [Validators.required]],
      estado: [this.tipoCita.estado]
    });
  }

  save() {
    console.log("🚀 ~ file: update-cita.component.ts ~ line 59 ~ UpdateCitaComponent ~ save ~ this.citaForm.value", this.citaForm.value)
    const body = {
      ...this.citaForm.value,
      actualizador_id: this.user.name
    };
    this._backService.update(citas, body, this.id).subscribe((response: IResponseModel) => {
      if (response.state) {
        this._appNotificationsService.editSuccess(response.desc);
        this._matDialogref.close();
      } else {
        this._appNotificationsService.errorNotification(response.desc);
      }
    }, (error) => {
      this._appNotificationsService.errorNotification(error.error.message, 'Error', error.error.code);
    });
  }

  toggle(event) {
    this.textoEstado = event.checked ? 'Activo':'Inactivo';
  }
}

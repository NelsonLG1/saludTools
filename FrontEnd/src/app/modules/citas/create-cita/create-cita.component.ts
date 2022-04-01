import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { citas } from 'app/shared/config/routeApi.config';
import { IResponseModel } from 'app/shared/models/response/response.model';
import { AppNotificationsService } from 'app/shared/services/app-notifications.service';
import { BackService } from 'app/shared/services/back.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.scss']
})
export class CreateCitaComponent implements OnInit {
  citaForm: FormGroup;
  private user: User;

  constructor(
    private _matDialogref: MatDialogRef<CreateCitaComponent>,
    private _formBuilder: FormBuilder,
    private _appNotificationsService: AppNotificationsService,
    private _backService: BackService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.citaForm = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      duracion: [0, [Validators.required]],
      color: ['', [Validators.required]]
    });

    this._userService.user$
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  save() {
    const body = {
      ...this.citaForm.value,
      creador_id: this.user.name
    };
    this._backService.save(citas, body).subscribe((response: IResponseModel) => {
      if (response.state) {
        this._appNotificationsService.registerSuccess();
        this._matDialogref.close();
      } else {
        this._appNotificationsService.errorNotification(response.desc);
      }
    }, (error) => {
      this._appNotificationsService.errorNotification(error.error.message, 'Error', error.error.code);
    });
  }
}

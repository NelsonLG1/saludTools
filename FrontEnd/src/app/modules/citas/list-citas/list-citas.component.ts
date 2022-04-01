import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { citas } from 'app/shared/config/routeApi.config';
import { IActionModel } from 'app/shared/models/action/action.model';
import { IResponseModel } from 'app/shared/models/response/response.model';
import { IConfigTableModel } from 'app/shared/models/table/config.model';
import { AppNotificationsService } from 'app/shared/services/app-notifications.service';
import { BackService } from 'app/shared/services/back.service';
import { Observable } from 'rxjs';
import { CreateCitaComponent } from '../create-cita/create-cita.component';
import { DetailCitaComponent } from '../detail-cita/detail-cita.component';
import { UpdateCitaComponent } from '../update-cita/update-cita.component';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.scss']
})
export class ListCitasComponent implements OnInit {
  private user:User;

  add = () => {
    this._matDialog.open(CreateCitaComponent, { autoFocus: false })
      .afterClosed()
      .subscribe(() => {
        this.loadDataConfig();
      });
  }

  detail = (data: any) => {
    this._matDialog.open(DetailCitaComponent, { autoFocus: false, data: data });
  }

  edit = (data: any) => {
    this._matDialog.open(UpdateCitaComponent, { autoFocus: false, data: data })
      .afterClosed()
      .subscribe(() => {
        this.loadDataConfig();
      });
  }

  delete = (data:any) => {
    this.createDelete(data.id, data);
  }

  public actions: IActionModel[] = [
    { title: 'Ver Detalle', icon: 'mat_solid:remove_red_eye', action: this.detail },
    { title: 'Editar', icon: 'mat_solid:edit', action: this.edit },
    { title: 'Eliminar', icon: 'mat_solid:delete', action: this.delete }
  ];

  public configTable: IConfigTableModel = {
    title: "Tipos Citas",
    complementURL: citas,
    actionsDetail: {
      addButton: true,
      xlsButton: true,
      actionAdd: this.add
    },
    actions: this.actions,
    columnsHide: ['Creado por', 'Modificado por', 'Fecha Creación','Fecha Actualización'],
    columnsDisplay: []
  };

  config: Observable<IConfigTableModel> = new Observable<IConfigTableModel>(observer => {
    observer.next(this.configTable);
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _appNotificationsService: AppNotificationsService,
    private _backService: BackService,
    private _userService: UserService,
    private _fuseConfirmationService: FuseConfirmationService,

  ) { }

  ngOnInit(): void {
    this._userService.user$
    .subscribe((user: User) => {
        this.user = user;
    });
  }

  loadDataConfig() {
    this.config = new Observable<IConfigTableModel>(observer => {
      observer.next(this.configTable);
    });
  }

  createDelete(id, data) {
    const config = this._formBuilder.group({
      title: 'Eliminar',
      message: '¿Estás seguro que quieres eliminar el tipo de cita '+ data.Nombre + '?',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Si',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'No'
        })
      }),
      dismissible: true
    });
    this.openConfirmationDialog(config, id);
  }

  openConfirmationDialog(config, id:any): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(config.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      const body = { actualizador_id: this.user.name };
      if(result == 'confirmed') {
        this._backService.delete(citas, id, body).subscribe((response:IResponseModel) => {
          if (response.state) {
            this._appNotificationsService.deleteSuccess(response.desc);
            this.loadDataConfig();
          } else {
            this._appNotificationsService.errorNotification(response.desc);
          }
        }, (error)=>{
          this._appNotificationsService.errorNotification(error.error.desc, 'Error', error.error.code);
        });
      }
    });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { ListCitasComponent } from './list-citas/list-citas.component';
import { CreateCitaComponent } from './create-cita/create-cita.component';
import { DetailCitaComponent } from './detail-cita/detail-cita.component';
import { UpdateCitaComponent } from './update-cita/update-cita.component';


import { AppNotificationsService } from 'app/shared/services/app-notifications.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ListCitasComponent,
    CreateCitaComponent,
    DetailCitaComponent,
    UpdateCitaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,

    CitasRoutingModule
  ],
  providers: [
    AppNotificationsService
  ]
})
export class CitasModule { }

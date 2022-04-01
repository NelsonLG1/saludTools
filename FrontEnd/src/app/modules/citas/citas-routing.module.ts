import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createCita, homeCita } from 'app/shared/config/routeAPP.config';
import { CreateCitaComponent } from './create-cita/create-cita.component';
import { ListCitasComponent } from './list-citas/list-citas.component';

const routes: Routes = [
  {
    path: '',
    component: ListCitasComponent,
    data: {
      breadcrumbs: {
        path: homeCita,
        text: 'Listar tipos citas'
      },
    }
  },
  {
    path:'create',
    component: CreateCitaComponent,
    data: {
        breadcrumbs: {
            path: createCita,
            text: 'Crear tipo cita'
        },
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mapperCita } from 'app/shared/mappers/cita.mappers';
import { citaModel } from 'app/shared/models/citas/citas.model';

@Component({
  selector: 'app-detail-cita',
  templateUrl: './detail-cita.component.html',
  styleUrls: ['./detail-cita.component.scss']
})
export class DetailCitaComponent implements OnInit {
  tipoCita: citaModel;
  private id;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.tipoCita = mapperCita(data);
  }

  ngOnInit(): void {
  }

}

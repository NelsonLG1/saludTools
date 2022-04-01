import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { tableConfig } from 'app/shared/const/table.const';
import { Columns } from 'app/shared/helpers/columns';
import { selectColumns, mappersColumnsDisplay } from 'app/shared/helpers/helpers';
import { IActionModel } from 'app/shared/models/action/action.model';
import { IResponsesModel } from 'app/shared/models/response/responses.model';
import { IActionsModel, IConfigTableModel } from 'app/shared/models/table/config.model';
import { BackService } from 'app/shared/services/back.service';
// import { ModalService } from 'app/shared/services/modal.service';
import { Observable, Subject } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  imageDefault: string = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnsToDisplay: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  title: string = null;
  complementURL: string;
  actions: IActionModel[] = [];
  columnsHide: string[] = [];
  hideColumns: number[] = [];
  config: IConfigTableModel;
  @Input() configTable: Observable<IConfigTableModel>;
  public actionsDetail: IActionsModel = tableConfig.actionsDetail;
  breadcrumb = false;

  constructor(
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _backService: BackService,
    // private _modalService: ModalService
  ) { }

  ngOnChanges(): void {
    this._fuseSplashScreenService.show();
    if (this.configTable) {
      this.configTable.subscribe((response) => {
        this.config = response;
      })
    };

    if (this.config) {
      this.title = this.config.title;
      this.actions = this.config.actions;
      this.actionsDetail = this.config.actionsDetail;
      this.columnsHide = this.config.columnsHide;
      this.displayedColumns = this.columnsToDisplay = this.config.columnsDisplay;
      this.breadcrumb = this.actionsDetail ? true:false;
      if (this.config.breadcrumb != null && this.config.breadcrumb != undefined ) {
        this.breadcrumb = this.config.breadcrumb;
      }

      if (this.config.complementURL) {
        this.complementURL = this.config.complementURL;
        this.loadList();
      }
      else if (this.config.data) {
        if (this.config.data.length == 0) {
          this.displayedColumns = [' No hay datos para mostrar '];
        }
        this.loadDataTable(this.config.data);
        this._fuseSplashScreenService.hide();
      }
    }
    else {
      this.loadList();
    }
  }

  ngOnInit(): void {
  }

  loadList() {
    this._backService.lists(this.complementURL).subscribe((response: IResponsesModel) => {
      if (response.state) {
        if (response.data.length > 0) {
          this.loadDataTable(response.data);
        }
        else {
          this.displayedColumns = [' No hay datos para mostrar '];
        }
        this._fuseSplashScreenService.hide();
      } else {
        this.displayedColumns = [' No hay datos para mostrar '];
        this._fuseSplashScreenService.hide();
      }
    }, (error) => {
      this.displayedColumns = [' No hay datos para mostrar '];
      this._fuseSplashScreenService.hide();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDataTable(data: any) {
    const dataDisplay = mappersColumnsDisplay(data, this.actions);let newData = [];
    for (let index = 0; index < dataDisplay.length; index++) {
      const element = dataDisplay[index];
      const column = data[index];
      newData.push(Object.assign({}, element, column));
    }

    if (data.length > 0) {
      const columns = Object.keys(dataDisplay[0]);
      const orden = Object.values(Columns);
      this.displayedColumns = selectColumns(orden, this.columnsHide, this.columnsToDisplay);
      
      const indexHidden = this.displayedColumns.indexOf('Opciones');
      if (indexHidden >= 0) {
        this.hideColumns.push(indexHidden);
      }
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    this.displayedColumns = [];
  }
}

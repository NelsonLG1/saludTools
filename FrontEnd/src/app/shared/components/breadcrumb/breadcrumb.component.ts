import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBreadcrumb } from 'app/shared/models/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from 'app/shared/services/breadcrumb.service';
import { Subscription } from 'rxjs';
/**
 * Importa los Breadcumbs con los diseños de Bancolombia S.A.
 *
 * @export
 * @class BreadcrumbComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  /**
   * Lista de rutas padres e hijos.
   *
   * @type {IBreadcrumb[]}
   * @memberOf BreadcrumbComponent
   */
  breadcrumbs: IBreadcrumb[];

  /**
   * Variable que hereda de Subscription,
   * nos permite almacenar la suscripción al método crumbs$ del servicio BreadcrumbService.
   *
   * @private
   * @type {Subscription}
   * @memberOf BreadcrumbComponent
   */
  private subscription?: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) {}

  /**
   * Al iniciar el componente, inicializamos la variable “breadcrumbs”
   * asignándole lo que retorna el método getBreadcrumb().
   *
   * @memberOf BreadcrumbComponent
   */
  ngOnInit() {
    this.breadcrumbs = this.getBreadcrumb();
  }

  /**
   * Cancelar la suscripción, en el caso de estar suscrito a un servicio.
   *
   * @memberOf BreadcrumbComponent
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Se suscribe al método getter "crumbs$" del servicio BcBreadcrumbService,
   * para capturar la lista de rutas padres e hijos.
   *
   * @private
   * @returns {IBreadcrumb[]}
   *
   * @memberOf BreadcrumbComponent
   */
  private getBreadcrumb(): IBreadcrumb[] {
    let breadcrumbs: IBreadcrumb[];
    this.subscription = this.breadcrumbService.crumbs$.subscribe((crumds) => {
      breadcrumbs = crumds;
    });
    
    return breadcrumbs;
  }
}

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { template } from 'lodash';
import { IBreadcrumb } from 'app/shared/models/breadcrumb/breadcrumb.model';

@Injectable()
export class BreadcrumbsResover implements Resolve<IBreadcrumb[]> {
  /**
   * Método que resuelve la ruta actual.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<IBreadcrumb[]> | Promise<IBreadcrumb[]> | IBreadcrumb[])}
   *
   * @memberOf BreadcrumbsResover
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBreadcrumb[]> | Promise<IBreadcrumb[]> | IBreadcrumb[] {
    const data = route.routeConfig.data;
    const path = this.getFullPath(route);
    const rawText =
      typeof data.breadcrumbs === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || path;

    return of([
      {
        path,
        text: this.stringFormat(rawText, route.data),
      },
    ]);
  }

  /**
   * Método que captura la ruta completa.
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns {string}
   *
   * @memberOf BreadcrumbsResover
   */
  private getFullPath(route: ActivatedRouteSnapshot): string {
    const relativePath = (segments: UrlSegment[]) => segments.reduce((a, v) => (a += '/' + v.path), '');
    const fullPath = (routes: ActivatedRouteSnapshot[]) => routes.reduce((a, v) => (a += relativePath(v.url)), '');

    return fullPath(route.pathFromRoot);
  }

  /**
   * Método para formatear a String el texto que se mostrara en el Breadcrumb.
   *
   * @private
   * @param {string} templateString
   * @param {*} binding
   * @returns {string}
   *
   * @memberOf BreadcrumbsResover
   */
  private stringFormat(templateString: string, binding: any): string {
    const compiled = template(templateString, { interpolate: /{{(.+?)}}/ });
    return compiled(binding);
  }
}

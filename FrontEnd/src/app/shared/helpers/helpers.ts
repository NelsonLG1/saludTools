import { isArray } from "lodash";
import { IActionModel } from "../models/action/action.model";
import { Columns, Relations, ColumnsRelation, ColmunsArray } from "./columns";
import * as _ from 'underscore';
import { Router } from "@angular/router";


export const currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

export function mappersColumnsDisplay(data: Object[], actions?: IActionModel[]) {
    let columns = [];
    for (const item of data) {
        let obj = mapperColumnDisplay(item);
        if (actions && actions.length > 0) {
            obj['Opciones'] = actions;
        }
        columns.push(obj);
    }

    return columns;
}

export function mapperColumnDisplay(item: Object){
    let obj = {};
    const keys = Object.keys(item);
    for (const key of keys) {
        const isArrays = isArray(item[key]);
        if (isArrays) {
            obj[ColmunsArray[key]] = item[key].length;
        }
        else {
            if (Columns[key] || isId(key)) {
                if (isId(key)) {
                    const newkey = Relations[key];
                    if (newkey && item[newkey] && item[newkey].nombre) {
                        obj[ColumnsRelation[newkey]] = item[newkey].nombre;
                    }

                    if (Columns[key]){
                        obj[Columns[key]] = item[key];
                    }
                } else {
                    obj[Columns[key]] = item[key];
                }
            }
        }
    }

    return obj;

}

function isId(key: string) {
    return key.includes("id_");
}


export function deleteNullObject(object) {
    return _.omit(object, function (value) {
        return _.isNull(value) || _.isUndefined(value) || _.isNaN(value) || value === '' ;
    });
}

export function selectColumns(columns, hideColumns = [], columnsToDisplay = []): string[] {
    hideColumns.push('undefined', 'null');
    if (columns && columns.length <= 0) {
        columnsToDisplay.push(' No hay datos para mostrar ');
    }
    if (columnsToDisplay && columnsToDisplay.length > 0) {
        const intersectColumns = _.union(columnsToDisplay, columns);
        const columnsDisplay = _.difference(intersectColumns, hideColumns);
        return columnsDisplay;
    } else {
        const columnsDisplay = _.difference(columns, hideColumns);
        return columnsDisplay;
    }
}

export function goTo(_router: Router, path: string = 'dashboard') {
    _router.navigate([path]);
}



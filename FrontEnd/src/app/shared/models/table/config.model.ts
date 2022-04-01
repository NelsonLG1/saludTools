import { IActionModel } from "../action/action.model";

export interface IConfigTableModel {
    title:string;
    complementURL?: string;
    actions: IActionModel [];
    actionsDetail?: IActionsModel;
    columnsHide?: string[];
    columnsDisplay?: string[];
    data?:any;
    breadcrumb?:boolean
}

export interface IActionsModel {
    xlsButton:boolean;
    addButton:boolean;
    actionAdd:() => void;
}

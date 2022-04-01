export interface IActionModel {
    title:string;
    icon:string;
    path?:string;
    action?: (data?)=> void;
    column?:string;
    value?:any;
}
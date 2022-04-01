import { IConfigTableModel } from '../models/table/config.model';

export const tableConfig:IConfigTableModel = {
    title:'Dashboard',
    complementURL: 'dashboard',
    actions: [],
    actionsDetail: {
        addButton: true,
        xlsButton: true,
        actionAdd: () => {}
    },
    columnsHide: ['id','Fecha actualización', 'Fecha creación'],
    columnsDisplay:[],
    breadcrumb:true
}

export interface citaModel {
    _id:string;
    id:number;
    nombre: string;
    descripcion: string;
    color: string;
    duracion: number;
    estado: boolean;
    fechaCreacion: Date;
    ultimaActualizacion: Date;
    creador_id: string;
    actualizador_id: string;
}


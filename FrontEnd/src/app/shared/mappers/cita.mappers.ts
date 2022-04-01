import { citaModel } from "../models/citas/citas.model";


export function mapperCita (data: Object): citaModel {
    return {
        _id:data['_id'],
        id:data['id'],
        nombre: data['nombre'],
        descripcion: data['descripcion'],
        duracion: data['duracion'],
        color: data['color'],
        estado: data['estado'],
        fechaCreacion: data['fechaCreacion'],
        ultimaActualizacion: data['ultimaActualizacion'],
        creador_id: data['creador_id'],
        actualizador_id: data['actualizador_id'],
    }
}
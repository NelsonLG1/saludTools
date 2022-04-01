import { MongoLib } from "../lib/mongo";
import ManejoErrorService from "./manejoErrores-services";


class ComunService extends ManejoErrorService {
  private collection: string;
  private mongoDB: MongoLib;
  private mensaje: string;
  private returnData = new Object();
  constructor(Colletion: string, Mensaje?: string) {
    super();
    this.collection = Colletion;
    this.mensaje = Mensaje;
    this.mongoDB = new MongoLib();
  }

  async getFilter(query, select?, sort?, limit?, page?) {
    this.returnData = new Object();
    const entity = await this.mongoDB.getAll(this.collection, query, select, sort, limit, page);
    let datos = entity || [];
    this.returnData = this.respuestaOk(datos);
    return this.returnData;
  }

  async getById(id, select?) {
    this.returnData = new Object();
    const entity = await this.mongoDB.get(this.collection, id, select);
    let datos = entity || null;
    this.returnData = this.respuestaOk(datos);
    return this.returnData;
  }

  async getQuery(query, select?) {
    this.returnData = new Object();
    let entity = await this.mongoDB.getQuery(this.collection, query, select);
    let datos = entity || null;
    this.returnData = this.respuestaOk(datos);
    return this.returnData;
  }

  async create(datos) {
    this.returnData = new Object();

    const createId = await this.mongoDB.create(this.collection, datos);
    const objectCreated = await this.getById(datos.id);

    // En el caso de que el dato se guarde, devolvemos el objeto guardado
    if (objectCreated["data"] != null) {
      this.returnData = this.respuestaOk(objectCreated["data"], this.mensaje + " creado correctamente");
    } else {
      this.returnData = this.respuestaFail(createId.errmsg);
    }

    return this.returnData;
  }

  async update(id, datos, unset?) {
    this.returnData = new Object();
    if(id == null || id == undefined)
    {
      this.returnData = this.respuestaFail("Id no encontrado", 404);
      return this.returnData
    }
    const updatedId = await this.mongoDB.update(this.collection, id, datos, unset);
    const objectUpdated = await this.getById(id);

    // En el caso de que el usuario se guarde, devolvemos el objeto guardado
    if (objectUpdated["data"] != null) {
      this.returnData = this.respuestaOk(objectUpdated["data"], this.mensaje + " modificado correctamente");
    } else {
      this.returnData = this.respuestaFail(updatedId.errmsg);
    }

    return this.returnData;
  }

  async updateQuery(query, datos, unset?) {
    this.returnData = new Object();
    const updatedId = await this.mongoDB.updateQuery(this.collection, query, datos, unset);
    const objectUpdated = await this.getQuery(updatedId);
    // En el caso de que el usuario se guarde, devolvemos el objeto guardado
    if (objectUpdated["data"] != null) {
      this.returnData = this.respuestaOk(objectUpdated["data"], this.mensaje + " modificado correctamente");
    } else {
      this.returnData = this.respuestaFail(updatedId.errmsg);
    }

    return this.returnData;
  }  

  async delete(id) {
    this.returnData = new Object();
    const deletedId = await this.mongoDB.delete(this.collection, id);
    this.returnData = this.respuestaOk({}, this.mensaje + " eliminado correctamente");
    return this.returnData;
  }

  async deleteQuery(query) {
    this.returnData = new Object();
    const deletedId = await this.mongoDB.deleteQuery(this.collection, query);
    this.returnData = this.respuestaOk({}, this.mensaje + " eliminado correctamente");
    return this.returnData;
  }
}

export default ComunService;
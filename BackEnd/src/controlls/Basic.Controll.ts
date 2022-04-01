import * as express from 'express';
import ComunService from '../services/comun-service';
import Controller from '../models/controller.model';
import QueryModel from '../models/query.model';
import { UsuarioApp } from '../shared/constantes';
import { SecuenciaLib } from '../lib/secuencia';

class BasicController implements Controller {

    path: string;
    collection : string;
    router = express.Router();
    returnData: any;
    mensaje: string;
    error: boolean;
    private comunService: ComunService
    private secuencia: SecuenciaLib = new SecuenciaLib();

    constructor(collection, path, mensaje) {
        this.path = path;
        this.collection = collection;
        this.initializeRoutes();
        this.comunService = new ComunService(collection, mensaje);
    }

    private initializeRoutes() {
        this.router
            .get(`${this.path}`, this.getAll)
            .get(`${this.path}/:id`, this.getById)
            .post(`${this.path}`, this.create)
            .put(`${this.path}/:id`, this.update)
            .delete(`${this.path}/:id`, this.delete)
    }

    private getAll = async (req: express.Request, res: express.Response) => {
        this.returnData = new Array();
        
        let model = new QueryModel(req.query);
        let query: Object = model.getQuery();
        let select = model.getFields() || null;
        let sort = model.getSort();
        let limit = model.getLimit();
        let page = model.getPage();

        this.returnData = await this.comunService.getFilter(query, select, sort, limit, page);    
        return res.json(this.returnData);
    }

    private getById = async (req: express.Request, res: express.Response) => {
        this.returnData = new Object();
        let model = new QueryModel(req.query);
        let select = model.getFields() || null;
        this.returnData = await this.comunService.getById(req.params.id,select);
        return res.json(this.returnData);
    }

    private create = async (req: express.Request, res: express.Response) => {
        this.returnData = new Object();
        let model: any = this.audit(req.body, true);
        model.id = await this.secuencia.nextVal(this.collection);
        this.returnData = await this.comunService.create(model);
        return res.json(this.returnData);
    }

    private update = async (req: express.Request, res: express.Response) => {
        this.returnData = new Object();
        let model: any = this.audit(req.body, false);
        let id = Number(req.params.id);
        this.returnData = await this.comunService.update(id, model);
        return res.json(this.returnData);
    }

    private delete = async (req: express.Request, res: express.Response, next?: express.NextFunction) => {
        this.returnData = new Object();
        let id = Number(req.params.id);
        let state = false;
        let data = await this.comunService.getById(id);
        // cambio el estado lógico
        if (!data["data"].state) {
            state = true;
        }
        let model: any = this.audit({ state: state, actualizador_id: req.body.actualizador_id }, false);
        this.returnData = await this.comunService.update(id, model);
        return res.json(this.returnData);
    }

    private audit = (datos, opcion: boolean) => {
        let model: any = datos;
        if (opcion) {
            model["fechaCreacion"] = new Date();
            model["creador_id"] = datos.creador_id || UsuarioApp;
            model["estado"] = true;
            model["state"] = true;
        } else {
            model["ultimaActualizacion"] = new Date();
            model["actualizador_id"] = datos.actualizador_id || UsuarioApp;
        }

        return model;
    }
}

export default BasicController;
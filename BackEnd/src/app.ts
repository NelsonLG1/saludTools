import * as express from "express";
import * as bodyParser from "body-parser";
import Controller from './models/controller.model';
import { connectionDb } from "./shared/mongoDb";
import { UsuarioApp, PortApp } from "./shared/constantes";

const boxen = require('boxen');    //Crea cajas de texto en la terminal.
const cors = require('cors')

class App {
    public app: express.Application;
    private connection = connectionDb;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToTheDatabase();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        // this.app.use(cors());
        // Configurar cabeceras y cors
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }


    public listen() {
        this.app.listen(PortApp, () => {
            let message = UsuarioApp + " - Servidor iniciado en puerto " + PortApp;
            console.log(boxen(message, { borderColor: '#fcc203' }));
        })
    }

    public getServer() {
        return this.app;
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private async connectToTheDatabase() {
        await this.connection;
    }

}

export default App;
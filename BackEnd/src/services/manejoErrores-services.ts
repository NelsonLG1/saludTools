import { MongoLib } from "../lib/mongo";


class ManejoErrorService {
    private ack: object;
    private code: number;
    private desc: string;
    private state: boolean;
    private data: object;

    respuestaFail(mensaje?, codigo?) {
        this.state = false;
        this.code = codigo ? codigo : 400;
        this.desc = mensaje ? mensaje : "Error no controlado";

        this.ack = {
            code: this.code,
            desc: this.desc,
            state: this.state
        }

        return this.ack;
    }

    respuestaOk(datos, mensaje?) {
        this.data = datos;
        this.desc = mensaje ? mensaje : "Proceso ejecutado correctamente";
        this.code = 201;
        this.state = true;
        this.ack = {
            code: this.code,
            desc: this.desc,
            state: this.state,
            data: this.data
        }

        return this.ack;
    }

}


export default ManejoErrorService;



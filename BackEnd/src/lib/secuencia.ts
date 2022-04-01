import { MongoLib } from "./mongo";
import { SECUENCIAS } from "../shared/tablas";

export class SecuenciaLib {
    private mongoDB: MongoLib = new MongoLib();

    public async nextVal(name) {
        let ret = await this.mongoDB.findAndModify(SECUENCIAS.Tabla, name);
        if (ret) {
            return ret.value.seq;
        }
        return 0;
    }
}



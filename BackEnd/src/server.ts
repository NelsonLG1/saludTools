import BasicController from "./controlls/Basic.Controll";
import App from "./app";
import { CITAS } from "./shared/tablas";

const app = new App(
  [
    new BasicController(CITAS.Tabla,CITAS.Ruta,CITAS.Mensaje),
  ]
);


app.listen();
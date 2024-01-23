import app from "./app.js";
import { getConnection } from "./db/db.js";

getConnection();
app.listen(process.env.APP_PUERTO);
console.log(`Servidor conectado en el puerto ${process.env.APP_PUERTO}`);

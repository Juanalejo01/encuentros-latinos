import express from "express";
import morgan from "morgan";
import {} from "dotenv/config";

import eventosRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

/* RUTAS DE LOS ENPOINT */
app.use("/", eventosRoutes);

/* CAPTURA DE ERRORES PARA PAGINAS NO ENCONTRADAS */
app.use((req, res) => {
  res.status(404).send({
    status: "Error",
    mensaje: "Página no encontrada",
  });
});

/* CAPTURA DE ERRORES PERSONALIZADOS */
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "Error",
    mensaje: error.mensaje,
  });
});

export default app;

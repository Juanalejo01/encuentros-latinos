import { Router } from "express";
import {
  crearEvento,
  mostrarDetalleEvento,
  actualizarEvento,
  eliminarEvento,
  filtrarEventosByTematicaOrCiudad,
  allEventosByUser,
  eventoByUser,
} from "../controller/eventController.js";
import { authRequired } from "../middleware/validaToken.js";

const router = Router();

router.get("/evento/:id", mostrarDetalleEvento);
router.get("/eventos", filtrarEventosByTematicaOrCiudad);
router.post("/evento", authRequired, crearEvento);
router.put("/evento/:id", authRequired, actualizarEvento);
router.delete("/evento/:id", authRequired, eliminarEvento);

/* EVENTOS POR USUARIO */
router.get("/usuario", authRequired, allEventosByUser);
router.get("/usuario/:id", authRequired, eventoByUser);

export default router;

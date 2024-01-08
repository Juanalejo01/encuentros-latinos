import { Router } from "express";
import {
  crearEvento,
  mostrarEventos,
  mostrarDetalleEvento,
  actualizarEvento,
  eliminarEvento,
  filtrarEventosByTematicaOrCiudad,
} from "../controller/eventController.js";
import { authRequired } from "../middleware/validaToken.js";

const router = Router();

router.get("/eventos", mostrarEventos);
router.get("/evento/:id", mostrarDetalleEvento);
router.get("/eventos/:tematica/:ciudad", filtrarEventosByTematicaOrCiudad);
router.post("/evento/:id", authRequired, crearEvento);
router.put("/evento/:id/:user", authRequired, actualizarEvento);
router.delete("/evento/:id/:user", authRequired, eliminarEvento);

export default router;

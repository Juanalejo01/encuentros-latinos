import { Router } from "express";
import {
  crearEvento,
  mostrarDetalleEvento,
  actualizarEvento,
  eliminarEvento,
  filtrarEventosByTematicaOrCiudad,
} from "../controller/eventController.js";
import { authRequired } from "../middleware/validaToken.js";

const router = Router();

router.get("/evento/:id", mostrarDetalleEvento);
router.get("/eventos", filtrarEventosByTematicaOrCiudad);
router.post("/evento/:id", authRequired, crearEvento);
router.put("/evento/:id", authRequired, actualizarEvento);
router.delete("/evento/:id", authRequired, eliminarEvento);

export default router;

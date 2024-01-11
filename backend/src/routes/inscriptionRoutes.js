import { Router } from "express";
import { authRequired } from "../middleware/validaToken.js";
import {
  inscribirMe,
  desInscribirMe,
  mostrarInscritos,
} from "../controller/inscriptionController.js";

const router = Router();

router.get("/inscriptiones/:id", mostrarInscritos);
router.post("/inscription/:id", authRequired, inscribirMe);
router.delete("/inscription/:id", authRequired, desInscribirMe);

export default router;

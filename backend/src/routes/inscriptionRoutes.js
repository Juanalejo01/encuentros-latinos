import { Router } from "express";
import { authRequired } from "../middleware/validaToken.js";
import {
  inscribirMe,
  desInscribirMe,
  eventoInscrito,
} from "../controller/inscriptionController.js";

const router = Router();

router.get("/inscription", authRequired, eventoInscrito);
router.post("/inscription/:id", authRequired, inscribirMe);
router.delete("/inscription/:id", authRequired, desInscribirMe);

export default router;

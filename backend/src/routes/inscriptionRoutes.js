import { Router } from "express";
import { authRequired } from "../middleware/validaToken.js";
import { inscribirMe, desInscribirMe } from "../controller/inscriptionController.js";

const router = Router();

router.post("/inscription/:id", authRequired, inscribirMe);
router.delete("/inscription/:id", authRequired, desInscribirMe);

export default router;

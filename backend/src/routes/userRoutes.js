import { Router } from "express";
import {
  registerUser,
  getUserProfile,
  updateProfile,
  deleteProfile,
  loginUser,
  updateEmail,
  updatePassword,
} from "../controller/userController.js";
import { authRequired } from "../middleware/validaToken.js";

const router = Router();

router.post("/registro", registerUser);
router.post("/login", loginUser);
router.get("/perfil", authRequired, getUserProfile);
router.put("/perfil", authRequired, updateProfile);
router.put("/email", authRequired, updateEmail);
router.put("/password", authRequired, updatePassword);
router.delete("/perfil", authRequired, deleteProfile);

export default router;

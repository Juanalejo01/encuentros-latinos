import {Router} from 'express';
import { registerUser, getUserProfile, updateProfile, deleteProfile, loginUser } from '../controller/userController.js';
import { authRequired } from '../middleware/validaToken.js';


const router = Router();

router.post('/registro', registerUser);
router.post('/login', loginUser);
router.get('/perfil/:id', authRequired, getUserProfile);
router.put('/perfil/:id', authRequired, updateProfile);
router.delete('/perfil/:id', authRequired, deleteProfile);

export default router;

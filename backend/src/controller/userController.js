import { createUser, getUserById, updateUser, deleteUser, userLogindb } from '../db/userdb.js';
import bcrypt from 'bcryptjs';
import { createToken, validaPassword, generateError, subirImagen } from '../libs/helpers.js';

export const registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const usuario = {
            ...req.body,
            password: hashedPassword,
        };
        if (req.files?.avatar) {
            usuario.avatar = await subirImagen(req.files.avatar);
            
        }
        const userId = await createUser(usuario);
        res.status(200).json({ userId, mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await userLogindb(email); 
        await validaPassword(password, data.password);

        const token = await createToken({id: data.id}, "1d");
        res.status(200).json({
            mensaje: "Usuario logeado exitosamente", 
            token,
        });
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const usuario = await getUserById(userId);
        if (!usuario) {
            return next(generateError('Usuario no encontrado', 404));
        }
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        let modificaEmail = false;
        let hashedPassword;
        const id = Number(req.params.id);
        const {nombre, apellidos, email, password, nuevoPassword, biografia} = req.body; 

        if (!id) {
            throw generateError("Página no encontrada", 404);
        }

        if (req.userId !== id) {
            throw generateError("Autorización denegada", 401);
        }

        const [datos] = await getUserById(id);

        if (email !== datos.email || nuevoPassword) {
            console.log(email)
            console.log(nuevoPassword)
            await validaPassword(password, datos.password);
            modificaEmail = true;
        }

        if (nuevoPassword) {
            modificaEmail = false;
            hashedPassword = await bcrypt.hash(nuevoPassword, 10);
            
        }

        let imageFileName;
        if (req.files?.avatar) {
            imageFileName = await subirImagen(req.files.avatar);
        }

        await updateUser(id, nombre, apellidos, email, hashedPassword, biografia, imageFileName, modificaEmail)

        res.status(200).json({mensaje: "Usuario actualizado correctamente!"})


    } catch (error) {
        next(error);
    }
};

export const deleteProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await deleteUser(userId);
        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};

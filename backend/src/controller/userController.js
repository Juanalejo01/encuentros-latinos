import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  userLogindb,
  actualizaEmail,
  actualizaPassword,
} from "../db/userdb.js";
import bcrypt from "bcryptjs";
import {
  createToken,
  validaPassword,
  subirImagen,
  generateError,
  deleteImagen,
} from "../libs/helpers.js";
import {
  eliminarUserSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  registroSchema,
  updateSchema,
} from "../schemas/userSchema.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registroSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { nombre, apellidos, email, password, biografia } = value;

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageFileName;

    if (req.files?.avatar) {
      imageFileName = await subirImagen(req.files.avatar, 500);
    }

    const userId = await createUser(
      nombre,
      apellidos,
      email,
      hashedPassword,
      biografia,
      imageFileName
    );

    res
      .status(200)
      .json({ userId, mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { email, password } = value;

    const data = await userLogindb(email);

    await validaPassword(password, data.password, true);

    const token = await createToken({ id: data.id }, "1d");

    res.status(200).json({
      mensaje: "Usuario logeado exitosamente",
      avatar: data.avatar,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const usuario = await getUserById(req.userId);

    res.status(200).json({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      biografia: usuario.biografia,
      avatar: usuario.avatar,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { error, value } = updateSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { nombre, apellidos, biografia } = value;

    let usuario = await getUserById(req.userId);

    let imageFileName;

    if (req.files?.avatar) {
      const imagenAntigua = usuario.avatar;

      if (imagenAntigua) {
        await deleteImagen(imagenAntigua);
      }

      imageFileName = await subirImagen(req.files.avatar, 500);
    }

    usuario = await updateUser(
      req.userId,
      nombre,
      apellidos,
      biografia,
      imageFileName
    );

    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario: {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        biografia: usuario.biografia,
        avatar: usuario.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmail = async (req, res, next) => {
  try {
    const { error, value } = emailSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { email, password } = value;

    const datos = await getUserById(req.userId);

    if (email === datos.email) {
      res.status(200).json({ mensaje: "El email no ha sido modificado" });
    }

    await validaPassword(password, datos.password, false);

    await actualizaEmail(email, req.userId);

    res
      .status(200)
      .json({ mensaje: "El email ha sido modificado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { error, value } = passwordSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }

    const { password, nuevoPassword } = value;

    const datos = await getUserById(req.userId);

    await validaPassword(password, datos.password, false);

    const hashedPassword = await bcrypt.hash(nuevoPassword, 10);

    await actualizaPassword(hashedPassword, req.userId);

    res
      .status(200)
      .json({ mensaje: "La contraseña ha sido modificada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const { error, value } = eliminarUserSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }

    const { password } = value;

    const datos = await getUserById(req.userId);

    const imagen = datos.avatar;

    await validaPassword(password, datos.password, false);

    await deleteUser(req.userId);

    if (imagen) {
      await deleteImagen(imagen);
    }

    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

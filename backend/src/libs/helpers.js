import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { unlink } from "fs/promises";
import sharp from "sharp";
import { nanoid } from "nanoid";
import jwpt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateError = (mensaje, status) => {
  const error = new Error(mensaje);
  error.httpStatus = status;
  return error;
};

export const deleteImagen = async (imageName) => {
  const uploadDirectorio = join(dirname(fileURLToPath(import.meta.url)), "../upload");
  const imagePath = join(uploadDirectorio, imageName);

  try {
    await unlink(imagePath);
  } catch (error) {
    console.error(`Error al eliminar la imagen ${imageName}: ${error.message}`);
    throw generateError("Error al eliminar la imagen del servidor", 500);
  }
};

export const subirImagen = async (imagen) => {
  const uploadDirectorio = join(dirname(fileURLToPath(import.meta.url)), "../upload");
  const image = sharp(imagen.data);
  const fileName = imagen.name;

  if (fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg")) {
    image.resize(1000);
  } else {
    throw generateError("Por favor, asegúrate de subir una imagen en formato jpg, jpeg o png", 400);
  }

  const random = nanoid(10);
  const imageFileName = `${random}.jpg`;
  await image.toFile(join(uploadDirectorio, imageFileName));

  return imageFileName;
};

export const createToken = async (payload, expire) => {
  return new Promise((resolve, reject) => {
    jwpt.sign(payload, process.env.JWT_SECRET, { expiresIn: expire }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
};

export const validaPassword = async (password, valido, login) => {
  const isMatch = await bcrypt.compare(password, valido);

  if (!isMatch) {
    throw generateError(
      !login
        ? "Contraseña incorrecta, comprueba que esté escrita correctamente"
        : "Los datos del usuario son incorrectos, verifica tus credenciales",
      401
    );
  }

  return;
};

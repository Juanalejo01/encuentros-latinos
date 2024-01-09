import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";
import jwpt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const generateError = (mensaje, status) => {
  const error = new Error(mensaje);
  error.httpStatus = status;
  return error;
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
    jwpt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: expire }, 
      (err, token) => {
        err ? reject(err): resolve(token);
      }
    );
  });
};

export const validaPassword = async (password, valido) => {
  const isMatch = await bcrypt.compare(password, valido);

  if (!isMatch) {
    throw generateError( "Contraseña incorrecta, comprueba que esté escrita correctamente", 401);
  }
  return;
};
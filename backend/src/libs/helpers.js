import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";

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

import Joi from "joi";

const customMessages = {
  "string.empty": "El campo {#label} no puede estar vacío",
  "string.min": "El campo {#label} debe tener al menos {#limit} caracteres",
  "string.max": "El campo {#label} debe tener como máximo {#limit} caracteres",
  "string.email": "El campo {#label} debe ser una dirección de correo electrónico válida",
};

export const eventoSchema = Joi.object({
  titulo: Joi.string().trim().max(150).required().messages(customMessages),
  descripcion: Joi.string().trim().max(3000).required().messages(customMessages),
  tematica: Joi.string().trim().max(100).required().messages(customMessages),
  pais: Joi.string().trim().max(90).required().messages(customMessages),
  ciudad: Joi.string().trim().max(90).required().messages(customMessages),
  localizacion: Joi.string().trim().max(90).required().messages(customMessages),
  fechaHora: Joi.date().required().messages(customMessages),
  imagen: Joi.string().trim().min(100).allow("").messages(customMessages),
});

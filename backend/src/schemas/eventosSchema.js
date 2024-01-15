import Joi from "joi";

export const eventoSchema = Joi.object({
  titulo: Joi.string().trim().max(150).required(),
  descripcion: Joi.string().trim().max(5000).required(),
  tematica: Joi.string().trim().max(100).required(),
  pais: Joi.string().trim().max(90).required(),
  ciudad: Joi.string().trim().max(90).required(),
  localizacion: Joi.string().trim().max(90).required(),
  fechaHora: Joi.date().required(),
  imagen: Joi.string().trim().min(100).allow(""),
});

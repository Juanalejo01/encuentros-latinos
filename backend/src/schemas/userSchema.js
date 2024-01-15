import Joi from "joi";

export const registroSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required(),
  apellidos: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().max(100).required(),
  password: Joi.string().trim().min(8).required(),
  biografia: Joi.string().max(200).allow(""),
  avatar: Joi.string().trim().min(100).allow(""),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().max(100).required(),
  password: Joi.string().trim().min(8).required(),
});

export const updateSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required(),
  apellidos: Joi.string().trim().min(3).max(50).required(),
  biografia: Joi.string().max(200).allow(""),
  avatar: Joi.string().trim().min(100).allow(""),
});

export const emailSchema = Joi.object({
  email: Joi.string().trim().email().max(100).required(),
  password: Joi.string().trim().min(8).required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string().trim().min(8).required(),
  nuevoPassword: Joi.string().trim().min(8).required(),
});

export const eliminarUserSchema = Joi.object({
  password: Joi.string().trim().min(8).required(),
});

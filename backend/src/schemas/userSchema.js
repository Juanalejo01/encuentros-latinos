import Joi from "joi";

const customMessages = {
  "string.empty": "El campo {#label} no puede estar vacío",
  "string.min": "El campo {#label} debe tener al menos {#limit} caracteres",
  "string.max": "El campo {#label} debe tener como máximo {#limit} caracteres",
  "string.email": "El campo {#label} debe ser una dirección de correo electrónico válida",
  "string.lowercase": "El campo {#label} debe estar en minúscula",
};

export const registroSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required().messages(customMessages),
  apellidos: Joi.string().trim().min(3).max(50).required().messages(customMessages),
  email: Joi.string().trim().email().max(100).required().lowercase().messages(customMessages),
  password: Joi.string().trim().min(8).required().messages(customMessages),
  biografia: Joi.string().max(200).allow("").messages(customMessages),
  avatar: Joi.string().trim().min(100).allow("").messages(customMessages),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().max(100).required().lowercase().messages(customMessages),
  password: Joi.string().trim().min(8).required().messages(customMessages),
});

export const updateSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required().messages(customMessages),
  apellidos: Joi.string().trim().min(3).max(50).required().messages(customMessages),
  biografia: Joi.string().max(200).allow("").messages(customMessages),
  avatar: Joi.string().trim().min(100).allow("").messages(customMessages),
});

export const emailSchema = Joi.object({
  email: Joi.string().trim().email().max(100).required().lowercase().messages(customMessages),
  password: Joi.string().trim().min(8).required().messages(customMessages),
});

export const passwordSchema = Joi.object({
  password: Joi.string().trim().min(8).required().messages(customMessages),
  nuevoPassword: Joi.string().trim().min(8).required().messages(customMessages),
});

export const eliminarUserSchema = Joi.object({
  password: Joi.string().trim().min(8).required().messages(customMessages),
});

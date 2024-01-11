import { eventoById } from "../db/eventdb.js";
import { inscrito, desInscrito, inscritosById } from "../db/inscriptiondb.js";
import { getUserById } from "../db/userdb.js";

export const inscribirMe = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);

    const evento = await eventoById(evento_id);

    await inscrito(req.userId, evento.id);

    res.status(200).json({
      mensaje: `Te has inscrito al evento ${evento.titulo} correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

export const desInscribirMe = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);

    const evento = await eventoById(evento_id);

    await desInscrito(req.userId, evento.id);

    res.status(200).json({
      mensaje: `Te has desinscrito del evento ${evento.titulo} correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

export const mostrarInscritos = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);

    const evento = await eventoById(evento_id);

    const usuarios = await inscritosById(evento.id);

    res.status(200).json({
      lista: usuarios,
    });
  } catch (error) {
    next(error);
  }
};

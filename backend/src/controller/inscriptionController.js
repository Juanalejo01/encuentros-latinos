import { eventoById } from "../db/eventdb.js";
import { inscrito, desInscrito, inscritosById } from "../db/inscriptiondb.js";

export const inscribirMe = async (req, res, next) => {
  try {
    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

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
    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

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
    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

    let usuarios = await inscritosById(evento.id);

    if (usuarios.length === 0) {
      usuarios = 0;
    }

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

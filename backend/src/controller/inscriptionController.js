import { eventoById } from "../db/eventdb.js";
import { inscrito, desInscrito, eventosInscritoByIdOfUser } from "../db/inscriptiondb.js";

export const inscribirMe = async (req, res, next) => {
  try {
    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

    const usuario = await inscrito(req.userId, evento.id);

    res.status(200).json({
      usuario,
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

export const eventoInscrito = async (req, res, next) => {
  try {
    const datosEventos = await eventosInscritoByIdOfUser(req.userId);

    res.status(200).json({ datos: datosEventos, total: datosEventos.length });
  } catch (error) {
    next(error);
  }
};

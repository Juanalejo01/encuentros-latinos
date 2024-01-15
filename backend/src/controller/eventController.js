import {
  eventoNuevoDB,
  eventoById,
  eventoActualizadoById,
  eventoEliminadoById,
  eventosByTematicaOrCiudad,
} from "../db/eventdb.js";
import { inscritosById, totalInscritosById } from "../db/inscriptiondb.js";
import { generateError, subirImagen } from "../libs/helpers.js";
import { eventoSchema } from "../schemas/eventosSchema.js";

export const crearEvento = async (req, res, next) => {
  try {
    const { error, value } = eventoSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const {
      titulo,
      descripcion,
      tematica,
      pais,
      ciudad,
      localizacion,
      fechaHora,
    } = value;

    let imagenFileName;

    if (req.files?.imagen) {
      imagenFileName = await subirImagen(req.files.imagen);
    }

    const eventoId = await eventoNuevoDB(
      req.userId,
      titulo,
      descripcion,
      tematica,
      pais,
      ciudad,
      localizacion,
      fechaHora,
      imagenFileName
    );

    res.status(200).json({
      mensaje: "Evento creado exitosamente",
      evento: await eventoById(eventoId),
    });
  } catch (error) {
    next(error);
  }
};

export const mostrarDetalleEvento = async (req, res, next) => {
  try {
    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

    let listado = await inscritosById(eventoId);

    if (listado.length === 0) {
      listado = 0;
    }

    const total = await totalInscritosById(eventoId);

    res.status(200).json({
      evento,
      listado,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const filtrarEventosByTematicaOrCiudad = async (req, res, next) => {
  try {
    const tematica = req.query.tematica || "";
    const ciudad = req.query.ciudad || "";

    const filtro = await eventosByTematicaOrCiudad(tematica, ciudad);

    res.status(200).json({
      filtro,
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarEvento = async (req, res, next) => {
  try {
    const { error, value } = eventoSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const {
      titulo,
      descripcion,
      tematica,
      pais,
      ciudad,
      localizacion,
      fechaHora,
    } = value;

    const eventoId = Number(req.params.id);

    const evento = await eventoById(eventoId);

    if (req.userId !== evento.usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    let imagenFileName;

    if (req.files?.imagen) {
      imagenFileName = await subirImagen(req.files.imagen);
    }

    await eventoActualizadoById(
      eventoId,
      titulo,
      descripcion,
      tematica,
      pais,
      ciudad,
      localizacion,
      fechaHora,
      imagenFileName
    );

    res.status(200).json({
      mensaje: "Actualizado exitosamente",
      evento: await eventoById(eventoId),
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarEvento = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);
    const evento = await eventoById(evento_id);

    if (req.userId !== evento.usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    await eventoEliminadoById(evento_id);

    res.status(200).json({
      mensaje: "Eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

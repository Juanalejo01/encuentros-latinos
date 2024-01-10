import {
  eventoNuevoDB,
  eventoById,
  eventoActualizadoById,
  eventoEliminadoById,
  eventosByTematicaOrCiudad,
} from "../db/eventdb.js";
import { generateError, subirImagen } from "../libs/helpers.js";

export const crearEvento = async (req, res, next) => {
  try {
    const { titulo, descripcion, tematica, localizacion } = req.body;
    const usuario_id = Number(req.params.id);

    if (req.userId !== usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    let imagenFileName;

    if (req.files?.imagen) {
      imagenFileName = await subirImagen(req.files.imagen);
    }

    const eventoId = await eventoNuevoDB(
      usuario_id,
      titulo,
      descripcion,
      tematica,
      localizacion,
      imagenFileName
    );

    res.status(200).json({
      mensaje: "Evento creado exitosamente",
      evento_id: eventoId,
    });
  } catch (error) {
    next(error);
  }
};

export const mostrarDetalleEvento = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);

    const evento = await eventoById(evento_id);

    res.status(200).json({
      evento,
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

    if (filtro.length === 0) {
      throw generateError("No se encontraron eventos para los criterios dados", 404);
    }

    res.status(200).json({
      filtro,
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarEvento = async (req, res, next) => {
  try {
    const { titulo, descripcion, tematica, localizacion } = req.body;
    const evento_id = Number(req.params.id);

    const evento = await eventoById(evento_id);

    if (req.userId !== evento.usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    let imagenFileName;

    if (req.files?.imagen) {
      imagenFileName = await subirImagen(req.files.imagen);
    }

    await eventoActualizadoById(
      evento_id,
      titulo,
      descripcion,
      tematica,
      localizacion,
      imagenFileName
    );

    res.status(200).json({
      mensaje: "Actualizado exitosamente",
      evento: await eventoById(evento_id),
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarEvento = async (req, res, next) => {
  try {
    const evento_id = Number(req.params.id);
    console.log("Prueba");
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

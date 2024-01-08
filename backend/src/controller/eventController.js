import {
  eventoNuevoDB,
  eventosDB,
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

    await eventoNuevoDB(usuario_id, titulo, descripcion, tematica, localizacion, imagenFileName);

    res.status(200).json({
      mensaje: "Evento creado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const mostrarEventos = async (req, res, next) => {
  try {
    await eventosDB();

    res.status(200).json({
      mensaje: "Datos mostrados exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const mostrarDetalleEvento = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await eventoById(id);

    res.status(200).json({
      mensaje: "Detalle mostrado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarEvento = async (req, res, next) => {
  try {
    const { titulo, descripcion, tematica, localizacion } = req.body;
    const id = Number(req.params.id);
    const usuario_id = Number(req.params.user);

    if (req.userId !== usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    let imagenFileName;

    if (req.files?.imagen) {
      imagenFileName = await subirImagen(req.files.imagen);
    }

    await eventoActualizadoById(id, titulo, descripcion, tematica, localizacion, imagenFileName);

    res.status(200).json({
      mensaje: "Actualizado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarEvento = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const usuario_id = Number(req.params.user);

    if (req.userId !== usuario_id) {
      throw generateError("Autorización denegada", 401);
    }

    await eventoEliminadoById(id);

    res.status(200).json({
      mensaje: "Eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const filtrarEventosByTematicaOrCiudad = async (req, res, next) => {
  try {
    const tematica = req.params.tematica;
    const ciudad = req.params.ciudad;

    await eventosByTematicaOrCiudad(tematica, ciudad);

    res.status(200).json({
      mensaje: "Eventos encontrados",
    });
  } catch (error) {
    next(error);
  }
};

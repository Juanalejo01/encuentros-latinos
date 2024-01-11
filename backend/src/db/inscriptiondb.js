import { generateError } from "../libs/helpers.js";
import { getConnection } from "./db.js";

const isInscritoById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [[inscripcion]] = await connection.query(
      "SELECT usuario_id FROM inscripciones WHERE evento_id = ?",
      [id]
    );

    return inscripcion;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const inscrito = async (userId, eventId) => {
  let connection;
  try {
    connection = await getConnection();

    const usuario = await isInscritoById(eventId);

    if (usuario) {
      if (userId === usuario.usuario_id) {
        throw generateError("No puedes inscribirte dos veces en el mismo evento", 422);
      }
    }

    await connection.query("INSERT INTO inscripciones (usuario_id, evento_id) VALUES(?,?)", [
      userId,
      eventId,
    ]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const desInscrito = async (userId, eventId) => {
  let connection;
  try {
    connection = await getConnection();

    const usuario = await isInscritoById(eventId);

    if (!usuario) {
      throw generateError("Este usuario no está inscrito en este evento", 422);
    }

    if (userId !== usuario.usuario_id) {
      throw generateError("Acceso denegado", 401);
    }

    await connection.query("DELETE FROM inscripciones WHERE evento_id = ?", [eventId]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const inscritosById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [inscripciones] = await connection.query(
      "SELECT u.nombre, u.apellidos, u.avatar " +
        "FROM usuarios u " +
        "JOIN inscripciones i ON u.id = i.usuario_id " +
        "WHERE evento_id = ?",
      [id]
    );

    return inscripciones;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

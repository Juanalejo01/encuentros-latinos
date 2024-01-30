import { generateError } from "../libs/helpers.js";
import { getConnection } from "./db.js";

const expireInscripcion = async (id, connection) => {
  // Obtener información del evento
  const [[evento]] = await connection.query("SELECT fecha_hora FROM eventos WHERE id = ?", [id]);

  // Verificar si falta menos de una hora para el inicio del evento
  const tiempoRestante = new Date(evento.fecha_hora) - new Date();
  const horasRestantes = tiempoRestante / (1000 * 60 * 60);

  if (horasRestantes < 1) {
    throw generateError("No puedes inscribirte a menos de una hora para el inicio del evento", 422);
  }

  return;
};

const isInscritoById = async (id, userId, inscrito, connection) => {
  const [inscripciones] = await connection.query(
    "SELECT * FROM inscripciones WHERE evento_id = ? AND usuario_id = ?",
    [id, userId]
  );

  if (inscrito) {
    if (inscripciones.length > 0) {
      throw generateError("No puedes inscribirte dos veces en el mismo evento", 422);
    }
  } else {
    if (inscripciones.length > 0) {
      return inscripciones[0];
    }
  }

  return;
};

export const inscrito = async (userId, eventId) => {
  let connection;
  try {
    connection = await getConnection();

    await expireInscripcion(eventId, connection);

    await isInscritoById(eventId, userId, true, connection);

    const [result] = await connection.query(
      "INSERT INTO inscripciones (usuario_id, evento_id) VALUES(?,?)",
      [userId, eventId]
    );

    const [usuario] = await inscritoById(result.insertId);

    return usuario;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const inscritoById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [inscripcion] = await connection.query(
      "SELECT i.id, i.usuario_id, u.nombre, u.apellidos, u.avatar " +
        "FROM usuarios u " +
        "JOIN inscripciones i ON u.id = i.usuario_id " +
        "WHERE i.id = ?",
      [id]
    );

    return inscripcion;
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

    const usuario = await isInscritoById(eventId, userId, false, connection);

    if (!usuario) {
      throw generateError("Este usuario no está inscrito en este evento", 422);
    }

    await connection.query("DELETE FROM inscripciones WHERE evento_id = ? AND usuario_id = ?", [
      eventId,
      userId,
    ]);

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
      "SELECT i.id, i.usuario_id, u.nombre, u.apellidos, u.avatar " +
        "FROM usuarios u " +
        "JOIN inscripciones i ON u.id = i.usuario_id " +
        "WHERE evento_id = ? ORDER BY i.fecha DESC",
      [id]
    );

    return inscripciones;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const totalInscritosById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [[inscripcion]] = await connection.query(
      "SELECT COUNT(*) AS count FROM inscripciones WHERE evento_id = ?",
      [id]
    );

    return inscripcion.count;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

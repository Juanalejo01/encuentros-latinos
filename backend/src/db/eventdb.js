import { getConnection } from "./db.js";

export const eventoNuevoDB = async (
  usuario_id,
  titulo,
  descripcion,
  tematica,
  localizacion,
  foto
) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      "INSERT INTO eventos (usuario_id, titulo, descripcion, tematica, localizacion, foto) VALUES(?,?,?,?,?,?)",
      [usuario_id, titulo, descripcion, tematica, localizacion, foto]
    );

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventosDB = async () => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query("SELECT * FROM eventos");

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query("SELECT * FROM eventos WHERE id = ?", [id]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventoActualizadoById = async (
  id,
  titulo,
  descripcion,
  tematica,
  localizacion,
  foto
) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      "UPDATE eventos SET titulo = ?, descripcion = ?, tematica = ?, localizacion = ?, foto = ? WHERE id = ?",
      [titulo, descripcion, tematica, localizacion, foto, id]
    );

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventoEliminadoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query("DELETE FROM eventos WHERE id = ?", [id]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventosByTematicaOrCiudad = async (tematica, ciudad) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query("SELECT * FROM eventos WHERE tematica = ? OR ciudad = ?", [
      tematica,
      ciudad,
    ]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

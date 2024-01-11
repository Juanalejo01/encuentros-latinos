import { getConnection } from "./db.js";
import { generateError } from "../libs/helpers.js";

export const eventoNuevoDB = async (
  usuario_id,
  titulo,
  descripcion,
  tematica,
  pais,
  ciudad,
  localizacion,
  fechaHora,
  foto
) => {
  let connection;
  try {
    connection = await getConnection();

    const [evento] = await connection.query(
      "INSERT INTO eventos (usuario_id, titulo, descripcion, tematica, pais, ciudad, localizacion, fecha_hora, foto) VALUES(?,?,?,?,?,?,?,?,?)",
      [usuario_id, titulo, descripcion, tematica, pais, ciudad, localizacion, fechaHora, foto]
    );

    return evento.insertId;
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

    const [[evento]] = await connection.query("SELECT * FROM eventos WHERE id = ?", [id]);

    if (!evento) {
      throw generateError("No existe ese evento!!", 404);
    }

    return evento;
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

    let updateQuery =
      "UPDATE eventos SET titulo = ?, descripcion = ?, tematica = ?, localizacion = ?";
    let updateParams = [titulo, descripcion, tematica, localizacion];

    if (foto) {
      updateQuery += ", foto = ?";
      updateParams.push(foto);
    }

    updateQuery += " WHERE id = ?";
    updateParams.push(id);

    const [evento] = await connection.query(updateQuery, updateParams);

    return evento;
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

export const eventosByTematicaOrCiudad = async (tematica, localizacion) => {
  let connection;

  try {
    connection = await getConnection();

    let searchQuery = "SELECT * FROM eventos WHERE 1=1";
    let searchParams = [];

    if (tematica) {
      searchQuery += ` AND tematica LIKE '%${tematica}%'`;
      searchParams.push(tematica);
    }

    if (localizacion) {
      searchQuery += ` AND localizacion LIKE '%${localizacion}%'`;
      searchParams.push(localizacion);
    }

    const [filtro] = await connection.query(searchQuery, searchParams);

    return filtro;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

import { getConnection } from "./db.js";
import { generateError } from "../libs/helpers.js";
import { totalInscritosById } from "./inscriptiondb.js";

const compruebaFechaHoraDelEvento = async (fecha, connection, id) => {
  if (!id) {
    // Creación de evento
    const [[diferenciaHoras]] = await connection.query(
      "SELECT TIMESTAMPDIFF(HOUR, NOW(), ?) AS horas_restantes",
      [fecha]
    );
    const horasRestantes = diferenciaHoras.horas_restantes;

    if (horasRestantes < 11) {
      throw generateError("No se puede crear el evento con menos de 12 horas de antelación", 422);
    }
  } else {
    // Modificación de evento
    const [[eventoFecha]] = await connection.query("SELECT fecha FROM eventos WHERE id = ?", [id]);

    const tiempoTranscurrido = Math.floor(
      (Date.now() - Date.parse(eventoFecha.fecha)) / (1000 * 60 * 60)
    );

    if (tiempoTranscurrido >= 10) {
      throw generateError("Ya no se puede modificar el evento", 422);
    }

    const diferenciaEnHoras = Math.floor(
      (Date.parse(fecha) - Date.parse(eventoFecha.fecha)) / (1000 * 60 * 60)
    );

    if (diferenciaEnHoras < 11) {
      throw generateError(
        "No se puede modificar el evento con menos de 12 horas de antelación.",
        422
      );
    }
  }
};

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

    await compruebaFechaHoraDelEvento(fechaHora, connection, false);

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

    const [[evento]] = await connection.query(
      "SELECT e.id, e.usuario_id, u.nombre, u.apellidos, u.avatar, e.titulo, e.descripcion, e.tematica, e.pais, e.ciudad, e.localizacion, e.fecha_hora, e.foto, e.fecha " +
        "FROM usuarios u " +
        "JOIN eventos e ON u.id = e.usuario_id " +
        "WHERE e.id = ?",
      [id]
    );

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
  pais,
  ciudad,
  localizacion,
  fechaHora,
  foto
) => {
  let connection;

  try {
    connection = await getConnection();

    await compruebaFechaHoraDelEvento(fechaHora, connection, id);

    let updateQuery =
      "UPDATE eventos SET titulo = ?, descripcion = ?, tematica = ?, pais = ?, ciudad = ?, localizacion = ?, fecha_hora = ?";
    let updateParams = [titulo, descripcion, tematica, pais, ciudad, localizacion, fechaHora];

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

export const eventosByTematicaOrCiudad = async (tematica, ciudad, ordenar) => {
  let connection;

  try {
    connection = await getConnection();

    let searchQuery =
      "SELECT id, titulo, tematica, ciudad, fecha_hora, foto FROM eventos WHERE 1=1";
    let searchParams = [];

    if (tematica) {
      searchQuery += ` AND tematica LIKE '%${tematica}%'`;
      searchParams.push(tematica);
    }

    if (ciudad) {
      searchQuery += ` AND ciudad LIKE '%${ciudad}%'`;
      searchParams.push(ciudad);
    }

    searchQuery += " AND fecha_hora > NOW() ORDER BY fecha_hora";

    const [filtro] = await connection.query(searchQuery, searchParams);

    for (const evento of filtro) {
      evento.totalInscritos = await totalInscritosById(evento.id);
    }

    if (ordenar === "true") {
      filtro.sort((a, b) => b.totalInscritos - a.totalInscritos);
    }

    return filtro;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const eventosByIdOfUser = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [eventos] = await connection.query(
      "SELECT id, titulo, tematica, ciudad, fecha_hora, foto FROM eventos WHERE usuario_id = ? ORDER BY CASE WHEN fecha_hora > NOW() THEN 1 ELSE 2 END, fecha_hora",
      [id]
    );

    for (const evento of eventos) {
      evento.totalInscritos = await totalInscritosById(evento.id);
    }

    return eventos;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const mostrarEventoById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [[evento]] = await connection.query("SELECT * FROM eventos WHERE id = ?", id);

    return evento;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

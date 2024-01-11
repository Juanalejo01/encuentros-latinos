import { getConnection } from "./db.js";
import { generateError } from "../libs/helpers.js";

const compruebaFechaHoraDelEvento = async (fecha, connection, id) => {
  if (!id) {
    // Creación de evento
    const [[diferenciaHoras]] = await connection.query(
      "SELECT TIMESTAMPDIFF(HOUR, NOW(), ?) AS horas_restantes",
      [fecha]
    );
    const horasRestantes = diferenciaHoras.horas_restantes;

    if (horasRestantes < 12) {
      throw generateError("No se puede crear el evento con menos de 12 horas", 422);
    }
  } else {
    // Modificación de evento
    const [[eventoFecha]] = await connection.query("SELECT fecha FROM eventos WHERE id = ?", [id]);

    const tiempoRestanteInicio = Math.floor(
      (Date.parse(eventoFecha.fecha) - Date.now()) / (1000 * 60 * 60)
    );

    if (tiempoRestanteInicio <= 0) {
      throw generateError(
        "No se puede modificar el evento cuando falta una hora para iniciar",
        422
      );
    }

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
        "No se puede modificar el evento con menos de 12 horas de antelación",
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

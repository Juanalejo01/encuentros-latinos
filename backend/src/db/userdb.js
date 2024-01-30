import { generateError } from "../libs/helpers.js";
import { getConnection } from "../db/db.js";

const findEmail = async (email, connection, operacion) => {
  const [[emailResult]] = await connection.query(
    "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?",
    [email]
  );

  if (emailResult.count >= 1 && operacion === "registro") {
    throw generateError(
      "No se pudo completar el registro. Verifica la información proporcionada",
      409
    );
  }

  if (emailResult.count >= 1 && operacion === "update") {
    throw generateError(
      "La nueva dirección de correo electrónico ya está en uso. Proporciona una dirección diferente",
      409
    );
  }

  if (emailResult.count === 0 && operacion === "login") {
    throw generateError("Los datos del usuario son incorrectos, verifica tus credenciales", 401);
  }
};

export const createUser = async (nombre, apellidos, email, password, biografia, avatar) => {
  let connection;
  try {
    connection = await getConnection();

    await findEmail(email, connection, "registro");

    const [result] = await connection.query(
      "INSERT INTO usuarios (nombre, apellidos, email, password, biografia, avatar) VALUES(?,?,?,?,?,?)",
      [nombre, apellidos, email, password, biografia, avatar]
    );

    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const userLogindb = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    await findEmail(email, connection, "login");

    const [[usuario]] = await connection.query(
      "SELECT id, nombre, password, avatar FROM usuarios WHERE email = ?",
      [email]
    );

    return usuario;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getUserById = async (userId) => {
  let connection;
  try {
    connection = await getConnection();

    const [[datosUsuario]] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [
      userId,
    ]);

    if (!datosUsuario) {
      throw generateError("No existe ese usuario", 404);
    }

    return datosUsuario;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const updateUser = async (id, nombre, apellidos, biografia, imageFileName) => {
  let connection;
  try {
    connection = await getConnection();
    let actualizacionUsuarioQuery = "UPDATE usuarios SET nombre = ?, apellidos = ?, biografia = ?";
    const actualizarParametros = [nombre, apellidos, biografia];

    if (imageFileName) {
      actualizacionUsuarioQuery += ", avatar = ?";
      actualizarParametros.push(imageFileName);
    }

    actualizacionUsuarioQuery += " WHERE id = ?";
    actualizarParametros.push(id);

    await connection.query(actualizacionUsuarioQuery, actualizarParametros);

    return getUserById(id);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const actualizaEmail = async (email, id) => {
  let connection;
  try {
    connection = await getConnection();

    await findEmail(email, connection, "update");

    await connection.query("UPDATE usuarios SET email= ? WHERE id = ?", [email, id]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const actualizaPassword = async (password, id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query("UPDATE usuarios SET password= ? WHERE id = ?", [password, id]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deleteUser = async (userId) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query("DELETE FROM usuarios WHERE id = ?", [userId]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

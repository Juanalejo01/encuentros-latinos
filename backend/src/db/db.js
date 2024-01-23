import mysql from "mysql2/promise";
import { generateError } from "../libs/helpers.js";

const { DB_HOST, DB_USUARIO, DB_PASSWORD, DB_DATABASE } = process.env;

let pool;

export const getConnection = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DB_HOST,
        user: DB_USUARIO,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        timezone: "Z",
      });
    }
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    throw generateError("Error de conexión", 500);
  }
};

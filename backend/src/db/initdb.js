import {} from "dotenv/config";
import { getConnection } from "./db.js";

const main = async () => {
  let connection;
  try {
    connection = await getConnection();

    console.log(`borrando tablas que existen`);

    await connection.query("DROP TABLE IF EXISTS inscripciones");
    await connection.query("DROP TABLE IF EXISTS eventos");
    await connection.query("DROP TABLE IF EXISTS usuarios");

    console.log("creando tablas");

    await connection.query(`CREATE TABLE usuarios(
            id INT PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(50) NOT NULL,
            apellidos VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            biografia VARCHAR(255),
            avatar VARCHAR(255),
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )ENGINE=InnoDB;`);

    await connection.query(`CREATE TABLE eventos(
            id INT PRIMARY KEY AUTO_INCREMENT,
            usuario_id INT NOT NULL,
            titulo VARCHAR(100) NOT NULL,
            descripcion TEXT NOT NULL,
            tematica VARCHAR(255) NOT NULL,
            pais VARCHAR(100) NOT NULL,
            ciudad VARCHAR(100) NOT NULL,
            localizacion VARCHAR(100) NOT NULL,
            fecha_hora DATETIME,
            foto VARCHAR(255),
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        )ENGINE=InnoDB;`);

    await connection.query(`CREATE TABLE inscripciones(
            id INT PRIMARY KEY AUTO_INCREMENT,
            usuario_id INT NOT NULL,
            evento_id INT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
        )ENGINE=InnoDB;`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};

main();

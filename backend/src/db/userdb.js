import { generateError } from '../libs/helpers.js';
import { getConnection } from '../db/db.js';

export const createUser = async (usuario) => {
    let connection;
    try {
        connection = await getConnection();
        console.log(usuario);
        await findEmail(usuario.email, connection, false);
        const [result] = await connection.query(
            'INSERT INTO usuarios SET ?',
            usuario
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
        await findEmail(email, connection, true);

        const [[usuario]] = await connection.query(
            'SELECT id, password FROM usuarios WHERE email = ?', [email]
            
        );
            return usuario;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const findEmail = async (email, connection, login) => {
    const [[emailResult]] = await connection.query(
        'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?', [email]
    );
    if (emailResult.count === 0 && login) {
        throw generateError("Los datos del usuario son incorrectos, verifica tus credenciales", 401);
    }
    if (emailResult.count >= 1 && !login) {
        throw generateError("Email existente, proporciona otro distinto", 409);
    }
}

export const getUserById = async (userId) => {
    let connection;
    try {
        connection = await getConnection();
        const [datosUsuario] = await connection.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [userId]
        );
        return datosUsuario;
    
    } finally { 
        if (connection) {
            connection.release();
        }
        
    }
};

export const updateUser = async (id, nombre, apellidos, email, hashedPassword, biografia, imageFileName, modificaEmail) => {
    let connection;
    try {
        connection = await getConnection();
        let actualizacionUsuarioQuery = "UPDATE usuarios SET nombre = ?, apellidos = ?, biografia = ?";
        const actualizarParametros = [nombre, apellidos, biografia];

        if (modificaEmail) {
            await findEmail(email, connection, false);
            actualizacionUsuarioQuery += ", email = ?";
            actualizarParametros.push(email);
        }
        
        if (hashedPassword) {
            actualizacionUsuarioQuery += ", password = ?";
            actualizarParametros.push(hashedPassword);
        }

        if (imageFileName) {
            actualizacionUsuarioQuery += ", avatar = ?";
            actualizarParametros.push(imageFileName);
        }

        actualizacionUsuarioQuery += " WHERE id = ?";
        actualizarParametros.push(id);

        await connection.query(actualizacionUsuarioQuery, actualizarParametros);
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
        await connection.query('DELETE FROM usuarios WHERE id = ?', [userId]);
        return 'Usuario eliminado exitosamente';
    
    } finally {
        if (connection) {
            connection.release();
        }
        
    }
};

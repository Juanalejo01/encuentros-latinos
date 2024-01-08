import mysql from 'mysql2/promise';

const {DB_HOST, DB_USUARIO, DB_PASSWORD, DB_DATABASE} = process.env;

let pool;

export const getConnection = async() => {
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USUARIO,
                password: DB_PASSWORD,
                database: DB_DATABASE,
                timezone: 'Z',
            });
        }
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
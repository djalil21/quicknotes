const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    async getAll() {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM user');
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    },

    async createUser(newUser) {
        try {
            const connection = await pool.getConnection();
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            const [rows] = await connection.execute('INSERT INTO user (username, password, id) VALUES (?, ?, ?)', [newUser.username, hashedPassword, newUser.id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getUserByUsername(username) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getUserById(id) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
            connection.release();

            return rows;
        } catch (error) {
            throw new Error(error);
        }
    },
    async comparePassword(password, hashedPassword) {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw new Error(error);
        }
    },
    async addToBlacklist(token) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('INSERT INTO blacklist_tokens (token) VALUES (?)', [token]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }, async checkBlacklist(token) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM blacklist_tokens WHERE token = ?', [token]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = User;
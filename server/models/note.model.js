const pool = require("../config/db");

const Note = {
    async getAll(userId) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute(
                "SELECT * FROM note WHERE user_id = ?",
                [userId]
            );
            connection.release();
            const notes = rows.map((note) => {
                return {
                    ...note, updatedAt: new Date(note.updatedAt) || note.createdAt, createdAt: new Date(note.createdAt)
                }
            })
            const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
            return sortedNotes;
        } catch (error) {
            throw new Error(error);
        }
    },
    async getOne(userId, id) {
        try {
            const connection = await pool.getConnection();
            const [row] = await connection.execute(
                "SELECT * FROM note WHERE id = ? AND user_id = ?",
                [id, userId]
            );
            connection.release();
            return row[0];
        } catch (error) {
            throw new Error(error);
        }
    },
    async createOne(userId, note) {
        try {
            const connection = await pool.getConnection();
            const descriptionValue = note.description || '';
            const values = [note.id, note.title, userId, descriptionValue];
            const query = "INSERT INTO note (id, title, user_id, description) VALUES (?, ?, ?, ?)";
            const [rows] = await connection.execute(query, values);
            const newNote = await this.getOne(userId, note.id);
            connection.release();
            return newNote;
        } catch (error) {
            throw new Error(error);
        }
    },
    async updateOne(userId, noteId, note) {
        try {
            const connection = await pool.getConnection();
            const descriptionValue = note?.description || '';
            const values = [note.title, descriptionValue, noteId, userId];
            const query = "UPDATE note SET title = ?, description = ? WHERE id = ? AND user_id = ?";
            const [rows] = await connection.execute(
                query,
                values
            );
            const updatedNote = await this.getOne(userId, noteId);
            connection.release();
            return updatedNote;
        } catch (error) {
            throw new Error(error);
        }
    },
    async deleteOne(userId, id) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute(
                "DELETE FROM note WHERE id = ? AND user_id = ?",
                [id, userId]
            );
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    },
};

module.exports = Note;

const db = require('../config/db');

class Song {
    static async create(title, musicFilePath) {
        const [rows] = await db.execute('INSERT INTO songs (title, musicFilePath) VALUES (?, ?)', [title, musicFilePath]);
        return rows;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM songs');
        return rows;
    }

    static async update(id, title) {
        const [rows] = await db.execute('UPDATE songs SET title = ? WHERE id = ?', [title, id]);
        return rows;
    }

    static async delete(id) {
        const [rows] = await db.execute('DELETE FROM songs WHERE id = ?', [id]);
        return rows;
    }
}

module.exports = Song;

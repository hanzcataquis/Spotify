const Song = require('../models/song');

exports.addSong = async (req, res) => {
    const { title } = req.body;
    const musicFilePath = `/uploads/${req.file.filename}`;
    await Song.create(title, musicFilePath);
    res.redirect('/');
};

exports.getAllSongs = async (req, res) => {
    const songs = await Song.findAll();
    res.render('index', { songs });
};

exports.editSong = async (req, res) => {
    const { id, title } = req.body;
    await Song.update(id, title);
    res.redirect('/');
};

exports.deleteSong = async (req, res) => {
    const { id } = req.body;
    await Song.delete(id);
    res.redirect('/');
};

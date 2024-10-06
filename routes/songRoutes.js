const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.single('musicFile'), songController.addSong);
router.post('/edit', songController.editSong);
router.post('/delete', songController.deleteSong);
router.get('/', songController.getAllSongs);
router.get('/upload', (req, res) => {
    res.render('upload');
});

module.exports = router;

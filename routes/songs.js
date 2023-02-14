const express = require('express')
const router = express.Router()

const { addSong, deleteSong, addSongs } = require('../controllers/song')

router.route('/').post(addSong).delete(deleteSong).put(addSongs)
module.exports = router
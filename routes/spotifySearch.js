const express = require('express')
const router = express.Router()

const { getListSongs } = require('../controllers/spotify')

router.route('/').get(getListSongs)
module.exports = router
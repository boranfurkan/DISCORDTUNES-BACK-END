const express = require('express')
const router = express.Router()

const { getSongList } = require('../controllers/youtube')

router.route('/').get(getSongList)
module.exports = router
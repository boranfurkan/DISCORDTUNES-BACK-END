const express = require('express')
const router = express.Router()

const { getAllLists, getList, createList, updateList, deleteList } = require('../controllers/list')

router.route('/').post(createList).get(getAllLists).get(getList).delete(deleteList).patch(updateList)
module.exports = router
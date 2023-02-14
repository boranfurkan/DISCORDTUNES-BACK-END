const List = require('../models/List')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllLists = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;
    const lists = await List.find().sort("name").limit(limit * 1).skip((page - 1) * limit).exec();

    const listCollectionCount = await List.countDocuments
    const totalPages = Math.ceil(listCollectionCount / limit)

    res.status(StatusCodes.OK).json({
        lists,
        paging: {
            total: listCollectionCount,
            currentPage: page,
            totalPages: totalPages
        }
    })
}

const getList = async (req, res) => {
    const { listname } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("List name can not be empty!")
    }
    const list = await List.findOne({ name: listname })
    if (!list) {
        throw new NotFoundError("No item found with name '" + listname + "'")
    }
    res.status(StatusCodes.OK).json({ list, songCount: list.songs.length })
}

const createList = async (req, res) => {
    const { name, createdBy, albumCover } = req.body

    if (!name || !createdBy || !albumCover) {
        throw new BadRequestError('Missing name, creator name or album cover!')
    }

    const list = await List.create({ name: name, createdBy: createdBy, albumCover: albumCover })
    res.status(StatusCodes.CREATED).json({ list })
}

const updateList = async (req, res) => {
    const { listname } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("List name can not be empty!")
    }
    const list = await List.findOneAndUpdate({ name: listname }, req.body, {
        new: true,
        upsert: false
    })
    if (!list) {
        throw new NotFoundError("No list found with name '" + listname + "'")
    }
    res.status(StatusCodes.OK).json({ list })
}

const deleteList = async (req, res) => {
    const { listname } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("List name can not be empty!")
    }
    const list = await List.deleteMany({ name: listname })
    if (!list) {
        throw new NotFoundError("No item found with name '" + listname + "'")
    }
    res.status(StatusCodes.OK).send("Successfully deleted all items with name '" + listname + "'")
}


module.exports = {
    getAllLists,
    getList,
    createList,
    updateList,
    deleteList
}
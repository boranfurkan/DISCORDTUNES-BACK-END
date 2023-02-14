const List = require('../models/List')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const addSong = async (req, res) => {
    const { listname } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("Please provide the list name in parameters!")
    }

    const list = await List.findOne({ name: listname })

    if (!list) {
        throw new NotFoundError("No list found with name '" + listname + "'")
    }

    const { name, singer, url, albumCover } = req.body;

    if (!name || !url || !albumCover) {
        throw new BadRequestError('Missing arguments, please try again!')
    }

    allSongs = list.songs.map((song) => {
        if (song.url === url) {
            throw new BadRequestError("Song is already in playlist.")
        }
    })

    list.songs = [...list.songs, { name: name, singer: singer, url: url, albumCover: albumCover }]
    list.save()

    res.status(StatusCodes.OK).json({ list })
}

const deleteSong = async (req, res) => {
    const { listname, songId } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("List name can not be empty!")
    }

    const list = await List.findOne({ name: listname })

    if (!list) {
        throw new NotFoundError("No list found with name '" + listname + "'")
    }

    const updatedSongs = list.songs.filter((song) => {
        return song._id != songId;
    });

    list.songs = [...updatedSongs]
    list.save()

    res.status(StatusCodes.OK).json({ list })
}


const addSongs = async (req, res) => {
    const { listname } = req.query;
    if (listname === undefined) {
        throw new BadRequestError("Please provide the list name in parameters!")
    }

    const list = await List.findOne({ name: listname })

    if (!list) {
        throw new NotFoundError("No list found with name '" + listname + "'")
    }
    const { items } = req.body;

    if (items === undefined) {
        throw new BadRequestError('Missing arguments, please try again!')
    }

    list.songs = [...list.songs, ...items]
    list.save()

    res.status(StatusCodes.OK).json({ list })
}

module.exports = {
    addSong,
    deleteSong,
    addSongs
}
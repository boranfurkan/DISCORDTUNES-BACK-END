const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require('axios')
require('dotenv').config()

const X_RAPID_API_KEY = process.env.X_RAPID_API_KEY
const X_RAPID_API_HOST = process.env.X_RAPID_API_HOST


const getListSongs = async (req, res) => {
    const { listId } = req.query;
    if (listId === undefined) {
        throw new BadRequestError("Please provide the list ID in parameters!")
    }

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
        params: { id: listId, offset: '0', limit: '100' },
        headers: {
            'X-RapidAPI-Key': X_RAPID_API_KEY,
            'X-RapidAPI-Host': X_RAPID_API_HOST
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response)
        res.status(StatusCodes.OK).json(response.data)
    }).catch(function (error) {
        throw new BadRequestError(error)
    });
}

module.exports = {
    getListSongs
}
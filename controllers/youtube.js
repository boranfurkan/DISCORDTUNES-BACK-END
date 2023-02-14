const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require('axios')
const { options } = require('joi')
require('dotenv').config()

const GOOGLE_API = process.env.GOOGLE_API

const getSongList = async (req, res) => {
    const { q } = req.query;
    if (q === undefined) {
        throw new BadRequestError("Please provide the list name in parameters!")
    }

    const config = {
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Content-type": "application/json; charset=utf-8"
        }
    };

    await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&regionCode=TR&key=${GOOGLE_API}&maxResults=30&type=video&videoCategoryId=10`, config)
        .then(function (response) {
            res.status(StatusCodes.OK).json(response.data)
        })
        .catch(function (error) {
            throw new BadRequestError(error)
        })
}

module.exports = {
    getSongList
}
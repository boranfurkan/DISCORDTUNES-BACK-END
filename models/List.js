const mongoose = require('mongoose')

const Listschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'List name must be provided'],
        unique: true
    },
    createdBy: {
        type: String,
        required: [true, 'Creator name must be provided'],
    },
    songs: [{ id: mongoose.Schema.ObjectId, name: String, singer: String, url: String, albumCover: String }],
    albumCover: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('List', Listschema)

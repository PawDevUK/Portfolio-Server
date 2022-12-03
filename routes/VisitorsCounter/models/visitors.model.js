const mongoose = require('mongoose')
const DB = require('../../../DB')
require('dotenv').config();

const VISITORS_URI = process.env.VISITORS_URI;
let varName = Object.keys({VISITORS_URI})[0]

const Schema = mongoose.Schema

const visitorsSchema = new Schema({
    counter: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const visitor = DB(VISITORS_URI, varName).model('Visitor', visitorsSchema);

module.exports = visitor
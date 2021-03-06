const mongoose = require('mongoose')

const Schema = mongoose.Schema

const visitorsSchema = new Schema({
    counter: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const visitor = mongoose.model('Visitor', visitorsSchema);

module.exports = visitor
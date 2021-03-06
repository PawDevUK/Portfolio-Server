const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
})

const users = mongoose.model('Users', usersSchema);

module.exports = users
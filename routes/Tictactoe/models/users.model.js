const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
    playingWith: {
        type: String,
    },
    game: Object
}, {
    timestamps: true
})

const users = mongoose.model('Users', usersSchema);

module.exports = users

// {
//     "user": "Britney",
//     "status": "Available",
//     "playingWith": "---",
//     "invitation":{
//         "invitation":false,
//         "invitationAccept":false,
//         "move":false,
//         "inGame":false,
//         "palyWith":"",
//         "playByXorO":"",
//         "board": []
//     }
// }
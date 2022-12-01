const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user:{
        type:String,
        require:true,
        unique:true,
        minLength:5,
        maxLength:12
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minLength:5,
    },
    password:{
        type:String,
        require:true,
        minLength:5,
        maxLength:12
    },
    calendar:{
        type:[]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User
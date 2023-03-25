const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const UserSchema=new Schema({
    email : {type : String ,required : true},
    password:{type : String ,required : true}
})

const users=mongoose.model('users',UserSchema)

module.exports = users;
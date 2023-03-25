const mongoose = require('mongoose');
const{model,Schema} = mongoose;
const ObjectId= require('mongoose').ObjectId;

const postSchema= Schema({
    title:{type : String ,required:true},
    description:{type:String,required:true},
    userId:{type:ObjectId,ref:"users"}
},{timestamps:true})

const postModels =mongoose.model("notes", postSchema);

module.exports=postModels;

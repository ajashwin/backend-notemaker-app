const mongoose = require('mongoose');
const{model,Schema} = mongoose;
const ObjectId= require('mongoose').ObjectId;

const notesmodel=new mongoose.Schema({
    title:{type : String ,required:true},
    description:{type:String,required:true},
    userId:{type:ObjectId,ref:"users"}
},{timestamps:true})

const notes =mongoose.model("notes", notesmodel);
module.exports=notes;

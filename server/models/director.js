const mongoose = require('mongoose')
const Schema=mongoose.Schema;


const directorschema= new Schema({
    name:String,
    age:Number,
  
})

module.exports=mongoose.model('director',directorschema)
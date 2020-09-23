const mongoose = require('mongoose')
const Schema=mongoose.Schema;


const movieschema= new Schema({
    name:String,
    category:String,
    directorid:String
})

module.exports=mongoose.model('movies',movieschema)
const mongoose = require('mongoose')  

const data = mongoose.Schema({
    title : String,
    rating: String,
    discription : String
})
module.exports =  mongoose.model( 'data' , data)
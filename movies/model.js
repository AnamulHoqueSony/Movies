const mongoose = require('mongoose');


const movie = new mongoose.Schema({
    title : String,
    year : String,
    rating : String,
    actors:[{type: mongoose.Schema.Types.ObjectId, ref:'actor'}]
    
})
module.exports = mongoose.model('Movie',movie);

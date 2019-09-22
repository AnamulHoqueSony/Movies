const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
         name : String,
         birthDay:String,
         country: String,
});

module.exports = mongoose.model('actor',schema);
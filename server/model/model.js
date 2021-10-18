const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    gender:{
      type: String
    },
    status:{
        type: String
    }
})

var Userdb = mongoose.model('sample',schema)

module.exports = Userdb

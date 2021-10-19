
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    empId:{
        type:String,
        unique:true
    },
    name:{
        type:String
    },
    age:{
        type:Number
    },
    salary:{
        type:Number
    },
    location:{
        type: String
    }
})

var Userdb = mongoose.model('Employee',schema,"Employee")

module.exports = Userdb

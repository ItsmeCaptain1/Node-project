const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        //mongoDB connection String
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        })
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB
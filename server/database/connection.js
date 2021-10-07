const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        //mongoDB connection Strin
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true 
        })
        
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB
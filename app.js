const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');

// const connectDB = require('./server/database/connection');
const bodyParser = require('body-parser');
// const { connect } = require('http2')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080
mongoose.connect(process.env.URI,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('Connected to database'))

// log request
app.use(morgan('tiny'))

//mongoDB connection
// connectDB()

// parse req to middleware before your handlers  
//The default value of the extended option has been deprecated, meaning you need to explicitly pass true or false value.
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
app.use(express.urlencoded({extends:true}))
app.use(express.json())


// set view engine ( if you make views folder in main directory then don't have to specify the path in set method )
app.set("view engine", "ejs")
// app.set("view", path.resolve(__dirname,"views/index")) 
// app.set("view", path.resolve(__dirname,"views/update")) 

// load assets, setup static and middsleware
// static -> there is a file that app doesn't have to change it      
// app.use(express.static('./assets'))
// app.use('/css',express.static(path.resolve(__dirname,"./assets/css"))) // now for using files inside css use css/style.css
// app.use('/img',express.static(path.resolve(__dirname,"./assets/img")))
// app.use('/static',express.static(path.resolve(__dirname,"./assets/js/")))
// // console.log(path.resolve(__dirname,"./assets/css"));
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`);})
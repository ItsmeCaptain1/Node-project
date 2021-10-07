const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')
const { connect } = require('http2')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log request
app.use(morgan('small'))

//mongoDB connection
connectDB()

// parse req to bodyparser 
app.use(bodyParser.urlencoded({extended:true}))

// set view engine ( if you make views folder in main directory then don't have to specify the path in set method )
app.set("view engine", "ejs")
// app.set("view", path.resolve(__dirname,"views/ejs")) 

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))) // now for using files inside css use css/style.css
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`);})
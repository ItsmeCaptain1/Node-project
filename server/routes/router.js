const express = require('express')
const route = express.Router()

const services = require('../services/render')

/*
    @description Root Route
    @method GET /
*/
route.get('/',services.homeRoute)

/*
    @description add User
    @method GET /addUser
*/
route.get('/addUser',services.addUser)

/*
    @description update User
    @method GET /update User
*/
route.get('/updateUser',services.updateUser)

module.exports = route 
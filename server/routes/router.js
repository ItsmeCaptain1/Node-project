const express = require('express')
const route = express.Router()
const model = require('../model/model');
const services = require('../services/render')


async function getData(req, res, next) {
    let data
    try{
        data = model.findById(req.params.id)
        if( data == null){
            return res.status(404).json({message:"Cannot find Data"})
        }
     } catch(err){
        return res.status(500).json({message:err.message})  
     }

     res.data = data 
     next() ; 
 }

/*
    @description Root Route ( all users )
    @method GET /
*/
route.get('/',services.homeRoute)

/*
    @description one User
    @method GET /addUser
*/
route.get('/:id',getData,services.user)


/*
    @description one User
    @method GET /addUser
*/
route.post('/',services.post)


/*
    @description update User
    @method GET /update User
*/
route.patch('/:id',services.updateUser)


/*
    @description one User
    @method GET /addUser
*/
route.delete('/:id',services.user)


module.exports = route 
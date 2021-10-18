const express = require('express')
const route = express.Router()
const model = require('../model/model');
const services = require('../services/render')


async function getData(req, res, next) {
    let data
    // console.log(req.params.id);
    try{
        data = await model.findById(req.params.id)
        if( data==null ){
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
route.get('/',services.allUser) ;

/*
    @description one User
    @method GET /addUser
*/
route.get('/:id',getData,services.singleUser)

/*
    @description one User
    @method GET /addUser
*/
route.get('/post',services.post)

/*
    @description update User
    @method GET /update User
*/
route.post('/update/:id',getData,services.updateUser) ;

/*
    @description delete user
    @method GET / user
*/
route.get('/delete/:id',services.deleteUser) ;



// all api
route.get('/api/users',services.allUserAPI)
route.post('/api/users',services.postAPI)
route.patch('/api/users/:id',services.putAPI)
route.delete('/api/users/:id',services.deleteAPI)
module.exports = route 
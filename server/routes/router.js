const express = require('express')
const route = express.Router()
const model = require('../model/model');
const services = require('../services/render')
const {check, validationResult } = require('express-validator')
const { query } = require('express-validator');

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
route.post('/post',[
    check('name','Invalid Employee Name')
        .exists()
        .isLength({min:4,max:10})
        .isAlpha(["en-US"], { ignore: " " }),
    check('location','Location in not valid')
        .exists()
        .isLength({min:3})
        .isAlpha(["en-US"], { ignore: " " }),
    check('age','Age is inapropriate')
        .exists()
        .isNumeric(),
    check('salary','Age is inapropriate')
        .exists()
        .isNumeric()
        
],services.post)

/*
    @description update User
    @method GET /update User
*/
route.get('/update/:id',getData,[
    check('name','Invalid Employee Name')
        .exists()
        .isLength({min:4,max:10})
        .isAlpha(["en-US"], { ignore: " " }),
    check('location','Location in not valid')
        .exists()
        .isLength({min:3})
        .isAlpha(["en-US"], { ignore: " " }),
    check('age','Age is inapropriate')
        .exists()
        .isNumeric(),
    check('salary','Age is inapropriate')
        .exists()
        .isNumeric()
        
],services.updateUser) ;

/*
    @description delete user
    @method GET / user
*/
route.get('/delete/:id',services.deleteUser) ;



// all api
route.get('/api/users',services.allUserAPI)
route.post('/api/users',[
    check('name','Invalid Employee Name')
        .exists()
        .isLength({min:4,max:10})
        .isAlpha(["en-US"], { ignore: " " }),
    check('location','Location in not valid')
        .exists()
        .isLength({min:3})
        .isAlpha(["en-US"], { ignore: " " }),
    check('age','Age is inapropriate')
        .exists()
        .isNumeric(),
    check('salary','Age is inapropriate')
        .exists()
        .isNumeric()
        
],services.postAPI)
route.patch('/api/users/:id',[
    check('name','Invalid Employee Name')
        .isLength({min:4,max:10})
        .isAlpha(["en-US"], { ignore: " " }),
    check('location','Location is not valid')
        .isLength({min:3})
        .isAlpha(["en-US"], { ignore: " " }),
    check('age','Age is inapropriate')
        .exists()
        .isNumeric(),
    check('salary','Age is inapropriate')
        .exists()
        .isNumeric()
        
],services.putAPI)
route.delete('/api/users/:id',services.deleteAPI)

route.get('/api/command',services.shellscripts)


route.get('/api/readfile',[
    query('filename','Filename must not be empty')
        .exists()
],services.readFile)
route.post('/api/writefile',[
    query('data','Data must not be empty')
        .exists(),
    query('filename','Filename must not be empty')
        .exists()
],services.writeFile)
module.exports = route 
const express = require('express')
const route = express.Router()
const model = require('../model/model');
const services = require('../services/render')
const {check, validationResult } = require('express-validator')
const { query } = require('express-validator');

async function getData(req, res, next) {
    let data
    try{
        // console.log(req.query.empId);
        // console.log(req.params.id);
        // console.log(req.body.empId);
        data = await model.findOne({"empId":req.params.id})
        // console.log(data.empId);
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
    @method.post /update User
*/
route.post('/update/:id',[
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
    @method.post / user
*/
route.post('/delete/:id',services.deleteUser) ;


// all api
route.get('/api/users',services.allUserAPI)
route.post('/api/users',services.postAPI)
route.patch('/api/users/:id',[
    check('empId',"Employee ID is apropriate")
        .exists()
        .isAlphanumeric(),
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
        
],getData,services.patchAPI)
route.delete('/api/users/:id',getData,services.deleteAPI)

route.get('/api/command',[
    query('command','Command cannot be empty').exists()
],
services.shellscripts)

route.get('/api/readfile',[
    query('filepath','Filepath must not be empty')
        .exists()
],services.readFile)

route.post('/api/writefile',[
    query('filepath','Filepath must not be empty')
        .exists()
],services.writeFile)
module.exports = route 
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const sample = require('../model/model');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

exports.allUser = async (req,res)=>{
    try{
        const response = await axios.get('http://localhost:3000/api/users') ;
        // console.log(response);
        res.render('index',{'data' : response.data}) ;
    }catch(err){
        res.status(500).json({message : err.message})
    }
}
exports.allUserAPI = async (req,res)=>{
    if( req.query.id ){
        try{
            const data = await sample.findById(req.query.id);
            res.json(data)
        }catch(err){
            res.json({message : err.message})
        }
    }
    else{
        try{
            const data = await sample.find();
            res.json(data)
        }catch(err){
            res.status(500).json({message : err.message})
        }
    }
}


exports.singleUser = (req,res)=>{
    res.render('update',{'data':res.data})
}


exports.post =  async (req,res)=>{

    const errors = validationResult(req)
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    if( !req.body.name || !req.body.age || !req.body.empId || !req.body.salary || !req.body.location ){
        return res.status(400).send({message:" Bad req"})
    }
    console.log(req.body);
    const data = new sample({
        empId: req.body.empId,
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        location: req.body.location
    });
    try{
        const newData = await data.save() ; 
        res.redirect('/')
    }catch(err){
        res.status(500).send({message : err.message || "some error occurred while creating a create operation"})
    }
}
exports.postAPI = async (req,res)=>{
    const errors = validationResult(req)
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    if( !req.body.name || !req.body.age || !req.body.empId || !req.body.salary || !req.body.location ){
        return res.status(400).send({message:"Bad Request"})
    }
    // console.log(req.body);
    const data = new sample({
        empId: req.body.empId,
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        location: req.body.location
    });
    try{
        const newData = await data.save() ; 
        res.send(newData)
    }catch(err){
        res.status(500).send({message : err.message || "some error occurred while creating a create operation"})
    }
}


exports.updateUser = async (req,res)=>{

    try {
        await sample.findByIdAndUpdate(req.params.id,req.query)
        res.redirect('/')
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
exports.putAPI = async (req,res)=>{
    if( !req.body.name || !req.body.age || !req.body.empId || !req.body.salary || !req.body.location ){
        return res.status(400).send({message:" Bad req"})
    }
    const id = req.params.id ; 
    try{
        await sample.findByIdAndUpdate(id,req.body)
        // console.log(req.body);
        res.send("updated successfully !!") 
    }catch(err){
        res.json({message:err.message})
    }

}


exports.deleteUser = async (req,res)=>{
    try{
        await sample.findByIdAndDelete(req.params.id);
        res.redirect('/')
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
exports.deleteAPI = async (req,res)=>{
    try{
        await sample.findByIdAndDelete(req.params.id);
        res.send("Data succesfully deleted !!!")
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


exports.shellscripts = async (req,res)=>{

    try {
        const { stdout, stderr } = await exec(`${req.query.command}`);
        res.send(stdout)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.readFile = (req,res)=>{
    fs.readFile(req.query.filename,(err,data)=>{
        if (err){
            // console.log(err);
            res.send("No such file exist");
            return ;
        }
        res.send(data) ;
    }) ;
}

exports.writeFile = (req,res)=>{
    fs.writeFile(req.query.filename,req.query.data,(err)=>{
        if(err) {
            res.send(err);
            return ;
        } 
        res.send('The file has been updated !!!')
    })
}

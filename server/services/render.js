const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const sample = require('../model/model');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

// function isPositiveInteger(n) {
//     return 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n);
// }

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
    const data = res.data ; 
    res.render('update',{data})
}


exports.post =  async (req,res)=>{

    const errors = validationResult(req)
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    let AGE = parseInt(req.body.age) ; 
    let SAL = parseInt(req.body.salary) ; 
    if( AGE < 0 || SAL < 0 ){
        return res.status(400).json({error:"Age and Salary must non-negative number."})
    }

    const data = new sample({
        empId: req.body.empId,
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        location: req.body.location
    });
    try{
        await data.save() ; 
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
    
    let AGE = parseInt(req.body.age) ; 
    let SAL = parseInt(req.body.salary) ; 
    if( AGE < 0 || SAL < 0 ){
        return res.status(400).json({error:"Age and Salary must non-negative number."})
    }

    if( !req.body.name || !req.body.age || !req.body.empId || !req.body.salary || !req.body.location ){
        return res.status(400).json({message:"Every field must be filled"})
    }
    const data = new sample({
        empId: req.body.empId,
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        location: req.body.location
    });
    try{
        const newData = await data.save() ; 
        res.json({newData})
    }catch(err){
        res.status(500).json({message : err.message || "some error occurred while creating a create operation"})
    }
}


exports.updateUser = async (req,res)=>{
    let AGE = parseInt(req.body.age) ; 
    let SAL = parseInt(req.body.salary) ; 
    if( AGE < 0 || SAL < 0 ){
        return res.status(400).json({error:"Age and Salary must non-negative number."})
    }
    try {
        await sample.findOneAndUpdate({"empId":req.params.id},req.body)
        res.redirect('/')
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
exports.patchAPI = async (req,res)=>{
    if( !req.body ){
        return res.status(400).json({message:"Bad req"})
    }
    console.log(req.body);
    if( req.body.age ){
        let AGE = parseInt(req.body.age) ;
        if( AGE <=0){
            return res.status(400).json({error:"Age must non-negative number."})
        }
    }
    if( req.body.salary ){
        let sal = parseInt(req.body.salary) ; 
        if( sal < 0 ){
            return res.status(400).json({error:"Salary must non-negative number."})
        }
    }

    
    const query = {"id":req.params.id} ; 
    try{
        await sample.findOneAndUpdate(query,req.body)
        const data = await sample.find(query) ;
        res.json({msg:"updated successfully !!",data}) 
    }catch(err){
        res.json({message:err.message})
    }

}


exports.deleteUser = async (req,res)=>{
    try{
        await sample.findOneAndDelete({"empId":req.params.id});
        res.redirect('/')
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
exports.deleteAPI = async (req,res)=>{
    try{
        await sample.findOneAndDelete({"empId":req.params.id});
        res.send({msg:"Data succesfully deleted !!!"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


exports.shellscripts =  async(req,res)=>{
    // console.log(req.query.command);
    const errors = validationResult(req) ;
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() });
        return ;
    }
    try {
        const {stdout,stderr} = await exec(req.query.command)
        if(stderr){
            req.json({status:400,message:stderr})
            return 
        }
        const temp = stdout.split("\n")
        data = temp.slice()
        data.splice(temp.length-1,1)
        // trim
        res.json({status:200,data})
        
    } catch (error) {
        res.status(400).json({status:400,message:error.message})
    }
}

exports.readFile = (req,res)=>{
    const error = validationResult(req) ; 
    if(!error.isEmpty()){
        res.status(400).json({errors:error.array()})
        return ; 
    }
    fs.readFile(req.query.filepath,(err,data)=>{
        if (err){
            // console.log(err);
            res.json({error:"No such file exist"});
            return ;
        }
        // console.log(data);
        // res.send(data);
        data = "" + data ; 
        res.json({status: true,data}) ;
    }) ;
}

exports.writeFile = (req,res)=>{
    const error = validationResult(req) ; 
    if(!error.isEmpty()){
        res.status(400).json({errors:error.array()}) ;
        return ;
    }
    fs.writeFile(req.query.filepath,req.query.data,(err)=>{
        if(err) {
            res.json({error:"No such file exists"});
            return ;
        } 
        res.json({msg:'The file has been updated !!!'})
    })
}

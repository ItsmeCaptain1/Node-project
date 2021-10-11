const sample = require('../model/model');

exports.homeRoute = async (req,res)=>{

    try{
        const data = await sample.find({});
        res.json(data) ;
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

exports.user = (req,res)=>{
    res.send(req.params.id)
}

exports.post = async (req,res)=>{
    if( !req.body ){
        res.status(400).send({message:"content cannpt be empty"})
        return 
    } 
    const data = new sample({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    try{
        const newData = await data.save() ; 
        res.status(201).json(newData)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

exports.updateUser = (req,res)=>{
    res.render('updateUser')
}

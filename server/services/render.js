const { default: axios } = require('axios');
const sample = require('../model/model');

exports.allUser = async (req,res)=>{
    try{
        const response = await axios.get('http://localhost:3000/api/users') ;
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
    const response = await axios.get('http://localhost:3000/api/users') ;
    res.render('index',{'data' : response.data}) ;
}
exports.postAPI = async (req,res)=>{

    if( !req.body ){
        res.status(400).send({message:"content cannot be empty"})
        return
    } 
    const data = new sample({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
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
    if( !req.body ){
        return res.status(400).send({message:" Bad req"})
    }
    const id = req.params.id ; 
    try{
        await sample.findByIdAndUpdate(req.params.id,req.body)
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



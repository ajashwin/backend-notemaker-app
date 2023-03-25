const router= require('express').Router();
const USer=require('../../model/User');
const jwt = require('jsonwebtoken');
const {body , validationResult} =require('express-validator');
const bcrypt = require('bcrypt');
const secret="HelloUser";
router.post('/login',async (req,res)=>{
    try{
        const {username,password}=req.body;

        const isUser= await USer.findOne({email:username})
        if(!isUser){
            return res.status(400).send("NO USer Exists")
        }else{
            bcrypt.compare(req.body.password, isUser.password,function(err,result){
                if(err){
                    return res.status(401).json({
                        "Message":err.message
                    })
                }
                if(result){
                    const token=jwt.sign({
                        exp: Math.floor(Date.now()/1000)+(60*60),
                        data:isUser._id
                    },secret);

                    return res.status(200).json({
                        "Message":"Logged in successfully",
                        "Name":isUser.name,
                        "Token":token
                    })
                }else{
                    return res.status(401).send("Invalid Credentials");
                }
            })
        }

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
});


module.exports=router;
const router=require('express').Router();
const USer=require('../model/User');
const jwt = require('jsonwebtoken');
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

router.post("/register",body('email').isEmail(), async(req,res)=>{
    try{
        let {email,password,confirmPassword} = req.body;
        if(password!==confirmPassword){
            return res.status(403).json({
                status:"Failed"
                ,message:"Password not matched"
            })
        }

        let isUser= await USer.findOne({email:email});
        if(isUser){
            return res.status(403).send("USer Already exists")
        }else{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    "error":errors.array()
                })
            }else{
                bcrypt.hash(password,10,async function(err,hash){
                    if(err){
                        return res.status(400).json({
                            "Error":err.message
                        })
                    }else{
                        const user=new USer({
                            email:email,
                            password:hash,
                        });
                        user.save().then(()=>{
                            return res.status(200).json({
                                "user":user
                            })
                        })
                    }
                })
            }
        }
    }catch(e){
        return res.status(400).json({
            "Message":e.message
        });
    }
})
  
module.exports=router;
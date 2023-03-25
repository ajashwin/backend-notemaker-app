const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const postRouter = require("./routes/notes")

const register = require("./routes/registerRouter")
const login = require("./routes/loginRoutes")

const dotEnv = require("dotenv")
dotEnv.config()

const main = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("database connected to data base")
    }catch(e){
        console.log(e)
    }
}
    
main()
app.use(cors())

app.use("/v1/post", (req, res, next)=>{
    
    jwt.verify(req.headers.authorization, "secret", (err, result)=>{
        if(err){
            res.status(401).json({
                message:"unAuthorized",
                err
            })
        }
        else{
            req.user = result.data
            next()
        }
    })
})

app.use("/v1/post/:id", (req, res, next)=>{
    
    jwt.verify(req.headers.authorization, "secret", (err, result)=>{
        if(err){
            res.status(401).json({
                message:"unAuthorized",
                err
            })
        }
        else{
            req.user = result.data
            next()
        }
    })
})

app.use("/v1", postRouter)
app.use("/v1", register)
app.use("/v1", login)
app.get("/v1", (req, res)=>{
    res.send("comming")
})

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("data base Connect to the ", process.env.PORT)
    }
})

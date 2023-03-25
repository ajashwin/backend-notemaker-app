const express = require("express")
const postModels = require("../models/notemodel")
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())


router.post("/post", async(req, res)=>{
    try{
        const {title, description} = req.body
        console.log(req.user)
        const data = await postModels.create({
            title:title,
            description:description,
            userId:req.user
        })
        res.status(200).json({
            message:data
        })
    }catch(e){
        res.status(500).json({
            error:"Internal issue"
        })
    }

})
router.get("/post",async(req, res)=>{
    try{
        const data = await postModels.find({userId:req.user})
        res.status(200).json(
            data
        )
    }catch(e){
        res.status(500).json({
            error:"Internal issue"
        })
    }
})

router.delete("/post", async(req, res)=>{
    try{
        const data = await postModels.deleteMany({userId:req.user})
        res.status(203).json({
            message:"All Data deleted"
        })
    }
    catch(e){
        res.status(500).json({
            error:"Internal server issue"
        })
    }
})

    router.delete("/post/:id", async(req, res)=>{
        try{
            const data = await postModels.deleteOne({_id:req.params.id})
            res.status(203).json({
                message:"All Data deleted"
            })
        }
        catch(e){
            res.status(500).json({
                error:"Internal server issue"
            })
        }
    
    
})


router.get("/post/:id", async(req, res)=>{
    console.log(req.user)
    const search = `\^${req.params.id}`
    try{
        const data = await postModels.find({title:{$regex:search, $option:"i"}})
        console.log(data)
        res.status(200).json({
            data
        })
    }
    catch(e){
        res.status(500).json({
            error:"Internal server issue"
        })
    }


})



module.exports = router;
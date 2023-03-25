const router=require('express').Router();
const express = require("express");
const Notes = require("../../model/note");
const bodyParser = require("body-parser");

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}));

router.post("/notes", async(req,res) => {
    try{
        const userId = req.userId;
        const post = {
            title: req.body.title,
            description: req.body.description
        }
        const data = await Notes.create(post)
        res.status(201).json({
            status: "Success",
            message: "Posted Successfully",
            data
        })
    } catch(e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.get("/notes", async(req,res) => {
    try {
    const data = await Notes.find({})
        res.status(201).json({
            status: "Success",
            message: "got Successfully",
            data
        })
    } catch(e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/notes", async(req,res) => {
    try {
    const data = await Notes.deleteMany({})
        res.status(201).json({
            status: "Success",
            message: "Deleted Successfully",
            data
        })
    } catch(e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/notes/:id", async(req,res) => {
    try {
    const data = await Notes.deleteOne({})
        res.status(201).json({
            status: "Success",
            message: "Deleted Successfully",
            data
        })
    } catch(e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/notes/:id", async(req,res) => {
    try {
    const data = await Notes.updateOne({_id: req.params.id}, req.body)
        res.status(201).json({
            status: "Success",
            message: "Deleted Successfully",
            data
        })
    } catch(e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;
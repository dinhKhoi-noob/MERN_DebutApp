//declare
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth')
//CRUD API
//@route POST api/posts
//@desc Generate create method
router.post('/',verifyToken,async(req,res)=>{
    const {title,description,url,status} = req.body;
    //Missing title
    if(!title)
        res.status(400).json({success: false, message:"missing title!"});
    try {
        //create new post
        const newPost = new Post({
            title,
            description,
            status:status || "TO LEARN",
            url:url.startsWith('https://') ? url:`https://${url}`,
            user:req.userId
        })
        //save post
        await newPost.save();
        res.json({success:true,message:"Post saved successfully",post:newPost});
    }
    catch(err)
    {
        //Server error
        console.log(err);
        res.status(500).json({success:false,message:"Server error"});
    }
});

//@route GET api/posts
//@desc Generate read method

router.get('/', verifyToken,async(req,res)=>{
    try {
        const posts = await Post.find({user:req.userId}).populate('user',['username','createdAt']);
        res.json({success:true, message:"successfully",posts});
    }
    catch (error) {
        //server error
        console.log(error);
        res.status(500).json({success:false, message:"server error"});
    }
})

//@route PUT api/posts
//@Generate update method

router.put('/:id',verifyToken,async(req,res)=>{
    const {title,description,url,status} = req.body;
    //Missing title
    if(!title)
        res.status(400).json({success:false, message:"Missing title"});
    try {
        //create update post
        let updatePost = {
            title,
            description:description || "",
            url:(url.startsWith('https://')?url:`https://${url}`) || "",
            user:req.userId,
            status:status || "TO LEARN"
        }
        //find post by _id & user then update
        const postUpdateCondition = {_id:req.params.id,user:req.userId};
        const updatedPost = await Post.findByIdAndUpdate(postUpdateCondition,updatePost,{new:true});
        //update post not found or user is not authorized
        if(!updatedPost)
            res.status(401).json({success:false, message:"User not authorized to update or post not found"});
        //all good
        res.json({success:true, message:"updated!",updatedPost});
    }
    catch (error) {
        //Server error
        console.log(error);
        res.status(500).json({success:false, message:"Server error"});
    }
})

//@route DELETE api/posts
//@desc Generate delete method

router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        //find post by id & userId then remove it
        const postDeleteCondition = {_id:req.params.id,user:req.userId};
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
        //User not authorized or post not found
        if(!deletedPost)
            res.status(401).json({success:false, message:"User not authorized or post not found"});
        //all good
        res.json({success:true, message:"deleted",deletedPost});
    } catch (error) {
        //server error
        console.log(error);
        res.status(500).json({success:false, message:"Server error"});
    }
})

module.exports = router;
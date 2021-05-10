//declare
const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
//authenticated get request

router.get('/',verifyToken,async (req,res)=>{
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user)
            return res.status(400).json({success:false, message:"user not found"});
        return res.json({success:true, message:"Successfully",user});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Internal server failed"});
    }
})

//register post request
router.post('/register',async(req,res)=>{
    const {username,password} = req.body;
    //Missing username or password
    if(!username || !password)
        res.status(400).json({success: false, message:"missing username or password!"});
    try{
        const user = await User.findOne({username});
        //Check if user already existed
        if(user)
            res.status(400).json({success: 
            false, message:"User name already registered"});
        //All good, create new user
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password:hashPassword
        })
        //Save user into database
        await newUser.save();
        //Return token by jsonwebtoken
        const accessToken = jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN_SECRET);
        res.json({success:true,message:"User created successfully",accessToken})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})
//login post request
router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    //Missing username or password
    if(!username || !password)
        res.status(400).json({success:false,message:"Missing username or password"});
    try{
        //Username does not exist
        const user = await User.findOne({username});
        if(!user)
            res.status(400).json({success:false,message:"Invalid username or password"});
        const passwordValid = await argon2.verify(user.password,password);
        //Wrong password
        if(!passwordValid)
            return res.status(400).json({success:false,message:"Invalid username or password"});
        //All good
        const accessToken = jwt.sign({
            userId:user._id
        },process.env.ACCESS_TOKEN_SECRET);
        res.json({success:true,accessToken:accessToken,message:"Login successful"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({success:false,message:"Internal server failed"})
    }
});
module.exports = router;
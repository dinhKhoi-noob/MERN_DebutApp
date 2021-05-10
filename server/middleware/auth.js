const jwt = require('jsonwebtoken');
require('dotenv').config();
//Type of authentication header: Bearer <token>
//We wanna get the token so we must split it when it " "
//and take the second one
const verify = (req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];
    //token does not exist
    if(!token)
        return res.status(400).json({success: false, message:"Access token not found"});
    try{
        //verify token
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        //Valid token
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        //invalid token
        console.log(err);
        return res.status(403).json({success: false, message:"Invalid token"});
    }
}

module.exports = verify;
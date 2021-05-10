const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const connectDB = async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-debut-app.cy8gj.mongodb.net/MERN-Debut-App?retryWrites=true&w=majority`,{
            useCreateIndex : true,
            useNewUrlParser : true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log("Connected!");        
    }
    catch(error)
    {
        console.log("Connect failed!");
        console.log(error);
        process.exit(1);
    }

}
connectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);
app.listen(PORT,()=>console.log("Hello from port 5000"));
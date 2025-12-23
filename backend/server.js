const express = require('express');
require('dotenv').config();    
require('./models/db');          

const cors=require('cors');
const auth=require('./routes/auth')

const app = express();

const PORT = process.env.PORT;

// const allowedurls=[
//     "http://localhost:8080",
//     "https://rwd-eight.vercel.app",
//     "https://rwd-tau.vercel.app",
//     "http://127.0.0.1:5173",
// ]
// app.use(cors({
//     origin:function(origin,callback){
//         if(!origin)return callback(null,true);
//         if(allowedurls.includes(origin)){
//             callback(null,true);
//         }else{
//             callback(new Error("Not allowed by cors"))
//         }
//     }
// }))
app.get("/", (req, res) => {
    res.send("Backend working");
});
app.get("/second",(req,res)=>{
    res.send("Second page")
})
app.use(express.json());
app.use('/auth',auth)
app.listen(PORT, () => {
    console.log(`Express running on ${PORT}`);
});

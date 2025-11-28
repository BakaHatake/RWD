const mongoose=require('mongoose');
const mongo_url=process.env.MONGO
console.log("LOADED ENV:", process.env.MONGO);

mongoose.connect(mongo_url)
.then(()=>{
    console.log("db attached");
}).catch((err)=>{
    console.log("Fucked up",err)
})
 const { string, required } = require('joi');
const mongoose=require('mongoose')
 const schema=mongoose.Schema;
 const userschema=new schema({
    name:{
        type:String,
        required:true,
    },
    phone: {
    type: String,
    required: true,
},
    usn:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    key:{
        type:String,
        unique:true,
        required:true,

    }
 });

const usermodel=mongoose.model('users',userschema)
module.exports=usermodel;
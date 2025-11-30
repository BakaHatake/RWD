const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt=require('jsonwebtoken');


const signup2=async(req,res)=>{
    try{
        const{name,phone,usn,gender,email,password}=req.body;
        const alremail=await User.findOne({email});
        if(alremail){
            return res.status(409).json({
                message:"Email already exists",
                type:"email",
                success:false
            })
        }
        const alrusn=await User.findOne({usn});
        if(alrusn){
            return res.status(409).json({
                message:"USN already exists",
                type:"usn",
                success:false
            })
        }
        const hpass=await bcrypt.hash(password,10);
        const newuser=new User({
            name,
            phone,
            usn,
            gender,
            email,
            password:hpass
        });
        await newuser.save();
        res.status(201).json({
            message:"Singup successful",
            success:true
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"Signup failed",
            success:false
        });
    }
};

const login2 = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({
                type:"email",
                message: "User does not exist",
                success: false
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(409).json({
                type:"pass",
                message: "Invalid password",
                success: false
            });
        }
        const jwtToke=jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}

        )
        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToke,
            email,
            user:user.name,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

module.exports = {
    signup2,
    login2
};

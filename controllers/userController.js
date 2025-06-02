
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Route for user login
const loginUser = async ()=>{

}

// Route for user register
const registerUser = async (req,res)=>{
   try{
    const {name, email, password} = req.body;
    // Check if user already exists
    const exits = await userModel.findOne({ email });
    if (exits) {
        return res.status(400).json({ message: "User already exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter valid email format" });
    }
    if(password.length <8 ){
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
    })
    const user = await newUser.save()

    const token = createToken(user._id);
    res.json({success:true , token})

   } catch {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });

   }

}

//Route for admin login
const adminLogin = async (req,res)=>{

}

export {loginUser, registerUser, adminLogin}
import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import { generatetoken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res) => {
    const {fullName,password,email} = req.body
    

    try{
    // if(!fullName || !password || !email){
    //     return res.status(400).json({message:"You must fill all the fields"})
    // }
    if(password.length<6){
        return res.status(400).json({message:"password must be more than 6 letters"})
    }
    const user=await User.findOne({email})
    if(user){
        res.status(400).json({message:"email already exsist"})

    }
    const salt=await bcrypt.genSalt(10)
    const hashpassword=await bcrypt.hash(password,salt)
    const newUser=new User({
        fullName,
        email,
        password:hashpassword
    })
    if(newUser){
        generatetoken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilepic:newUser.profilepic,
        })

    }
    else{
        res.status(400).json({message:"invalid user"})
    }
}
catch(error){
    res.status(500).json({message:"server error"})
    console.log(error.message)
}


}

export const login = async (req,res) => {
    const {email, password } =req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const isCorrect = await bcrypt.compare(password,user.password)
        if(!isCorrect){
            return res.status(400).json({message:"incorrect password"})
        }
        generatetoken(user._id,res)
        res.status(200).json({
            user:user._id,
            email:user.email,
            fullname:user.fullName,
            profilepic:user.profilepic
        })

    }
    catch(error){

        console.log(error.message)
        res.status(500).json({message:"server error"})
    }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully!"})
    }
    catch(error){
        console.log(error.message)

    }
}

export const updateprofile = async (req, res) => {
    try {
      const { profilepic } = req.body;
      const userId = req.user._id;
  
      if (!profilepic) {
        return res.status(400).json({ message: "No profile picture provided" });
      }
  
      // Upload to Cloudinary
      const updateResponse = await cloudinary.uploader.upload(profilepic, {
        folder: "profile_pics",
        transformation: [{ width: 300, height: 300, crop: "limit" }]
      });
  
      // Update user profile in database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilepic: updateResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);  // Log full error object
      res.status(500).json({ message: "Profile update failed", error: error.message });
    }
  };
  

export const checkauth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

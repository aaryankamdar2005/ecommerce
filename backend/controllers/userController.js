const express= require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

const createToken = (id)=>{
return jwt.sign({id},process.env.SECRET_KEY);
}

// user login
const loginUser = async (req,res)=>{
try {
  const {email,password} = req.body;
const user = await userModel.findOne({email});

if(!user){
  return res.json({success:false,message:"user doesn't exist"});

}
const isMatch = await bcrypt.compare(password,user.password);
if(isMatch){
  const token = createToken(user._id);
  res.cookie("uid",token);
 
  res.json({success:true,token});
}
else {
  res.json({success:false,message:"invalid credentials"});
}
}
catch(error){
console.log(error);


}

}

// user reg 
const regUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check for required fields
      if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
      }
  
      // Check if the email already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "Email already exists" });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
  
      // Validate password strength
      if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 8 characters long" });
      }
  
      // Hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = await  new userModel({
        name,
        email,
        password: hashedPwd,
      });
  
      const savedUser = await newUser.save();
  
      // Generate JWT token
      const token = createToken(savedUser._id);
  
      // Respond with the user and token
      return res.json({
        success: true,
        message: "User registered successfully",
        user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error.message });
    }
  };
  

// admin login

const adminLogin = async(req,res)=>{

  try {
    const {email,password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign({email},process.env.SECRET_KEY);
return res.end("hello")
    }
    else {
    return   res.end("invalid credentials");
    }
  }
  catch(error){
    console.log(error);
  }
 


}

module.exports = {
    loginUser,
regUser,adminLogin}
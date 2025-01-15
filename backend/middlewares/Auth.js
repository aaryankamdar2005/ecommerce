const express = require('express');

const jwt  = require('jsonwebtoken');

const authUser =async (req,res,next)=> {

    const token =req.cookies?.uid;
    
if(!token) {
    return res.json({success:false,message:"kindly login"});
}
try { 
    const isValid  = jwt.verify(token,process.env.SECRET_KEY);
    
if(!isValid) {
    return res.json({success:false,message:"invalid credentials"});
}

req.user = isValid;

next();


}
catch(error) {
    return res.json({success:false,message:error.message});


}

}

module.exports=authUser;

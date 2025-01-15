const express = require('express');
const jwt = require('jsonwebtoken');

const adminAuth = async (req,res)=>{
    try {
const token = req.headers;

if(!token) {
    return res.json("not authorized");

}
const token_decode = jwt.verify(token,process.env.SECRET_KEY);
if(token_decode !== process.env.ADMIN_EMAIL){
    return res.json("not authorized");
}
next();
    }
    catch(error){
console.log(error);
    }
}
module.exports = adminAuth;

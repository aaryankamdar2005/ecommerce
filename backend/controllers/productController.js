const express = require('express');
const productModel = require('../models/productModel');

const cloudinary = require('cloudinary').v2;
// add product

const addProduct = async(req,res)=>{

try {
    const {name,description,price,category,subCategory,sizes,bestseller} = req.body;
const image1 = req.files.image1 && req.files.image1[0];
const image2 = req.files.image2 && req.files.image2[0];
const image3 = req.files.image3 && req.files.image3[0];
const image4 = req.files.image4 && req.files.image4[0];
console.log(name,description,price,category,subCategory,sizes,bestseller);
const images = [image1,image2,image3,image4].filter((item)=>item!=undefined);
console.log({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
let imagesUrl = await Promise.all(
  images.map(async (item)=>{
    let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
    return result.secure_url;
  })
)
console.log(imagesUrl);
const productData = {
  name,
  description,
  category,
  price:Number(price),
  subCategory,
  bestseller:bestseller === "true" ? true :false,
  sizes:sizes || [], // modify this to JSON.parse(sizes)
  image:imagesUrl,
  date:Date.now()
}
const prData = await productModel.create({
  // correct this 
  
    name,
    description,
    category,
    price: 100,
    subCategory,
    bestseller: bestseller === "true", // Ensure boolean conversion
    sizes: sizes ? JSON.parse(sizes) : [], // Ensure sizes is an array
    image: imagesUrl,
    date: Date.now(),
 
  
})
console.log(productData);
return res.json({success:true,message:"works"})
}
catch(error) {
console.log(error);
return res.json({success:false,message:"someerror"})

}
}

// list product 
const listProduct = async(req,res)=>{
  try {
const products = await productModel.find({});

return res.json({success:true,products});


  }
  catch(error){
return res.json({success:false,message:error.message});
  }

}
 // remove product 

 const removeProduct = async(req,res)=>{

try {
await productModel.findByIdAndDelete(req.body.id);

return res.json({success:true,message:"product removed"});

}
catch(error){
  return res.json({success:false,message:error.message});
}

 }
  //  single product info

  const singleProduct =async (req,res) => {
    try {
     const singlePrd =  await productModel.findByIdAndDelete(req.body.id);
      
    return res.json({success:true,singlePrd});

      
      }
      catch(error){
        return res.json({success:false,message:error.message});
      }

  }

  module.exports= {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct,

  }
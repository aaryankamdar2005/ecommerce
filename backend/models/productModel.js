const mongoose = require('mongoose');

const productSchema  = new mongoose.Schema({
 name : {
    type:String,
    

 },
 description : {
type:String,


 },
 price:{
    type:Number,
 
 },
 image: {
    type:Array,
 

 },

 category: {
    type:String,
   
 },
 
 subCategory: {
    type:String,
    
 },
 sizes: {
    type:Array,
   
 },
 bestseller: {
    type:Boolean,
 },
 date: {
    type:Number,
  
 },
   
 
});


// add required true to all later 

const productModel = mongoose.model("product",productSchema);

module.exports = productModel;

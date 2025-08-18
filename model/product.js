import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name: String,  
category: String,  
description: String,  
price: Number,  
actualPrice: Number,  
image: String,  
stock: Number,  
rating: Number
},
{timestamps : true}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
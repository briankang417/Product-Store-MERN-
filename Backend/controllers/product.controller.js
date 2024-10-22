import Product from "../models/Product.model.js";
import mongoose from 'mongoose';


//find and return product based on id
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); //empty bracket means fetch all products
        res.status(200).json({success: true, data: products});
    } 
    catch (error) {
        console.log("Error in fetching products: ", error.message); //for debugging purpose
        res.status(500).json({success: false, message: "Server Error"});
    }
};

//create new product and store in database
export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succes:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }
    catch(error){
        console.error("Error in Create product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

//update product parameters
export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"}); 
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch (error){
        res.status(500).json({sucess: false, message: "Server Error"});
    }
};

//delete product from database
export const deleteProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"}); 
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Successfully Deleted"});
    }
    catch (error) { //catch if id/product is not found
        console.log("Error in deleting product: ", error.message);
        res.status(500).json( {success: false, message: "Server Error"});
    }
};
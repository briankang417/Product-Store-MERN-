import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
    name: { //required attribute of name of product
        type: String,
        required: true,
    },
    price: { //required attribute of price of product
        type: Number,
        required: true,
    },
    image: { //required attribute of image of product
        type: String,
        required: true,
    },
}, 
{
    timestamps: true, //createdAt, updatedAt to hold created at time and updated at time
}
);

const Product = mongoose.model("Product", productSchema); //says to mongoose you should create a collection called product and use given Product Schema
//mongoose just wants singular name of collection 
export default Product;
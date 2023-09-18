const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId :{
        type: String
    },
    productName : {
        type: String
    },
    images :{
        type: [String]
    },
    productDes : {
        type: String
    },
    mrp: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    varientTypes: [
        mongoose.Schema.Types.Mixed
    ],
    varients: [
        mongoose.Schema.Types.Mixed 
    ],
    history: {
        type: [String]
    }
},{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
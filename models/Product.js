const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const ProductSchema=new Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
        uniqued: true
    },
    type :{
        type: String,
    },
    quantityDM:{
        type: Number,
        required:true
    },
    quantityDL:{
        type: Number,
        required: true
    },
    quantityDXL:{
        type: Number,
        required: true
    },
    quantityTM:{
        type: Number,
        required: true
    },
    quantityTL:{
        type: Number,
        required: true
    },
    quantityTXL:{
        type: Number,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        retuired: true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    image4:{
        type:String,
        required:true
    },
    createAt:{
        type: Date,
        default: new Date()
    }
})

const Product=mongoose.model('Product',ProductSchema)
module.exports=Product
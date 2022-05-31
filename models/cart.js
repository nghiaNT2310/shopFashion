const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const CartSchema=new Schema({
    userId:{
        type: String,
        required:true
    },
    products:[{ type: Schema.Types.ObjectId, ref: 'Product' }],
    size:[],
    color:[],
    number:[]
})

const Cart=mongoose.model('Cart',CartSchema)
module.exports=Cart
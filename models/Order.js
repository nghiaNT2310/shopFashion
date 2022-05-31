const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const OrderSchema=new Schema({
    userId:{
        type: String,
        required:true
    },
    products:[{ type: Schema.Types.ObjectId, ref: 'Product' }],
    size:[],
    color:[],
    number:[],
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    totalMoney:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Chờ xác nhận"
    },
    createAt:{
        type: Date,
        default: new Date()
    },code:{
        type: String
    }
})

const Order=mongoose.model('Order',OrderSchema)
module.exports=Order
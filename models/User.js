const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const Schema=mongoose.Schema;
const UserSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    lock: {
        type: Number,
        default: 0
    },
    TimeEndLock: {
        type: Date,
        default:new Date()
    },
    image:{
        type: String
    }
})

UserSchema.pre('save',function(next){
    const user=this
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash
        next()
    })
})

const User=mongoose.model('User',UserSchema)
module.exports=User
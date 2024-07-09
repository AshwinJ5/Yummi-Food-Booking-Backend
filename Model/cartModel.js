const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
  productName:{
    type:String,
    required:true,
  },
  id:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  productDescription:{
    type:String,
    required:true
  },
  vegOrNonveg:{
    type:Boolean,
    required:true
  },
  productImage:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true
  },
  userId:{
    type:String,
    required:true
  }
})
const carts=mongoose.model("carts",cartSchema)
module.exports=carts
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
  productName:{
    type:String,
    required:true,
    unique:true
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
    type:String,
    required:true
  },
  productImage:{
    type:String,
    required:true
  }
})
const products=mongoose.model("products",productSchema)
module.exports=products
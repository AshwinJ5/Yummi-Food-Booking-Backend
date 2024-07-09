const products=require("../Model/productModel")

//get home products 

exports.getHomeProducts=async(req,res)=>{
    try {
        const result= await products.find().limit(3)  
        res.status(200).json(result)
} catch (error) {
        res.status(400).json(error)
    }
}

//get all products 

exports.getAllProducts=async(req,res)=>{
    const search=req.query.search
    const query={
        productName:{$regex:search,$options:"i"}
    }
    try {
        const result= await products.find(query) 
        res.status(200).json(result)
} catch (error) {
        res.status(400).json(error)
    }
}

//get all products admin

exports.getAllProductsAdmin=async(req,res)=>{

    try {
        const result= await products.find() 
        res.status(200).json(result)
} catch (error) {
        res.status(400).json(error)
    }
}
//get  a single product

exports.getAProduct=async(req,res)=>{
    const {pid}=req.params
    console.log(req);
    try {
        const result= await products.findById(pid)  
        res.status(200).json(result)
} catch (error) {
        res.status(400).json(error)
    }
}

//add new product
exports.addNewProduct=async (req,res)=>{
    const{
        productName,type,price,productDescription,vegOrNonveg,productImage
    }=req.body
    try {
        const existingFood=await products.findOne({productName})
        if (existingFood) {
            res.status(406).json("Products already exists....")
        } else {
            const newProduct=new products({
                productName,type,price,productDescription,vegOrNonveg,productImage
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


//delete  a product 
exports.deleteAProduct=async(req,res)=>{
    try {
        const{pid}=req.params
        const result=await products.findByIdAndDelete(pid)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

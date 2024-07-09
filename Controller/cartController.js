const carts = require('../Model/cartModel');

// Add user cart
exports.addUserCart = async (req, res) => {
    const {
        productName,id,type,price,productDescription,vegOrNonveg,productImage,quantity,totalAmount,userId
    } = req.body;

    // console.log("Inside cart controller function");
    // console.log("Request body:", req.body);
    const existingFood=await carts.findOne({id:id,userId:userId})
    if (existingFood) {
            console.log(existingFood);
            res.status(406).json(`Product already exist in cart`)
        } else {

            if (!productName || !id || !type || !price || !productDescription || !vegOrNonveg || !productImage || !quantity || !totalAmount || !userId) {
                // console.error("Missing  cart details");
            res.status(400).json({ error: "Missing  cart details"});
            }
            try {
                // Create cart
                const newCart = new carts({
                    productName,id,type,price,productDescription,vegOrNonveg,productImage,quantity,totalAmount,userId
                });

                await newCart.save();
                // console.log("Cart successfully updated");
                res.status(200).json(newCart);
            } catch (error) {
                // console.error("Error in creating cart:", error);
                res.status(500).json({ error: "Internal server error" });
            }
}}


//get users all product in cart
exports.getUsersAllCartProducts=async(req,res)=>{
    try {
        const  userId=req.payload
        const result=await carts.find({userId})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}


//delete  a product in cart
exports.deleteAProductInCart=async(req,res)=>{
    try {
        const{pid}=req.params
        const result=await carts.findByIdAndDelete(pid)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}


//delete  all products in users cart
exports.deleteAllProductInCart=async(req,res)=>{
    try {
        const{pid}=req.params
        const result=await carts.deleteMany({userId:pid})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}




// update quantity & subtotal
exports.updateUserCartDetails = async (req, res) => {
    const {
        quantity,totalAmount
    } = req.body;
    const{pid}=req.params


            try {
                const updateCart = await carts.findByIdAndUpdate({_id:pid},{
                    quantity,totalAmount
                },{new:true})

                await updateCart.save()
                res.status(200).json(updateCart)
            } catch (error) {
                res.status(500).json(error)
            }
}
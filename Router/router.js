const express=require('express')
const router=express.Router()
const productController=require('../Controller/productController')
const userController=require('../Controller/userController')
const adminController=require('../Controller/adminController')
const cartController=require('../Controller/cartController')
const bookingController=require('../Controller/bookingController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const razorpayPayment  = require('../Payments/razorpay')

//get home products
router.get('/homeproducts',productController.getHomeProducts)

//get all products
router.get('/allproducts',productController.getAllProducts)

//get all products for admin
router.get('/allproduct',productController.getAllProductsAdmin)

//get all users for admin
router.get('/allusers',jwtMiddleware,userController.getAllUsers)

//delete product for admin
router.delete('/deleteadmin/:pid',jwtMiddleware,productController.deleteAProduct)

//get a product detail
router.get('/product/:pid',productController.getAProduct)

//user register
router.post('/user/register',userController.userRegister)

//admin register
router.post('/admin/register',adminController.adminRegister)

//user login
router.post('/user/login',userController.userLogin)

//admin login
router.post('/admin/login',adminController.adminLogin)

//add cart
router.post('/addtocart',jwtMiddleware,cartController.addUserCart)

//get users all product in cart
router.get('/cartitems',jwtMiddleware,cartController.getUsersAllCartProducts)

//delete a product in cart
router.delete('/deletecart/:pid',jwtMiddleware,cartController.deleteAProductInCart)

//delete all products in cart
router.delete('/deleteall/:pid',jwtMiddleware,cartController.deleteAllProductInCart)

//edit cart quantity and totalAmount
router.put('/updatecart/:pid',jwtMiddleware,cartController.updateUserCartDetails)

//add booking
router.post('/booking',jwtMiddleware,bookingController.addProductBooking)

//get users all bookings
router.get('/allbookings',jwtMiddleware,bookingController.getUsersBooking)

//get  all bookings for admin
router.get('/allbookingsadmin',jwtMiddleware,bookingController.getAllBooking)

//add new product
router.post('/addnew',jwtMiddleware,productController.addNewProduct)

// delete a product
router.delete('/deleteproduct/:pid',jwtMiddleware,productController.deleteAProduct)


//payment routing
router.post('/create-order',razorpayPayment.razorpayPayment);


module.exports=router
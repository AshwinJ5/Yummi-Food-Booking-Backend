const users= require('../Model/userModel')
const jwt= require('jsonwebtoken')

// // // // register

exports.userRegister=async (req,res)=>{
    const{username,email,password}=req.body

    // console.log('inside register');

    // check email already exist
    try {
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json('User Already Exist! Please Login..')
        } else {
            const newUser= new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// // // // login
exports.userLogin=async(req,res)=>{
    const{email,password}=req.body
      // check email already exist
      try {
        const existingUser=await users.findOne({email,password})
        console.log(existingUser);
        if (existingUser) {
            //generate token
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({existingUser,token})
        } else {          
            res.status(406).json('Email & Passsward does not match')
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//get all users

exports.getAllUsers=async(req,res)=>{

    try {
        const result= await users.find() 
        res.status(200).json(result)
} catch (error) {
        res.status(400).json(error)
    }
}

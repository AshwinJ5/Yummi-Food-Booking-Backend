const express=require("express")
const cors=require("cors")
require("dotenv").config()
require("./Connection/connection")
const router=require("./Router/router")

const yummiServer=express()
yummiServer.use(cors())
yummiServer.use(express.json())
yummiServer.use(router)

const PORT= 3000 ||process.env.PORT

yummiServer.listen(PORT,()=>{
    console.log(`Yummi Sever started listening at port: ${PORT}`);
})

yummiServer.get('/',(req,res)=>{
    res.send('<h1>Yummi Server Is Live here......</h1>')
})
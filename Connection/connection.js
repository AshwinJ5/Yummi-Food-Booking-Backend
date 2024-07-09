const mongoose=require("mongoose")
const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDb Successfully connected with Yummi Server");
}).catch((error)=>{
    console.log(`MongoDb Connection Failed, Error: ${error}`);
})
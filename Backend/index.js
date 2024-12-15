import express from "express" 
import dotenv from "dotenv"  
import mongoose from "mongoose" 
import bookRoute from "./router/book_route.js"  
import userRoute from "./router/user_route.js" 

import cors from "cors" 

const app = express() 

app.use(cors())
app.use(express.json()) 

dotenv.config(); 

const port = process.env.PORT || 4000 
const URI = process.env.MONGO_URI 
// 
try{
   mongoose.connect(URI) 
   console.log("Connected to mongodb")
}catch(error){
  console.log(error) 
}  

app.use("/book",bookRoute); 
app.use("/user",userRoute) 

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
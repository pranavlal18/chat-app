import mongoose from "mongoose"
import dotenv from "dotenv"
export const connectDB = async()=> {
    try{
        const con= await mongoose.connect(process.env.MOGODB_URI)
        console.log(`connected succesfully to ${con.connection.host}`)
    }
    catch(error){
        console.log(`there is an ${error}`)


    }
}
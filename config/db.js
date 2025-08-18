import mongoose from "mongoose";
async function connectdb() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected")
    } catch(error){
        console.log("Mongo Connection Failed",error)
    }
}


export default connectdb;
import mongoose from "mongoose";

async function connectdb() {
    try {
        console.log("🔄 Connecting to MongoDB Atlas...");
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000 // 5 seconds mein fail ho jayega agar connect nahi hua
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Mongo Connection Failed:", error.message);
        process.exit(1); 
    }
}

export default connectdb;
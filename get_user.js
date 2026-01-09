import mongoose from "mongoose";
import User from "./model/user.js";
import dotenv from "dotenv";

dotenv.config();

async function getLastUser() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    // Find the most recently created user
    const user = await User.findOne().sort({ _id: -1 });
    
    if (user) {
      console.log("LOGIN_EMAIL=" + user.email);
    } else {
      console.log("No users found.");
    }

  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

getLastUser();

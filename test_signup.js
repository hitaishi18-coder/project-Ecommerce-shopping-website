import mongoose from "mongoose";
import User from "./model/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

async function testSignup() {
  try {
    console.log("1. Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB Connected");

    const testUser = {
      name: "Test User",
      email: "test" + Date.now() + "@example.com",
      password: "TestPassword123!"
    };

    console.log("2. Checking if user exists...");
    const userExist = await User.findOne({ email: testUser.email });
    if (userExist) {
      console.log("User already exists (unexpected for random email)");
      return;
    }

    console.log("3. Hashing password...");
    // Explicitly test bcryptjs
    const hashedPass = await bcrypt.hash(testUser.password, 10);
    console.log("✅ Password hashed");

    console.log("4. Saving user...");
    const newUser = new User({ 
      name: testUser.name, 
      email: testUser.email, 
      password: hashedPass 
    });

    await newUser.save();
    console.log("🎉 SUCCESS: User created successfully!");
    console.log("Saved User:", newUser);

  } catch (error) {
    console.error("❌ SETUP FAILED:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testSignup();

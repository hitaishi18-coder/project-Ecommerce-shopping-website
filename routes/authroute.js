import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";

const router = express.Router()

//  Sign up route
router.post("/signup", async (req, res) => {
  console.log("📥 [1] Signup Request Received");
  console.log("📥 [2] Body:", req.body);

  const { name, email, password } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      console.log("❌ [Error] Missing fields:", { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user
    console.log("🔍 [3] Checking if user exists...");
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("⚠️ [User Exists] Email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    console.log("🔐 [4] Hashing password...");
    if (typeof password !== 'string') {
        throw new Error("Password must be a string");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    console.log("✅ [5] Password hashed");

    // Save User
    console.log("💾 [6] Saving to MongoDB...");
    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();
    console.log("🎉 [7] User saved successfully!");

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ [CRITICAL ERROR]:", err);
    // Send the actual error message back for debugging (temporary)
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

//  Sign in route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  Pehle check karo user exist karta hai ya nahi
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    //  User ka password match karo (entered vs hashed)
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    //  Agar login successful hai to session set karo
    req.session.isLoggedIn = true;
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
    };

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: "Error during login" });
  }
});

//  Sign out route
router.post("/signout",(req,res)=> {
  req.session.destroy(err => {
    if(err){
      return res.status(500).json({message: "logout failed"})
    }  
    res.clearCookie("connect.sid") //  Session cookie clear karna
    res.status(200).json({message: " logged out "})
  })
})

//  Profile route
router.get("/profile", (req,res)=>{
  if(req.session.isLoggedIn){
    const { name, email } = req.session.user;
    res.json({ name, email }) //  Session me stored user info bhejna
  } else {
    res.status(401).json({ message: "unauthorised" }) //  Agar login nahi hai
  }
})

export default router;

import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";

const router = express.Router()

// Sign up route
router.post("/signup", async (req, res) => {
  console.log("📥 [1] Signup Request Received");
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("🔍 [3] Checking if user exists...");
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔐 [4] Hashing password...");
    const hashedPass = await bcrypt.hash(password, 10);

    console.log("💾 [6] Saving to MongoDB...");
    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();
    console.log("🎉 [7] User saved successfully!");

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ [CRITICAL ERROR]:", err);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // FIX: Store the name in the session so the profile route can find it
    req.session.isLoggedIn = true;
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name, // Added this line
    };

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: "Error during login" });
  }
});

// Sign out route
router.post("/signout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "logout failed" })
    }
    res.clearCookie("connect.sid")
    res.status(200).json({ message: " logged out " })
  })
})

// Profile route
router.get("/profile", (req, res) => {
  if (req.session.isLoggedIn && req.session.user) {
    const { name, email } = req.session.user;
    res.json({ name, email }) 
  } else {
    res.status(401).json({ message: "unauthorised" })
  }
})

export default router;
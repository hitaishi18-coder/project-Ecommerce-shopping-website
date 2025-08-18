import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const router = express.Router()

//  Sign up route
router.post("/signup", async (req, res) => {
  console.log("📥 /signup hit", req.body);

  const { name, email, password } = req.body;

  try {
    //  Pehle check karo user already exist karta hai ya nahi
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Password ko hash karna (10 salt rounds ke saath)
    const hashedPass = await bcrypt.hash(password, 10) 
    //  plain text password ko kabhi DB me store nahi karte

    //  New user create karo
    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();
    console.log("user saved", newUser)

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Error while creating user" });
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

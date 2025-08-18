import express from "express";
import Contact from "../model/contact.js";

const router = express.Router();

//  Contact form route (POST request)
router.post("/", async (req, res) => {
  console.log("📥 Contact form data received:", req.body);

  //  User ke input nikal lo request body se
  const { name, email, subject, message } = req.body;

  try {
    //  New Contact document create karo
    const contactInfo = new Contact({ name, email, subject, message });

    //  DB me save kar do
    await contactInfo.save();

    // Success response
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    //  Agar error aaya toh console me show karo aur client ko error bhejo
    console.error("⚠️ Something went wrong while saving contact:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

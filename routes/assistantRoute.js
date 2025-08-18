import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// API endpoint: POST /gemini
router.post("/gemini", async (req, res) => {
  try {
    const { message } = req.body;

    //  Agar user ne message hi nahi bheja
    if (!message) return res.status(400).json({ error: "Message is required" });

    const lower = message.toLowerCase(); 
    //  lowercase me convert kar rahe hain taaki keyword check easy ho

    //  Manual keyword-based fashion suggestions
    if (lower.includes("wedding")) {
      return res.json({ reply: "For a wedding, try a classy pastel dress or a tailored suit. Avoid white unless it's asked!" });
    } 
    if (lower.includes("casual")) {
      return res.json({ reply: "Go with jeans, a basic tee, and sneakers. Add a denim jacket for style." });
    } 
    if (lower.includes("party")) {
      return res.json({ reply: "Choose something bold like a shimmer dress or a sleek blazer outfit." });
    }

    //  Agar keywords match nahi huye → Gemini AI ko call karenge
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //  API key environment variable se le rahe hain

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    //  Gemini ka "flash" model use kar rahe (fast replies ke liye)

    const result = await model.generateContent(message);
    //  User ke message ka AI se jawab manga

    //  Safe navigation se AI ka reply nikal rahe, fallback "No AI reply"
    const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI reply";

    res.json({ reply }); 
    //  Response user ko bheja
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API error" });
    // Agar kuch bhi galat ho gaya to 500 error bhej dega
  }
});

export default router;

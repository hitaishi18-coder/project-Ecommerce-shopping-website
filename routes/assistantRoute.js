import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

// API endpoint: POST /gemini (keeping same endpoint for compatibility)
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

    //  Agar keywords match nahi huye → Groq AI ko call karenge
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
    //  API key environment variable se le rahe hain

    //  Groq ka fast model use kar rahe (llama-3.3-70b-versatile is very fast and accurate)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful fashion assistant. Provide concise, stylish fashion advice and outfit recommendations."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile", // Fast and powerful model
      temperature: 0.7,
      max_tokens: 500,
    });

    //  Groq se reply nikal rahe, fallback "No AI reply"
    const reply = chatCompletion?.choices?.[0]?.message?.content || "No AI reply";

    res.json({ reply }); 
    //  Response user ko bheja
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq API error" });
    // Agar kuch bhi galat ho gaya to 500 error bhej dega
  }
});

export default router;

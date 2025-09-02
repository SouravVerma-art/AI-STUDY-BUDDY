const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("✅ This port is working Properly.....")

const app = express();
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// Route: Ask AI
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const result = await model.generateContent(
      `You are a study buddy for a 6th grade student. 
       Explain this in very simple words: ${question}`
    );

    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

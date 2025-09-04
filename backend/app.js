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

// Route: Generate Quiz
app.post("/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty = "beginner", questionCount = 5 } = req.body;

    const prompt = `Create a ${difficulty} level quiz about "${topic}" with ${questionCount} multiple choice questions. 
    Format your response as JSON with this structure:
    {
      "quiz": [
        {
          "question": "Question text",
          "options": ["A", "B", "C", "D"],
          "correct": 0,
          "explanation": "Why this is correct"
        }
      ]
    }
    Keep it simple for 6th grade level.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Try to parse JSON from the response
    try {
      const cleanedResponse = response.replace(/```json|```/g, '').trim();
      const quizData = JSON.parse(cleanedResponse);
      res.json(quizData);
    } catch (parseError) {
      // If JSON parsing fails, return raw response
      res.json({ quiz: response });
    }
  } catch (error) {
    console.error("❌ Quiz Generation Error:", error.message);
    res.status(500).json({ error: "Quiz generation failed" });
  }
});

// Route: Summarize Text
app.post("/summarize", async (req, res) => {
  try {
    const { text, length = "medium" } = req.body;

    let lengthInstruction;
    switch(length) {
      case "short": lengthInstruction = "in 2-3 sentences"; break;
      case "long": lengthInstruction = "in detailed paragraphs"; break;
      default: lengthInstruction = "in 1 paragraph"; break;
    }

    const result = await model.generateContent(
      `Summarize the following text ${lengthInstruction} for a 6th grade student. 
      Make it easy to understand:

${text}`
    );

    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error("❌ Summarization Error:", error.message);
    res.status(500).json({ error: "Summarization failed" });
  }
});

// Route: Generate Flashcards
app.post("/generate-flashcards", async (req, res) => {
  try {
    const { topic, cardCount = 10 } = req.body;

    const prompt = `Create ${cardCount} flashcards about "${topic}" for a 6th grade student.
    Format as JSON:
    {
      "flashcards": [
        {
          "front": "Question or term",
          "back": "Answer or definition",
          "hint": "Optional helpful hint"
        }
      ]
    }
    Make them educational and age-appropriate.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      const cleanedResponse = response.replace(/```json|```/g, '').trim();
      const flashcardData = JSON.parse(cleanedResponse);
      res.json(flashcardData);
    } catch (parseError) {
      res.json({ flashcards: response });
    }
  } catch (error) {
    console.error("❌ Flashcard Generation Error:", error.message);
    res.status(500).json({ error: "Flashcard generation failed" });
  }
});

// Route: Explain Concept
app.post("/explain", async (req, res) => {
  try {
    const { concept, context = "" } = req.body;

    const result = await model.generateContent(
      `You are a friendly teacher. Explain "${concept}" to a 6th grade student in simple terms.
      ${context ? `Context: ${context}` : ''}
      Use examples, analogies, and simple language. Make it engaging and easy to understand.`
    );

    res.json({ explanation: result.response.text() });
  } catch (error) {
    console.error("❌ Explanation Error:", error.message);
    res.status(500).json({ error: "Explanation failed" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "✅ AI Study Buddy Backend is running!", 
    timestamp: new Date().toISOString(),
    endpoints: [
      "POST /ask - Ask AI questions",
      "POST /generate-quiz - Generate quizzes", 
      "POST /summarize - Summarize text",
      "POST /generate-flashcards - Create flashcards",
      "POST /explain - Explain concepts"
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Using FREE Google Gemini AI API`);
});

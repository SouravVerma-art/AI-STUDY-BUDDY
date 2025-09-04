// Test script for AI Study Buddy API endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Testing AI Study Buddy API Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data.status);
    console.log('📝 Available endpoints:', health.data.endpoints.length);

    // Test ask endpoint
    console.log('\n2. Testing Ask AI...');
    const askResponse = await axios.post(`${BASE_URL}/ask`, {
      question: "What is photosynthesis?"
    });
    console.log('✅ Ask AI response received');
    console.log('📄 Answer preview:', askResponse.data.answer.substring(0, 100) + '...');

    // Test quiz generation
    console.log('\n3. Testing Quiz Generation...');
    const quizResponse = await axios.post(`${BASE_URL}/generate-quiz`, {
      topic: "Solar System",
      difficulty: "beginner",
      questionCount: 3
    });
    console.log('✅ Quiz generated successfully');

    // Test summarization
    console.log('\n4. Testing Text Summarization...');
    const summaryResponse = await axios.post(`${BASE_URL}/summarize`, {
      text: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. This process is essential for life on Earth as it provides food for plants and oxygen for animals to breathe.",
      length: "short"
    });
    console.log('✅ Text summarized successfully');
    console.log('📝 Summary:', summaryResponse.data.summary);

    // Test flashcard generation
    console.log('\n5. Testing Flashcard Generation...');
    const flashcardsResponse = await axios.post(`${BASE_URL}/generate-flashcards`, {
      topic: "Basic Math",
      cardCount: 3
    });
    console.log('✅ Flashcards generated successfully');

    // Test concept explanation
    console.log('\n6. Testing Concept Explanation...');
    const explainResponse = await axios.post(`${BASE_URL}/explain`, {
      concept: "Gravity",
      context: "for elementary science class"
    });
    console.log('✅ Concept explained successfully');
    console.log('📚 Explanation preview:', explainResponse.data.explanation.substring(0, 100) + '...');

    console.log('\n🎉 All endpoints are working perfectly!');
    console.log('💰 Using FREE Google Gemini API - no costs!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testEndpoints();

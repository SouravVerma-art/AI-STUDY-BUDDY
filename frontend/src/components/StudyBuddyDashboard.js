import React, { useState, useEffect } from "react";
import axios from "axios";

function StudyBuddyDashboard() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ask");
  
  // Ask AI state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  // Quiz state
  const [quizTopic, setQuizTopic] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState("beginner");
  const [quizCount, setQuizCount] = useState(5);
  const [quiz, setQuiz] = useState(null);
  
  // Summarize state
  const [textToSummarize, setTextToSummarize] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [summary, setSummary] = useState("");
  
  // Flashcards state
  const [flashcardTopic, setFlashcardTopic] = useState("");
  const [flashcardCount, setFlashcardCount] = useState(10);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Explain concept state
  const [concept, setConcept] = useState("");
  const [context, setContext] = useState("");
  const [explanation, setExplanation] = useState("");
  
  // API status
  const [apiStatus, setApiStatus] = useState({
    status: "Checking...",
    isOnline: false
  });

  // Check API status on load
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/health");
      setApiStatus({
        status: response.data.status,
        isOnline: true
      });
    } catch (error) {
      setApiStatus({
        status: "❌ Backend API is offline",
        isOnline: false
      });
    }
  };

  // Ask AI handler
  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/ask", { question });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("⚠️ Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Quiz handler
  const generateQuiz = async () => {
    if (!quizTopic.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-quiz", { 
        topic: quizTopic,
        difficulty: quizDifficulty,
        questionCount: quizCount
      });
      setQuiz(res.data.quiz);
    } catch (error) {
      setQuiz([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate Summary handler
  const generateSummary = async () => {
    if (!textToSummarize.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/summarize", { 
        text: textToSummarize,
        length: summaryLength
      });
      setSummary(res.data.summary);
    } catch (error) {
      setSummary("⚠️ Summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Flashcards handler
  const generateFlashcards = async () => {
    if (!flashcardTopic.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-flashcards", { 
        topic: flashcardTopic,
        cardCount: flashcardCount
      });
      setFlashcards(res.data.flashcards);
      setCurrentCardIndex(0);
      setShowAnswer(false);
    } catch (error) {
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  // Explain Concept handler
  const explainConcept = async () => {
    if (!concept.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/explain", { 
        concept,
        context
      });
      setExplanation(res.data.explanation);
    } catch (error) {
      setExplanation("⚠️ Explanation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Flashcard navigation
  const nextFlashcard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevFlashcard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3">
          🤖 <span className="text-purple-700 drop-shadow-md">AI Study Buddy</span>
        </h1>
        <p className="text-gray-600 mt-2">Your FREE AI-powered study companion</p>
        <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${apiStatus.isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {apiStatus.isOnline ? '✅ Connected to FREE Gemini API' : '❌ Backend offline'}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto mb-4 bg-white rounded-lg shadow p-1">
        <button 
          onClick={() => setActiveTab("ask")}
          className={`flex-1 py-2 px-3 rounded-md font-medium ${activeTab === "ask" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          💬 Ask
        </button>
        <button 
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-2 px-3 rounded-md font-medium ${activeTab === "quiz" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          📝 Quiz
        </button>
        <button 
          onClick={() => setActiveTab("summarize")}
          className={`flex-1 py-2 px-3 rounded-md font-medium ${activeTab === "summarize" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          📖 Summarize
        </button>
        <button 
          onClick={() => setActiveTab("flashcards")}
          className={`flex-1 py-2 px-3 rounded-md font-medium ${activeTab === "flashcards" ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          🧠 Flashcards
        </button>
        <button 
          onClick={() => setActiveTab("explain")}
          className={`flex-1 py-2 px-3 rounded-md font-medium ${activeTab === "explain" ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          🔍 Explain
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 w-full max-w-4xl mx-auto flex-grow">
        {/* Ask Tab */}
        {activeTab === "ask" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-purple-700">💬 Ask a Question</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to learn about today?"
              className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              rows="4"
            />
            <button
              onClick={askAI}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">Thinking...</span> : "🚀 Ask Buddy"}
            </button>
            
            {answer && (
              <div className="mt-4 bg-purple-50 border-l-4 border-purple-400 p-4 rounded-xl">
                <h3 className="font-bold text-purple-700 mb-2">📘 Answer:</h3>
                <p className="text-gray-800 whitespace-pre-line">{answer}</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-700">📝 Generate a Quiz</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  placeholder="e.g., Solar System, Fractions, States of Matter"
                  className="w-full p-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select 
                    value={quizDifficulty}
                    onChange={(e) => setQuizDifficulty(e.target.value)}
                    className="w-full p-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Questions</label>
                  <select
                    value={quizCount}
                    onChange={(e) => setQuizCount(Number(e.target.value))}
                    className="w-full p-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button
              onClick={generateQuiz}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">Generating quiz...</span> : "🎯 Generate Quiz"}
            </button>
            
            {quiz && quiz.length > 0 && (
              <div className="mt-4 space-y-6">
                <h3 className="text-lg font-bold text-blue-700">Quiz on {quizTopic}</h3>
                
                {quiz.map((q, idx) => (
                  <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">Question {idx + 1}</h4>
                    <p className="mb-2">{q.question}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {q.options.map((option, optIdx) => (
                        <li 
                          key={optIdx}
                          className={`p-2 rounded-lg border ${optIdx === q.correct ? 'bg-green-100 border-green-400' : 'border-gray-300'}`}
                        >
                          {option} {optIdx === q.correct && '✓'}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <p className="text-sm font-semibold text-yellow-700">Explanation: {q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Summarize Tab */}
        {activeTab === "summarize" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-green-700">📖 Summarize Text</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Text to Summarize</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Summary Length:</span>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="text-sm p-1 border border-gray-300 rounded"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>
              
              <textarea
                value={textToSummarize}
                onChange={(e) => setTextToSummarize(e.target.value)}
                placeholder="Paste the text you want to summarize here..."
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                rows="6"
              />
            </div>
            
            <button
              onClick={generateSummary}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">Summarizing...</span> : "📝 Generate Summary"}
            </button>
            
            {summary && (
              <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-xl">
                <h3 className="font-bold text-green-700 mb-2">📋 Summary:</h3>
                <p className="text-gray-800">{summary}</p>
              </div>
            )}
          </div>
        )}

        {/* Flashcards Tab */}
        {activeTab === "flashcards" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-yellow-700">🧠 Flashcards</h2>
            
            {flashcards.length === 0 ? (
              <div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                    <input
                      type="text"
                      value={flashcardTopic}
                      onChange={(e) => setFlashcardTopic(e.target.value)}
                      placeholder="e.g., Multiplication, World Capitals, Vocabulary"
                      className="w-full p-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Cards</label>
                    <select
                      value={flashcardCount}
                      onChange={(e) => setFlashcardCount(Number(e.target.value))}
                      className="w-full p-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={generateFlashcards}
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center"
                >
                  {loading ? <span className="animate-pulse">Generating flashcards...</span> : "✨ Generate Flashcards"}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-yellow-700">
                    Flashcards: {flashcardTopic}
                  </h3>
                  <button
                    onClick={() => setFlashcards([])}
                    className="text-sm text-gray-500 hover:text-red-500"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center shadow-lg transition-all">
                  <div 
                    className={`w-full transition-all duration-300 transform ${showAnswer ? 'scale-105' : 'scale-100'}`}
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    {!showAnswer ? (
                      <>
                        <h4 className="text-xl font-bold text-yellow-800 mb-4">
                          Question:
                        </h4>
                        <p className="text-gray-800 text-lg">
                          {flashcards[currentCardIndex]?.front || "Loading..."}
                        </p>
                        <p className="text-sm text-gray-500 mt-4">Click to see answer</p>
                      </>
                    ) : (
                      <>
                        <h4 className="text-xl font-bold text-green-800 mb-4">
                          Answer:
                        </h4>
                        <p className="text-gray-800 text-lg">
                          {flashcards[currentCardIndex]?.back || "Loading..."}
                        </p>
                        {flashcards[currentCardIndex]?.hint && (
                          <div className="mt-4 bg-blue-50 p-2 rounded">
                            <p className="text-sm text-blue-700"><strong>Hint:</strong> {flashcards[currentCardIndex].hint}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={prevFlashcard}
                    disabled={currentCardIndex === 0}
                    className={`py-2 px-4 rounded-lg font-medium ${currentCardIndex === 0 ? 'bg-gray-200 text-gray-400' : 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'}`}
                  >
                    ← Previous
                  </button>
                  
                  <span className="py-2 px-4 bg-yellow-50 rounded-lg text-yellow-700">
                    {currentCardIndex + 1} of {flashcards.length}
                  </span>
                  
                  <button
                    onClick={nextFlashcard}
                    disabled={currentCardIndex === flashcards.length - 1}
                    className={`py-2 px-4 rounded-lg font-medium ${currentCardIndex === flashcards.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'}`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Explain Tab */}
        {activeTab === "explain" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-700">🔍 Explain a Concept</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concept to Explain</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g., Gravity, Photosynthesis, Democracy"
                className="w-full p-2 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Context (Optional)</label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., for a science project, homework help"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            
            <button
              onClick={explainConcept}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">Explaining...</span> : "🧩 Explain This"}
            </button>
            
            {explanation && (
              <div className="mt-4 bg-pink-50 border-l-4 border-pink-400 p-4 rounded-xl">
                <h3 className="font-bold text-pink-700 mb-2">📚 Explanation:</h3>
                <p className="text-gray-800 whitespace-pre-line">{explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>AI Study Buddy uses Google's FREE Gemini API - No cost to use!</p>
        <p className="mt-1">Created with ❤️ to make learning fun and accessible for everyone</p>
      </div>
    </div>
  );
}

export default StudyBuddyDashboard;

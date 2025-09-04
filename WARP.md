# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AI Study Buddy is a web application designed to help students learn through AI-powered interactions. The application consists of a React frontend and Express.js backend, with Google's Gemini AI providing intelligent responses tailored for 6th grade students.

## Architecture

### Frontend (React + Tailwind CSS)
- **Location**: `frontend/` directory
- **Entry Point**: `src/App.js` - minimal wrapper around ChatBox component
- **Main Component**: `src/components/ChatBox.js` - handles the entire user interface and API communication
- **Styling**: Tailwind CSS with custom gradient backgrounds and responsive design
- **API Communication**: Axios for HTTP requests to backend

### Backend (Node.js + Express)
- **Location**: `backend/` directory
- **Entry Point**: `app.js` - Express server with CORS enabled
- **AI Integration**: Google Gemini AI (gemini-1.5-flash model)
- **Single Endpoint**: `POST /ask` - processes questions and returns AI responses
- **AI Prompt**: Configured to act as a "study buddy for a 6th grade student" with simplified explanations

### Key Architectural Notes
- **Monorepo Structure**: Frontend and backend are separate directories with their own package.json files
- **Development Setup**: Requires running both frontend and backend servers simultaneously
- **API Configuration**: Frontend hardcoded to communicate with `http://localhost:5000`
- **AI Personality**: Gemini is prompted to provide age-appropriate responses for elementary students
- **Error Handling**: Basic error handling with user-friendly messages

## Development Commands

### Initial Setup
```bash
# Install all dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Environment Setup
```bash
# Create backend environment file
cd backend
# Add GEMINI_API_KEY=your_api_key_here to .env file
```

### Development
```bash
# Terminal 1: Start backend server
cd backend
node app.js

# Terminal 2: Start frontend development server
cd frontend
npm start
```

### Testing
```bash
# Run frontend tests
cd frontend
npm test
```

### Build and Deploy
```bash
# Build frontend for production
cd frontend
npm run build

# Deploy to GitHub Pages
cd frontend
npm run deploy
```

### Single Test Execution
```bash
# Run specific test files
cd frontend
npm test -- --testNamePattern="specific test name"
npm test -- --watchAll=false
```

## Environment Variables

### Backend (.env in backend/)
- `GEMINI_API_KEY` - Google Gemini AI API key (currently using free tier model gemini-1.5-flash)

## Development Ports
- **Frontend**: http://localhost:3000 (React development server)
- **Backend**: http://localhost:5000 (Express server)

## GitHub Pages Deployment
- **Homepage**: Configured for `https://souravverma-art.github.io/AI-STUDY-BUDDY`
- **Deploy Process**: `npm run predeploy && npm run deploy` (from frontend directory)
- **Repository**: https://github.com/SouravVerma-art/AI-STUDY-BUDDY.git

## Current Limitations & Architecture Considerations
- **Single Component Architecture**: The entire frontend UI is contained in one ChatBox component
- **No State Management**: Uses basic React useState for local state
- **No Routing**: Single-page application without navigation
- **Hardcoded API URL**: Frontend directly references localhost:5000
- **No Backend Routes**: Only one API endpoint implemented
- **Educational Focus**: AI responses are simplified for 6th-grade comprehension level

## Future Development Areas
When extending this application, consider:
- **Component Modularity**: Breaking ChatBox into smaller, reusable components
- **State Management**: Implementing Context API or Redux for complex state
- **API Abstraction**: Creating a service layer for backend communication
- **Environment Configuration**: Making API URLs configurable for different environments
- **Feature Expansion**: The README mentions planned features like quiz generation, flashcards, and lesson summarization that are not yet implemented

# Backend Deployment to Render.com

## Steps to Deploy:

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** and select "Web Service"
3. **Connect your GitHub repository**: `SouravVerma-art/AI-STUDY-BUDDY`
4. **Configure the service:**
   - **Name**: `ai-study-buddy-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Plan**: Free

5. **Add Environment Variables:**
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: 10000

6. **Click "Create Web Service"**

## After Deployment:
- Copy your backend URL (e.g., `https://ai-study-buddy-backend.onrender.com`)
- Update the frontend to use this URL
- Your frontend will be at: `https://souravverma-art.github.io/AI-STUDY-BUDDY`

## Note:
- Free tier has cold starts (first request might be slow)
- Service sleeps after 15 minutes of inactivity
- Perfect for development and testing!

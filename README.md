# 🚀 AI Prompt Enhancer - Full-Stack Vibe Coder Task

A high-performance Full-Stack landing page hero section that transforms rough website ideas into professional, production-ready prompts using **Google Gemini AI**. Designed with a focus on "Stunning" aesthetics and robust architecture.

---

## ✨ Key Features

- **AI-Powered Enhancement**: Leverages `gemini-pro` to generate structured, professional prompts.
- **Smart Language Detection**: Automatically detects Arabic or English input and responds in the same language.
- **Robust Fallback Engine**: A custom-built architectural logic that ensures the user receives high-quality value even if the AI service is unavailable.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Lucide icons, featuring a custom-themed scrollbar and smooth animations.
- **Developer Experience (DX)**: Single-command startup for both Frontend and Backend.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React.
- **Backend**: Node.js, Express, Google Generative AI SDK.
- **Tools**: Concurrently (for process management), Dotenv.

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18 or higher recommended).
- A Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/)).

### 2. Environment Setup

Create a `.env` file inside the `server` folder:

```env
GEMINI_API_KEY=your_api_key_here


# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Start both Frontend and Backend concurrently
npm start
```

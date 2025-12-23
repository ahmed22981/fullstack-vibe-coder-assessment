import express from "express";
import cors from "cors";
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

// Get the directory name of the current file (server/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force dotenv to look for .env in the current directory (server/.env)
dotenv.config({path: path.join(__dirname, ".env")});

const app = express();
app.use(cors());
app.use(express.json());

// Debug Log
console.log(
  "Loaded API Key:",
  process.env.GEMINI_API_KEY
    ? "Key exists (Success)"
    : "Key is undefined (Fail)"
);

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const FALLBACK_TEMPLATES = {
  en: {
    header: "--- STRATEGIC WEBSITE ARCHITECTURE ---",
    sections: {
      proposition: "1. Core Value Proposition",
      design: "2. Visual and Design Direction",
      modules: "3. Core UI/UX Modules",
      tech: "4. Technical Infrastructure",
    },
    details: {
      designStyle: "Modern Minimalism with high-fidelity components.",
      typography: "High-contrast Sans-serif system.",
      palette: "Deep Slate (#0F172A) and Electric Blue (#2563EB).",
      stack: "React.js with Tailwind CSS (Mobile-first).",
    },
  },
  ar: {
    header: "--- البنية الاستراتيجية للموقع ---",
    sections: {
      proposition: "1. عرض القيمة الأساسي",
      design: "2. التوجه البصري والتصميم",
      modules: "3. الأقسام الأساسية لواجهة المستخدم",
      tech: "4. البنية التحتية التقنية",
    },
    details: {
      designStyle: "بساطة حديثة (Minimalism) مع مكونات عالية الدقة.",
      typography: "نظام خطوط Sans-serif متباين.",
      palette: "الأزرق الداكن العميق (#0F172A) والأزرق الملكي (#2563EB).",
      stack: "React.js مع Tailwind CSS (استجابة كاملة).",
    },
  },
};

const formatFallbackResponse = (idea, lang = "en") => {
  const t = FALLBACK_TEMPLATES[lang];

  return `
${t.header}

Project Concept: ${idea}

${t.sections.proposition}
A premium digital solution for ${idea} designed to establish market authority through optimized UX.

${t.sections.design}
- Style: ${t.details.designStyle}
- Typography: ${t.details.typography}
- Color Palette: ${t.details.palette}

${t.sections.modules}
- Immersive Hero Section
- Feature Ecosystem
- Trust Architecture
- Strategic Footer

${t.sections.tech}
Recommended Stack: ${t.details.stack}
  `.trim();
};

app.post("/api/enhance", async (req, res) => {
  const {idea} = req.body;
  const isArabic = /[\u0600-\u06FF]/.test(idea);

  try {
    if (!genAI) {
      throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
    const prompt = `You are an expert website architect. Transform this website idea: "${idea}" into a professional, structured prompt. 
    Include: Value Proposition, Design Style, and UI Sections. 
    Constraint: The entire response must be written in ${
      isArabic ? "Arabic" : "English"
    } only.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({enhancedPrompt: text});
  } catch (err) {
    console.error("Gemini Error - Using Structured Fallback:", err.message);

    const fallbackText = formatFallbackResponse(idea, isArabic ? "ar" : "en");
    res.json({enhancedPrompt: fallbackText});
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

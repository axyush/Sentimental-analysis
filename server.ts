import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Sentiment AI Backend is running" });
  });

  // Sentiment Analysis Endpoint
  app.post("/api/analyze", async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text input is required" });
    }

    try {
      // In a real production app, this would call the Google Cloud Natural Language API.
      // For this architect demo, we use Gemini to simulate that service.
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the sentiment of the following text and return a JSON object with "sentiment" (Positive, Negative, or Neutral), "score" (a value between -1 and 1), and a brief "explanation". Text: "${text}"`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      // Simulate database persistence (as per architecture diagram)
      console.log(`[DB] Persisting result for text: "${text.substring(0, 20)}..."`);
      
      res.json(result);
    } catch (error) {
      console.error("Backend Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze sentiment" });
    }
  });

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server running on http://localhost:${PORT}`);
  });
}

startServer();

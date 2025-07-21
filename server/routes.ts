import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertEmotionAnalysisSchema } from "@shared/schema";
import { z } from "zod";

// Mock emotion detection service
function analyzeEmotion(text: string) {
  // Simple keyword-based emotion detection for demo
  const emotions = {
    happy: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'love', 'glad', 'pleased'],
    sad: ['sad', 'depressed', 'unhappy', 'disappointed', 'upset', 'down', 'blue', 'miserable'],
    angry: ['angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'irritated', 'outraged'],
    fear: ['afraid', 'scared', 'worried', 'anxious', 'nervous', 'terrified', 'frightened', 'panic'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned', 'wow', 'incredible'],
    neutral: ['okay', 'fine', 'normal', 'regular', 'standard', 'typical'],
  };

  const textLower = text.toLowerCase();
  const scores: Record<string, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    fear: 0,
    surprise: 0,
    neutral: 0.1, // Base neutral score
  };

  // Calculate emotion scores based on keyword matches
  Object.entries(emotions).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (textLower.includes(keyword)) {
        scores[emotion] += 0.3;
      }
    });
  });

  // Add some randomness for more realistic results
  Object.keys(scores).forEach(emotion => {
    scores[emotion] += Math.random() * 0.2;
  });

  // Normalize scores
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  Object.keys(scores).forEach(emotion => {
    scores[emotion] = scores[emotion] / total;
  });

  // Find primary emotion
  const primaryEmotion = Object.entries(scores).reduce((a, b) => 
    scores[a[0]] > scores[b[0]] ? a : b
  )[0];

  return {
    primaryEmotion,
    confidence: scores[primaryEmotion],
    emotions: scores,
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Emotion analysis endpoint
  app.post('/api/analyze-emotion', isAuthenticated, async (req: any, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Text is required" });
      }

      const userId = req.user.claims.sub;
      const analysis = analyzeEmotion(text);
      
      // Save to database
      const saved = await storage.createEmotionAnalysis({
        userId,
        text,
        primaryEmotion: analysis.primaryEmotion,
        confidence: analysis.confidence,
        emotions: analysis.emotions,
      });

      // Increment analysis count
      await storage.incrementAnalysisCount();

      res.json({
        id: saved.id,
        primaryEmotion: analysis.primaryEmotion,
        confidence: analysis.confidence,
        emotions: analysis.emotions,
        createdAt: saved.createdAt,
      });
    } catch (error) {
      console.error("Error analyzing emotion:", error);
      res.status(500).json({ message: "Failed to analyze emotion" });
    }
  });

  // Get user's emotion analysis history
  app.get('/api/user/analyses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const analyses = await storage.getUserEmotionAnalyses(userId, limit);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching user analyses:", error);
      res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  // Get user statistics
  app.get('/api/user/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserAnalysisStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get app statistics (public endpoint)
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getAppStats();
      
      if (!stats) {
        return res.json({
          totalUsers: 0,
          totalAnalyses: 0,
        });
      }

      res.json({
        totalUsers: stats.totalUsers,
        totalAnalyses: stats.totalAnalyses,
      });
    } catch (error) {
      console.error("Error fetching app stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

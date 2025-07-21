import {
  users,
  emotionAnalyses,
  appStats,
  type User,
  type UpsertUser,
  type EmotionAnalysis,
  type InsertEmotionAnalysis,
  type AppStats,
  type InsertAppStats,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Emotion analysis operations
  createEmotionAnalysis(analysis: InsertEmotionAnalysis): Promise<EmotionAnalysis>;
  getUserEmotionAnalyses(userId: string, limit?: number): Promise<EmotionAnalysis[]>;
  getUserAnalysisStats(userId: string): Promise<{
    totalAnalyses: number;
    mostCommonEmotion: string;
    weeklyCount: number;
  }>;
  
  // App statistics
  getAppStats(): Promise<AppStats | undefined>;
  updateAppStats(stats: Partial<InsertAppStats>): Promise<AppStats>;
  incrementAnalysisCount(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createEmotionAnalysis(analysis: InsertEmotionAnalysis): Promise<EmotionAnalysis> {
    const [result] = await db
      .insert(emotionAnalyses)
      .values(analysis)
      .returning();
    return result;
  }

  async getUserEmotionAnalyses(userId: string, limit = 10): Promise<EmotionAnalysis[]> {
    return await db
      .select()
      .from(emotionAnalyses)
      .where(eq(emotionAnalyses.userId, userId))
      .orderBy(desc(emotionAnalyses.createdAt))
      .limit(limit);
  }

  async getUserAnalysisStats(userId: string): Promise<{
    totalAnalyses: number;
    mostCommonEmotion: string;
    weeklyCount: number;
  }> {
    // Get total analyses count
    const [totalResult] = await db
      .select({ count: count() })
      .from(emotionAnalyses)
      .where(eq(emotionAnalyses.userId, userId));

    // Get most common emotion
    const emotionCounts = await db
      .select({
        emotion: emotionAnalyses.primaryEmotion,
        count: count(),
      })
      .from(emotionAnalyses)
      .where(eq(emotionAnalyses.userId, userId))
      .groupBy(emotionAnalyses.primaryEmotion)
      .orderBy(desc(count()));

    // Get weekly count (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const [weeklyResult] = await db
      .select({ count: count() })
      .from(emotionAnalyses)
      .where(
        sql`${emotionAnalyses.userId} = ${userId} AND ${emotionAnalyses.createdAt} >= ${weekAgo}`
      );

    return {
      totalAnalyses: totalResult.count,
      mostCommonEmotion: emotionCounts[0]?.emotion || "Neutral",
      weeklyCount: weeklyResult.count,
    };
  }

  async getAppStats(): Promise<AppStats | undefined> {
    const [stats] = await db.select().from(appStats).limit(1);
    return stats;
  }

  async updateAppStats(statsData: Partial<InsertAppStats>): Promise<AppStats> {
    const existing = await this.getAppStats();
    
    if (existing) {
      const [updated] = await db
        .update(appStats)
        .set({ ...statsData, updatedAt: new Date() })
        .where(eq(appStats.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(appStats)
        .values({ ...statsData, updatedAt: new Date() })
        .returning();
      return created;
    }
  }

  async incrementAnalysisCount(): Promise<void> {
    const existing = await this.getAppStats();
    
    if (existing) {
      await db
        .update(appStats)
        .set({ 
          totalAnalyses: sql`${appStats.totalAnalyses} + 1`,
          updatedAt: new Date() 
        })
        .where(eq(appStats.id, existing.id));
    } else {
      await db
        .insert(appStats)
        .values({ totalAnalyses: 1, totalUsers: 1 });
    }
  }
}

export const storage = new DatabaseStorage();

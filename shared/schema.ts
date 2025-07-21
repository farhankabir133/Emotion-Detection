import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  real,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Emotion analysis results table
export const emotionAnalyses = pgTable("emotion_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  text: text("text").notNull(),
  primaryEmotion: varchar("primary_emotion").notNull(),
  confidence: real("confidence").notNull(),
  emotions: jsonb("emotions").notNull(), // Store all emotion scores
  createdAt: timestamp("created_at").defaultNow(),
});

// Statistics table for tracking app usage
export const appStats = pgTable("app_stats", {
  id: serial("id").primaryKey(),
  totalUsers: integer("total_users").default(0),
  totalAnalyses: integer("total_analyses").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmotionAnalysisSchema = createInsertSchema(emotionAnalyses).omit({
  id: true,
  createdAt: true,
});

export const insertAppStatsSchema = createInsertSchema(appStats).omit({
  id: true,
  updatedAt: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type EmotionAnalysis = typeof emotionAnalyses.$inferSelect;
export type InsertEmotionAnalysis = z.infer<typeof insertEmotionAnalysisSchema>;
export type AppStats = typeof appStats.$inferSelect;
export type InsertAppStats = z.infer<typeof insertAppStatsSchema>;

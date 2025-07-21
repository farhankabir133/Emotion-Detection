import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardProps {
  stats: {
    totalAnalyses: number;
    mostCommonEmotion: string;
    weeklyCount: number;
  };
}

const emotionColors: Record<string, string> = {
  happy: "text-green-600",
  sad: "text-blue-600",
  angry: "text-red-600",
  fear: "text-yellow-600",
  surprise: "text-purple-600",
  neutral: "text-gray-600",
};

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center"
          >
            <span className="text-slate-600">Total Analyses</span>
            <span className="font-semibold text-slate-800">{stats.totalAnalyses}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="text-slate-600">Most Common Emotion</span>
            <span className={`font-semibold capitalize ${emotionColors[stats.mostCommonEmotion.toLowerCase()] || 'text-gray-600'}`}>
              {stats.mostCommonEmotion}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-between items-center"
          >
            <span className="text-slate-600">This Week</span>
            <span className="font-semibold text-slate-800">{stats.weeklyCount}</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

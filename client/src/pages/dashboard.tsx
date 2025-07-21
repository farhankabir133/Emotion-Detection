import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { EmotionAnalysis } from "@/components/emotion-analysis";
import { AnalysisHistory } from "@/components/analysis-history";
import { StatsCard } from "@/components/stats-card";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [userStats, setUserStats] = useState({
    totalAnalyses: 0,
    mostCommonEmotion: "Neutral",
    weeklyCount: 0,
  });
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserStats();
    }
  }, [isAuthenticated, refreshHistory]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUserStats(data);
    } catch (error) {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleAnalysisComplete = () => {
    setRefreshHistory(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, {user?.firstName || user?.email || "User"}!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmotionAnalysis onAnalysisComplete={handleAnalysisComplete} />
          </div>
          
          <div className="space-y-8">
            <StatsCard stats={userStats} />
            <AnalysisHistory key={refreshHistory} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Analysis {
  id: number;
  text: string;
  primaryEmotion: string;
  confidence: number;
  createdAt: string;
}

const emotionEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fear: "😨",
  surprise: "😮",
  neutral: "😐",
};

export function AnalysisHistory() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch('/api/user/analyses?limit=5', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalyses(data);
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
      console.error('Failed to fetch analyses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return "Yesterday";
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {analyses.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <i className="fas fa-history text-3xl mb-3"></i>
            <p>No analyses yet. Start by analyzing some text!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="text-xl">{emotionEmojis[analysis.primaryEmotion]}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800 capitalize">
                    {analysis.primaryEmotion} ({Math.round(analysis.confidence * 100)}%)
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatDate(analysis.createdAt)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {analyses.length > 0 && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-indigo-600 hover:text-indigo-700"
          >
            View All History
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

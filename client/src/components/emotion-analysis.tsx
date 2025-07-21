import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

interface EmotionAnalysisProps {
  onAnalysisComplete: () => void;
}

const emotionEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fear: "😨",
  surprise: "😮",
  neutral: "😐",
};

const emotionColors: Record<string, string> = {
  happy: "text-green-600",
  sad: "text-blue-600",
  angry: "text-red-600",
  fear: "text-yellow-600",
  surprise: "text-purple-600",
  neutral: "text-gray-600",
};

export function EmotionAnalysis({ onAnalysisComplete }: EmotionAnalysisProps) {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const analyzeEmotion = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze-emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      onAnalysisComplete();
      
      toast({
        title: "Analysis Complete",
        description: "Your text has been analyzed successfully!",
      });
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
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = text.length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-800">
            Emotion Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter text to analyze:
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="h-40 resize-none"
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-slate-500">
                  {wordCount} words, {charCount} characters
                </div>
                <Button 
                  onClick={analyzeEmotion}
                  disabled={isAnalyzing || !text.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic mr-2"></i>
                      Analyze Emotion
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl">{emotionEmojis[result.primaryEmotion]}</span>
                      <div>
                        <div className={`text-2xl font-bold ${emotionColors[result.primaryEmotion]} capitalize`}>
                          {result.primaryEmotion}
                        </div>
                        <div className="text-sm text-slate-600">Primary Emotion</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${emotionColors[result.primaryEmotion]}`}>
                        {Math.round(result.confidence * 100)}%
                      </div>
                      <div className="text-sm text-slate-600">Confidence</div>
                    </div>
                  </div>
                  
                  <Progress value={result.confidence * 100} className="w-full" />
                  
                  <div className="space-y-3">
                    {Object.entries(result.emotions)
                      .sort(([,a], [,b]) => (b as number) - (a as number))
                      .slice(1, 4)
                      .map(([emotion, score]) => (
                        <div key={emotion} className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{emotionEmojis[emotion]}</span>
                            <span className="font-medium text-slate-700 capitalize">{emotion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={(score as number) * 100} className="w-20" />
                            <span className="text-sm font-medium text-slate-600 w-8">
                              {Math.round((score as number) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  <i className="fas fa-chart-line text-3xl mb-3"></i>
                  <p>Enter text above to see emotion analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

export function DemoSection() {
  const [text, setText] = useState("I'm so excited about this new opportunity! It's going to be amazing.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeEmotion = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on demo text
    const mockResult = {
      primaryEmotion: "happy",
      confidence: 0.87,
      emotions: {
        happy: 0.87,
        surprise: 0.45,
        neutral: 0.23,
        sad: 0.12,
        fear: 0.08,
        angry: 0.05,
      }
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <section id="demo-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">See EmoSense in Action</h2>
          <p className="text-xl text-slate-600">Experience real-time emotion detection</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Try it yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Enter your text:
                  </label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here to analyze its emotional content..."
                    className="h-32 resize-none"
                  />
                </div>
                <Button 
                  onClick={analyzeEmotion}
                  disabled={isAnalyzing || !text.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
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
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
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
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(result.emotions)
                        .sort(([,a], [,b]) => (b as number) - (a as number))
                        .slice(1, 4)
                        .map(([emotion, score]) => (
                          <div key={emotion} className="flex items-center justify-between bg-white rounded-lg p-4">
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
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <i className="fas fa-chart-line text-3xl mb-3"></i>
                    <p>Enter text above to see emotion analysis results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

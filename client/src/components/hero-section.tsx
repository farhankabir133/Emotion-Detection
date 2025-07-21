import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  stats: {
    totalUsers: number;
    totalAnalyses: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Discover the <span className="text-yellow-300">Emotions</span> in Your Text
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto"
          >
            Powered by advanced AI, EmoSense analyzes your text to reveal hidden emotions with stunning accuracy
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center space-x-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-indigo-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.totalAnalyses.toLocaleString()}</div>
              <div className="text-indigo-200">Emotions Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">99.2%</div>
              <div className="text-indigo-200">Accuracy Rate</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Button 
              onClick={scrollToDemo}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Try Demo Now <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

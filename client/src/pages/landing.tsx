import { useEffect, useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { DemoSection } from "@/components/demo-section";
import { FeaturesSection } from "@/components/features-section";
import { motion } from "framer-motion";

export default function Landing() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAnalyses: 0,
  });

  useEffect(() => {
    // Fetch app statistics
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <HeroSection stats={stats} />
      <DemoSection />
      <FeaturesSection />
    </motion.div>
  );
}

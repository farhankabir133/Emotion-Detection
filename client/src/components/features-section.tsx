import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "fas fa-brain",
    title: "Advanced AI Analysis",
    description: "State-of-the-art machine learning models trained on millions of text samples",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: "fas fa-chart-pie",
    title: "Visual Insights",
    description: "Beautiful charts and visualizations to understand emotional patterns",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: "fas fa-history",
    title: "Analysis History",
    description: "Track your emotional journey with personal history and insights",
    color: "bg-cyan-100 text-cyan-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-600">Everything you need for emotion analysis</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

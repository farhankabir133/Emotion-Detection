import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 pt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">About EmoSense</h1>
          <p className="text-xl text-slate-600">Revolutionizing emotion detection with AI technology</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="AI development team" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 mb-6">
              EmoSense was created to help people better understand the emotional context of text communication. 
              Using advanced natural language processing and machine learning, we provide accurate emotion detection 
              that can enhance communication, improve mental health awareness, and support businesses in understanding 
              customer sentiment.
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center space-x-2">
                <i className="fas fa-check text-green-500"></i>
                <span>Real-time emotion detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check text-green-500"></i>
                <span>95%+ accuracy rate</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check text-green-500"></i>
                <span>Personal history tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check text-green-500"></i>
                <span>Beautiful visualizations</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-code text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Created by AI Innovation Team</h3>
          <p className="text-slate-600 mb-4">
            Built with passion for AI and natural language processing, EmoSense represents the cutting edge 
            of emotion detection technology.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

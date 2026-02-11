import { AppWindow } from './AppWindow';
import { motion } from 'motion/react';

export function AboutSection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="About.app" className="max-w-5xl w-full" delay={0.2} onClose={() => window.location.hash = 'hero'}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-light text-white mb-4">About KAVION</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                KAVION Innovation is a technology-driven company specializing in SaaS platforms, 
                AI-powered solutions, and digital product development.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-white/60">Built for scale</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-white/60">Powered by innovation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-white/60">Driven by excellence</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Code editor style */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-white/40 text-xs">company.ts</span>
            </div>
            
            <pre className="text-white/80 leading-relaxed">
              <code>
{`const KAVION = {
  name: "KAVION Innovation",
  founded: 2024,
  focus: [
    "SaaS Platforms",
    "AI Solutions",
    "Product Development"
  ],
  mission: "Innovation Always On",
  values: {
    quality: true,
    innovation: true,
    excellence: true
  }
};`}
              </code>
            </pre>
          </motion.div>
        </div>
      </AppWindow>
    </div>
  );
}
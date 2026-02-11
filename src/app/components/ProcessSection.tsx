import { AppWindow } from './AppWindow';
import { motion } from 'motion/react';
import { Lightbulb, Palette, Hammer, Rocket, TrendingUp } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  delay: number;
  isLast?: boolean;
}

function ProcessStep({ number, icon, title, delay, isLast }: ProcessStepProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-semibold text-white">
          {number}
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2 }}
        className="flex-1"
      >
        <h4 className="text-lg text-white">{title}</h4>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
          className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50"
          style={{ originX: 0 }}
        />
      )}
    </div>
  );
}

export function ProcessSection() {
  const steps = [
    { icon: <Lightbulb className="text-yellow-400" size={24} />, title: "Idea" },
    { icon: <Palette className="text-pink-400" size={24} />, title: "Design" },
    { icon: <Hammer className="text-orange-400" size={24} />, title: "Build" },
    { icon: <Rocket className="text-purple-400" size={24} />, title: "Launch" },
    { icon: <TrendingUp className="text-green-400" size={24} />, title: "Scale" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="Process.app" className="max-w-5xl w-full" delay={0.4} onClose={() => window.location.hash = 'hero'}>
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-light text-white mb-12 text-center"
        >
          How We Work
        </motion.h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              delay={0.1 * index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Terminal section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-white/40 text-xs">terminal</span>
          </div>
          
          <div className="space-y-2 text-white/80">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-green-400">$</span>
              <span>Building scalable SaaS...</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                █
              </motion.span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
            >
              <span className="text-green-400">$</span>
              <span className="ml-2">Integrating AI models...</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 }}
            >
              <span className="text-green-400">$</span>
              <span className="ml-2">Shipping innovation 🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </AppWindow>
    </div>
  );
}
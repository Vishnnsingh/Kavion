import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AppWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  onClose?: () => void;
}

export function AppWindow({ title, children, className = '', delay = 0, onClose }: AppWindowProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-[20px] backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl overflow-hidden ${className}`}
    >
      {/* macOS Window Controls */}
      <div className="h-10 px-4 flex items-center gap-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" 
            onClick={onClose}
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
        </div>
        <div className="flex-1 text-center text-white/60 text-sm font-medium">
          {title}
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="p-8">
        {children}
      </div>

      {/* Glass reflection effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </motion.div>
  );
}
import { motion } from 'motion/react';
import { Folder, Terminal, Globe, Brain, Smartphone, StickyNote, FolderOpen, Home, Mail } from 'lucide-react';
import { useState } from 'react';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function DockItem({ icon, label, onClick }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
      >
        {icon}
      </motion.div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -5 }}
          className="absolute -top-8 px-2 py-1 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded whitespace-nowrap"
        >
          {label}
        </motion.div>
      )}
    </motion.button>
  );
}

interface MacDockProps {
  onDockItemClick?: (item: string) => void;
}

export function MacDock({ onDockItemClick }: MacDockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="px-3 py-2.5 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl flex items-end gap-2">
        <DockItem 
          icon={<FolderOpen className="text-blue-400" size={24} />} 
          label="Finder"
          onClick={() => onDockItemClick?.('finder')}
        />
        <DockItem 
          icon={<Mail className="text-cyan-400" size={24} />} 
          label="Contact"
          onClick={() => onDockItemClick?.('contact')}
        />
        <DockItem 
          icon={<Folder className="text-cyan-400" size={24} />} 
          label="About"
          onClick={() => onDockItemClick?.('about')}
        />
        <DockItem 
          icon={<Terminal className="text-green-400" size={24} />} 
          label="Developer / Engineering"
          onClick={() => onDockItemClick?.('developer')}
        />
        <DockItem 
          icon={<Home className="text-white" size={24} />} 
          label="Home"
          onClick={() => onDockItemClick?.('home')}
        />
        <DockItem 
          icon={<Globe className="text-blue-400" size={24} />} 
          label="Web & SaaS"
          onClick={() => onDockItemClick?.('web')}
        />
        <DockItem 
          icon={<Brain className="text-purple-400" size={24} />} 
          label="AI Solutions"
          onClick={() => onDockItemClick?.('ai')}
        />
        <DockItem 
          icon={<Smartphone className="text-orange-400" size={24} />} 
          label="App Development"
          onClick={() => onDockItemClick?.('mobile')}
        />
        <DockItem 
          icon={<StickyNote className="text-yellow-400" size={24} />} 
          label="Notes"
          onClick={() => onDockItemClick?.('notes')}
        />
      </div>
    </motion.div>
  );
}
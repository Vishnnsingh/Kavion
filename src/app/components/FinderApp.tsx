import { motion } from 'motion/react';
import { X, Home, Folder, FileText, Image, Code, ChevronRight, StickyNote, Settings } from 'lucide-react';
import { useState } from 'react';

interface FinderAppProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

interface FileItem {
  name: string;
  type: 'folder' | 'page';
  icon: React.ReactNode;
  action?: string;
}

export function FinderApp({ isOpen, onClose, onNavigate }: FinderAppProps) {
  const [currentPath, setCurrentPath] = useState('KAVION');

  const folders: Record<string, FileItem[]> = {
    'KAVION': [
      { name: 'Home', type: 'page', icon: <Home size={20} className="text-cyan-400" />, action: 'home' },
      { name: 'About', type: 'page', icon: <FileText size={20} className="text-blue-400" />, action: 'about' },
      { name: 'Services', type: 'page', icon: <Folder size={20} className="text-purple-400" />, action: 'services' },
      { name: 'App Development', type: 'page', icon: <Code size={20} className="text-orange-400" />, action: 'mobile' },
      { name: 'Process', type: 'page', icon: <Image size={20} className="text-green-400" />, action: 'process' },
      { name: 'Contact', type: 'page', icon: <FileText size={20} className="text-pink-400" />, action: 'contact' },
      { name: 'Notes', type: 'page', icon: <StickyNote size={20} className="text-yellow-400" />, action: 'notes' },
      { name: 'Settings', type: 'page', icon: <Settings size={20} className="text-gray-400" />, action: 'settings' }
    ]
  };

  const handleItemClick = (item: FileItem) => {
    if (item.action && onNavigate) {
      onNavigate(item.action);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] z-[60] rounded-[20px] backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 shadow-2xl overflow-hidden"
    >
      {/* Window Controls */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
        </div>
        <span className="text-white/70 text-sm font-medium">Finder.app</span>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 bg-white/5 p-3">
          <div className="space-y-1">
            <div className="text-white/40 text-xs font-semibold px-2 mb-2">FAVORITES</div>
            <button
              onClick={() => setCurrentPath('KAVION')}
              className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-2 transition-colors ${
                currentPath === 'KAVION'
                  ? 'bg-cyan-500/20 text-white'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <Folder size={16} className="text-cyan-400" />
              <span className="text-sm">KAVION</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Path Bar */}
          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Home size={16} />
              <ChevronRight size={14} />
              <span>{currentPath}</span>
            </div>
          </div>

          {/* Files Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {folders[currentPath]?.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleItemClick(item)}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-white/10">
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <p className="text-white/40 text-xs mt-1">
                    {item.type === 'folder' ? 'Folder' : 'Page'}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="px-4 py-2 border-t border-white/10 bg-white/5 text-white/50 text-xs">
            {folders[currentPath]?.length || 0} items
          </div>
        </div>
      </div>
    </motion.div>
  );
}
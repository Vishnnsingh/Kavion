import { Wifi, Battery, Clock, Settings, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MacOSMenuBarProps {
  onSettingsClick?: () => void;
  onVoiceAssistantClick?: () => void;
}

export function MacOSMenuBar({ onSettingsClick, onVoiceAssistantClick }: MacOSMenuBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-50 flex items-center justify-between px-4 text-white/90 text-sm backdrop-blur-xl bg-white/5 border-b border-white/10">
      {/* Left side - Only KAVION brand */}
      <div className="flex items-center">
        <span className="font-semibold">KAVION</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onVoiceAssistantClick}
          className="hover:text-white transition-colors group relative"
          title="KAVI Voice Assistant"
        >
          <Mic size={14} className="opacity-80 hover:opacity-100" />
          <span className="absolute -bottom-8 right-0 text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            KAVI
          </span>
        </button>
        <button 
          onClick={onSettingsClick}
          className="hover:text-white transition-colors"
          title="Settings"
        >
          <Settings size={14} className="opacity-80 hover:opacity-100" />
        </button>
        <Wifi size={14} className="opacity-80" />
        <Battery size={14} className="opacity-80" />
        <Clock size={14} className="opacity-80" />
        <span className="text-xs opacity-80">{formatTime(time)}</span>
      </div>
    </div>
  );
}
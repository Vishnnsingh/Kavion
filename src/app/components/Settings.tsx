import { motion, AnimatePresence } from 'motion/react';
import { X, Sun, Volume2, VolumeX, Bell, BellOff, Monitor, Palette, MousePointer, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  brightness: number;
  onBrightnessChange: (value: number) => void;
  theme: 'dark' | 'blue' | 'purple';
  onThemeChange: (theme: 'dark' | 'blue' | 'purple') => void;
  animatedBg: string;
  onAnimatedBgChange: (bg: string) => void;
  cursorType: string;
  onCursorTypeChange: (cursor: string) => void;
}

export function Settings({ 
  isOpen, 
  onClose, 
  brightness, 
  onBrightnessChange, 
  theme, 
  onThemeChange,
  animatedBg,
  onAnimatedBgChange,
  cursorType,
  onCursorTypeChange
}: SettingsProps) {
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const themes = [
    { name: 'Dark Navy', value: 'dark', gradient: 'from-[#0a1628] via-[#0d1b2a] to-[#1b263b]' },
    { name: 'Ocean Blue', value: 'blue', gradient: 'from-[#0a2540] via-[#0d3a5f] to-[#1b4965]' },
    { name: 'Deep Purple', value: 'purple', gradient: 'from-[#1a0a2e] via-[#2d1b4e] to-[#3e2c5f]' }
  ];

  const animatedBackgrounds = [
    { name: 'None', value: 'none' },
    { name: 'Stars', value: 'stars' },
    { name: 'Floating Dots', value: 'dots' },
    { name: 'Wave Lines', value: 'waves' },
    { name: 'Particles', value: 'particles' },
    { name: 'Grid Matrix', value: 'matrix' },
    { name: 'Aurora', value: 'aurora' },
    { name: 'Fireflies', value: 'fireflies' },
    { name: 'Bubbles', value: 'bubbles' },
    { name: 'Cosmic Dust', value: 'cosmic' }
  ];

  const cursorTypes = [
    { name: 'Default', value: 'default' },
    { name: 'Pointer', value: 'pointer' },
    { name: 'Crosshair', value: 'crosshair' },
    { name: 'Move', value: 'move' },
    { name: 'Text', value: 'text' },
    { name: 'Wait', value: 'wait' },
    { name: 'Help', value: 'help' },
    { name: 'Progress', value: 'progress' },
    { name: 'Not Allowed', value: 'not-allowed' },
    { name: 'Grab', value: 'grab' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleThemeChange = (newTheme: 'dark' | 'blue' | 'purple') => {
    onThemeChange(newTheme);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Settings Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[70] p-4"
          >
            <div className="relative rounded-[24px] backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 shadow-2xl overflow-hidden">
              {/* Window Controls */}
              <div className="h-12 px-6 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
                </div>
                <span className="text-white/70 text-sm font-medium">Settings.app</span>
                <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <h3 className="text-2xl text-white mb-6 font-light">System Preferences</h3>

                {/* Brightness Control */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Sun className="text-yellow-400" size={24} />
                      <div>
                        <h4 className="text-white font-medium">Brightness</h4>
                        <p className="text-white/50 text-sm">Adjust screen brightness</p>
                      </div>
                    </div>
                    <span className="text-white/70 text-sm">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => onBrightnessChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) ${brightness}%, rgba(255,255,255,0.1) ${brightness}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                </div>

                {/* Theme Selection */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="text-purple-400" size={24} />
                    <div>
                      <h4 className="text-white font-medium">Theme</h4>
                      <p className="text-white/50 text-sm">Choose your color scheme</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => handleThemeChange(t.value as any)}
                        className={`p-4 rounded-xl bg-gradient-to-br ${t.gradient} border-2 transition-all ${
                          theme === t.value ? 'border-cyan-400 scale-105' : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="text-white text-sm font-medium">{t.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Background */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-pink-400" size={24} />
                    <div>
                      <h4 className="text-white font-medium">Animated Background</h4>
                      <p className="text-white/50 text-sm">Choose background animation style</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {animatedBackgrounds.map((bg) => (
                      <button
                        key={bg.value}
                        onClick={() => onAnimatedBgChange(bg.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          animatedBg === bg.value 
                            ? 'border-pink-400 bg-pink-400/20 scale-105' 
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="text-white text-xs font-medium">{bg.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cursor Type */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <MousePointer className="text-cyan-400" size={24} />
                    <div>
                      <h4 className="text-white font-medium">Cursor Style</h4>
                      <p className="text-white/50 text-sm">Change mouse cursor appearance</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {cursorTypes.map((cursor) => (
                      <button
                        key={cursor.value}
                        onClick={() => onCursorTypeChange(cursor.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          cursorType === cursor.value 
                            ? 'border-cyan-400 bg-cyan-400/20 scale-105' 
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                        style={{ cursor: cursor.value }}
                      >
                        <div className="text-white text-xs font-medium">{cursor.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound Toggle */}
                <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {sound ? (
                        <Volume2 className="text-blue-400" size={24} />
                      ) : (
                        <VolumeX className="text-gray-400" size={24} />
                      )}
                      <div>
                        <h4 className="text-white font-medium">Sound Effects</h4>
                        <p className="text-white/50 text-sm">UI interaction sounds</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSound(!sound)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        sound ? 'bg-cyan-500' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        animate={{ x: sound ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                </div>

                {/* Notifications Toggle */}
                <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {notifications ? (
                        <Bell className="text-green-400" size={24} />
                      ) : (
                        <BellOff className="text-gray-400" size={24} />
                      )}
                      <div>
                        <h4 className="text-white font-medium">Notifications</h4>
                        <p className="text-white/50 text-sm">System alerts and updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        notifications ? 'bg-green-500' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        animate={{ x: notifications ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                </div>

                {/* Display Info */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Monitor className="text-cyan-400" size={24} />
                    <h4 className="text-white font-medium">Display</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>Resolution</span>
                      <span className="text-white/90">Retina Display</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Color Profile</span>
                      <span className="text-white/90">P3 Wide Color</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Refresh Rate</span>
                      <span className="text-white/90">60 Hz</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

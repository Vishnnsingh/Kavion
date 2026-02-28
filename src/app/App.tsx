import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MacOSMenuBar } from './components/MacOSMenuBar';
import { MacDock } from './components/MacDock';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ClientSection } from './components/ClientSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { AppDevelopmentSection } from './components/AppDevelopmentSection';
import { CTASection } from './components/CTASection';
import { Settings } from './components/Settings';
import { NotesApp } from './components/NotesApp';
import { FinderApp } from './components/FinderApp';
import { VoiceAssistant } from './components/VoiceAssistant';

type ViewType = 'home' | 'app-development' | 'contact';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [brightness, setBrightness] = useState(100); // Changed to 100%
  const [theme, setTheme] = useState<'dark' | 'blue' | 'purple'>('dark');
  const [animatedBg, setAnimatedBg] = useState('stars');
  const [cursorType, setCursorType] = useState('default');

  const themeGradients = {
    dark: 'from-[#0a1628] via-[#0d1b2a] to-[#1b263b]',
    blue: 'from-[#0a2540] via-[#0d3a5f] to-[#1b4965]',
    purple: 'from-[#1a0a2e] via-[#2d1b4e] to-[#3e2c5f]'
  };

  useEffect(() => {
    // Boot animation
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle hash navigation for CTA button
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#hero') {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDockItemClick = (item: string) => {
    if (item === 'home') {
      handleHomeClick();
      return;
    }

    if (item === 'contact') {
      handleContactClick();
      return;
    }

    if (item === 'mobile') {
      setCurrentView('app-development');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item === 'notes') {
      setShowNotes(true);
      return;
    }

    if (item === 'finder') {
      setShowFinder(true);
      return;
    }

    if (item === 'voice-assistant') {
      setShowVoiceAssistant(true);
      return;
    }

    const sections: Record<string, string> = {
      about: '#about',
      clients: '#clients',
      developer: '#process',
      web: '#services',
      ai: '#services',
    };

    const targetId = sections[item];
    if (targetId) {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.querySelector(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleContactClick = () => {
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    window.location.hash = 'hero';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinderNavigate = (page: string) => {
    setShowFinder(false);
    
    if (page === 'home') {
      handleHomeClick();
    } else if (page === 'mobile') {
      setCurrentView('app-development');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'notes') {
      setShowNotes(true);
    } else if (page === 'settings') {
      setShowSettings(true);
    } else {
      // For sections
      setCurrentView('home');
      setTimeout(() => {
        const element = document.querySelector(`#${page}`);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case 'home':
        handleHomeClick();
        break;
      case 'contact':
        handleContactClick();
        break;
      case 'mobile':
        setCurrentView('app-development');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'notes':
        setShowNotes(true);
        break;
      case 'finder':
        setShowFinder(true);
        break;
      default:
        const sections: Record<string, string> = {
          about: '#about',
          clients: '#clients',
          developer: '#process',
          web: '#services',
          ai: '#services',
        };

        const targetId = sections[command];
        if (targetId) {
          setCurrentView('home');
          setTimeout(() => {
            const element = document.querySelector(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        break;
    }
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${themeGradients[theme]} text-white overflow-x-hidden transition-all duration-500`}
      style={{ opacity: brightness / 100, cursor: cursorType }}
    >
      {/* Boot screen */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Assistant */}
      <VoiceAssistant 
        isOpen={showVoiceAssistant}
        onClose={() => setShowVoiceAssistant(false)}
        onCommand={handleVoiceCommand}
      />

      {/* Settings Panel */}
      <Settings 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        brightness={brightness}
        onBrightnessChange={setBrightness}
        theme={theme}
        onThemeChange={setTheme}
        animatedBg={animatedBg}
        onAnimatedBgChange={setAnimatedBg}
        cursorType={cursorType}
        onCursorTypeChange={setCursorType}
      />

      {/* Notes App */}
      <AnimatePresence>
        {showNotes && (
          <NotesApp 
            isOpen={showNotes}
            onClose={() => {
              setShowNotes(false);
              handleHomeClick();
            }}
          />
        )}
      </AnimatePresence>

      {/* Finder App */}
      <AnimatePresence>
        {showFinder && (
          <FinderApp 
            isOpen={showFinder}
            onClose={() => {
              setShowFinder(false);
              handleHomeClick();
            }}
            onNavigate={handleFinderNavigate}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooting ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MacOSMenuBar 
          onSettingsClick={() => setShowSettings(true)}
          onVoiceAssistantClick={() => setShowVoiceAssistant(true)}
        />
        
        <AnimatePresence mode="wait">
          {currentView === 'app-development' ? (
            <motion.div
              key="app-development"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="pt-7">
                <AppDevelopmentSection />
              </div>
            </motion.div>
          ) : currentView === 'contact' ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="pt-7">
                <ContactSection />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Hero Section */}
              <section id="hero">
                <HeroSection />
              </section>

              {/* About Section */}
              <section id="about">
                <AboutSection />
              </section>

              {/* Services Section */}
              <section id="services">
                <ServicesSection />
              </section>

              {/* Process Section */}
              <section id="process">
                <ProcessSection />
              </section>

              {/* Clients Section */}
              <section id="clients">
                <ClientSection />
              </section>

              {/* CTA Section */}
              <section id="cta">
                <CTASection />
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <MacDock onDockItemClick={handleDockItemClick} />
      </motion.div>

      {/* Background particles for entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {animatedBg === 'stars' && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {animatedBg === 'dots' && [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {animatedBg === 'waves' && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        
        {animatedBg === 'particles' && [...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {animatedBg === 'matrix' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-green-500/50 to-transparent"
            style={{
              left: `${i * 5}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '100vh'],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
          />
        ))}
        
        {animatedBg === 'aurora' && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-blue-500/10"
              animate={{
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
          </>
        )}
        
        {animatedBg === 'fireflies' && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/60 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {animatedBg === 'bubbles' && [...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2 border-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
        
        {animatedBg === 'cosmic' && [...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
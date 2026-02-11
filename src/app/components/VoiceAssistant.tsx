import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand: (command: string) => void;
}

export function VoiceAssistant({ isOpen, onClose, onCommand }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false); // Default OFF
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening continuously
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        isListeningRef.current = true;
        setIsListening(true);
        setFeedback('Listening... Speak now!');
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('Speech recognition result event:', event);
        let interimTranscript = '';
        let finalTranscript = '';

        // Process all results
        for (let i = 0; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          console.log(`Result ${i}: "${transcriptText}" (isFinal: ${event.results[i].isFinal})`);
          
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText + ' ';
          } else {
            interimTranscript += transcriptText;
          }
        }

        // Show interim results in real-time
        if (interimTranscript) {
          console.log('Interim transcript:', interimTranscript);
          setTranscript(interimTranscript);
          setFeedback(`Listening... I heard: "${interimTranscript}"`);
        }

        // Process final results
        if (finalTranscript) {
          const finalText = finalTranscript.trim().toLowerCase();
          console.log('Final transcript:', finalText);
          setTranscript(finalText);
          setFeedback(`Processing: "${finalText}"`);
          
          // Process command after a short delay to ensure transcript is complete
          setTimeout(() => {
            processCommand(finalText);
          }, 100);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error, event);
        isListeningRef.current = false;
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          setFeedback('No speech detected. Please speak clearly and try again.');
          // Auto-restart after error
          setTimeout(() => {
            if (recognitionRef.current && !isListeningRef.current) {
              try {
                recognitionRef.current.start();
                isListeningRef.current = true;
                setIsListening(true);
              } catch (e) {
                console.log('Could not restart after no-speech error:', e);
              }
            }
          }, 1000);
        } else if (event.error === 'audio-capture') {
          setFeedback('Microphone not found. Please check your microphone connection.');
        } else if (event.error === 'not-allowed') {
          setFeedback('Microphone permission denied. Please allow microphone access in browser settings.');
        } else if (event.error === 'aborted') {
          // User stopped manually, don't show error
          console.log('Recognition aborted by user');
        } else {
          setFeedback(`Error: ${event.error}. Please try again.`);
          console.error('Unknown error:', event);
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        const wasListening = isListeningRef.current;
        isListeningRef.current = false;
        setIsListening(false);
        // Auto-restart if it was listening and continuous mode (for better UX)
        if (wasListening && recognitionRef.current) {
          setTimeout(() => {
            if (recognitionRef.current && !isListeningRef.current) {
              try {
                recognitionRef.current.start();
                isListeningRef.current = true;
                setIsListening(true);
              } catch (e) {
                console.log('Could not restart recognition:', e);
              }
            }
          }, 500);
        }
      };
    } else {
      setIsSupported(false);
      setFeedback('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Error stopping recognition:', e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (voiceEnabled) {
        speak('Hello! How may I help you?');
        setFeedback('Hello! How may I help you?');
      } else {
        setFeedback('Voice is OFF. Click the voice toggle to enable audio.');
      }
    }
  }, [isOpen, voiceEnabled]);

  const speak = (text: string) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = async () => {
    console.log('=== Starting listening ===');
    
    if (!isSupported) {
      setFeedback('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    // Request microphone permission
    try {
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
      // Stop the stream immediately, we just needed permission
      stream.getTracks().forEach(track => track.stop());
    } catch (error: any) {
      console.error('Microphone permission error:', error);
      setFeedback('Microphone permission denied. Please allow microphone access in your browser settings.');
      return;
    }

    if (recognitionRef.current) {
      try {
        setTranscript('');
        setFeedback('Starting microphone... Please speak now!');
        console.log('Starting speech recognition...');
        recognitionRef.current.start();
        isListeningRef.current = true;
        setIsListening(true);
        setFeedback('🎤 Listening... Speak now!');
      } catch (error: any) {
        console.error('Error starting recognition:', error);
        if (error.message && error.message.includes('already started')) {
          // Recognition already running, just update state
          console.log('Recognition already started');
          isListeningRef.current = true;
          setIsListening(true);
          setFeedback('Listening... Speak now!');
        } else {
          setFeedback(`Error: ${error.message || 'Unknown error'}. Please try again.`);
        }
      }
    } else {
      setFeedback('Speech recognition not initialized. Please refresh the page.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        isListeningRef.current = false;
        recognitionRef.current.stop();
        setIsListening(false);
        setFeedback('Stopped. Click "Start Listening" to speak again.');
      } catch (error) {
        console.error('Error stopping recognition:', error);
        isListeningRef.current = false;
        setIsListening(false);
        setFeedback('Stopped. Click "Start Listening" to speak again.');
      }
    }
  };

  const processCommand = (command: string) => {
    console.log('=== Processing command ===');
    console.log('Raw command:', command);
    
    if (!command || command.trim().length === 0) {
      console.log('Empty command, ignoring...');
      return;
    }
    
    // Normalize command - remove extra spaces and punctuation, but keep words
    const normalizedCommand = command.toLowerCase().trim().replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ');
    console.log('Normalized command:', normalizedCommand);

    // Command patterns - more flexible matching with word-based matching
    const commandPatterns = [
      { patterns: ['contact'], action: 'contact', keywords: ['contact', 'connect', 'reach'] },
      { patterns: ['settings', 'setting'], action: 'settings', keywords: ['settings', 'setting', 'preferences', 'config'] },
      { patterns: ['notes', 'note'], action: 'notes', keywords: ['notes', 'note', 'notepad'] },
      { patterns: ['finder'], action: 'finder', keywords: ['finder', 'file', 'files', 'folder'] },
      { patterns: ['home'], action: 'home', keywords: ['home', 'main', 'start'] },
      { patterns: ['about'], action: 'about', keywords: ['about', 'info', 'information'] },
      { patterns: ['services', 'service'], action: 'services', keywords: ['services', 'service', 'offerings'] },
      { patterns: ['process'], action: 'process', keywords: ['process', 'workflow', 'method'] },
      { patterns: ['developer', 'development'], action: 'developer', keywords: ['developer', 'development', 'engineering'] },
      { patterns: ['web'], action: 'web', keywords: ['web', 'website', 'saas'] },
      { patterns: ['ai'], action: 'ai', keywords: ['ai', 'artificial', 'intelligence'] },
      { patterns: ['app', 'mobile'], action: 'mobile', keywords: ['app', 'mobile', 'application'] },
    ];

    let matchFound = false;
    let matchedAction = '';

    // First, try to find exact word matches
    const commandWords = normalizedCommand.split(' ');
    console.log('Command words:', commandWords);

    for (const pattern of commandPatterns) {
      // Check each word in the command
      for (const word of commandWords) {
        // Check if word matches any pattern or keyword
        if (pattern.patterns.some(p => p === word) || pattern.keywords.some(k => k === word)) {
          console.log(`Match found! Word: "${word}" matches pattern: ${pattern.action}`);
          matchedAction = pattern.action;
          matchFound = true;
          break;
        }
      }
      if (matchFound) break;
    }

    // If no exact word match, try substring matching
    if (!matchFound) {
      console.log('No exact match, trying substring matching...');
      for (const pattern of commandPatterns) {
        for (const phrase of pattern.patterns) {
          if (normalizedCommand.includes(phrase) || phrase.includes(normalizedCommand)) {
            console.log(`Substring match found! "${normalizedCommand}" contains "${phrase}"`);
            matchedAction = pattern.action;
            matchFound = true;
            break;
          }
        }
        if (matchFound) break;
      }
    }

    if (matchFound && matchedAction) {
      console.log(`✅ Command matched! Action: ${matchedAction}`);
      setFeedback(`Got it! Opening ${matchedAction}...`);
      speak('Got it');
      
      // Stop listening before navigating
      if (recognitionRef.current && isListeningRef.current) {
        try {
          isListeningRef.current = false;
          recognitionRef.current.stop();
          setIsListening(false);
        } catch (e) {
          console.log('Error stopping recognition:', e);
        }
      }
      
      // Execute command
      onCommand(matchedAction);
      
      // Close after 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      console.log('❌ No match found for command:', normalizedCommand);
      setFeedback(`I heard: "${command}". Try saying: "contact", "about", "services", "home", "settings", etc.`);
      if (voiceEnabled) {
        speak('Sorry, I didn\'t understand that command');
      }
      // Keep listening for another try
      if (recognitionRef.current && !isListeningRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            isListeningRef.current = true;
            setIsListening(true);
          } catch (e) {
            console.log('Could not restart:', e);
          }
        }, 2000);
      }
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* Voice Assistant Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[90] p-4"
          >
            <div className="relative rounded-[24px] backdrop-blur-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/30 shadow-2xl overflow-hidden">
              {/* Window Controls */}
              <div className="h-12 px-6 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
                </div>
                <span className="text-white/70 text-sm font-medium">KAVI Assistant</span>
                <div className="flex items-center gap-3">
                  {/* Voice Toggle */}
                  <button
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      if (!voiceEnabled) {
                        speak('Hello! How may I help you?');
                        setFeedback('Hello! How may I help you?');
                      }
                    }}
                    className="text-white/70 hover:text-white transition-colors"
                    title={voiceEnabled ? 'Turn voice OFF' : 'Turn voice ON'}
                  >
                    {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                  <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Animated Mic Icon */}
                <motion.div
                  animate={isListening ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: isListening ? Infinity : 0,
                  }}
                  className="mb-6 flex justify-center"
                >
                  <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
                    isListening 
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-500' 
                      : 'bg-gradient-to-br from-white/10 to-white/5'
                  }`}>
                    {isListening ? (
                      <>
                        <Mic className="text-white" size={40} />
                        {/* Pulsing rings */}
                        <motion.div
                          animate={{
                            scale: [1, 2, 2],
                            opacity: [0.5, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 rounded-full border-4 border-cyan-400"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 2.5, 2.5],
                            opacity: [0.3, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                          className="absolute inset-0 rounded-full border-4 border-purple-400"
                        />
                      </>
                    ) : (
                      <MicOff className="text-white/50" size={40} />
                    )}
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-2 font-light">KAVI Voice Assistant</h3>
                <p className="text-white/60 text-sm mb-6">Your intelligent navigation companion</p>

                {/* Feedback */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 min-h-[60px] flex items-center justify-center">
                  <p className="text-white/80 text-sm text-center">{feedback || (isSupported ? 'Click "Start Listening" to begin' : 'Speech recognition not supported')}</p>
                </div>

                {/* Transcript */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30"
                  >
                    <p className="text-cyan-300 text-sm font-medium">You said:</p>
                    <p className="text-white mt-1">{transcript}</p>
                  </motion.div>
                )}

                {/* Control Button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSupported}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : isSupported
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white'
                      : 'bg-gray-500 text-white cursor-not-allowed opacity-50'
                  }`}
                >
                  {isListening ? 'Stop Listening' : isSupported ? 'Start Listening' : 'Not Supported'}
                </button>

                {/* Commands Help */}
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                  <p className="text-white/70 text-xs font-medium mb-2">Try saying:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                    <div>"Open Contact"</div>
                    <div>"Open Settings"</div>
                    <div>"Open Notes"</div>
                    <div>"Open Home"</div>
                    <div>"Open About"</div>
                    <div>"Open Services"</div>
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

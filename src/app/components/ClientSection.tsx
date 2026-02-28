import React, { useState } from 'react';
import { AppWindow } from './AppWindow';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, GraduationCap, Monitor, X, Maximize2, Sparkles, Users } from 'lucide-react';
import gyanodayLogo from '../../assets/c1.jpeg';
import gyanodayDashboard from '../../assets/c1p1.png';

interface ClientCardProps {
  client: {
    name: string;
    description: string;
    logo: string;
    screenshot: string;
    type: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    color: 'cyan' | 'blue';
    comingSoon?: boolean;
  };
  index: number;
}

function ClientCard({ client, index }: ClientCardProps) {
  const [logoError, setLogoError] = useState(false);
  const [screenshotError, setScreenshotError] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const IconComponent = client.icon;

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-500 to-blue-500',
      icon: 'text-cyan-400',
      bg: 'bg-cyan-500/20'
    },
    blue: {
      gradient: 'from-blue-500 to-purple-500',
      icon: 'text-blue-400',
      bg: 'bg-blue-500/20'
    }
  };

  const colors = colorClasses[client.color];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-full"
    >
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden h-full flex flex-col relative shadow-xl hover:shadow-2xl group/card">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover/card:opacity-10 transition-all duration-500 rounded-2xl blur-xl`} />
        
        {/* Client Header */}
        <div className={`relative p-6 bg-gradient-to-r ${colors.gradient}/30 border-b border-white/20 backdrop-blur-sm`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
          <div className="relative flex items-center gap-4">
            {/* Logo */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-lg group-hover/card:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              {!logoError ? (
                <img 
                  src={client.logo} 
                  alt={`${client.name} Logo`}
                  className="w-full h-full object-contain p-2 relative z-10"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <IconComponent className={`${colors.icon} relative z-10`} size={36} />
              )}
            </div>
            
            {/* Client Info */}
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">{client.name}</h4>
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${colors.gradient}/30 border border-white/20`}>
                  <IconComponent className={colors.icon} size={18} />
                </div>
                <span className="text-white/80 text-sm font-medium">{client.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        {client.comingSoon && (
          <div className="absolute top-4 right-4 z-20">
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-sm border border-white/20 shadow-lg">
              <span className="text-white text-xs font-medium">Coming Soon</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-6 flex-1 flex flex-col relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.gradient}/20 border border-white/10 mt-1`}>
              <Sparkles className={colors.icon} size={16} />
            </div>
            <p className="text-white/80 text-base leading-relaxed font-light">{client.description}</p>
          </div>
          
          {/* Screenshot */}
          <div className="relative rounded-lg overflow-auto border border-white/10 bg-black/20 group-hover:border-white/20 transition-colors flex-1 min-h-[300px] max-h-[600px]">
            <div className="absolute top-2 left-2 flex gap-1.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            {client.comingSoon ? (
              <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-10 h-10 text-white/30" />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Coming Soon</p>
                  <p className="text-white/30 text-xs mt-2">Dashboard preview will be available soon</p>
                </div>
              </div>
            ) : !screenshotError ? (
              <>
                <img 
                  src={client.screenshot} 
                  alt={`${client.name} Dashboard`}
                  className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setIsImageModalOpen(true)}
                  onError={() => setScreenshotError(true)}
                />
                <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-white/70" />
                    <span className="text-white/70 text-xs">Click to expand</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center p-8">
                  <Monitor className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">Dashboard Screenshot</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Image Modal */}
          <AnimatePresence>
            {isImageModalOpen && !client.comingSoon && !screenshotError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={() => setIsImageModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsImageModalOpen(false)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <img 
                    src={client.screenshot} 
                    alt={`${client.name} Dashboard - Full View`}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function ClientSection() {
  const clients = [
    {
      name: 'Gyanoday Public School',
      description: 'School ERP Management System',
      logo: gyanodayLogo,
      screenshot: gyanodayDashboard,
      type: 'School ERP',
      icon: GraduationCap,
      color: 'cyan' as const
    },
    {
      name: 'KOTA PRIDE SCHOOL',
      description: 'Educational Institution Management',
      logo: '/kota-pride-logo.png', // User needs to add this image
      screenshot: '/kota-pride-dashboard.png', // User needs to add this image
      type: 'School Management',
      icon: Building2,
      color: 'blue' as const,
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="Clients.app" className="max-w-6xl w-full" delay={0.3} onClose={() => window.location.hash = 'hero'}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-cyan-500" />
            <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <Users className="text-cyan-400" size={20} />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-blue-500 to-blue-500" />
          </div>
          <h3 className="text-4xl font-light text-white mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Valued Clients
          </h3>
          <p className="text-white/50 text-sm font-light">
            Trusted partners in educational excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {clients.map((client, index) => (
            <ClientCard key={client.name} client={client} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <Sparkles className="text-cyan-400" size={16} />
            <p className="text-white/70 text-sm font-medium">
              Trusted by educational institutions for Kavion innovative technology solutions
            </p>
          </div>
        </motion.div>
      </AppWindow>
    </div>
  );
}


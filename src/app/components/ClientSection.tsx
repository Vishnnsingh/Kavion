import React, { useState } from 'react';
import { AppWindow } from './AppWindow';
import { motion } from 'motion/react';
import { Users, Sparkles, Building2, GraduationCap } from 'lucide-react';
import gyanodayLogo from '../../assets/c1.jpeg';

interface ClientItemProps {
  client: {
    name: string;
    logo: string;
    number: number;
    type: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
  };
  index: number;
}

function ClientCard({ client, index }: ClientItemProps) {
  const [logoError, setLogoError] = useState(false);
  const IconComponent = client.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.3, duration: 0.6 }}
      className={`relative flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Client Card */}
      <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          <div className={`relative flex items-center gap-4 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-lg">
                {!logoError ? (
                  <img 
                    src={client.logo} 
                    alt={`${client.name} Logo`}
                    className="w-full h-full object-contain p-2"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <IconComponent className="text-cyan-400" size={32} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className={`flex items-center gap-2 mb-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                <span className="text-cyan-400 font-bold text-lg">#{client.number}</span>
                <IconComponent className="text-cyan-400" size={18} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{client.name}</h4>
              <p className="text-white/70 text-sm">{client.type}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Marker */}
      <div className="relative flex-shrink-0 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.3 + 0.2, type: "spring" }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 border-4 border-white/30 shadow-2xl flex items-center justify-center"
        >
          <span className="text-white font-bold text-xl">{client.number}</span>
        </motion.div>
        
        {/* Connecting line from marker */}
        <div className={`absolute top-1/2 w-8 h-0.5 bg-gradient-to-r ${isEven ? 'from-cyan-500 to-transparent left-full' : 'from-transparent to-cyan-500 right-full'}`} />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function ClientSection() {
  const clients = [
    {
      name: 'Gyanoday Public School',
      logo: gyanodayLogo,
      number: 1,
      type: 'School ERP Management System',
      icon: GraduationCap
    },
    {
      name: 'KOTA PRIDE SCHOOL',
      logo: '/kota-pride-logo.png',
      number: 2,
      type: 'Educational Institution Management',
      icon: Building2
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="Clients.app" className="max-w-6xl w-full" delay={0.3} onClose={() => window.location.hash = 'hero'}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-cyan-500" />
            <motion.div 
              className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="text-cyan-400" size={24} />
            </motion.div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-500 to-blue-500" />
          </div>
          <motion.h3 
            className="text-5xl font-light mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Valued Clients
          </motion.h3>
          <p className="text-white/60 text-base font-light">
            Trusted partners in educational excellence
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative py-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 -translate-x-1/2" />

          {/* Client Cards */}
          <div className="space-y-12">
            {clients.map((client, index) => (
              <ClientCard key={client.name} client={client} index={index} />
            ))}
          </div>
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <Sparkles className="text-cyan-400" size={16} />
            <p className="text-white/70 text-sm font-medium">
              Trusted by educational institutions for innovative technology solutions
            </p>
          </div>
        </motion.div>
      </AppWindow>
    </div>
  );
}

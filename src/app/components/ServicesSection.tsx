import { AppWindow } from './AppWindow';
import { motion } from 'motion/react';
import { Cloud, Brain, Code, Smartphone, Building2 } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function ServiceCard({ icon, title, description, delay }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
        {/* Icon */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-fit">
          {icon}
        </div>

        {/* Title */}
        <h4 className="text-xl text-white mb-2">{title}</h4>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 -z-10 blur-xl" />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const services = [
    {
      icon: <Cloud className="text-cyan-400" size={28} />,
      title: "SaaS Product Development",
      description: "Building scalable cloud-based solutions that grow with your business needs."
    },
    {
      icon: <Brain className="text-purple-400" size={28} />,
      title: "AI & Intelligent Solutions",
      description: "Integrating cutting-edge AI to automate and enhance your operations."
    },
    {
      icon: <Code className="text-blue-400" size={28} />,
      title: "Web & Product Engineering",
      description: "Crafting robust web applications with modern technologies and best practices."
    },
    {
      icon: <Smartphone className="text-orange-400" size={28} />,
      title: "Mobile App Development",
      description: "Creating seamless mobile experiences for iOS and Android platforms."
    },
    {
      icon: <Building2 className="text-green-400" size={28} />,
      title: "Custom Enterprise Software",
      description: "Tailored solutions designed specifically for your enterprise workflows."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="Services.app" className="max-w-6xl w-full" delay={0.3} onClose={() => window.location.hash = 'hero'}>
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-light text-white mb-8 text-center"
        >
          What We Do
        </motion.h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={0.1 * index}
            />
          ))}
        </div>
      </AppWindow>
    </div>
  );
}
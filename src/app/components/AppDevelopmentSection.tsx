import { AppWindow } from './AppWindow';
import { motion } from 'motion/react';
import { Smartphone, Zap, Users, Shield, Code, Rocket } from 'lucide-react';

export function AppDevelopmentSection() {
  const features = [
    {
      icon: <Smartphone className="text-orange-400" size={32} />,
      title: "Native & Cross-Platform",
      description: "iOS, Android, and React Native solutions for maximum reach"
    },
    {
      icon: <Zap className="text-yellow-400" size={32} />,
      title: "High Performance",
      description: "Optimized apps with smooth animations and fast load times"
    },
    {
      icon: <Users className="text-blue-400" size={32} />,
      title: "User-Centric Design",
      description: "Intuitive interfaces that users love to interact with"
    },
    {
      icon: <Shield className="text-green-400" size={32} />,
      title: "Secure & Scalable",
      description: "Enterprise-grade security with cloud scalability"
    },
    {
      icon: <Code className="text-purple-400" size={32} />,
      title: "Clean Architecture",
      description: "Maintainable code following industry best practices"
    },
    {
      icon: <Rocket className="text-cyan-400" size={32} />,
      title: "Rapid Deployment",
      description: "Fast time-to-market with agile development process"
    }
  ];

  const technologies = [
    { name: "React Native", color: "from-cyan-500 to-blue-500" },
    { name: "Swift", color: "from-orange-500 to-red-500" },
    { name: "Kotlin", color: "from-purple-500 to-pink-500" },
    { name: "Flutter", color: "from-blue-500 to-cyan-500" },
    { name: "MERN Stack", color: "from-green-500 to-emerald-500" },
    { name: "PERN Stack", color: "from-blue-600 to-indigo-500" },
    { name: "n8n Agents", color: "from-pink-500 to-rose-500" },
    { name: "Firebase", color: "from-yellow-500 to-orange-500" },
    { name: "GraphQL", color: "from-pink-500 to-purple-500" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AppWindow title="AppDevelopment.app" className="max-w-6xl w-full" delay={0.3} onClose={() => window.location.hash = 'hero'}>
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 mb-4">
            <Smartphone className="text-orange-400" size={48} />
          </div>
          <h3 className="text-4xl font-light text-white mb-4">Mobile App Development</h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Building next-generation mobile experiences that engage users and drive business growth
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-orange-500/50 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-white text-lg mb-2">{feature.title}</h4>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-white text-xl mb-6 text-center">Technologies We Use</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`px-6 py-3 rounded-full bg-gradient-to-r ${tech.color} bg-opacity-20 border border-white/30 text-white font-medium backdrop-blur-xl`}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-shadow cursor-pointer"
          >
            Start Your App Project
          </motion.a>
        </motion.div>
      </AppWindow>
    </div>
  );
}
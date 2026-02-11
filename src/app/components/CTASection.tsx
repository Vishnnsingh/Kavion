import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="inline-block mb-6"
        >
          <Sparkles className="text-cyan-400" size={48} />
        </motion.div>

        <h2 className="text-4xl md:text-5xl text-white mb-6 font-light">
          Ready to build the future?
        </h2>

        <p className="text-xl text-white/60 mb-12">
          Let's turn your vision into reality with cutting-edge technology
        </p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/30 text-white text-lg font-medium overflow-hidden inline-block cursor-pointer"
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          
          <span className="relative z-10 flex items-center gap-2">
            Launch Your Product with KAVION
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
        </motion.a>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/40 text-sm mb-12"
        >
          © 2026 KAVION Innovation. Innovation Always On.
        </motion.p>
      </motion.div>
    </div>
  );
}
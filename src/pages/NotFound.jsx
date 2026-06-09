import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      {/* Glitch 404 */}
      <div className="relative mb-6">
        <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none select-none"
          style={{ color: 'transparent', WebkitTextStroke: '2px rgba(0,242,255,0.3)' }}>
          404
        </h1>
        <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none select-none absolute inset-0 glow-text text-cyanAccent"
          style={{ clipPath: 'inset(0 0 60% 0)', opacity: 0.7 }}>
          404
        </h1>
        <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none select-none absolute inset-0 text-violet-400"
          style={{ clipPath: 'inset(60% 0 0 0)', opacity: 0.5, transform: 'translateX(-4px)' }}>
          404
        </h1>
      </div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
        <p className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black mb-4">
          Signal Lost
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
          This page doesn't exist.
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The node you're looking for has gone offline. Navigate back to the main grid.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"
            className="px-8 py-4 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest rounded hover:bg-white transition-colors text-sm">
            ← Back to Home
          </Link>
          <Link to="/contact"
            className="px-8 py-4 glass font-black uppercase tracking-widest hover:bg-white/10 transition-colors text-sm">
            Contact Us
          </Link>
        </div>
      </motion.div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(8)].map((_,i) => (
          <div key={i} className="absolute w-full h-px bg-cyanAccent/40"
            style={{ top: `${(i+1)*12}%` }}/>
        ))}
        {[...Array(8)].map((_,i) => (
          <div key={i} className="absolute h-full w-px bg-cyanAccent/40"
            style={{ left: `${(i+1)*12}%` }}/>
        ))}
      </div>
    </motion.div>
  );
}

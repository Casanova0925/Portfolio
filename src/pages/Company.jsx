import React from 'react';
import { motion } from 'framer-motion';

export default function Company() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pt-8 md:pt-10 pb-20 flex flex-col md:flex-row gap-10 md:gap-0"
    >
      <div className="w-full md:w-1/2 md:pr-16">
        <h2 className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black mb-4 md:mb-6">About Us</h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 md:mb-8">
          Pioneering Spatial <br/>Software.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed">
          Founded on the principle that modern software should be visually powerful and frictionless, Neuro-Link is a design and engineering studio specializing in high-performance web, mobile, desktop apps, and real-time 3D systems.
        </p>
        <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-16">
          <div className="glass p-5 md:p-8 border-l-4 border-l-cyanAccent">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4">99%</h3>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Uptime on Socket networks</p>
          </div>
          <div className="glass p-5 md:p-8 border-l-4 border-l-cyanAccent">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4">60fps</h3>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Guaranteed 3D performance</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 glass p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyanAccent/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Our Mission</h3>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
          To build animation-heavy and 3D-type UI that doesn't just look stunning, but actually solves critical industry-specific gaps. We believe that visual clarity drives better decisions across every sector.
        </p>
        <button className="self-start px-6 py-3 md:px-8 md:py-4 bg-white text-[#0A0F1E] font-black uppercase tracking-wider rounded hover:bg-cyanAccent transition-colors text-sm md:text-base">
          Join the Team
        </button>
      </div>
    </motion.div>
  );
}

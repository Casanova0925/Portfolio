import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Shared layout for every sector page
export default function SectorPage({ sector }) {
  const { name, tagline, color, overview, problems, solutions, caseStats } = sector;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.55 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-14 lg:px-20 pb-20 md:pb-32"
    >
      {/* Hero */}
      <div className="pt-4 pb-12 md:pb-20 w-full lg:w-3/4">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] font-black mb-4 md:mb-5" style={{ color }}>{name}</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-5 md:mb-8">{tagline}</h1>
        <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-2xl">{overview}</p>
      </div>

      {/* Stats Row */}
      {caseStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-16 md:mb-24 border-y border-white/5 py-8 md:py-12">
          {caseStats.map((s, i) => (
            <div key={i}>
              <p className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2" style={{ color }}>{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Problems & Solutions */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12">Where The Industry Falls Short</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {problems.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass p-6 md:p-8 border-t-4" style={{ borderColor: '#ef4444' }}
            >
              <h3 className="text-base md:text-lg font-black text-white mb-3 md:mb-4 uppercase tracking-wide">{p.gap}</h3>
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3 md:p-4 leading-relaxed mb-4 md:mb-6">{p.description}</p>
              <div className="p-3 md:p-4 rounded-xl border" style={{ background: `${color}15`, borderColor: `${color}30` }}>
                <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color }}>Our Solution</p>
                <p className="text-sm text-gray-200 leading-relaxed">{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Deliverables */}
      <div className="glass p-6 md:p-12 mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8">What We Deliver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="flex items-start gap-3 md:gap-4">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: color }}></div>
              <div>
                <h4 className="font-black text-white mb-1 text-sm md:text-base">{s.title}</h4>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Opportunities */}
      {sector.automations && sector.automations.length > 0 && (
        <div className="mt-16 md:mt-20">
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-3 bg-cyanAccent/10 border border-cyanAccent/30 rounded-full px-4 py-2 mb-5 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse"></div>
              <span className="text-cyanAccent text-xs font-black uppercase tracking-widest">Automation Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">What Can Be Fully Automated</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              Repetitive, error-prone tasks in your sector that we can automate completely — freeing your team for work that requires human judgment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sector.automations.map((auto, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass p-5 md:p-8 hover:bg-white/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 opacity-60" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}></div>
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-sm md:text-base font-black" style={{ background: `${color}20`, color }}>
                    {auto.icon}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-black text-gray-500">{auto.tag}</span>
                </div>
                <h3 className="text-base md:text-lg font-black text-white mb-2 md:mb-3">{auto.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-3 md:mb-4">{auto.description}</p>
                <div className="pt-3 md:pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Time Saved</p>
                  <p className="text-sm font-black" style={{ color }}>{auto.saving}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-6">
        <Link to="/products" className="px-6 py-3 md:px-8 md:py-4 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-wider rounded hover:bg-white transition-colors text-sm md:text-base text-center">
          See Our Products
        </Link>
        <Link to="/company" className="px-6 py-3 md:px-8 md:py-4 glass font-black uppercase tracking-wider hover:bg-white/10 transition-colors text-sm md:text-base text-center">
          Talk to Us
        </Link>
      </div>
    </motion.div>
  );
}

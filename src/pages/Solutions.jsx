import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sectors = [
  {
    title: 'Healthcare & MedTech',
    color: '#00F2FF',
    icon: '🧬',
    problem: 'Hospitals run on fragmented systems built decades ago. Doctors waste 40% of their time navigating between EMRs, PACS, and lab portals instead of treating patients.',
    solution: 'Unified dashboards, real-time inventory tracking apps, and interactive 3D patient education tools — web, mobile, and desktop.',
    path: '/sectors/healthcare',
  },
  {
    title: 'Architecture & Real Estate',
    color: '#a78bfa',
    icon: '🏙️',
    problem: 'Buyers and investors make million-dollar decisions based on 2D PDFs and static renders. Long sales cycles, high drop-off, remote investor friction.',
    solution: 'Interactive 3D property explorers, sustainability X-Ray mode, and real-time collaborative walkthrough platforms for remote investor presentations.',
    path: '/sectors/architecture',
  },
  {
    title: 'EdTech & Training',
    color: '#34d399',
    icon: '🧠',
    problem: 'Video lectures and PDF notes can\'t teach spatial or procedural skills. Learners disengage. Completion rates are below 15% for most online courses.',
    solution: 'Immersive 3D simulation apps for complex subjects, interactive neural-network-style learning maps, and adaptive skill-tracking platforms.',
    path: '/sectors/edtech',
  },
  {
    title: 'Legal & Compliance',
    color: '#f59e0b',
    icon: '⚖️',
    problem: 'Regulatory data is buried in spreadsheets and email threads. Compliance failures cost enterprises millions — and they\'re almost always caused by visibility gaps.',
    solution: 'Real-time compliance network graphs, automated contract generation, live regulatory status dashboards, and intelligent alert pipelines.',
    path: '/sectors/legaltech',
  },
];

export default function Solutions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pb-20 pt-8 md:pt-10"
    >
      {/* Header */}
      <div className="mb-12 md:mb-20">
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
          className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black mb-4">
          Cross-Sector Problem Solving
        </motion.p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
          Every Industry Has a<br/><span className="glow-text text-cyanAccent">Software Gap.</span>
        </h1>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl">
          We map our full-stack engineering and 3D interface capabilities directly to the specific operational pain points of each sector — building the applications that close those gaps permanently.
        </p>
      </div>

      {/* Sector Cards */}
      <div className="space-y-6 md:space-y-8">
        {sectors.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
            className="glass p-6 md:p-10 group hover:bg-white/5 transition-all border-l-4 relative overflow-hidden"
            style={{ borderLeftColor: s.color }}
          >
            {/* Background accent */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
              style={{ background: s.color }}/>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Left */}
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <h2 className="text-xl md:text-2xl font-black text-white">{s.title}</h2>
                </div>
                <div className="p-4 md:p-5 bg-red-500/10 border border-red-500/20 rounded-xl mb-5">
                  <p className="text-xs uppercase tracking-widest font-black text-red-400 mb-2">The Problem</p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{s.problem}</p>
                </div>
              </div>

              {/* Right */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div className="p-4 md:p-5 rounded-xl border mb-6" style={{ background:`${s.color}10`, borderColor:`${s.color}30` }}>
                  <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color:s.color }}>Our Approach</p>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">{s.solution}</p>
                </div>
                <Link to={s.path}
                  className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs transition-colors"
                  style={{ color: s.color }}>
                  Explore {s.title.split(' ')[0]} Solutions →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        transition={{ duration:0.7 }} className="mt-16 md:mt-24 glass p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyanAccent/5 via-transparent to-violet-500/5 pointer-events-none"/>
        <h2 className="text-2xl md:text-4xl font-black mb-4">Don't See Your Industry?</h2>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
          We've built for finance, logistics, and government too. If there's a gap in your software stack, we'll close it.
        </p>
        <Link to="/contact"
          className="inline-block px-8 py-4 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest rounded hover:bg-white transition-colors text-sm">
          Tell Us Your Problem →
        </Link>
      </motion.div>
    </motion.div>
  );
}

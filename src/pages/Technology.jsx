import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Technology() {
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState([{ type: 'system', text: 'Compliance Network & Triage Engine Online.' }]);

  const handleScan = () => {
    if (!query.trim()) return;
    setLogs(prev => [...prev, { type: 'user', text: query }]);
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'system', text: `Analyzing spatial compliance data for "${query}". Re-routing via Node 42.` }]);
    }, 800);
    setQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pb-20 pt-8 md:pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-0"
    >
      <div className="w-full lg:w-5/12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8">Data City Infrastructure</h2>
        <p className="text-gray-300 mb-6 md:mb-10 text-base md:text-xl leading-relaxed">
          The 3D interactive map represents relationships between parent companies, subsidiaries, and regulatory bodies. Glowing nodes indicate real-time compliance status streamed via WebSockets.
        </p>
        <div className="glass p-6 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full pointer-events-none"></div>
          <h3 className="font-bold text-white border-b border-white/10 pb-3 md:pb-4 mb-4 md:mb-6 flex justify-between items-center text-base md:text-xl">
            Security & Compliance
            <span className="flex h-3 w-3 md:h-4 md:w-4 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-green-500"></span>
            </span>
          </h3>
          <ul className="space-y-4 md:space-y-6 text-sm md:text-base">
            <li className="flex flex-wrap justify-between items-center gap-2"><span className="text-gray-400 font-medium">Encryption Standard:</span><span className="text-cyanAccent font-mono font-bold bg-cyanAccent/10 px-3 py-1 rounded text-xs md:text-sm">TLS 1.3 ACTIVE</span></li>
            <li className="flex flex-wrap justify-between items-center gap-2"><span className="text-gray-400 font-medium">ABDM Integration:</span><span className="text-white font-bold">Milestone 3 Verified</span></li>
            <li className="flex flex-wrap justify-between items-center gap-2"><span className="text-gray-400 font-medium">HIPAA Status:</span><span className="text-green-400 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div>Compliant</span></li>
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-5/12 glass p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-black text-cyanAccent mb-2 glow-text">Network Triage Console</h3>
        <p className="text-xs text-gray-400 mb-6 md:mb-8 uppercase tracking-[0.2em] font-bold">Powered by WebSockets</p>
        <div className="h-56 md:h-72 overflow-y-auto mb-6 md:mb-8 pr-2 md:pr-4 space-y-4 md:space-y-6 custom-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className={`p-4 md:p-5 rounded-2xl text-sm md:text-base border ${log.type === 'system' ? 'bg-white/5 border-white/10 mr-6 md:mr-12' : 'bg-cyanAccent/10 border-cyanAccent/20 ml-6 md:ml-12 text-right'}`}>
              <span className={`text-xs uppercase tracking-widest block mb-2 font-black ${log.type === 'system' ? 'text-cyanAccent' : 'text-white'}`}>
                {log.type === 'system' ? 'System' : 'Admin'}
              </span>
              {log.text}
            </div>
          ))}
        </div>
        <div className="relative">
          <input
            type="text" value={query}
            onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder="Query network node status..."
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-4 md:px-6 md:py-5 text-sm md:text-base focus:outline-none focus:border-cyanAccent transition-colors text-white placeholder-gray-600"
          />
          <button onClick={handleScan} className="absolute right-2 top-2 bottom-2 bg-cyanAccent text-[#0A0F1E] px-4 md:px-8 rounded-lg font-black tracking-widest hover:bg-white transition-colors uppercase text-xs">
            PING
          </button>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=logo, 1=text, 2=bar, 3=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onComplete(), 2800);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0F1E]"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            {[...Array(10)].map((_,i) => (
              <div key={i} className="absolute w-full h-px bg-cyanAccent"
                style={{ top:`${i*10}%`, opacity: 0.3 + i*0.07 }}/>
            ))}
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="w-20 h-20 rounded-2xl bg-cyanAccent/10 border-2 border-cyanAccent/60 flex items-center justify-center mb-6 relative"
            style={{ boxShadow: '0 0 40px rgba(0,242,255,0.25)' }}
          >
            <span className="text-cyanAccent font-black text-4xl">N</span>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border border-cyanAccent/40"
            />
          </motion.div>

          {/* Studio name */}
          {phase >= 1 && (
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
              className="text-center mb-8">
              <p className="text-white font-black text-2xl tracking-[0.3em] mb-1">NEURO-LINK</p>
              <p className="text-cyanAccent/70 text-xs uppercase tracking-[0.4em] font-bold">Software Studio</p>
            </motion.div>
          )}

          {/* Loading bar */}
          {phase >= 2 && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="w-48">
              <div className="h-px bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }} animate={{ width: '100%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="h-full bg-cyanAccent"
                  style={{ boxShadow: '0 0 8px #00F2FF' }}
                />
              </div>
              <p className="text-gray-600 text-xs text-center mt-3 uppercase tracking-widest font-bold">
                Initialising
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

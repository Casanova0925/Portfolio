import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { end: 60,   suffix: 'fps', label: 'UI Performance Standard' },
  { end: 4,    suffix: '+',   label: 'Industry Verticals' },
  { end: 99.9, suffix: '%',  label: 'Deployment Uptime', decimals: 1 },
  { end: 3,    suffix: '',   label: 'Platforms: Web · Mobile · Desktop' },
];

function StatCard({ stat, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay, duration:0.6 }}>
      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 glow-text">
        {inView ? <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals||0} duration={1.8}/> : '0'}
      </p>
      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</p>
    </motion.div>
  );
}

const capabilities = [
  { icon: '◈', title: 'Web Applications', desc: 'Production-grade web apps built on React, Next.js, and Node.js — from internal dashboards to customer-facing platforms with real-time data layers.' },
  { icon: '⬡', title: 'Mobile Applications', desc: 'Cross-platform iOS and Android apps with React Native. Native-feel performance, designed to the same futuristic UI standard as our web products.' },
  { icon: '◉', title: 'Desktop Applications', desc: 'Electron-based desktop software with full OS-level integration. Ideal for enterprise tools that need offline capability and hardware access.' },
  { icon: '⬢', title: 'Interactive 3D & Data Viz', desc: 'Our signature capability — WebGL, Three.js, and shader-based interfaces that turn complex data into spatial, living experiences.' },
];

const sectors = [
  { label: 'Healthcare', path: '/sectors/healthcare' },
  { label: 'Architecture & Real Estate', path: '/sectors/architecture' },
  { label: 'EdTech', path: '/sectors/edtech' },
  { label: 'Legal & Compliance', path: '/sectors/legaltech' },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We learn your sector, your users, and the exact gap you need to fill.' },
  { step: '02', title: 'Design', desc: 'Figma-first, futuristic UI design. Every screen is production-ready before a single line of code is written.' },
  { step: '03', title: 'Build', desc: 'Full-stack engineering across web, mobile, or desktop. Modular, scalable, tested.' },
  { step: '04', title: 'Deploy & Scale', desc: 'CI/CD pipelines, cloud hosting, and ongoing support. We own uptime with you.' },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <div className="w-full">
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX }}/>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center px-4 sm:px-8 md:px-14 lg:px-20">
        <div className="w-full lg:w-8/12">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black mb-4 md:mb-6"
          >
            Full-Service Software Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-6 md:mb-8 tracking-tight"
          >
            We Build Software That&nbsp;
            <span className="glow-text text-cyanAccent">
              <TypeAnimation
                sequence={['Looks Impossible.', 2500, 'Changes Industries.', 2500, 'Sets New Standards.', 2500, 'Drives Growth.', 2500]}
                wrapper="span" speed={45} repeat={Infinity}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-2xl"
          >
            Neuro-Link designs and builds production-grade web, mobile, and desktop applications for ambitious companies. We specialise in futuristic interfaces, real-time systems, and interactive 3D experiences — tailored to your industry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6"
          >
            <Link to="/sectors/healthcare" className="px-7 py-4 md:px-10 md:py-5 bg-cyanAccent text-[#0A0F1E] font-black tracking-wider uppercase rounded hover:bg-white transition-colors shadow-[0_0_30px_rgba(0,242,255,0.4)] text-sm md:text-base text-center">
              Explore Sectors
            </Link>
            <Link to="/company" className="px-7 py-4 md:px-10 md:py-5 bg-white/10 text-white font-black tracking-wider uppercase rounded hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md text-sm md:text-base text-center">
              About the Studio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-10 md:py-16 border-y border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((s, i) => <StatCard key={i} stat={s} delay={i*0.1}/>)}
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4">What We Build</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">End-to-end software across every platform — with one non-negotiable: every interface has to be world-class.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          {capabilities.map((cap, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass p-6 md:p-10 hover:bg-white/5 transition-all group"
            >
              <p className="text-3xl md:text-4xl text-cyanAccent mb-4 md:mb-6 group-hover:scale-110 inline-block transition-transform">{cap.icon}</p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">{cap.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4">How We Work</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">A repeatable process that delivers exceptional results regardless of the sector.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {process.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass p-6 md:p-8 relative overflow-hidden"
            >
              <p className="text-6xl md:text-7xl font-black text-white/5 absolute -top-4 -right-2 select-none">{p.step}</p>
              <p className="text-cyanAccent font-black text-xs uppercase tracking-widest mb-3 md:mb-4">{p.step}</p>
              <h3 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTORS STRIP ── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4">Industries We Serve</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">Every sector has unique gaps. We map our engineering capabilities directly to your industry's specific pain points.</p>
        </motion.div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {sectors.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={s.path}
                className="px-5 py-3 md:px-8 md:py-4 glass text-sm md:text-lg font-bold hover:bg-cyanAccent hover:text-[#0A0F1E] hover:border-cyanAccent transition-all inline-block border-cyanAccent/20"
              >
                {s.label} →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-20 md:py-32 flex items-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="w-full md:w-2/3 lg:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">Have a Problem We Should Solve?</h2>
          <p className="text-gray-300 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">Tell us your sector, your users, and the gap you're facing. We'll scope the right application — web, mobile, or desktop.</p>
          <Link to="/company" className="inline-block px-8 py-4 md:px-10 md:py-5 bg-cyanAccent text-[#0A0F1E] font-black tracking-wider uppercase rounded hover:bg-white transition-colors text-sm md:text-base">
            Start a Conversation
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

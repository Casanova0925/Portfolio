import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Products from './pages/Products';
import Technology from './pages/Technology';
import Company from './pages/Company';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import HealthcareSector from './pages/sectors/Healthcare';
import ArchitectureSector from './pages/sectors/Architecture';
import EdtechSector from './pages/sectors/Edtech';
import LegaltechSector from './pages/sectors/Legaltech';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

const navLinkClass = ({ isActive }) =>
  `text-xs uppercase tracking-widest font-black transition-colors ${isActive ? 'text-cyanAccent' : 'text-gray-300 hover:text-white'}`;

const sectors = [
  { to: '/sectors/healthcare', label: 'Healthcare' },
  { to: '/sectors/architecture', label: 'Architecture' },
  { to: '/sectors/edtech', label: 'EdTech' },
  { to: '/sectors/legaltech', label: 'Legal & Compliance' },
];

function Header() {
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  const handleMouseEnter = () => { clearTimeout(closeTimer.current); setSectorsOpen(true); };
  const handleMouseLeave = () => { closeTimer.current = setTimeout(() => setSectorsOpen(false), 120); };

  return (
    <header className="fixed top-0 w-full z-50 px-4 sm:px-8 md:px-10 py-4 md:py-6 flex justify-between items-center border-b border-white/5 bg-[#0A0F1E]/60 backdrop-blur-xl">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-cyanAccent/20 flex items-center justify-center border border-cyanAccent/40 text-cyanAccent font-black text-base md:text-lg group-hover:bg-cyanAccent/30 transition-colors">N</div>
        <div>
          <p className="text-sm md:text-base font-black tracking-[0.15em] text-white leading-none">NEURO-LINK</p>
          <p className="text-[9px] md:text-[10px] text-cyanAccent/70 uppercase tracking-[0.2em] font-bold">Software Studio</p>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-8">
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span className={`text-xs uppercase tracking-widest font-black cursor-pointer transition-colors select-none ${sectorsOpen ? 'text-cyanAccent' : 'text-gray-300 hover:text-white'}`}>
            Sectors ▾
          </span>
          {sectorsOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl overflow-hidden border border-white/10 bg-[#0A0F1E]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]" style={{ zIndex: 999 }}>
              {sectors.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setSectorsOpen(false)}
                  className={({ isActive }) => `block px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-cyanAccent bg-cyanAccent/10' : 'text-gray-300 hover:bg-cyanAccent/10 hover:text-cyanAccent'}`}>
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <NavLink to="/products" className={navLinkClass}>Products</NavLink>
        <NavLink to="/solutions" className={navLinkClass}>Solutions</NavLink>
        <NavLink to="/technology" className={navLinkClass}>Technology</NavLink>
        <NavLink to="/company" className={navLinkClass}>Company</NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/contact" className="hidden sm:inline-block px-4 py-2 md:px-5 md:py-3 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest text-xs rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,242,255,0.3)]">
          Book a Demo
        </Link>
        {/* Hamburger */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#0A0F1E]/98 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-2 lg:hidden"
            style={{ zIndex: 998 }}
          >
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className="py-3 text-sm font-black uppercase tracking-widest text-gray-300 border-b border-white/5">Home</NavLink>
            <div className="py-3 border-b border-white/5">
              <p className="text-xs text-cyanAccent uppercase tracking-widest font-black mb-3">Sectors</p>
              {sectors.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}
                  className="block py-2 pl-3 text-sm text-gray-400 hover:text-cyanAccent transition-colors">{label}</NavLink>
              ))}
            </div>
            <NavLink to="/products" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-black uppercase tracking-widest text-gray-300 border-b border-white/5">Products</NavLink>
            <NavLink to="/solutions" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-black uppercase tracking-widest text-gray-300 border-b border-white/5">Solutions</NavLink>
            <NavLink to="/technology" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-black uppercase tracking-widest text-gray-300 border-b border-white/5">Technology</NavLink>
            <NavLink to="/company" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-black uppercase tracking-widest text-gray-300 border-b border-white/5">Company</NavLink>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-3 px-6 py-3 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest text-xs rounded text-center">Book a Demo</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full px-4 sm:px-8 md:px-20 py-12 md:py-16 border-t border-white/5 bg-[#0A0F1E]/80 backdrop-blur-xl">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-16">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-cyanAccent/20 flex items-center justify-center border border-cyanAccent/40 text-cyanAccent font-black">N</div>
            <p className="font-black tracking-[0.15em] text-white">NEURO-LINK</p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            A full-service software studio building production-grade web, mobile, and desktop applications with futuristic interfaces — for any sector.
          </p>
        </div>
        <div className="flex gap-10 sm:gap-16 flex-wrap">
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-widest text-xs border-b border-white/10 pb-2">Sectors</h4>
            <ul className="space-y-3 text-sm">
              {sectors.map(({ to, label }) => (
                <li key={to}><Link to={to} className="text-gray-400 hover:text-cyanAccent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-widest text-xs border-b border-white/10 pb-2">Studio</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-gray-400 hover:text-cyanAccent transition-colors">Products</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-cyanAccent transition-colors">Solutions</Link></li>
              <li><Link to="/technology" className="text-gray-400 hover:text-cyanAccent transition-colors">Technology</Link></li>
              <li><Link to="/company" className="text-gray-400 hover:text-cyanAccent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyanAccent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-600">
        <p>© 2025 Neuro-Link Studio. All rights reserved.</p>
        <p className="text-cyanAccent/50 font-mono">v2.0.0 · WebGL · React · Node.js</p>
      </div>
    </footer>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  return (
    <HelmetProvider>
      <CustomCursor/>
      {!loaded && <Preloader onComplete={() => setLoaded(true)}/>}
      <div className="relative w-full min-h-screen overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <Background3D currentRoute={location.pathname} />
        </div>
        <Header />
        <div className="relative z-10 w-full pt-20 md:pt-24 pointer-events-auto flex flex-col">
          <main className="flex-grow min-h-screen">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/sectors/healthcare" element={<HealthcareSector />} />
                <Route path="/sectors/architecture" element={<ArchitectureSector />} />
                <Route path="/sectors/edtech" element={<EdtechSector />} />
                <Route path="/sectors/legaltech" element={<LegaltechSector />} />
                <Route path="/products" element={<Products />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/company" element={<Company />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;

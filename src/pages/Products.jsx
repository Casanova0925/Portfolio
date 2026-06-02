import React from 'react';
import { motion } from 'framer-motion';

export default function Products() {
  const products = [
    {
      name: "The Green-Print Explorer",
      sector: "Sustainable Architecture",
      desc: "Interactive X-Ray models of building infrastructure. Clients visualize insulation, solar wiring, and water recycling systems inside 3D walls to ensure sustainability compliance.",
      features: ["Interactive X-Ray", "Daylight Simulation", "Mobile Optimized"]
    },
    {
      name: "Edu-Verse Interactive",
      sector: "EdTech / Engineering",
      desc: "An educational hub where learners interact with subjects in 3D. Exploded views of complex systems and WebGL particle simulations for deep understanding.",
      features: ["Exploded Views", "Particle Simulations", "GSAP Transitions"]
    },
    {
      name: "Compliance-Map 3D",
      sector: "LegalTech / Governance",
      desc: "Transforms compliance checklists into a 3D Data City. Interactive network graphs show relationships between departments and regulatory bodies in real time.",
      features: ["Network Graphs", "Live Status Nodes", "Framer Motion UI"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pt-8 md:pt-10 pb-20"
    >
      <div className="mb-10 md:mb-20 w-full md:w-1/2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">Our Product Suite</h2>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed">
          Showcasing our ability to build animation-heavy, production-grade interfaces tailored for complex ecosystems across every sector.
        </p>
      </div>
      <div className="space-y-6 md:space-y-10">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }} transition={{ delay: index * 0.1, duration: 0.8 }}
            className="glass p-6 md:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:bg-white/5 transition-all"
          >
            <div className="w-full sm:w-2/3">
              <h4 className="text-cyanAccent font-bold uppercase tracking-[0.3em] text-xs mb-3 md:mb-4">{product.sector}</h4>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6">{product.name}</h3>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-5 md:mb-8">{product.desc}</p>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {product.features.map((feat, i) => (
                  <span key={i} className="px-3 py-1 md:px-4 md:py-2 bg-white/10 rounded-full text-xs md:text-sm font-semibold border border-white/10 text-gray-200">{feat}</span>
                ))}
              </div>
            </div>
            <div className="sm:w-1/3 flex justify-start sm:justify-end">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-cyanAccent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                <span className="text-cyanAccent font-black text-xl md:text-2xl">3D</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

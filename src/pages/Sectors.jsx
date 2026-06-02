import React from 'react';
import { motion } from 'framer-motion';

export default function Sectors() {
  const sectors = [
    {
      title: "Hospitals & Clinics",
      gap: "Fragmented patient data and outdated 2D interfaces slow down triage and cause critical diagnostic errors.",
      solution: "Spatial Digital Twins integrate all patient records into a single 3D interactive model, accelerating diagnosis and ensuring no symptom is overlooked."
    },
    {
      title: "Pharmacy & Inventory",
      gap: "Blind spots in supply chains lead to stockouts of critical medicines during emergencies.",
      solution: "Live Predictive Tracking visuals immediately highlight low-stock nodes in red, allowing automated re-routing before a crisis occurs."
    },
    {
      title: "Patients & Caretakers",
      gap: "Medical jargon and confusing reports leave patients anxious and non-compliant with treatments.",
      solution: "Transparent, visual diagnostics allow doctors to 'show' rather than just 'tell', drastically improving patient understanding and trust."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 pb-20"
    >
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-4">Transforming Sectors</h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          The Neuro-Link platform is designed to identify the critical gaps in modern healthcare infrastructure and bridge them with seamless, spatial technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectors.map((sector, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="glass p-8 hover:bg-white/5 transition-colors border-t-4 border-t-cyanAccent"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{sector.title}</h3>
            
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-widest text-red-400 font-bold mb-2">The Gap</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{sector.gap}</p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-cyanAccent font-bold mb-2">Our Solution</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{sector.solution}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

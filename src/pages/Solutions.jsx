import React from 'react';
import { motion } from 'framer-motion';

export default function Solutions() {
  const sectors = [
    {
      title: "Hospitals & Clinics",
      gap: "Fragmented patient data and outdated 2D interfaces slow down triage and cause critical diagnostic errors. Doctors spend 40% of their time navigating complex EHR systems instead of looking at the patient.",
      solution: "Spatial Digital Twins integrate all patient records into a single 3D interactive model, accelerating diagnosis and ensuring no symptom is overlooked."
    },
    {
      title: "Pharmacy & Inventory",
      gap: "Blind spots in supply chains lead to stockouts of critical medicines during emergencies. Static spreadsheets cannot predict rapid spikes in demand.",
      solution: "Live Predictive Tracking visuals immediately highlight low-stock nodes in red across a 3D floorplan, allowing automated re-routing before a crisis occurs."
    },
    {
      title: "Patients & Caretakers",
      gap: "Medical jargon and confusing reports leave patients anxious and non-compliant with treatments. They cannot visualize what is happening inside their own bodies.",
      solution: "Transparent, visual diagnostics allow doctors to 'show' rather than just 'tell'. Patients can view their 3D scans in real-time, drastically improving understanding and trust."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pb-20 pt-8 md:pt-10"
    >
      <div className="mb-12 md:mb-24 w-full md:w-1/2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">Bridging The Gaps</h2>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed">
          The Neuro-Link platform identifies critical gaps in modern healthcare infrastructure and bridges them with seamless, spatial technology.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {sectors.map((sector, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.8 }}
            className="glass p-6 md:p-10 hover:bg-white/5 transition-colors border-t-4 border-t-cyanAccent flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-5 md:mb-8">{sector.title}</h3>
              <div className="mb-6 md:mb-8 p-4 md:p-6 bg-red-500/10 rounded-xl border border-red-500/20">
                <h4 className="text-xs uppercase tracking-[0.2em] text-red-400 font-black mb-3 md:mb-4">The Problem</h4>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{sector.gap}</p>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-cyanAccent/10 rounded-xl border border-cyanAccent/20">
              <h4 className="text-xs uppercase tracking-[0.2em] text-cyanAccent font-black mb-3 md:mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse"></div>
                Our Value Addition
              </h4>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{sector.solution}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

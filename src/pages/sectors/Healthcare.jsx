import React from 'react';
import SectorPage from '../../components/SectorPage';

const data = {
  name: 'Healthcare & MedTech',
  tagline: 'Replacing Outdated Clinical Software With Spatial Precision.',
  color: '#00F2FF',
  overview: 'Hospital systems run on software built in the 2000s. Disconnected EMRs, manual inventory, and opaque diagnostic flows cost time, money, and lives. We build the interfaces that eliminate those gaps.',
  caseStats: [
    { value: '40%', label: 'Time wasted in EHR navigation' },
    { value: '23%', label: 'Medication errors from bad UX' },
    { value: '2x', label: 'Faster triage with spatial tools' },
    { value: '$1.4T', label: 'Global digital health market by 2030' },
  ],
  problems: [
    {
      gap: 'Fragmented Patient Data',
      description: 'Hospitals run on 5–10 disconnected systems. Doctors waste 40% of their day navigating between EMRs, PACS, and lab portals, unable to see a unified patient view.',
      solution: 'We build unified patient dashboard applications — web & desktop — that aggregate every data source into a single, real-time, intelligible interface.',
    },
    {
      gap: 'Opaque Inventory & Supply Chain',
      description: 'Pharmacy stockouts happen because managers rely on spreadsheets and static reports. They can\'t see what\'s depleting in real time across multiple departments.',
      solution: 'Real-time inventory tracking apps with alert-driven dashboards, predictive restock models, and live visual heat maps of stock levels across every ward.',
    },
    {
      gap: 'Patient Education & Consent',
      description: '2D pamphlets and verbal explanations leave patients confused, anxious, and less likely to follow treatment plans — leading to poor outcomes and liability exposure.',
      solution: 'Interactive 3D educational apps (tablet/web) where doctors visually walk patients through procedures, conditions, and treatment plans using animated models.',
    },
  ],
  solutions: [
    { title: 'Unified EMR Dashboard', desc: 'Web app integrating data from multiple hospital systems into a single real-time interface with smart alerts.' },
    { title: 'Live Inventory Management', desc: 'Desktop + web application with socket-driven live updates, heat maps, and AI restock predictions.' },
    { title: '3D Patient Education App', desc: 'Tablet-first application with interactive anatomical models and procedural animations.' },
    { title: 'Compliance Monitoring Portal', desc: 'HIPAA/ABDM compliance network graph — live node status for every regulatory obligation.' },
  ],
  automations: [
    {
      icon: '📅',
      tag: 'Scheduling',
      title: 'Appointment & Follow-Up Automation',
      description: 'Automatically schedule patient appointments, send confirmation SMS/emails, and trigger follow-up reminders 24h before. Eliminate no-shows and reduce front-desk load by up to 70%.',
      saving: '~12 hrs/week per front-desk staff',
    },
    {
      icon: '📋',
      tag: 'Documentation',
      title: 'Discharge Summary & Report Generation',
      description: 'Auto-generate structured discharge summaries, lab result reports, and prescription PDFs directly from EMR data — removing manual copy-paste errors across systems.',
      saving: '~30 min per patient discharge',
    },
    {
      icon: '💊',
      tag: 'Pharmacy',
      title: 'Predictive Restock & Auto-Ordering',
      description: 'Monitor stock levels in real-time. When a medicine threshold is breached, automatically trigger a purchase order to the approved supplier without manual intervention.',
      saving: 'Eliminates ~100% of manual reorder tasks',
    },
    {
      icon: '🏥',
      tag: 'Insurance',
      title: 'Insurance Pre-Auth & Claims Filing',
      description: 'Automate insurance pre-authorization requests, status tracking, and claims submission using structured patient and procedure data — reducing the 3-day manual cycle to hours.',
      saving: '~3 days → same day per claim',
    },
    {
      icon: '🔬',
      tag: 'Diagnostics',
      title: 'Lab Result Routing & Alert Engine',
      description: 'When a lab result is marked critical, automatically route it to the responsible doctor, flag it in the patient dashboard, and log an audit trail — without any manual triage.',
      saving: 'Reduces critical result delays by ~80%',
    },
    {
      icon: '📊',
      tag: 'Analytics',
      title: 'Shift & Staff Scheduling Optimisation',
      description: 'Analyse historical patient load data to auto-generate optimal shift rosters, surface understaffing risks, and notify department heads — all without spreadsheet management.',
      saving: '~8 hrs/week per department head',
    },
  ],
};

export default function HealthcareSector() {
  return <SectorPage sector={data} />;
}

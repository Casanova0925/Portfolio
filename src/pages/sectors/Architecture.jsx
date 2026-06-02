import React from 'react';
import SectorPage from '../../components/SectorPage';

const data = {
  name: 'Architecture & Real Estate',
  tagline: 'Turning Static Floor Plans Into Living, Explorable Experiences.',
  color: '#a78bfa',
  overview: 'Buyers, investors, and tenants are forced to make million-dollar decisions based on 2D PDFs and uninspiring render images. We replace those artefacts with interactive, web-based 3D experiences that actually convert.',
  caseStats: [
    { value: '40%', label: 'Higher conversion with 3D tours' },
    { value: '70%', label: 'Buyers prefer visual walkthroughs' },
    { value: '3×', label: 'Faster investor sign-off with spatial tools' },
    { value: '$380B', label: 'PropTech market by 2030' },
  ],
  problems: [
    {
      gap: 'Unengaging 2D Floor Plans',
      description: 'PDFs and static renders fail to convey spatial relationships, natural lighting, or material quality — making prospects hesitant to commit without an in-person visit.',
      solution: 'Interactive web apps where users navigate the 3D building model freely, toggle materials, and see natural sunlight simulated at any time of day or season.',
    },
    {
      gap: 'Invisible Sustainability Credentials',
      description: '"Green building" claims in brochures are ignored. Buyers can\'t see or trust insulation ratings, solar capacity, or water recycling unless it\'s made tangible.',
      solution: 'An "X-Ray Mode" feature in the property web app that peels back walls to reveal sustainability layers — solar wiring, insulation grades, water systems — interactively.',
    },
    {
      gap: 'Remote Investor Due Diligence',
      description: 'International investors cannot visit every site. Video calls and static documents are insufficient for high-value decisions, leading to long sales cycles.',
      solution: 'Collaborative web platforms with live 3D walkthroughs where investors and agents navigate the space together in real-time from different locations.',
    },
  ],
  solutions: [
    { title: 'Interactive 3D Property Explorer', desc: 'Web app with scroll-linked building assembly, material switcher, and daylight simulation slider.' },
    { title: 'Sustainability X-Ray Mode', desc: 'Layer-toggle feature revealing insulation, solar, and water systems inside the 3D architectural model.' },
    { title: 'Remote Collaboration Portal', desc: 'Multi-user real-time 3D walkthrough web app for remote investor presentations.' },
    { title: 'Project Management Desktop App', desc: 'Electron desktop app for site teams with offline access to blueprints, timelines, and contractor comms.' },
  ],
  automations: [
    {
      icon: '📐',
      tag: 'Site Surveys',
      title: 'Automated Survey Data Processing',
      description: 'Convert raw drone imagery and surveyor data into structured 3D site models automatically — eliminating manual CAD import and measurement reconciliation that takes teams days.',
      saving: '~3 days → 2 hours per site survey',
    },
    {
      icon: '📝',
      tag: 'Permits & Compliance',
      title: 'Permit Application & Status Tracking',
      description: 'Auto-fill permit application forms from project data, submit to municipal portals, and track approval statuses in a real-time dashboard — no manual chasing of government systems.',
      saving: '~6 hrs/week per project manager',
    },
    {
      icon: '📢',
      tag: 'Client Comms',
      title: 'Client Progress Update Engine',
      description: 'Automatically generate and send weekly progress reports with photos, milestone completions, and budget snapshots pulled directly from the project management system.',
      saving: '~4 hrs/week in manual reporting',
    },
    {
      icon: '🧱',
      tag: 'Procurement',
      title: 'Material Reorder & Vendor Coordination',
      description: 'Monitor material consumption against project timelines. Auto-trigger purchase orders to pre-approved vendors when stock falls below buffer levels, avoiding costly site delays.',
      saving: 'Reduces material delay incidents by ~60%',
    },
    {
      icon: '📜',
      tag: 'Legal',
      title: 'Contract & NDA Generation',
      description: 'Auto-generate contractor agreements, NDAs, and subcontractor contracts from project templates, pre-populated with client and project data, ready for e-signature.',
      saving: '~2 hrs per contract cycle',
    },
    {
      icon: '🌱',
      tag: 'Sustainability',
      title: 'Green Rating Compliance Audit',
      description: 'Cross-check project specifications against LEED/GRIHA sustainability benchmarks automatically and surface non-compliant elements with recommended fixes before submission.',
      saving: 'Eliminates ~80% of manual audit prep',
    },
  ],
};

export default function ArchitectureSector() {
  return <SectorPage sector={data} />;
}

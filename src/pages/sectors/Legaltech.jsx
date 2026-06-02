import React from 'react';
import SectorPage from '../../components/SectorPage';

const data = {
  name: 'Legal-Tech & Corporate Governance',
  tagline: 'Making Corporate Complexity Visual, Navigable, and Actionable.',
  color: '#34d399',
  overview: 'Corporate legal structures, compliance obligations, and regulatory relationships are inherently abstract. Spreadsheets and Word documents cannot communicate them clearly to stakeholders. We build platforms that make governance legible.',
  caseStats: [
    { value: '60%', label: 'Compliance failures from poor visibility' },
    { value: '4×', label: 'Faster stakeholder sign-off with visual tools' },
    { value: '$49B', label: 'LegalTech market by 2027' },
    { value: '30%', label: 'Cost reduction via automated compliance tracking' },
  ],
  problems: [
    {
      gap: 'Opaque Corporate Structures',
      description: 'Holding companies, subsidiaries, SPVs, and joint ventures are managed in spreadsheets. Stakeholders — including the board — cannot visualise ownership chains or regulatory exposure at a glance.',
      solution: 'Interactive 3D network graph web application mapping every entity, relationship, and jurisdiction. Click any node to drill into its details, obligations, and connected parties.',
    },
    {
      gap: 'Static, Unactionable Compliance Checklists',
      description: 'Legal teams manage hundreds of obligations across departments using colour-coded spreadsheets. Status is always stale, responsibility is unclear, and nothing is auditable in real time.',
      solution: 'A live Compliance Dashboard web app with glowing status nodes (Green/Yellow/Red) per obligation, auto-assigned ownership, deadline alerts, and full audit trail.',
    },
    {
      gap: 'Slow Regulatory Reporting',
      description: 'Generating a board-level regulatory report takes days of manual data consolidation from teams across the business — by which point some data is already out of date.',
      solution: 'Automated reporting desktop and web application that aggregates live compliance data and generates formatted board reports with one click, always current.',
    },
  ],
  solutions: [
    { title: 'Compliance-Map 3D', desc: 'Interactive 3D network graph web app showing entity relationships, regulatory nodes, and live obligation statuses.' },
    { title: 'Live Compliance Dashboard', desc: 'Web app with real-time status indicators, automated alerts, and department-level ownership tracking.' },
    { title: 'Automated Board Reporting', desc: 'Desktop + web app that generates formatted regulatory and governance reports from live data sources.' },
    { title: 'Regulatory Filing Tracker', desc: 'Mobile app for legal teams to track, flag, and approve regulatory filings with approval workflows.' },
  ],
  automations: [
    {
      icon: '📑',
      tag: 'Contracts',
      title: 'Contract Review & Risk Flagging',
      description: 'Automatically scan incoming contracts against a predefined playbook — flagging non-standard clauses, missing terms, and risk thresholds — before any lawyer spends time on review.',
      saving: 'Cuts contract review time by ~70%',
    },
    {
      icon: '⏰',
      tag: 'Deadlines',
      title: 'Regulatory Deadline Reminder Engine',
      description: 'Parse every regulatory obligation from your compliance register and auto-schedule multi-stage reminders (30 days, 7 days, 1 day before) to the responsible owner — with escalation paths.',
      saving: 'Eliminates ~100% of missed deadline incidents',
    },
    {
      icon: '🗂️',
      tag: 'Filing',
      title: 'Regulatory Submission Workflow',
      description: 'Auto-compile required documents, run a pre-submission completeness check, and submit to regulatory portals on the scheduled date — with confirmation receipts logged in the audit trail.',
      saving: '~3 days → 2 hours per filing cycle',
    },
    {
      icon: '📄',
      tag: 'Documents',
      title: 'Legal Document Generation',
      description: 'Generate NDAs, board resolutions, shareholder agreements, and compliance declarations from structured templates — pre-filled with entity data and ready for e-signature in minutes.',
      saving: '~4 hrs per document package',
    },
    {
      icon: '🔍',
      tag: 'Audit',
      title: 'Automated Compliance Audit Trail',
      description: 'Every obligation update, status change, and approver action is automatically timestamped, versioned, and logged in an immutable audit trail — ready for regulator inspection without manual prep.',
      saving: 'Audit prep reduced from weeks to hours',
    },
    {
      icon: '🌐',
      tag: 'Due Diligence',
      title: 'Third-Party & Vendor KYC Automation',
      description: 'Trigger background checks, document collection, and risk scoring for new vendors or counterparties automatically upon onboarding — replacing a slow, manual process with a 24-hour pipeline.',
      saving: '~5 days → 1 day per vendor onboarding',
    },
  ],
};

export default function LegaltechSector() {
  return <SectorPage sector={data} />;
}

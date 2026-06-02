import React from 'react';
import SectorPage from '../../components/SectorPage';

const data = {
  name: 'EdTech & Training',
  tagline: 'Learning That You Can Touch, Rotate, and Explore.',
  color: '#f59e0b',
  overview: 'Education is still trapped inside flat textbooks and passive videos. We build interactive learning applications — for engineering, medicine, and science — where students interact with the actual subject matter in 3D.',
  caseStats: [
    { value: '76%', label: 'Better retention with interactive learning' },
    { value: '3×', label: 'Faster concept grasp vs static diagrams' },
    { value: '$605B', label: 'EdTech market globally by 2027' },
    { value: '1.5B', label: 'Learners underserved by current tools' },
  ],
  problems: [
    {
      gap: 'Passive, Non-Interactive Content',
      description: 'Students watch videos and read PDFs but cannot interact with a turbine, a cell, or a circuit board. Passive learning leads to low retention and poor practical performance.',
      solution: 'Web and mobile apps where students orbit, dissect, and reassemble 3D models of complex subjects — each interaction triggering contextual labels and explanations.',
    },
    {
      gap: 'Inaccessible Lab Equipment',
      description: 'Expensive physical labs are available to few. Rural and under-resourced institutions are left behind with outdated textbooks and no hands-on experience.',
      solution: 'A virtual lab desktop and mobile application that simulates equipment, reactions, and outcomes with accurate physics — accessible on any device, without hardware.',
    },
    {
      gap: 'Generic One-Size-Fits-All Platforms',
      description: 'LMS platforms like Moodle are not built for visual, technical subjects. Engineering diagrams and anatomical content suffer on platforms designed for text-first courses.',
      solution: 'Custom-built LMS or plugin modules for existing platforms, built around 3D content delivery, progress tracking, and interactive assessment for technical subjects.',
    },
  ],
  solutions: [
    { title: 'Edu-Verse 3D Learning App', desc: 'Web + mobile app with exploded-view subject models, particle simulations, and interactive assessment.' },
    { title: 'Virtual Lab Platform', desc: 'Desktop application simulating lab equipment and experiments with real physics models.' },
    { title: 'Technical LMS Module', desc: 'Custom plugin for existing EdTech platforms adding 3D content delivery and interactive tests.' },
    { title: 'Instructor Dashboard', desc: 'Web app for educators to track engagement, interaction depth, and learning outcomes per student.' },
  ],
  automations: [
    {
      icon: '📊',
      tag: 'Assessments',
      title: 'Automated Grading & Feedback Engine',
      description: 'Auto-grade MCQs, coding exercises, and structured written responses. Surface per-student weakness areas and generate personalised feedback reports — instantly after submission.',
      saving: '~8 hrs/week per instructor',
    },
    {
      icon: '📜',
      tag: 'Certification',
      title: 'Certificate Generation & Issuance',
      description: 'Automatically generate, sign, and email verified digital certificates when a student completes a course or assessment — with a blockchain-verifiable credential link.',
      saving: '100% of manual certificate admin eliminated',
    },
    {
      icon: '🔔',
      tag: 'Engagement',
      title: 'At-Risk Student Alert System',
      description: 'Detect students falling behind using engagement analytics (logins, time-on-task, assessment scores) and automatically notify instructors and parents with a recommended action plan.',
      saving: 'Reduces dropout rates by ~35%',
    },
    {
      icon: '📚',
      tag: 'Content',
      title: 'Course Enrollment & Waitlist Management',
      description: 'Automatically process enrollments, manage waitlists, send joining instructions, and generate class rosters — eliminating manual admin for every cohort launch.',
      saving: '~5 hrs per cohort launch',
    },
    {
      icon: '📈',
      tag: 'Reporting',
      title: 'Parent & Stakeholder Progress Reports',
      description: 'Auto-generate weekly/monthly learning progress reports for parents, sponsors, or enterprise clients — pulled directly from student performance data, no manual compilation needed.',
      saving: '~6 hrs/week in admin reporting',
    },
    {
      icon: '🗓️',
      tag: 'Scheduling',
      title: 'Live Class & Tutor Scheduling',
      description: 'Automatically match students with available tutors based on subject, level, and availability. Book sessions, send calendar invites, and handle rescheduling without manual coordination.',
      saving: '~4 hrs/week per academic coordinator',
    },
  ],
};

export default function EdtechSector() {
  return <SectorPage sector={data} />;
}

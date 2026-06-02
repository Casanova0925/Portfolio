# 🧠 Neuro-Link — Futuristic Software Studio Portfolio

<div align="center">

![Neuro-Link Banner](https://img.shields.io/badge/Neuro--Link-Software%20Studio-00F2FF?style=for-the-badge&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A production-grade, multi-page software studio portfolio with interactive 3D WebGL scenes, futuristic UI, and sector-specific automation breakdowns.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Overview

Neuro-Link is a high-end software studio portfolio built to showcase full-service technical capabilities across **Web**, **Mobile**, and **Desktop** application development. The site features real-time 3D WebGL animations tailored to each industry sector, glassmorphism design, and detailed problem-solution frameworks for prospective clients.

---

## 🚀 Features

- **Interactive 3D WebGL Scenes** — Sector-specific Three.js animations using React Three Fiber
  - 🧬 **Healthcare** — Animated DNA Double Helix with flowing particles
  - 🏙️ **Architecture** — Assembling city skyline with holographic scanners
  - 🧠 **EdTech** — Multi-layer Neural Network with real-time signal pulses
  - ⚖️ **LegalTech** — Hexagonal Data City with circuit traces & flying data packets

- **Multi-Page Architecture** — React Router with persistent 3D background and smooth page transitions (Framer Motion)

- **Fully Responsive** — Mobile-first design with hamburger navigation, adaptive grids, and fluid typography

- **Automation Sections** — Each sector page details industry-specific workflows that can be fully automated

- **Futuristic Design System**
  - Dark glassmorphism aesthetic (`#0A0F1E` base)
  - Cyan (`#00F2FF`), Violet (`#a78bfa`), Green (`#34d399`) accent palette
  - GSAP-powered micro-animations
  - Dynamic point lights, particle systems, and orbital rings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite 5 |
| **3D / WebGL** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| **Animation** | GSAP 3, Framer Motion |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router DOM v6 |
| **Build** | Vite with HMR |

---

## 📁 Project Structure

```
neuro-link/
├── public/
│   └── models/              # 3D model assets (GLB/GLTF)
├── src/
│   ├── components/
│   │   ├── Background3D.jsx # All WebGL scenes (DNA, City, Neural Net, Data City)
│   │   └── SectorPage.jsx   # Shared sector page layout
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Company.jsx      # About the studio
│   │   ├── Products.jsx     # Product suite
│   │   ├── Technology.jsx   # Tech stack & compliance console
│   │   ├── Solutions.jsx    # Problem-solution framework
│   │   └── sectors/
│   │       ├── Healthcare.jsx
│   │       ├── Architecture.jsx
│   │       ├── Edtech.jsx
│   │       └── Legaltech.jsx
│   ├── App.jsx              # Root layout, header, footer, routing
│   ├── main.jsx
│   └── index.css            # Design tokens, glassmorphism, custom scrollbar
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🖥️ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats bar, capabilities, process, sectors strip, CTA |
| `/sectors/healthcare` | Healthcare | DNA scene + EHR problems, automation opportunities |
| `/sectors/architecture` | Architecture | City 3D scene + BIM/design automation |
| `/sectors/edtech` | EdTech | Neural net scene + learning platform automation |
| `/sectors/legaltech` | LegalTech | Data city scene + compliance automation |
| `/products` | Products | 3D product suite showcase |
| `/technology` | Technology | Live WebSocket triage console |
| `/company` | Company | Studio mission, stats, team CTA |

---

## ⚡ Getting Started

### Prerequisites
- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/Casanova0925/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design System

```css
/* Core palette */
--color-bg:       #0A0F1E   /* Deep navy background */
--color-cyan:     #00F2FF   /* Primary accent */
--color-violet:   #a78bfa   /* Secondary accent */
--color-green:    #34d399   /* Status / highlight */

/* Typography */
Font: Inter (Google Fonts)
Weights: 400, 700, 900 (Black)
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | `< 640px` | Single column, hamburger nav |
| Tablet | `640px – 1024px` | 2-column grids |
| Desktop | `> 1024px` | Full multi-column layout |

---

## 🔧 Customisation

### Adding a New Sector

1. Create `src/pages/sectors/YourSector.jsx`
2. Import and use `<SectorPage sector={data}/>` with your sector data object
3. Add the route in `App.jsx`
4. Add a new 3D scene function in `Background3D.jsx`
5. Map the route in the `Scene` switcher at the bottom of `Background3D.jsx`

### Sector Data Shape

```js
{
  name: 'Sector Name',
  tagline: 'Hero headline',
  color: '#00F2FF',
  overview: 'One-paragraph description',
  caseStats: [{ value: '40%', label: 'Stat label' }],
  problems: [{ gap: 'Title', description: '...', solution: '...' }],
  solutions: [{ title: 'Deliverable', desc: '...' }],
  automations: [{ icon: '⚡', tag: 'Tag', title: '...', description: '...', saving: '...' }]
}
```

---

## 📄 License

MIT License — feel free to use this as a template for your own studio portfolio.

---

## 👤 Author

**Casanova0925**
- GitHub: [@Casanova0925](https://github.com/Casanova0925)
- Email: samraj0704@gmail.com

---

<div align="center">
Made with ⚡ by Neuro-Link Studio
</div>

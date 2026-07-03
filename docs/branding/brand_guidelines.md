# 🎨 Secure Sandbox Brand Guidelines & Design Manual

This guide outlines the visual identity and styling standard for the **Ethical Hacking Labs Workstation**. It defines specifications for typography, color schema, logo geometry, and asset layouts to maintain cohesive design rigor across all documentation, dashboards, and release artifacts.

---

## 🛡️ Brand Concept & Vision
The Secure Sandbox brand centers on **education, defensibility, and modularity**. The design blends a professional corporate auditing feel (clean lines, extensive negative space) with a modern cyber operations look (high-contrast cyan glows, terminal aesthetics, monospace tracking).

---

## 🎨 Color Palette
The color palette represents a trusted, safety-locked defense environment.

| Role | Name | Hex Code | Purpose / CSS Equivalent |
| :--- | :--- | :--- | :--- |
| **Primary Background** | Slate Dark | `#020617` | `bg-slate-950` — Absolute dark canvas |
| **Secondary Background** | Card Dark | `#1e293b` | `bg-slate-800` — Section container sheets |
| **Accent Glow** | Bright Cyan | `#22d3ee` | `text-cyan-400` — Code cursor, prompts, status lights |
| **Accent Solid** | Sky Blue | `#0ea5e9` | `text-sky-500` — Borders, buttons, navigation highlights |
| **Primary Typography** | Off-White | `#f8fafc` | `text-slate-50` — Titles, body copy, active text |
| **Muted Typography** | Gray Slate | `#94a3b8` | `text-slate-400` — Descriptions, subheadings, labels |

---

## ✍️ Typography Guidelines

### Primary Sans-Serif (User Interface & Headings)
* **Font Family**: **Inter** or **Space Grotesk**
* **Usage**: Page titles, navigation menus, labels, and paragraph body copy.
* **Vibe**: Neutral, clean, highly readable at micro scales on desktop/mobile viewport screens.
* **Example CSS Class**: `font-sans font-medium tracking-tight text-slate-100`

### Technical Monospace (Terminal, Code & Data Readouts)
* **Font Family**: **JetBrains Mono** or **Fira Code**
* **Usage**: Simulated terminal streams, command snippets, directories, CVSS calculation displays, and hash outputs.
* **Vibe**: Rigid, technical, distinct spacing to reinforce active execution logic.
* **Example CSS Class**: `font-mono text-xs text-cyan-400`

---

## 🎯 Logo Specifications

### 1. Primary Vector Logo (`/docs/branding/logo.svg`)
* **Geometry**: A structural shield form containing a terminal shell indicator (`>`) and cursor block (`_`).
* **Grid Bounds**: 800px x 800px canvas with radial dark background.
* **Glow Configuration**: Custom SVGA filter (`#neon-glow`) containing soft 12px Gaussian blurs to simulate dynamic display brightness.

### 2. High-Performance Favicon (`/docs/branding/favicon.svg`)
* **Geometry**: Simplified 128px bounding box optimized for web tab previews. Removes complex borders to maintain crisp visual fidelity at standard `16x16` or `32x32` pixel sizes.

---

## 📊 Repository Social Preview Image
When publishing the repository to GitHub, configure a **Social Preview Image** (under Repository Settings -> General -> Social Preview).

### Dimension Requirements
* **Width**: 1280 pixels
* **Height**: 640 pixels (exactly 2:1 aspect ratio)
* **Format**: `.png` (recommended to preserve gradients without compression artifacts)

### Composition Layout
1. **Left 50%**: Place the `Secure Sandbox Shield` symbol centered vertically.
2. **Right 50%**: Bold typography showcasing:
   * **Title**: `ETHICAL HACKING LABS` (Space Grotesk, 64pt, `#f8fafc`)
   * **Sub**: `An Elite, Automated Educational Sandbox Workstation` (Inter, 24pt, `#94a3b8`)
   * **Attributes**: `Python 3` • `Docker` • `Bash CLI` (JetBrains Mono, 18pt, `#22d3ee`)

---

## 📐 General Layout & UI Best Practices
* **Negative Space**: Ensure cards and text sections maintain generous padding (`p-6` to `p-12` in Tailwind) to promote scanning flow.
* **Status Indicators**: Use consistent color signals:
  * 🔴 **Critical/High Risk**: `#ef4444` (`bg-red-500`)
  * 🟡 **Medium/Low Risk/Pending**: `#f59e0b` (`bg-amber-500`)
  * 🟢 **Success/Remediated**: `#10b981` (`bg-emerald-500`)
  * 🔵 **Diagnostic/Info**: `#3b82f6` (`bg-blue-500`)

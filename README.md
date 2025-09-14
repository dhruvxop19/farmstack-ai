# 🌾 FarmStack — Blockchain-Powered Agricultural Supply Chain MVP

🔗 **Live Demo:** [FarmStack on Vercel](https://farmstack-six.vercel.app/)  

FarmStack is a **frontend simulation** of a blockchain-based agricultural supply chain built with **Vite + React + TypeScript**.  
It showcases the entire farm-to-consumer journey through role-based dashboards, QR code integration, and traceability—all optimized for real-world usability without requiring a backend or database.  
The codebase is ready for **Polygon testnet smart contract integration**.

---

## 🚀 Key Features

- 👩‍🌾 **Role-based dashboards** (Farmer, Distributor, Consumer)  
- 🔗 **Blockchain simulation** (ready for Web3 integration)  
- 🧾 **Batch tracking** with lifecycle history  
- 📦 **QR code generation & scanning**  
- 🔍 **Traceability interface** showing the full journey  
- 📱 **Mobile-optimized UI** with big, field-friendly controls  
- 🎨 **Demo data** located in `src/data/demoData.ts`

---

## 🛠️ Tech Stack

- **Frontend:** [Vite](https://vitejs.dev/) + React + TypeScript  
- **Styling:** CSS (and optionally Tailwind)  
- **Utilities:** QR code logic & blockchain simulation (`src/utils/`)  
- **Deployment:** Vercel

---

## 📂 Project Structure

```
project/
│── src/
│   ├── components/           # Dashboards & UI components
│   ├── data/                 # Demo data
│   ├── utils/                # Blockchain & QR code logic
│   ├── App.tsx               # Main component
│   ├── main.tsx              # Vite entry
│   └── index.css             # Global styles
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Getting Started

**Run locally:**

```bash
git clone https://github.com/dhruvxop19/farmstack.git
cd project
npm install
npm run dev
```

The app will be available at → `http://localhost:5173`

---

## 🌍 Deployment on Vercel

The live demo is currently hosted at:  
👉 [FarmStack on Vercel](https://farmstack-six.vercel.app/)

To deploy or redeploy in your own Vercel account:
- **Framework Preset:** Vite  
- **Build Command:** `npm run build`  
- **Output Directory:** `dist`

---

## 🔗 Future Blockchain Integration

- Smart contracts deployed to **Polygon testnet**  
- Each batch update stored as a blockchain event  
- Consumer QR scans fetch and verify blockchain-backed proof

---

## 🤝 Contributing

Contributions welcome!  
- Fork the repo  
- Create a feature branch  
- Submit a pull request

---

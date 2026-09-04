# Food Chainer — SIH Food Safety & Package Scanner

An AI-powered food package scanner, OCR nutrition analyzer, and statutory **FSSAI Compliance Verification Platform** designed for Indian Food Security, regulatory auditing, and consumer health awareness.

---

## 🌟 Key Features

### 1. Direct Package Scanner & Real-Time Audit
- **1-Click Live Camera Capture**: Instant access to your device camera with responsive framing reticle and one-click capture.
- **Packaging Photo Upload**: Supports drag-and-drop or manual upload of packaged food labels (JPEG, PNG, WebP).
- **Multimodal AI Analysis**: Powered by Google Gemini (`gemini-2.5-flash`) to parse front and back food packaging in seconds.
- **Statutory FSSAI Compliance Score**: Calculates an objective 0–100 compliance rating based on mandatory Indian food safety norms:
  - 14-digit FSSAI License Number detection and format validation.
  - Green/Brown Veg vs. Non-Veg logo verification.
  - Mandatory allergen warning statements (e.g., gluten, nuts, soy, dairy).
  - Batch number, manufacturing date, expiry/best before declarations.
  - Net weight, nutritional information per 100g / per serve, and manufacturer details.

### 2. HFSS (High in Fat, Sugar & Salt) Alert Engine
- Automatically benchmarks nutritional panels against statutory Front-of-Pack Labelling (FOPL) thresholds:
  - **Sodium Limit**: Flagged if exceeding `500 mg / 100g`.
  - **Added Sugars Limit**: Flagged if exceeding `10 g / 100g`.
  - **Trans Fat Limit**: Flagged if exceeding `0.2 g / 100g` (zero industrial trans-fat norm).
- Color-coded severity badges (Compliant, Moderate Concern, Critical Violation).

### 3. Food Additive & INS/E-Number Risk Profiler
- Extracts all additive codes (e.g., INS 150d, INS 621, E211, INS 955) and categorizes them:
  - **Permitted & Safe** (antioxidants, vitamins, natural colors).
  - **Moderate Caution** (preservatives, acidity regulators).
  - **High-Hazard / Restricted** (artificial colors, excessive emulsifiers, controversial synthetic sweeteners).

### 4. Doctor & Clinical Health Report
- Generates a certified clinical health summary for medical and consumer awareness.
- Provides specific suitability assessments for:
  - Diabetics (glycemic impact & added sugars).
  - Hypertensive patients (sodium & electrolyte load).
  - Pediatric / Children (artificial colors, preservatives, and sugar rush).
  - Cardiovascular patients (saturated fats and trans-fat content).

### 5. Verified Food Library (User-Saved Only)
- Clean, user-driven catalog: only shows food items that you have scanned, verified, and explicitly clicked **"Save Product"** to keep.
- Search and filter by product title, brand, compliance score grade, or risk category.
- Stored reliably across browser sessions with local caching and backend synchronization.

### 6. Statutory Regulation Rules Explorer
- Live rulesets detailing FSSAI Packaging & Labelling Regulations (2020 & 2024 Amendments).
- Locked, non-editable regulatory thresholds to ensure legal reference integrity.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons, Material Symbols.
- **Backend**: Node.js, Express, TypeScript (`tsx` for dev, `esbuild` for production bundling).
- **AI & Computer Vision**: Google GenAI SDK (`@google/genai`) with server-side API proxying for security.
- **Environment**: Containerized on Google Cloud Run (port 3000 ingress).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or newer recommended)
- npm or bun

### 1. Installation
Clone or open the project directory and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
# Required for AI packet analysis and report generation
GEMINI_API_KEY="your-gemini-api-key"
```

> **Note**: In Google AI Studio, the `GEMINI_API_KEY` is securely injected into the container environment via the Settings panel and remains strictly server-side.

### 3. Running in Development Mode
Start the full-stack server (binds on port `3000`):
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 4. Building for Production
Compile the client assets with Vite and bundle the Node backend with esbuild:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

---

## 📁 Project Architecture

```
├── index.html                   # HTML entry point with metadata
├── metadata.json                # AI Studio app capabilities & permissions
├── package.json                 # Project dependencies & build scripts
├── server.ts                    # Express backend & Gemini API proxy routes
├── src/
│   ├── main.tsx                 # React application entry point
│   ├── App.tsx                  # Root app state, tabs & global handlers
│   ├── index.css                # Tailwind CSS v4 styling rules
│   ├── types.ts                 # Type definitions (ScanRecord, FSSAI rules, etc.)
│   ├── components/
│   │   ├── TopNav.tsx           # Main application navigation header
│   │   ├── ScannerView.tsx      # Live camera capture & packaging upload
│   │   ├── ScanResultView.tsx   # Detailed audit report & score breakdown
│   │   ├── LibraryView.tsx      # Saved food items catalog & search filters
│   │   ├── RulesManagementView.tsx # Statutory FSSAI norms & thresholds
│   │   ├── DoctorReportModal.tsx # Pediatric & adult health advisory modal
│   │   ├── CaseDetailModal.tsx  # Specific regulatory case details
│   │   └── Footer.tsx           # Footer with statutory disclaimers
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🔒 Security & Privacy
- **Server-Side AI Proxy**: All calls to the Gemini API occur inside `server.ts`. The API key is never exposed to client-side code or browser network inspect tools.
- **Zero Automatic Tracking**: Scanned images are processed in-memory for audit generation and only stored when explicitly saved by the user.

---
## TEAM MEMBERS(ROLE) 
--ADITYA SHAW - BACKEND DEVELOPER(TEAM LEADER)
--RONIT RAY - FRONTEND DEVELOPER
--SAYAN KAR - PPT DEVELOPER 
--SUBHAM TIWARY - RESEARCH 
--BANISETTY PREMKAMAL - RESEARCH AND PPT DEVELOPER
--SHREEPARNA PAUL - INTEGRATING FRONTEND AND BACKEND
## 📜 License
This project is created for food safety awareness, research, and compliance verification following Government of India FSSAI guidelines.

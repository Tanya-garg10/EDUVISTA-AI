# EDUVISTA AI — Adaptive Learning Platform

An AI-powered educational platform that teaches, adapts, and recovers from misconceptions in real-time. Built with React, TypeScript, and Google Gemini.

## What It Does

EDUVISTA AI acts as a personalized AI teacher. You upload a textbook or enter a topic, and the platform generates a micro-curriculum tailored to your level, language, and available time. An AI avatar (Ava) teaches the lesson with voice and live visual simulations, detects when you misunderstand something, and immediately pivots its explanation strategy using intuitive analogies.

Key capabilities:

- **AI Teacher Avatar** — Ava teaches with voice (English / Hindi / Hinglish), dynamic expressions, and lip-synced audio
- **PDF & Textbook Ingestion** — Upload notes or enter a topic; the system extracts chapters, formulas, and key concepts
- **RAG Knowledge Grounding** — Answers are grounded to the uploaded material with page citations, minimizing hallucinations
- **Misconception Detection** — Identifies the cognitive root cause of wrong answers and adapts the teaching strategy on the fly
- **Bloom's Taxonomy Assessments** — Quizzes covering Recall, Understand, Apply, and Analyze levels
- **Multilingual Support** — Real-time language switching between English, Hindi, and Hinglish
- **Learning Analytics Dashboard** — Tracks streak, concept mastery, average score, and weak areas
- **Adaptive Learning Path** — Personalized topic roadmap based on your performance

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| AI / LLM | OpenAI GPT-4o (`openai`) |
| Charts | Recharts |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Backend | Express.js (served via `server.ts`) |
| Runtime | Node.js / Bun |

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

2. Create a `.env.local` file from the example:
   ```bash
   cp .env.example .env.local
   ```

3. Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── views/              # Full-page route views (Landing, Dashboard, Classroom, etc.)
├── components/
│   ├── classroom/      # AI teacher, avatar, question cards, misconception alerts
│   ├── common/         # Navbar, modals, voice waveform, progress ring
│   ├── dashboard/      # Topic mastery chart widget
│   └── engine/         # AI agent flow visualization
├── services/
│   ├── apiService.ts   # API calls + mock data fallbacks
│   └── speechSynthesisService.ts
├── data/
│   └── mockData.ts     # Demo lesson, assessment, and profile data
├── types.ts            # All shared TypeScript types
└── App.tsx             # Client-side router and global state
```

## Available Routes

| Route | View |
|---|---|
| `/` | Landing page |
| `onboarding` | Learner profile setup |
| `dashboard` | Progress overview and stats |
| `upload` | Upload materials or enter topic |
| `lesson-plan` | Generated micro-curriculum preview |
| `teacher` | Live AI teacher classroom |
| `assessment` | Adaptive quiz |
| `report` | Post-lesson learning report |
| `learning-path` | Personalized topic roadmap |
| `profile` | Learner profile |
| `settings` | Language and preferences |
| `ai-engine` | AI agent architecture view |

> Navigation is client-side (no URL changes). The demo always starts with Class 10 Physics — Ohm's Law.

## Scripts

```bash
npm run dev      # Start dev server (tsx server.ts)
npm run build    # Build frontend + bundle server
npm start        # Run production build
npm run lint     # TypeScript type check
```

## Demo

A persistent floating bar at the bottom of the screen links directly to the AI Teacher classroom and provides a guided walkthrough of all demo steps. The demo is pre-loaded with a Class 10 Physics lesson on Ohm's Law.

To explore the full flow:
1. Click **Demo Steps Guide** for a walkthrough
2. Click **Launch AI Teacher** to enter the live classroom
3. Answer a question incorrectly to trigger misconception detection and watch the AI adapt

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key (required) — get it from [platform.openai.com](https://platform.openai.com/api-keys) |

## License

Private project. All rights reserved.

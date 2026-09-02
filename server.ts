import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini if API key is provided
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.warn('Gemini client initialization warning:', err);
    }
  }
  return aiClient;
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'EDUVISTA AI', version: '1.0.0' });
});

// Student progress
app.get('/api/student/progress', (req, res) => {
  res.json({
    id: 'student-tanya-01',
    name: 'Tanya',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    level: 'beginner',
    language: 'Hinglish',
    availableTime: '20min',
    goal: 'exam',
    teachingStyle: 'visual_learning',
    streakDays: 12,
    conceptsMastered: 48,
    averageScore: 82,
    totalLearningMinutes: 872
  });
});

// Helper to clean response of raw markdown asterisks and format cleanly
function cleanFormattedResponse(raw: string): string {
  if (!raw) return '';
  let text = raw;
  // Strip bold/italic markdown symbols
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  // Strip LaTeX wrapping
  text = text.replace(/\$([^\$]+)\$/g, '$1');
  text = text.replace(/\\\(([^\)]+)\\\)/g, '$1');
  text = text.replace(/\\\[([^\]]+)\\\]/g, '$1');
  // Replace LaTeX symbols with clean unicode
  text = text.replace(/\\propto/g, '∝');
  text = text.replace(/\\Omega/g, 'Ω');
  text = text.replace(/\\times/g, '×');
  text = text.replace(/\\Delta/g, 'Δ');
  text = text.replace(/\\approx/g, '≈');
  text = text.replace(/\\rho/g, 'ρ');
  // Strip markdown headers
  text = text.replace(/^#+\s+/gm, '');
  text = text.replace(/\*+/g, '');
  // Normalize extra spacing
  text = text.replace(/[\r\n]{3,}/g, '\n\n');
  return text.trim();
}

// Ask Teacher live AI endpoint
app.post('/api/ai/ask-teacher', async (req, res) => {
  const { query, language, topic } = req.body;
  const lang = language || 'Hinglish';
  const currentTopic = topic || "Ohm's Law & Electricity (Grade 10 Physics CBSE/NCERT)";

  const ai = getAIClient();
  if (ai) {
    try {
      const prompt = `You are Ava (also known as Nova), an exceptionally empathetic, pedagogically brilliant AI Master Teacher on EDUVISTA.
Subject: ${currentTopic}
Student Query: "${query}"
Selected Language: ${lang}

CRITICAL RULES & PEDAGOGY:
1. ACCURACY: Provide 100% scientifically accurate explanation tailored to Grade 10 Physics (NCERT/CBSE/ICSE standards).
2. TONE: Warm, encouraging, empathetic, and crystal clear.
3. LANGUAGE GUIDELINES:
   - If Hinglish: Use natural, conversational Hindi in Latin script with standard English scientific terms (e.g., Resistance, Voltage, Current, Cross-sectional Area, Drift Velocity, Proportional).
   - If Hindi: Use pure, polished Hindi in Devanagari script with standard NCERT definitions.
   - If English: Use lucid, friendly, student-centric pedagogical English.
4. NO RAW MARKDOWN SYMBOLS:
   - STRICTLY DO NOT output asterisks (** or *).
   - DO NOT use markdown headers (# or ##).
   - DO NOT use unformatted LaTeX dollar signs ($).
   - Write equations cleanly in text format like: V = I × R, R = ρ × (L / A), or P = V × I.
   - Use clean unit symbols directly: Volt (V), Ampere (A), Ohm (Ω), Watt (W).
5. STRUCTURE YOUR ANSWER AS:
   - Core Concept: Direct, crystal-clear explanation (2-3 sentences).
   - Real-World Analogy: A vivid intuitive visual comparison (e.g., water pipes, traffic on highways, battery as a water pump).
   - Key Takeaway: 1 memorable summary line or formula.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      if (response.text && response.text.trim()) {
        const cleaned = cleanFormattedResponse(response.text);
        return res.json({
          answer: cleaned,
          relatedConcept: `${currentTopic} · Core Principle`
        });
      }
    } catch (error) {
      console.warn('Gemini API call error in /api/ai/ask-teacher, using dynamic smart fallback:', error);
    }
  }

  // Comprehensive Smart Fallback Library for Physics Electricity
  const qLower = (query || '').toLowerCase();
  
  if (lang === 'Hinglish') {
    if (qLower.includes('length') || qLower.includes('lamba') || qLower.includes('wire') || qLower.includes('taar')) {
      return res.json({
        answer: `Bohot accha sawal! Resistance conductor ki length ke directly proportional hoti hai (R ∝ L).

Kyun hota hai aisa?
Jaise ek lambe crowded corridor me chalte waqt zyada logon se takkar hoti hai, waise hi lambe wire me electrons ko atoms se zyada collisions jhelne padte hain. Isliye wire jitna lamba hoga, resistance utni hi zyada hogi.

Key Formula:
R = ρ × (L / A) jahan L conductor ki length hai.`,
        relatedConcept: "Resistance & Length (R ∝ L)"
      });
    }
    if (qLower.includes('area') || qLower.includes('thickness') || qLower.includes('mota') || qLower.includes('cross')) {
      return res.json({
        answer: `Great doubt! Conductor ka cross-sectional area (thickness) badhane se resistance kam ho jati hai (R ∝ 1/A).

Analogy:
Isko ek 6-lane wide highway ki tarah samjho jahan gaadiyan aasani se bina jam ke daud sakti hain. Mote wire me electrons ko flow karne ke liye zyada space milta hai, isliye current aasani se nikal jata hai.

Key Rule:
Thick wire = Low Resistance, Thin wire = High Resistance.`,
        relatedConcept: "Cross-Sectional Area (R ∝ 1/A)"
      });
    }
    if (qLower.includes('resistivity') || qLower.includes('rho') || qLower.includes('material')) {
      return res.json({
        answer: `Resistivity (ρ) kisi material ki intrinsic property hoti hai jo batati hai ki wo material current ko kitna oppose karta hai.

Important Difference:
Resistance wire ki length aur thickness par depend karti hai, lekin Resistivity sirf material ke type aur temperature par depend karti hai. Length ya area badalne se Resistivity change nahi hoti!

SI Unit:
Resistivity ka SI unit Ohm-meter (Ω·m) hai. Silver aur Copper ki resistivity sabse kam hoti hai.`,
        relatedConcept: "Resistivity vs Resistance"
      });
    }
    if (qLower.includes('unit') || qLower.includes('si') || qLower.includes('volt') || qLower.includes('ohm') || qLower.includes('ampere')) {
      return res.json({
        answer: `Electricity ke 3 main fundamental SI units yaad rakhein:

1. Potential Difference (Voltage): Volt (V) - 1 Volt = 1 Joule per Coulomb (J/C)
2. Electric Current: Ampere (A) - 1 Ampere = 1 Coulomb per second (C/s)
3. Resistance: Ohm (Ω) - 1 Ohm = 1 Volt per Ampere (V/A)

Ye teeno Ohm's Law (V = I × R) me directly judte hain!`,
        relatedConcept: "SI Units of Electricity"
      });
    }
    if (qLower.includes('analogy') || qLower.includes('water') || qLower.includes('pipe') || qLower.includes('kaise')) {
      return res.json({
        answer: `Electricity ko Water Pipe System se samajhna sabse aasan hai:

- Battery / Voltage (V): Water pump jo paani ko push karta hai.
- Current (I): Pipe ke andar behta hua paani (flow of charges).
- Resistance (R): Pipe ke andar ki narrowness ya filter jo flow ko rokta hai.

Jab pump ka pressure (Voltage) badhate hain to paani ka flow (Current) badhta hai. Lekin agar pipe ko squeeze karenge (Resistance), to flow kam ho jayega!`,
        relatedConcept: "Hydraulic Analogy of Circuits"
      });
    }
    if (qLower.includes('series') || qLower.includes('parallel')) {
      return res.json({
        answer: `Series aur Parallel connection ka core difference:

Series Circuit:
Saare resistors ek line me judte hain. Current same rehta hai, lekin Voltage divide hota hai (R_total = R1 + R2 + R3).

Parallel Circuit:
Saare resistors dono ends par judte hain. Har branch me Voltage same rehta hai, Current divide hota hai (1/R_total = 1/R1 + 1/R2).

Gharon ki wiring humesha Parallel me hoti hai taaki har appliance ko full 220V mile!`,
        relatedConcept: "Series vs Parallel Resistor Networks"
      });
    }
    if (qLower.includes('heat') || qLower.includes('joule') || qLower.includes('power')) {
      return res.json({
        answer: `Joule's Heating Effect ke mutabiq jab kisi resistor se current flow karta hai, to electric energy heat me convert hoti hai.

Formula:
H = I² × R × t (Joule's Law)
Electric Power: P = V × I = I² × R = V² / R (Unit: Watt)

Application:
Electric iron, toaster, aur heater isi heating effect par kaam karte hain jahan high resistance wire (Nichrome) use hota hai.`,
        relatedConcept: "Joule's Heating & Electric Power"
      });
    }
    return res.json({
      answer: `Bohot badhiya sawal Tanya! "${query}" ka seedha sambandh Ohm's Law (V = I × R) aur circuit physics se hai.

Core Concept:
Voltage charge ko push karta hai, Current electron flow ki speed hai, aur Resistance flow me aane wali atomic rukawat hai. Constant temperature par Current aur Voltage directly proportional hote hain.

Agar aapko isme koi specific numerical ya step me doubt hai, to zaroor batayein!`,
      relatedConcept: "Ohm's Law Core Principles"
    });
  } else if (lang === 'Hindi') {
    if (qLower.includes('length') || qLower.includes('wire') || qLower.includes('लंबाई')) {
      return res.json({
        answer: `उत्कृष्ट प्रश्न! किसी चालक का प्रतिरोध उसकी लंबाई के समानुपाती होता है (R ∝ L)।

कारण:
जैसे-जैसे तार की लंबाई बढ़ती है, गतिमान इलेक्ट्रॉनों को चालक के परमाणुओं से अधिक बार टकराना पड़ता है, जिससे विद्युत धारा के प्रवाह में रुकावट यानी प्रतिरोध बढ़ जाता है।

मुख्य सूत्र:
R = ρ × (L / A)`,
        relatedConcept: 'प्रतिरोध और तार की लंबाई (R ∝ L)'
      });
    }
    return res.json({
      answer: `शानदार प्रश्न! "${query}" ओम के नियम (V = I × R) से सीधे संबंधित है।

मुख्य सिद्धांत:
नियत तापमान पर, किसी चालक से प्रवाहित होने वाली विद्युत धारा (I), उसके सिरों के बीच लगाए गए विभवांतर (V) के अनुक्रमानुपाती होती है तथा प्रतिरोध (R) के व्युत्क्रमानुपाती होती है।

सूत्र:
V = I × R (विभवांतर = धारा × प्रतिरोध)`,
      relatedConcept: 'ओम का नियम और परिपथ'
    });
  } else {
    if (qLower.includes('length') || qLower.includes('wire')) {
      return res.json({
        answer: `Great question! Resistance of a conductor is directly proportional to its length (R ∝ L).

Why does this happen?
Just like walking through a longer crowded hallway causes more collisions with people, electrons traveling through a longer wire collide with more vibrating metal atoms, resulting in greater opposition to electric current.

Key Formula:
R = ρ × (L / A), where L is the conductor length and A is the cross-sectional area.`,
        relatedConcept: "Resistance & Length (R ∝ L)"
      });
    }
    if (qLower.includes('area') || qLower.includes('thickness')) {
      return res.json({
        answer: `Excellent doubt! Resistance is inversely proportional to the cross-sectional area of the conductor (R ∝ 1/A).

Analogy:
Think of a wider highway where traffic flows freely with minimal congestion. A thicker wire offers more parallel pathways for electrons to drift through, reducing overall electrical friction and resistance.

Key Principle:
Doubling the wire's cross-sectional area halves its resistance.`,
        relatedConcept: "Cross-Sectional Area (R ∝ 1/A)"
      });
    }
    return res.json({
      answer: `Great question! Regarding "${query}":

Core Principle:
According to Ohm's Law (V = I × R), at constant temperature, the electric current passing through a conductor is directly proportional to the potential difference across its ends and inversely proportional to its resistance.

Analogy:
Voltage is the electrical pressure pushing charges, Current is the rate of flow of charges, and Resistance is the friction opposing that flow.`,
      relatedConcept: "Ohm's Law Fundamentals"
    });
  }
});

async function startServer() {
  // Vite dev middleware or static dist
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EDUVISTA AI Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

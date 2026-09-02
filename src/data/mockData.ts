import {
  LearnerProfile,
  Lesson,
  LearningPathNode,
  LearningReportData,
  UploadedMaterialMeta,
  AIAgentInfo,
  AssessmentQuestion
} from '../types';

export const initialLearnerProfile: LearnerProfile = {
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
  totalLearningMinutes: 872, // 14h 32m
};

export const defaultUploadMaterialMeta: UploadedMaterialMeta = {
  fileName: 'Class 10 Physics - Chapter 4 Electricity.pdf',
  fileSize: '4.8 MB',
  fileType: 'PDF Document',
  subject: 'Class 10 Physics',
  chapter: 'Chapter 4 — Electricity',
  pageCount: 42,
  conceptsDetected: 18,
  examplesDetected: 12,
  keyTopics: [
    "Electric Charge & Current (I)",
    "Potential Difference / Voltage (V)",
    "Ohm's Law & Resistance (R)",
    "Factors Affecting Resistance (ρ, L, A)",
    "Resistors in Series & Parallel",
    "Joule's Heating Effect & Electrical Power"
  ]
};

export const demoLessonData: Lesson = {
  id: 'lesson-ohms-law-101',
  topic: "Ohm's Law & Electrical Resistance",
  subject: 'Class 10 Physics',
  grade: 'Grade 10',
  chapter: 'Chapter 4 — Electricity',
  durationEstimate: '20 minutes',
  studentProfileSummary: 'Beginner · Hinglish · 20 minutes · Exam Preparation',
  sections: [
    {
      id: 'sec-01',
      indexNumber: '01',
      title: 'Introduction to Circuits',
      durationMinutes: 2,
      difficulty: 'Easy',
      visualType: 'Simulation',
      interactionIndicator: 'Concept Overview',
      completed: true,
      summary: 'Electrical charges flow in a closed loop driven by potential difference.',
      speechText: {
        English: 'Welcome back! Today we are mastering Ohm’s Law, the backbone of all modern electrical engineering.',
        Hindi: 'नमस्ते! आज हम ओम का नियम और सर्किट के मूल सिद्धांतों को आसानी से समझेंगे।',
        Hinglish: 'Hello Tanya! Aaj hum Ohm’s Law ko crystal clear banayenge, jo electricity ka sabse important foundation hai.'
      }
    },
    {
      id: 'sec-02',
      indexNumber: '02',
      title: 'Electric Potential & Voltage (V)',
      durationMinutes: 3,
      difficulty: 'Easy',
      visualType: 'Equation Flow',
      interactionIndicator: 'Interactive Parameter',
      completed: true,
      summary: 'Voltage is the electrical pressure pushing charge through a conductor.',
      speechText: {
        English: 'Voltage (V) is the push or electrical potential difference that forces electrons to move through the wire.',
        Hindi: 'वोल्टेज विद्युत दबाव है जो इलेक्ट्रॉनों को तार में आगे बढ़ाता है।',
        Hinglish: 'Voltage yaani electric pressure jo electrons ko aage push karta hai. Jitna zyada voltage, utna strong push!'
      }
    },
    {
      id: 'sec-03',
      indexNumber: '03',
      title: 'Electric Current (I)',
      durationMinutes: 3,
      difficulty: 'Easy',
      visualType: 'Interactive Circuit',
      interactionIndicator: 'Current Flow Animation',
      completed: true,
      summary: 'Current is the rate of flow of electric charges measured in Amperes.',
      speechText: {
        English: 'Current (I) is simply how many electrons pass a point every second, measured in Amperes.',
        Hindi: 'विद्युत धारा यानी करंट प्रति सेकंड बहने वाले आवेश की दर है जिसे एम्पीयर में मापते हैं।',
        Hinglish: 'Current (I) ka matlab hai kitne charges har second wire se nikal rahe hain (I = Q / t).'
      }
    },
    {
      id: 'sec-04',
      indexNumber: '04',
      title: 'Resistance (R)',
      durationMinutes: 4,
      difficulty: 'Medium',
      visualType: 'Analogy Diagram',
      interactionIndicator: 'Interactive Water Pipe Analogy',
      completed: false,
      active: true,
      summary: 'Resistance opposes the flow of electric current, measured in Ohms (Ω).',
      speechText: {
        English: 'Think of resistance like a narrow pipe. The narrower the pipe, the harder it is for water to flow.',
        Hindi: 'प्रतिरोध को एक संकीर्ण पाइप की तरह समझें। पाइप जितना संकरा होगा, पानी का बहना उतना ही कठिन होगा।',
        Hinglish: 'Resistance ko ek narrow water pipe ki tarah samjho. Pipe jitna narrow hoga, water ka flow utna hi mushkil hoga.'
      }
    },
    {
      id: 'sec-05',
      indexNumber: '05',
      title: "Ohm's Law Equation (V = I × R)",
      durationMinutes: 4,
      difficulty: 'Medium',
      visualType: 'Simulation',
      interactionIndicator: 'Interactive Checkpoint & Question',
      completed: false,
      summary: 'Current is directly proportional to voltage and inversely proportional to resistance.',
      speechText: {
        English: "Ohm's Law establishes that at constant temperature, current is directly proportional to voltage and inversely proportional to resistance.",
        Hindi: "ओम का नियम बताता है कि स्थिर तापमान पर, करंट वोल्टेज के समानुपाती और प्रतिरोध के व्युत्क्रमानुपाती होता है।",
        Hinglish: "Ohm's Law ke mutabiq V = I × R hota hai. Matlab Voltage badhega to Current badhega, lekin Resistance badhega to Current ghatega!"
      }
    },
    {
      id: 'sec-06',
      indexNumber: '06',
      title: 'Practice Problem Solving',
      durationMinutes: 2,
      difficulty: 'Medium',
      visualType: 'Equation Flow',
      interactionIndicator: 'Step-by-step math solver',
      completed: false,
      summary: 'Calculating current given a 12V battery and 4Ω resistor.',
      speechText: {
        English: 'Let us solve a classic board exam problem using V = IR.',
        Hindi: 'आइए V = IR सूत्र का उपयोग करके एक व्यावहारिक प्रश्न हल करें।',
        Hinglish: 'Ab chalo ek quick practical numerical solve karte hain board exams ke format mein.'
      }
    },
    {
      id: 'sec-07',
      indexNumber: '07',
      title: 'Adaptive Mastery Assessment',
      durationMinutes: 2,
      difficulty: 'Challenging',
      visualType: 'Structure Map',
      interactionIndicator: 'Final Adaptive Quiz',
      completed: false,
      summary: 'Comprehensive evaluation to test concept retention and deep application.',
      speechText: {
        English: 'Time for your mastery checkpoint to seal your progress!',
        Hindi: 'अब समय है आपके ज्ञान का त्वरित मूल्यांकन करने का!',
        Hinglish: 'Chalo quick 5-question test dete hain to unlock your next learning milestone.'
      }
    }
  ],
  groundedSources: [
    {
      documentTitle: 'NCERT Class 10 Science - Physics.pdf',
      chapter: 'Chapter 4 — Electricity',
      pages: [12, 14, 18, 21],
      snippet: '“The potential difference, V, across the ends of a given metallic wire in an electric circuit is directly proportional to the current flowing through it, provided its temperature remains the same. This is called Ohm’s law.”',
      confidenceScore: 0.98
    },
    {
      documentTitle: 'CBSE Physics Exemplar Problems.pdf',
      chapter: 'Current & Resistance Relations',
      pages: [34, 35],
      snippet: '“Resistance is the property of a conductor to resist the flow of charges through it. Its SI unit is ohm (Ω). I = V / R.”',
      confidenceScore: 0.95
    }
  ],
  questions: [
    {
      id: 'q-ohms-main',
      title: 'Check Your Understanding',
      questionText: 'If voltage remains constant and resistance increases, what happens to current?',
      questionType: 'mcq',
      conceptTarget: "Ohm's Law (Inverse Relationship I ∝ 1/R)",
      bloomLevel: 'Understand',
      correctOptionId: 'opt-b',
      options: [
        {
          id: 'opt-a',
          label: 'A',
          text: 'Current increases',
          isCorrect: false,
          misconceptionId: 'misc-direct-confusion',
          explanation: 'Incorrect: If resistance (opposition) increases while push (voltage) is constant, flow cannot increase.'
        },
        {
          id: 'opt-b',
          label: 'B',
          text: 'Current decreases',
          isCorrect: true,
          explanation: 'Correct! From I = V / R, current is inversely proportional to resistance.'
        },
        {
          id: 'opt-c',
          label: 'C',
          text: 'Current remains same',
          isCorrect: false,
          misconceptionId: 'misc-independent-confusion',
          explanation: 'Incorrect: Current depends directly on resistance in a closed circuit.'
        },
        {
          id: 'opt-d',
          label: 'D',
          text: 'Cannot determine',
          isCorrect: false,
          explanation: 'Incorrect: We can determine it precisely using Ohm’s law formula I = V/R.'
        }
      ],
      groundedSource: {
        documentTitle: 'Class 10 Physics.pdf',
        chapter: 'Chapter 4',
        pages: [14],
        snippet: 'According to Ohm’s law, I = V / R. If R increases while V is kept constant, the current I decreases proportionally.',
        confidenceScore: 0.99
      }
    }
  ],
  misconceptionsMap: {
    'misc-direct-confusion': {
      id: 'misc-direct-confusion',
      concept: "Ohm's Law (I vs R Relationship)",
      detectedMisunderstanding: 'Student is confusing the direct relationship of Voltage with the inverse relationship between Current and Resistance.',
      rootCause: 'Mentally associating "increases" with another "increases" without considering the physical meaning of Resistance as friction/opposition.',
      adaptiveStrategy: 'Formula → Water Pipe Analogy → Visual Friction Slider → Re-test',
      teacherSpeechOverride: {
        English: "That's a very common confusion! Let's try a different way to understand it. Think of resistance as a physical squeeze on a water pipe.",
        Hindi: "यह एक बहुत ही सामान्य भ्रम है! आइए इसे एक अलग तरीके से समझते हैं। प्रतिरोध को पानी के पाइप पर रुकावट की तरह समझें।",
        Hinglish: "Yeh ek bohot common confusion hai Tanya! Let's rethink this together. Resistance ko ek narrow water pipe ki tarah dekho."
      },
      analogyTitle: 'The Narrow Water Pipe Analogy',
      analogyDescription: 'When you squeeze a hose (higher resistance), even with the same tap pressure (voltage), less water can escape per second (lower current).',
      followUpQuestion: {
        id: 'q-ohms-retest',
        title: 'Re-Check: Squeezed Pipe Analogy',
        questionText: 'Now, using the water pipe analogy: If you pinch the pipe tighter (increasing Resistance) while the water tap pressure is unchanged (constant Voltage), what happens to the water flow rate (Current)?',
        questionType: 'mcq',
        conceptTarget: 'Resistance as obstacle to flow',
        bloomLevel: 'Apply',
        correctOptionId: 'opt-re-b',
        options: [
          {
            id: 'opt-re-a',
            label: 'A',
            text: 'Water flow rate increases',
            isCorrect: false,
            explanation: 'Pinching the pipe restricts flow, it cannot increase flow rate.'
          },
          {
            id: 'opt-re-b',
            label: 'B',
            text: 'Water flow rate decreases',
            isCorrect: true,
            explanation: 'Exactly right! Higher resistance always chokes down the current.'
          },
          {
            id: 'opt-re-c',
            label: 'C',
            text: 'Flow rate stays identical',
            isCorrect: false,
            explanation: 'Restriction always affects flow rate.'
          }
        ]
      }
    }
  }
};

export const defaultAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'as-1',
    number: 1,
    type: 'mcq',
    concept: 'Ohm’s Law Formula',
    question: 'According to Ohm’s Law, if a 12V battery is connected across a 3Ω resistor, what is the current flowing through the circuit?',
    options: [
      { id: 'a', text: '36 Amperes' },
      { id: 'b', text: '4 Amperes' },
      { id: 'c', text: '0.25 Amperes' },
      { id: 'd', text: '9 Amperes' }
    ],
    correctAnswer: 'b',
    explanation: 'Using I = V / R: I = 12V / 3Ω = 4A.',
    hint: 'Use the formula I = V / R.'
  },
  {
    id: 'as-2',
    number: 2,
    type: 'conceptual',
    concept: 'Factors affecting Resistance',
    question: 'If the length of a copper wire is doubled while keeping its thickness and temperature constant, its resistance will:',
    options: [
      { id: 'a', text: 'Be halved' },
      { id: 'b', text: 'Double (2x)' },
      { id: 'c', text: 'Quadruple (4x)' },
      { id: 'd', text: 'Remain unchanged' }
    ],
    correctAnswer: 'b',
    explanation: 'Resistance R is directly proportional to length L (R = ρL/A). Doubling length doubles resistance.',
    hint: 'R ∝ L. Electrons have to travel through twice the distance of atomic collisions.'
  },
  {
    id: 'as-3',
    number: 3,
    type: 'practical',
    concept: 'Circuit Behavior Under Variable Load',
    question: 'A student notices an electric bulb dims when extra resistance is introduced in series. What is the fundamental cause of this dimming?',
    options: [
      { id: 'a', text: 'Total circuit resistance increased, reducing the total current' },
      { id: 'b', text: 'The battery runs out of voltage instantly' },
      { id: 'c', text: 'Electrons are destroyed by the resistor' },
      { id: 'd', text: 'Resistance produces negative current' }
    ],
    correctAnswer: 'a',
    explanation: 'Increasing total resistance in series reduces overall current (I = V / R_total), causing power P = I²R to drop in the bulb.',
    hint: 'Think about what happens to the total current in a series loop.'
  },
  {
    id: 'as-4',
    number: 4,
    type: 'mcq',
    concept: 'SI Units of Electrical Quantities',
    question: 'Match the quantity with its correct SI unit: Potential Difference, Current, Resistance, Electrical Power.',
    options: [
      { id: 'a', text: 'Volt (V), Ampere (A), Ohm (Ω), Watt (W)' },
      { id: 'b', text: 'Joule (J), Coulomb (C), Ohm (Ω), Volt (V)' },
      { id: 'c', text: 'Ampere (A), Volt (V), Watt (W), Ohm (Ω)' },
      { id: 'd', text: 'Watt (W), Ohm (Ω), Volt (V), Ampere (A)' }
    ],
    correctAnswer: 'a',
    explanation: 'Voltage in Volts (V), Current in Amperes (A), Resistance in Ohms (Ω), Power in Watts (W).',
    hint: 'Voltage = V, Current = A.'
  },
  {
    id: 'as-5',
    number: 5,
    type: 'short_answer',
    concept: 'Limitations of Ohm’s Law',
    question: 'Does Ohm’s Law hold true for all materials at all temperatures, or only for ohmic conductors at constant temperature?',
    options: [
      { id: 'a', text: 'Only for Ohmic conductors at constant temperature (V/I is linear)' },
      { id: 'b', text: 'Yes, it is a universal law that applies identically to superconductors and flames' },
      { id: 'c', text: 'Only in vacuum tubes and diodes' },
      { id: 'd', text: 'Only when AC current is present' }
    ],
    correctAnswer: 'a',
    explanation: 'Ohm’s law is empirical: non-ohmic devices like diodes and electrolytes do not follow a constant V/I ratio, and changing temperature changes conductor resistance.',
    hint: 'Remember the condition: "provided its temperature remains the same".'
  }
];

export const demoLearningReport: LearningReportData = {
  overallScore: 82,
  performanceLabel: 'Strong Understanding',
  conceptsMastered: [
    'Electric Potential & Voltage (V)',
    'Electric Current Flow (I)',
    'SI Units & Conversion Math',
    'Circuit Polarity & Closed Loops'
  ],
  needsImprovement: [
    'Resistance vs Current Inverse Ratio',
    "Ohm's Law with Temperature Fluctuations"
  ],
  misconceptionsResolvedCount: 2,
  masteryImprovement: {
    before: 43,
    after: 82
  },
  historicalProgress: [
    { session: 'Initial Diagnostic', score: 35, comprehension: 40 },
    { session: 'Pre-Lesson Baseline', score: 43, comprehension: 45 },
    { session: 'Mid-Lesson Checkpoint', score: 58, comprehension: 62 },
    { session: 'Adaptive Intervention', score: 71, comprehension: 75 },
    { session: 'Final Assessment', score: 82, comprehension: 88 }
  ],
  recommendations: [
    {
      title: 'Series & Parallel Resistor Combinations',
      reason: 'You have mastered individual V, I, and R fundamentals. Combining multiple resistors in series and parallel networks is the next logical step in CBSE Chapter 4.',
      difficulty: 'Intermediate',
      estimatedTime: '15 min'
    },
    {
      title: 'Heating Effect of Current & Joule’s Law',
      reason: 'Connect your understanding of resistance friction to heat dissipation (H = I²Rt).',
      difficulty: 'Intermediate',
      estimatedTime: '10 min'
    },
    {
      title: 'Kirchhoff’s Current & Voltage Laws (Prep)',
      reason: 'Advanced branch analysis for competitive exams (JEE/NEET foundation).',
      difficulty: 'Advanced',
      estimatedTime: '25 min'
    }
  ]
};

export const electricityLearningPath: LearningPathNode[] = [
  {
    id: 'lp-1',
    title: 'Electric Charge & Current (I)',
    status: 'completed',
    masteryPercentage: 96,
    difficulty: 'Foundational',
    estimatedMinutes: 10,
    category: 'Electricity Fundamentals',
    description: 'Structure of atom, valence electrons, drift velocity, and Q = ne relation.',
    prerequisites: []
  },
  {
    id: 'lp-2',
    title: 'Potential Difference & Voltage (V)',
    status: 'completed',
    masteryPercentage: 92,
    difficulty: 'Foundational',
    estimatedMinutes: 12,
    category: 'Electricity Fundamentals',
    description: 'Work done per unit charge (V = W/Q), battery electromotive force.',
    prerequisites: ['Electric Charge & Current (I)']
  },
  {
    id: 'lp-3',
    title: 'Electrical Resistance & Resistivity',
    status: 'completed',
    masteryPercentage: 86,
    difficulty: 'Core',
    estimatedMinutes: 15,
    category: 'Circuit Laws',
    description: 'Atomic collisions, factor dependency (length, area, material resistivity ρ).',
    prerequisites: ['Potential Difference & Voltage (V)']
  },
  {
    id: 'lp-4',
    title: "Ohm's Law Masterclass",
    status: 'completed',
    masteryPercentage: 82,
    difficulty: 'Core',
    estimatedMinutes: 20,
    category: 'Circuit Laws',
    description: 'V-I characteristics, experimental verification, slope calculation.',
    prerequisites: ['Electrical Resistance & Resistivity']
  },
  {
    id: 'lp-5',
    title: 'Series Circuit Networks',
    status: 'active',
    masteryPercentage: 45,
    difficulty: 'Core',
    estimatedMinutes: 18,
    category: 'Network Analysis',
    description: 'Equivalent resistance Rs = R1 + R2 + R3, same current, divided voltage.',
    prerequisites: ["Ohm's Law Masterclass"]
  },
  {
    id: 'lp-6',
    title: 'Parallel Circuit Networks',
    status: 'locked',
    masteryPercentage: 0,
    difficulty: 'Core',
    estimatedMinutes: 20,
    category: 'Network Analysis',
    description: '1/Rp = 1/R1 + 1/R2 + 1/R3, same voltage across branches, divided currents.',
    prerequisites: ['Series Circuit Networks']
  },
  {
    id: 'lp-7',
    title: "Joule's Law of Heating & Electrical Power",
    status: 'locked',
    masteryPercentage: 0,
    difficulty: 'Advanced',
    estimatedMinutes: 15,
    category: 'Thermal & Power',
    description: 'H = I²Rt, P = VI = I²R = V²/R, domestic electric power ratings.',
    prerequisites: ['Parallel Circuit Networks']
  },
  {
    id: 'lp-8',
    title: "Kirchhoff's Laws & Complex Bridge Circuits",
    status: 'locked',
    masteryPercentage: 0,
    difficulty: 'Mastery',
    estimatedMinutes: 30,
    category: 'Advanced Physics',
    description: 'KCL (Junction rule) and KVL (Loop rule) with multi-loop network solving.',
    prerequisites: ["Joule's Law of Heating & Electrical Power"]
  }
];

export const aiAgentsList: AIAgentInfo[] = [
  {
    id: 'agent-1',
    name: 'Learner Profiler Agent',
    role: 'Cognitive State Modeling',
    description: 'Analyzes student prior knowledge, pace preference, attention window, and primary sensory learning modality.',
    status: 'active',
    iconName: 'UserCheck',
    metrics: '99.4% Profile Alignment',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'agent-2',
    name: 'Knowledge & RAG Agent',
    role: 'Document Grounding & Retrieval',
    description: 'Extracts semantic chunks from textbooks, PDFs, and notes, verifying factual integrity with zero hallucination.',
    status: 'active',
    iconName: 'FileText',
    metrics: '42 Pages Chunked · 18 Concepts',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'agent-3',
    name: 'Lesson Planner Agent',
    role: 'Micro-Curriculum Architecture',
    description: 'Sequences concepts into optimal cognitive load timelines with estimated pacing and interaction checkpoints.',
    status: 'active',
    iconName: 'CalendarRange',
    metrics: '7 Micro-Modules Structured',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'agent-4',
    name: 'Teacher Avatar & Voice Agent',
    role: 'Multimodal Pedagogy Delivery',
    description: 'Synthesizes empathetic speech in English, Hindi, and Hinglish with facial lip-sync and tone matching.',
    status: 'active',
    iconName: 'Mic',
    metrics: 'Ava Persona · 3 Languages',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'agent-5',
    name: 'Visual & Simulation Agent',
    role: 'Dynamic Concept Visualizer',
    description: 'Generates interactive schematics, animated physical analogies (e.g. water pipes), and real-time equation graphs.',
    status: 'active',
    iconName: 'Activity',
    metrics: 'WebGL & SVG Renderers Active',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'agent-6',
    name: 'Misconception Detection Agent',
    role: 'Cognitive Error Diagnosis',
    description: 'Identifies why a student picked a distractor, classifying direct vs inverse confusion and pivoting explanation strategy.',
    status: 'active',
    iconName: 'AlertTriangle',
    metrics: 'Real-time Diagnostic Triggered',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'agent-7',
    name: 'Assessment & Mastery Agent',
    role: 'Bloom-Taxonomy Scoring',
    description: 'Continuously measures retention, updates learner profile mastery metrics, and plots the next optimal roadmap milestone.',
    status: 'active',
    iconName: 'Award',
    metrics: 'Score: 82% · Mastery +39%',
    color: 'from-emerald-500 to-teal-600'
  }
];

export const defaultLearnerProfile: LearnerProfile = initialLearnerProfile;
export const assessmentQuestionsData = defaultAssessmentQuestions;
export const learningPathNodesData = electricityLearningPath;
export const demoLearningReportData: LearningReportData = {
  lessonTopic: "Ohm's Law & Electrical Resistance",
  overallScore: 82,
  finalScore: 82,
  initialScore: 43,
  improvementDelta: 39,
  comprehensionLevel: 'Strong Understanding',
  performanceLabel: 'Strong Understanding',
  conceptsMastered: [
    'Electric Potential & Voltage (V)',
    "Ohm's Law Formula (V = IR)",
    'Electrical Resistance (R = V/I)',
    'Closed Circuit Polarity'
  ],
  needsImprovement: [
    'Electric Power & Heat Dissipation (H = I²Rt)',
    'Thermal Resistance Coefficients'
  ],
  misconceptionsResolved: [
    {
      concept: "Ohm's Law: Inverse Ratio",
      description: 'Confusing direct vs inverse proportionality when resistance is increased',
      strategyUsed: 'Water Pipe Friction Analogy & Tactile Restriction Sliders'
    }
  ],
  misconceptionsResolvedCount: 1,
  masteryImprovement: {
    before: 43,
    after: 82
  },
  historicalProgress: [
    { session: 'Initial Diagnostic', score: 35, comprehension: 40 },
    { session: 'Pre-Lesson Baseline', score: 43, comprehension: 45 },
    { session: 'Mid-Lesson Checkpoint', score: 58, comprehension: 62 },
    { session: 'Adaptive Intervention', score: 71, comprehension: 75 },
    { session: 'Final Assessment', score: 82, comprehension: 88 }
  ],
  recommendedNextTopic: 'Series & Parallel Resistor Networks',
  aiFeedback: 'You now possess strong conceptual mastery of single-resistor circuits. Advancing to multi-resistor loops will complete CBSE Chapter 4.',
  recommendations: [
    {
      title: 'Series & Parallel Resistor Combinations',
      reason: 'You have mastered individual V, I, and R fundamentals. Combining multiple resistors in series and parallel networks is the next logical step in CBSE Chapter 4.',
      difficulty: 'Intermediate',
      estimatedTime: '15 min'
    },
    {
      title: 'Heating Effect of Current & Joule’s Law',
      reason: 'Connect your understanding of resistance friction to heat dissipation (H = I²Rt).',
      difficulty: 'Intermediate',
      estimatedTime: '10 min'
    }
  ]
};

export const weakConceptsData = [
  { id: 'w-1', name: 'Resistance (Inverse Relationship)', mastery: 43, tag: 'CBSE Ch 4', priority: 'High' },
  { id: 'w-2', name: "Ohm's Law Temperature Drift", mastery: 51, tag: 'CBSE Ch 4', priority: 'Medium' },
  { id: 'w-3', name: "Kirchhoff's Sign Conventions", mastery: 38, tag: 'Advanced Prep', priority: 'High' }
];

export const learningHistoryData = [
  { id: 'h-1', title: 'Electric Potential & Voltage', date: 'Yesterday', score: 94, duration: '18m', status: 'Mastered' },
  { id: 'h-2', title: "Ohm's Law & Resistance", date: 'Today', score: 82, duration: '22m', status: 'Completed' },
  { id: 'h-3', title: 'Electric Current Fundamentals', date: '3 days ago', score: 90, duration: '15m', status: 'Mastered' },
  { id: 'h-4', title: 'Electrostatics & Coulomb’s Law', date: '5 days ago', score: 88, duration: '25m', status: 'Mastered' }
];

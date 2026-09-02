import {
  Lesson,
  LearnerProfile,
  UploadedMaterialMeta,
  AssessmentQuestion,
  AssessmentResult,
  LearningReportData,
  LearningPathNode
} from '../types';
import {
  initialLearnerProfile,
  defaultUploadMaterialMeta,
  demoLessonData,
  defaultAssessmentQuestions,
  demoLearningReport,
  electricityLearningPath
} from '../data/mockData';

// Simulated delay helper for realistic AI UX
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class ApiService {
  private static STORAGE_KEY_PROFILE = 'eduvista_student_profile';
  private static STORAGE_KEY_LESSON = 'eduvista_current_lesson';

  // Get current learner profile
  static async getLearnerProfile(): Promise<LearnerProfile> {
    try {
      const response = await fetch('/api/student/progress');
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }
    const cached = localStorage.getItem(this.STORAGE_KEY_PROFILE);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return initialLearnerProfile;
  }

  // Update learner profile
  static async updateLearnerProfile(profile: Partial<LearnerProfile>): Promise<LearnerProfile> {
    const current = await this.getLearnerProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(this.STORAGE_KEY_PROFILE, JSON.stringify(updated));
    return updated;
  }

  // Upload learning material or process topic
  static async uploadMaterial(
    fileOrTopic: { file?: File; topic?: string; preferences?: Partial<LearnerProfile> },
    onProgress?: (stage: number, stageName: string) => void
  ): Promise<UploadedMaterialMeta> {
    const stages = [
      'Reading document & structure...',
      'Detecting chapters & subtopics...',
      'Extracting fundamental concepts & formulas...',
      'Building vector knowledge base & RAG indices...',
      'Creating personalized micro-curriculum...'
    ];

    for (let i = 0; i < stages.length; i++) {
      onProgress?.(i + 1, stages[i]);
      await delay(700);
    }

    if (fileOrTopic.topic && !fileOrTopic.file) {
      return {
        ...defaultUploadMaterialMeta,
        fileName: `${fileOrTopic.topic}.pdf (Synthesized Source)`,
        subject: fileOrTopic.topic,
        chapter: 'Comprehensive Concept Module',
        pageCount: 28,
        conceptsDetected: 14,
        examplesDetected: 8,
        keyTopics: [
          `${fileOrTopic.topic} Core Principles`,
          'Mathematical & Conceptual Framework',
          'Real-World Physical Analogy',
          'Common Misconceptions & Pitfalls',
          'Adaptive Practice & Assessment'
        ]
      };
    }

    return defaultUploadMaterialMeta;
  }

  // Create personalized lesson
  static async createLesson(topic: string, profile: LearnerProfile): Promise<Lesson> {
    await delay(1000);
    const lesson: Lesson = {
      ...demoLessonData,
      topic: topic || demoLessonData.topic,
      studentProfileSummary: `${profile.level.toUpperCase()} · ${profile.language} · ${profile.availableTime} · ${profile.goal}`
    };
    localStorage.setItem(this.STORAGE_KEY_LESSON, JSON.stringify(lesson));
    return lesson;
  }

  // Fetch lesson by ID
  static async getLesson(id: string): Promise<Lesson> {
    try {
      const response = await fetch(`/api/lesson/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }
    const cached = localStorage.getItem(this.STORAGE_KEY_LESSON);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return demoLessonData;
  }

  // Evaluate Question Answer
  static async evaluateAnswer(
    lessonId: string,
    questionId: string,
    selectedOptionId: string
  ): Promise<{
    isCorrect: boolean;
    misconceptionDetected: boolean;
    misconceptionId?: string;
    explanation: string;
    teachingStrategyChange?: string;
  }> {
    await delay(600);
    const question = demoLessonData.questions.find((q) => q.id === questionId) || demoLessonData.questions[0];
    const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);

    if (!selectedOption) {
      return {
        isCorrect: false,
        misconceptionDetected: false,
        explanation: 'Please select an option.'
      };
    }

    if (selectedOption.isCorrect) {
      return {
        isCorrect: true,
        misconceptionDetected: false,
        explanation: selectedOption.explanation
      };
    } else {
      const misconceptionId = selectedOption.misconceptionId || 'misc-direct-confusion';
      const miscInfo = demoLessonData.misconceptionsMap[misconceptionId];
      return {
        isCorrect: false,
        misconceptionDetected: true,
        misconceptionId,
        explanation: selectedOption.explanation,
        teachingStrategyChange: miscInfo?.adaptiveStrategy || 'Formula → Water Pipe Analogy → Example → Re-test'
      };
    }
  }

  // Ask Teacher live question
  static async askTeacher(userQuery: string, language: string, topic?: string): Promise<{ answer: string; relatedConcept: string }> {
    try {
      const res = await fetch('/api/ai/ask-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery, language, topic })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }

    await delay(500);
    const qLower = (userQuery || '').toLowerCase();
    if (language === 'Hinglish') {
      if (qLower.includes('length') || qLower.includes('lamba') || qLower.includes('wire') || qLower.includes('taar')) {
        return {
          answer: `Bohot accha sawal! Conductor ki length badhane se resistance badh jati hai (R ∝ L).

Kyun hota hai aisa?
Jaise ek lambe crowded corridor me chalte waqt zyada logon se takkar hoti hai, waise hi lambe wire me electrons ko atoms se zyada takkar jhelni padti hai.

Key Formula:
R = ρ × (L / A)`,
          relatedConcept: "Resistance & Length (R ∝ L)"
        };
      }
      if (qLower.includes('area') || qLower.includes('thickness') || qLower.includes('mota')) {
        return {
          answer: `Great doubt! Conductor ka cross-sectional area (thickness) badhane se resistance kam ho jati hai (R ∝ 1/A).

Analogy:
Isko 6-lane wide highway ki tarah samjho jahan gaadiyan bina jam ke aasani se daud sakti hain.

Key Rule:
Thick wire = Kam Resistance, Thin wire = Zyada Resistance.`,
          relatedConcept: "Cross-Sectional Area (R ∝ 1/A)"
        };
      }
      return {
        answer: `Bilkul Tanya! "${userQuery}" ka direct sambandh Resistance aur Ohm's law (V = I × R) se hai.

Core Principle:
Voltage charge ko aage dhakelta hai, Current charge flow ki rate hai, aur Resistance flow ko oppose karta hai.

Agar koi specific step me doubt hai to bejijhak batayein!`,
        relatedConcept: "Ohm's Law & Circuit Analysis"
      };
    } else if (language === 'Hindi') {
      return {
        answer: `बहुत अच्छा प्रश्न! "${userQuery}" सीधे ओम के नियम (V = I × R) और प्रतिरोध के भौतिक नियमों से संबंधित है।

मुख्य सिद्धांत:
चालक की लंबाई बढ़ने पर प्रतिरोध बढ़ता है (R ∝ L), जबकि मोटाई बढ़ने पर प्रतिरोध कम होता है (R ∝ 1/A)।`,
        relatedConcept: 'प्रतिरोध के नियम और सूत्र'
      };
    } else {
      return {
        answer: `Great question! Regarding "${userQuery}":

Core Principle:
Ohm's Law states that current is directly proportional to voltage and inversely proportional to resistance (V = I × R). When resistance increases, current naturally decreases if potential difference remains constant.`,
        relatedConcept: "Ohm's Law & Resistance Fundamentals"
      };
    }
  }

  // Get assessment questions
  static async getAssessmentQuestions(): Promise<AssessmentQuestion[]> {
    return defaultAssessmentQuestions;
  }

  // Submit assessment
  static async submitAssessment(answers: Record<string, string>): Promise<AssessmentResult> {
    await delay(1200);
    let correct = 0;
    defaultAssessmentQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePercentage = Math.round((correct / defaultAssessmentQuestions.length) * 100);

    return {
      totalQuestions: defaultAssessmentQuestions.length,
      correctCount: correct,
      scorePercentage,
      timeSpentSeconds: 145,
      conceptBreakdown: [
        { concept: 'Ohm’s Law Formula (V = IR)', score: answers['as-1'] === 'b' ? 100 : 0, status: answers['as-1'] === 'b' ? 'mastered' : 'needs_work' },
        { concept: 'Resistance & Geometry', score: answers['as-2'] === 'b' ? 100 : 0, status: answers['as-2'] === 'b' ? 'mastered' : 'needs_work' },
        { concept: 'Series Circuit Load', score: answers['as-3'] === 'a' ? 100 : 0, status: answers['as-3'] === 'a' ? 'mastered' : 'improving' },
        { concept: 'SI Units', score: answers['as-4'] === 'a' ? 100 : 0, status: answers['as-4'] === 'a' ? 'mastered' : 'needs_work' },
        { concept: 'Limitations of Ohm’s Law', score: answers['as-5'] === 'a' ? 100 : 0, status: answers['as-5'] === 'a' ? 'mastered' : 'improving' }
      ]
    };
  }

  // Get learning report
  static async getLearningReport(): Promise<LearningReportData> {
    return demoLearningReport;
  }

  // Get learning path roadmap
  static async getLearningPath(): Promise<LearningPathNode[]> {
    return electricityLearningPath;
  }
}

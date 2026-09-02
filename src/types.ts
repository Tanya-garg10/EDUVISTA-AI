export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';
export type LearningLanguage = 'English' | 'Hindi' | 'Hinglish';
export type LearningTime = '5min' | '20min' | '60min' | '7days';
export type LearningGoal = 'concept' | 'exam' | 'interview' | 'revision' | 'skills';
export type TeachingStyle = 'simple_examples' | 'visual_learning' | 'step_by_step' | 'socratic' | 'practical';

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string;
  level: LearningLevel;
  language: LearningLanguage;
  availableTime: LearningTime;
  goal: LearningGoal;
  teachingStyle: TeachingStyle;
  streakDays: number;
  conceptsMastered: number;
  averageScore: number;
  totalLearningMinutes: number;
}

export interface GroundedSource {
  documentTitle: string;
  chapter: string;
  pages: number[];
  snippet: string;
  confidenceScore: number;
}

export interface LessonSection {
  id: string;
  indexNumber: string;
  title: string;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  visualType: 'Simulation' | 'Analogy Diagram' | 'Interactive Circuit' | 'Equation Flow' | 'Structure Map';
  interactionIndicator: string;
  completed: boolean;
  active?: boolean;
  summary: string;
  speechText: {
    English: string;
    Hindi: string;
    Hinglish: string;
  };
}

export interface QuestionOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  misconceptionId?: string;
  explanation: string;
}

export interface Question {
  id: string;
  title: string;
  questionText: string;
  questionType: 'mcq' | 'short_answer' | 'conceptual' | 'practical';
  options: QuestionOption[];
  correctOptionId: string;
  conceptTarget: string;
  bloomLevel: 'Recall' | 'Understand' | 'Apply' | 'Analyze';
  groundedSource?: GroundedSource;
}

export interface Misconception {
  id: string;
  concept: string;
  detectedMisunderstanding: string;
  rootCause: string;
  adaptiveStrategy: string;
  teacherSpeechOverride: {
    English: string;
    Hindi: string;
    Hinglish: string;
  };
  analogyTitle: string;
  analogyDescription: string;
  followUpQuestion: Question;
}

export interface Lesson {
  id: string;
  topic: string;
  subject: string;
  grade: string;
  chapter: string;
  durationEstimate: string;
  studentProfileSummary: string;
  sections: LessonSection[];
  groundedSources: GroundedSource[];
  questions: Question[];
  misconceptionsMap: Record<string, Misconception>;
}

export interface AssessmentQuestion {
  id: string;
  number: number;
  type: 'mcq' | 'short_answer' | 'conceptual' | 'practical';
  concept: string;
  question: string;
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface AssessmentResult {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  conceptBreakdown: {
    concept: string;
    score: number;
    status: 'mastered' | 'improving' | 'needs_work';
  }[];
}

export type LearningReport = LearningReportData;

export interface LearningHistoryItem {
  id: string;
  title: string;
  topic?: string;
  subject?: string;
  date: string;
  score: number;
  duration: string;
  status: string;
  misconceptionsFixed?: number;
}

export interface LearningReportData {
  overallScore?: number;
  finalScore?: number;
  initialScore?: number;
  improvementDelta?: number;
  comprehensionLevel?: string;
  performanceLabel?: string;
  lessonTopic?: string;
  conceptsMastered: string[];
  needsImprovement: string[];
  misconceptionsResolved?: {
    concept: string;
    description: string;
    strategyUsed: string;
  }[];
  misconceptionsResolvedCount?: number;
  masteryImprovement?: {
    before: number;
    after: number;
  };
  historicalProgress?: {
    session: string;
    score: number;
    comprehension: number;
  }[];
  recommendedNextTopic?: string;
  aiFeedback?: string;
  recommendations?: {
    title: string;
    reason: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
  }[];
}

export interface LearningPathNode {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
  masteryPercentage: number;
  difficulty: 'Foundational' | 'Core' | 'Advanced' | 'Mastery';
  estimatedMinutes: number;
  category: string;
  description: string;
  prerequisites: string[];
}

export interface AIAgentInfo {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'idle' | 'active' | 'processing';
  iconName: string;
  metrics: string;
  color: string;
}

export interface UploadedMaterialMeta {
  fileName: string;
  fileSize: string;
  fileType: string;
  subject: string;
  chapter: string;
  pageCount: number;
  conceptsDetected: number;
  examplesDetected: number;
  keyTopics: string[];
}

export type ViewRoute = 
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'upload'
  | 'lesson-plan'
  | 'teacher'
  | 'assessment'
  | 'report'
  | 'learning-path'
  | 'profile'
  | 'settings'
  | 'ai-engine';

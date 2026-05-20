export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
  totalPoints: number;
  streak?: number;
  role?: string;
  createdAt?: string;
}

export interface Topic {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  level: number;
  parentId?: number;
  children?: Topic[];
  parent?: Topic;
  lessonPoints: number;
  quizPoints: number;
  order: number;
  icon?: string;
  color?: string;
  estimatedMin: number;
  quizzes?: Quiz[];
}

export interface Progress {
  id: number;
  userId: number;
  topicId: number;
  lessonDone: boolean;
  quizPassed: boolean;
  bestScore: number;
  completedAt?: string;
  topic?: Topic;
}

export interface Question {
  id: number;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: string[];
  order: number;
}

export interface Quiz {
  id: number;
  topicId: number;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  total: number;
  totalQ: number;
  passed: boolean;
  earnedPoints: number;
  results: Array<{
    questionId: number;
    correct: boolean;
    correctAnswer: string;
    explanation?: string;
  }>;
}

export interface LeaderboardEntry {
  id: number;
  username: string;
  avatar?: string;
  totalPoints: number;
  streak: number;
  rank: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  language: string;
  startDate: string;
  endDate: string;
  points: number;
  status: 'upcoming' | 'active' | 'ended';
  participantCount?: number;
  myParticipation?: {
    githubUrl?: string;
    language?: string;
    repoName?: string;
    verified: boolean;
    earnedPoints: number;
    submittedAt?: string;
  } | null;
}

export interface Homework {
  id: number;
  topicId: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  mySubmission?: HomeworkSubmission | null;
}

export interface HomeworkSubmission {
  id: number;
  userId: number;
  homeworkId: number;
  githubUrl: string;
  repoName?: string;
  verified: boolean;
  points: number;
  submittedAt: string;
  homework?: Homework & { topic?: { title: string; icon?: string; slug: string } };
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  createdAt: string;
  sender: { id: number; username: string; avatar?: string };
  receiver: { id: number; username: string; avatar?: string };
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface LessonSection {
  title: string;
  content: string;
  codeExamples?: Array<{ language: 'typescript' | 'jsx' | 'python' | 'csharp'; code: string }>;
  visualDescription?: string;
}

export interface LessonVideo {
  videoId: string;
  title: string;
  channelName?: string;
}

export interface ExternalCourse {
  title: string;
  url: string;
  platform: string;
  description?: string;
}

export interface LessonContent {
  slug: string;
  title: string;
  videos?: LessonVideo[];
  externalCourses?: ExternalCourse[];
  sections: LessonSection[];
  keyPoints: string[];
  practiceProblems?: string[];
}

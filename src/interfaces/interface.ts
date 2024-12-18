// **User Type**
export interface IUser {
  id: string;
  username: string;
  email: string;
  selectedStacks: string[]; // Array of technology stacks, e.g., ['React', 'Node.js']
  languagePreference: string; // 'English' or other languages
  progress: IProgress;
  interviewHistory: IInterviewHistory[];
}

export interface IUserProfileSetup {
  selectedStacks: string[]; // Array of technology stacks, e.g., ['React', 'Node.js']
  languagePreference: string[]; // 'English' or other languages
}



// **Progress Type**
export interface IProgress {
  comprehensionScore: number;
  pronunciationAccuracy: number;
  vocabularyImprovement: number;
  badges: string[]; // List of badges earned by the user
}

// **Interview History Type**
export interface IInterviewHistory {
  questionId: string; // ID of the interview question
  response: string; // Text response provided by the user
  feedback: IFeedback;
  score: number; // Score given to the response
}

// **Feedback Type**
export interface IFeedback {
  clarity: string; // Feedback on clarity of the response
  relevance: string; // Feedback on relevance of the response to the question
  pronunciation: string; // Feedback on pronunciation
  grammar: string; // Feedback on grammar
}

// **Interview Question Type**
export interface IInterviewQuestion {
  id: string;
  question: string; // The interview question
  stack: string; // Technology stack for the question (e.g., 'React', 'Node.js')
  questionType: 'coding' | 'system design' | 'soft skill'; // Type of the interview question
  difficulty: number; // Difficulty level, e.g., 1 to 5
  exampleAnswer?: string; // Optional: Example of a good answer
}

// **Response Type**
export interface IResponse {
  questionId: string;
  responseText: string; // Transcribed response text
  speechAnalysis: ISpeechAnalysis;
  score: number; // Score of the response based on the analysis
}

// **Speech Analysis Type**
export interface ISpeechAnalysis {
  clarity: string; // Clarity of the speech response
  pronunciation: string; // Accuracy of pronunciation
  technicalAccuracy: string; // Accuracy of technical content in the response
}

// **Progress Tracker Type**
export interface IProgressTracker {
  userId: string; // User's unique identifier
  progress: IProgress;
  badges: string[]; // List of badges earned
}


export interface IAuthLoginPayload {
  email: string,
  password: string
}

export interface IAuthRegisterPayload{
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export interface BaseResponse {
  statusCode?: number;
  isSuccess?: boolean;
  message?: string | object;
  data?: {};
  token?: string;
  user?: Partial<IUser>
}

export interface SelectableItem {
  name: string;
  selected: boolean;
  value: string,
}

export interface ProblemEx {
  _id: string;
  title: string,
  question: string;
  questionType: string;
  difficulty: number;
  audioFilePath: string,
  exampleAnswer: string;
  stack: string;
}

// **User Type**
export interface IUser {
  id: string;
  username: string;
  email: string;
  selectedStacks: string[]; // Array of technology stacks, e.g., ['React', 'Node.js']
  languagePreference: string; // 'English' or other languages
  progress: IProgress;
  interviewHistory: IInterviewHistory[];
  firstname: string,
  lastname: string,
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
  questionId: string; 
  response: string; 
  feedback: IFeedback;
  score: number;
  date: string,
  questionType: string,
  title: string,
}

// **Feedback Type**
export interface IFeedback {
  clarity: string;
  relevance: string; 
  pronunciation: string; 
  grammar: string; 
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

export interface BaseResponseIQ {
  statusCode?: number;
  isSuccess?: boolean;
  message?: string | object;
  data?: [{
    audioFilePath: string,
    difficulty: number,
    exampleAnswer: string,
    question: string,
    questionType: string,
    stack: string,
    title: string
  }];
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


export interface Feedback {
  clarity: string;
  relevance: string;
  pronunciation: string | null;
  grammar: string;
  technicalAccuracy: string;
  location?: string;
}

export interface Result {
  statusCode?: number;
  isSuccess?: boolean;
  message?: string | object;
  data?: {
    "userId": string,
        "questionId": string,
        "response": string,
        "analysis": {
            "clarity": string,
            "relevance": string,
            "pronunciation": string | null,
            "grammar": string,
            "technicalAccuracy": string
        },
        "location": string,
        "score": number,
        "_id": string;
      },
  token?: string;
  user?: Partial<IUser>
}